const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../data/Posts.json');

function readPosts() {
  if (!fs.existsSync(postsPath)) return [];
  const data = fs.readFileSync(postsPath, 'utf-8');
  return JSON.parse(data);
}

function writePosts(posts) {
  fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
}

const createPost = (req, res) => {
  const { bloodType, description, location, imageUrl, medicalDocUrl, postedBy, urgency } = req.body;
 

  const posts = readPosts();

  const newPost = {
    id: Date.now(),
    bloodType,
    description,
    location,
    imageUrl,
    medicalDocUrl,
    postedBy,
    urgency,
    createdAt: new Date().toISOString()
  };

  posts.push(newPost);
  writePosts(posts);

  res.status(201).json({ msg: 'Post created', post: newPost });
};

const getAllPosts = (req, res) => {
  const posts = readPosts();
  res.status(200).json(posts);
};

module.exports = { createPost, getAllPosts };