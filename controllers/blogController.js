const { db } = require("../config/db");

const blogCollection = db.collection("blog");

const createBlog = async (req, res) => {
  try {
    const newBlog = req.body;
    const result = await blogCollection.insertOne(newBlog);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogCollection.find().toArray();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await blogCollection.findOne({ _id: new ObjectId(id) });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedBlog = req.body;
    const filter = { _id: new ObjectId(id) };
    const updateDoc = {
      $set: { ...updatedBlog },
    };
    const result = await blogCollection.updateOne(filter, updateDoc);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a blog by ID
const { ObjectId } = require("mongodb"); // Make sure this line is added!

const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Blog ID format" });
    }

    const result = await blogCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ message: "Blog deleted successfully", deletedCount: result.deletedCount });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

  
  

module.exports = { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };
