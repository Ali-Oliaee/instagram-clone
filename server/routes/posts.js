import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  removePost,
  likePost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", removePost);
router.patch("/like-post/:id", likePost);

export default router;
