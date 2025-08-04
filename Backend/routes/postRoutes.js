const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const upload = require('../middleware/uploads');
const validatePost = require('../middleware/validatePost');

const postsFile = path.join(__dirname, '../data/posts.json');

// --- Helpers ---
function readPosts() {  
  if (!fs.existsSync(postsFile)) 
    fs.writeFileSync(postsFile, '[]');
  return JSON.parse(fs.readFileSync(postsFile));
}

function writePosts(posts) {
  fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
}

// ✅ POST: Create a new blood request
router.post(
  '/create',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'document', maxCount: 1 }
  ]),
  validatePost,
  (req, res) => {
    const { name, bloodType, location, urgency, problem } = req.body;

    if (!name || !bloodType || !location || !urgency || !problem) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const posts = readPosts();

    const newPost = {
      id: Date.now(),
      name,
      bloodType,
      location,
      issue: problem,
      serious: urgency === 'high' || urgency === 'emergency',
      imageUrl: req.files?.image?.[0]?.path.replace(/\\/g, '/'),
      documentUrl: req.files?.document?.[0]?.path.replace(/\\/g, '/'),
      createdAt: new Date().toISOString()
    };

    posts.push(newPost);
    writePosts(posts);

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  }
);

// ✅ GET: Fetch all blood requests
router.get('/all', (req, res) => {
  try {
    const posts = readPosts();
    res.status(200).json(posts.reverse()); // newest first
  } catch (err) { 
    console.log(err);
    res.status(500).json({ error: 'Failed to load posts' });
  }
});

module.exports = router;