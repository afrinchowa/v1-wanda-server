const { db } = require("../config/db");

const userCollection = db.collection("users");

const getAllUsers = async (req, res) => {
  try {
    const users = await userCollection.find().toArray();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = req.body;
    const result = await userCollection.insertOne(newUser);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const email = req.body.email;
    const filter = { email };
    const updateDoc = {
      $set: { lastSignInTime: req.body?.lastSignInTime },
    };
    const result = await userCollection.updateOne(filter, updateDoc);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userCollection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
