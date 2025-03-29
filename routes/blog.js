const { Router } = require("express");
const { upload } = require("../Config/cloudinaryconfig"); // Cloudinary config file
const path = require("path");
const router = Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");

router.get("/add-new", (req, res) => {
    return res.render("addBlog", {
        user: req.user,
    });
});

router.get("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");
    return res.render("blog", {
        user: req.user,
        blog: blog,
        comments: comments,
    });
});

router.post("/comment/:blogId", async (req, res) => {
    const comment = await Comment.create({
        content: req.body.comment,
        blogId: req.params.blogId,
        createdBy: req.user._id,
    });
    return res.redirect(`/blog/${req.params.blogId}`);
});

router.post("/", upload.single("coverImage"), async (req, res) => {
    const { title, body } = req.body;
    if (!req.file) {
        return res.status(400).json({ message: "Image upload failed" });
    }
    const blog = await Blog.create({
        body,
        title,
        createdBy: req.user._id,
        coverImageURL: req.file.path, // Cloudinary URL
    });
    return res.redirect(`/blog/${blog._id}`);
});

module.exports = router;
