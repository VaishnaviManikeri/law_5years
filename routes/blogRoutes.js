const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth"); // ✅ your existing middleware

const {
  getBlogs,
  getBlogById,
  getBlogsAdmin,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

/* PUBLIC */
router.get("/", getBlogs);
router.get("/:id", getBlogById);

/* ADMIN (JWT protected) */
router.get("/admin/all", auth, getBlogsAdmin);
router.post("/", auth, createBlog);
router.put("/:id", auth, updateBlog);
router.delete("/:id", auth, deleteBlog);

module.exports = router;
