export default function makeCommentsDb({ makeDb, Id }) {
  return Object.freeze({
    findByEmail,
    findById,
    insert,
    update,
    loginUser,
    logoutUser,
    findSession,
    findByToken,
    remove
  });

  async function findByEmail({ email }) {
    const db = await makeDb();
    const result = await db.collection("users").findOne({ email });
    const found = result;
    if (!found) {
      return null;
    }
    const { _id: id, ...info } = found;
    return { id, ...info };
  }
  
  async function findById({ id: _id }) {
    const db = await makeDb();
    const result = await db.collection("users").findOne({ id: _id });
    const found = result;
    if (!found) {
      return null;
    }
    const { _id: id, ...info } = found;
    return { id, ...info };
  }

  async function insert({ id: _id = Id.makeId(), ...userInfo }) {
    const db = await makeDb();
    const result = await db.collection("users").insertOne(
      {
        id: _id,
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
      },
      { w: "majority" }
    );
    const { _id: id, ...insertedInfo } = result.ops[0];
    return { id, ...insertedInfo };
  }

  async function update ( _id, { ...userInfo }) {
    console.log('here', {...userInfo})
    
    const db = await makeDb()
    const result = await db
      .collection('users')
      .updateOne({ id:_id }, { $set: { ...userInfo } })
    return result.modifiedCount > 0 ? { id: _id, ...userInfo } : null
  }

  async function loginUser(email, jwt) {
    const db = await makeDb();
    const result = await db
      .collection("sessions")
      .updateOne({ user_id: email }, { $set: { jwt } }, { upsert: true });
    return result.modifiedCount > 0 ? { id: _id, email, jwt } : null;
  }

  async function logoutUser(email) {
    const db = await makeDb();
    const result = await db
      .collection("sessions")
      .deleteOne({ user_id: email });
    return result.deletedCount;
  }

  async function findSession(email) {
    const db = await makeDb();
    const result = await db.collection("sessions").findOne({ user_id: email });
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const { _id: id, ...info } = found[0];
    return { id, ...info };
  }
  
  async function findByToken(jwt) {
    const db = await makeDb();
    const result = await db.collection("sessions").findOne({ user_id: jwt });
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const { email } = found[0];

    return await findByEmail(email)
  }

  async function remove(email) {
    const db = await makeDb();
    const result = await db.collection("users").deleteOne({ email });
    await db.collection("session").deleteOne({ user_id: email });
    return !(await findByEmail(email)) && !(await findSession(email))
      ? result.deletedCount
      : null;
  }
}
