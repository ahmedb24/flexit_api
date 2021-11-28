export default function buildMakeUser ({ md5, validators, jwt }) {
    return function makeUser ({
      name ,
      email,
      password,
      createdOn = Date.now(),
      modifiedOn = Date.now()
    } = {}) {
      if (!validators.validateByRegex(email, 'email')) {
        throw new Error('User must have a valid email address.')
      }
      if (!password || password.length < 1) {
        throw new Error('User contains no usable password.')
      }

      if (!name) {
        name = email.split('@')[0]
      }
            
      let hashedPassword;
      let hash;
  
      return Object.freeze({
        getName: () => name,
        getEmail: () => email,
        getPassword: () => hashedPassword || (hashedPassword = makeHashedPassword()),
        getDateCreated: () => createdOn,
        getDateModified: () => modifiedOn,
        getHash: () => hash || (hash = makeHash()),
        toJson: function() {
            return { name: this.name, email: this.email, date_created: this.createdOn }
        },
        comparePassword: async function(plainText) {
            return await bcrypt.compare(plainText, this.password)
        },
        encoded() {
            return jwt.sign(
              {
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 4,
                ...this.toJson(),
              },
              process.env.SECRET_KEY,
            )
        },
        async decoded(userJwt) {
            return jwt.verify(userJwt, process.env.SECRET_KEY, (error, res) => {
              if (error) {
                return { error }
              }
              return new User(res)
            })
        }
      })
  
      function makeHashedPassword () {
        return md5(
          password 
        )
      }
      
      function makeHash () {
        return md5(
            (name || '') +
            (email || '') 
        )
      }
    }
  }