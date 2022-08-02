const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const portNumber = process.env.PORT || 8080;
const ejs = require('ejs');
const methodOverride = require('method-override');
const postRouter = require('./routes/posts');
const Post = require('./models/Post');
const db = process.env.DATABASE || "posts";

//connect to db
mongoose.connect(`mongodb://localhost/${db}`, () => {
    console.log('Connected to DB : Posts ');
}, error => console.log(error));

//ejs
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride('_method'));

app.get('/', async (req,res)=>{

    const posts = await Post.find().sort({ createdAt: 'desc' })
    res.render('../views/posts/index', { posts : posts });
});

app.use('/posts', postRouter);

//connect to server
app.listen(portNumber, ()=>{
 console.log(`Listening on port : ${portNumber}`);
});
