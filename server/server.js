const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const https = require('https');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => res.send('API Running'));
try {
  mongoose.connect(
    'mongodb+srv://yangchulong:yang86832867@cluster0.zypde.mongodb.net/posts?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log('DB connected');
} catch (error) {
  console.error(error);
}
const Post = mongoose.model('posts', {
  title: { type: String },
  content: { type: String },
});

app.post('/posts', async (req, res) => {
  try {
    const new_post = new Post({
      title: req.body.title,
      content: req.body.content,
    });
    await new_post.save();
    res.status(200).json(new_post);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.get('/posts', async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
  },
  app
);

const PORT = process.env.PORT || 5000;
sslServer.listen(PORT, () => `Server is running on port ${PORT}`);
// app.listen(PORT, () => {
//   `Server is running on port ${PORT}`;
// });
