const express = require("express");
const { getAllUsers, createUser, updateUser, deleteUser } = require("../controllers/userController");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.patch("/", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
