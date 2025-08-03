const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const upload = require("../middleware/uploads")
const postsFile = path.join(__dirname, '../data/posts.json');
const validatePost = require('../middleware/validatePost');

// Helper to read posts
function readPosts() {
  if (!fs.existsSync(postsFile)) fs.writeFileSync(postsFile, '[]');
  const data = fs.readFileSync(postsFile);
  return JSON.parse(data);
}

// Helper to write posts
function writePosts(posts) {
  fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
}

// ✅ POST a blood requirement
// Add upload.fields middleware
router.post(
    '/create',
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'document', maxCount: 1 }
    ]),
    validatePost,
    (req, res) => {
      const { name, bloodType, location, urgency, problem } = req.body;
  
      // Auto extract paths from uploaded files
      const imageUrl = req.files?.image?.[0]?.path || '';
      const documentUrl = req.files?.document?.[0]?.path || '';
  
      if (!name || !bloodType || !location || !urgency || !problem) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const posts = readPosts();
  
      const newPost = {
        id: Date.now(),
        name,
        bloodType,
        location,
        urgency,
        problem,
        imageUrl,
        documentUrl,
        createdAt: new Date()
      };
  
      posts.push(newPost);
      writePosts(posts);
  
      res.status(201).json({ message: 'Post created with file(s)', post: newPost });
    }
  );
router.get('/', (req, res) => {
  const posts = readPosts();
  res.status(200).json(posts.reverse()); // newest first
});
module.exports = router;