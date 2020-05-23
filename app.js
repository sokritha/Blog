//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-sokritha:test-123@cluster0-e8c9s.mongodb.net/blogDB",  {useNewUrlParser: true, useUnifiedTopology: true});

// Create Schema
const postSchema = {
  title: String,
  content: String
} 

// Create Model
const PostsModel = mongoose.model('Post', postSchema);

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  PostsModel.find({}, (err, foundPost)=>{
    res.render("home", { homeContent: homeStartingContent, homePosts: foundPost});
  })
});

app.get("/posts/:postId", (req, res)=>{
  // let isFound = false;
  const reqPostId = req.params.postId;
  // posts.forEach(element=>{
  //   console.log(element.title);
  //   if (_.lowerCase(element.title) === _.lowerCase(req.params.titleName)){
  //     isFound = true;
  //     res.render("post", {title: element.title, content: element.content});
  //   }
  // });
  PostsModel.find({_id: reqPostId},(err, foundPost)=>{
    res.render("post", {title: foundPost[0].title, content: foundPost[0].content});
  } )
  // if (isFound===true){
  //   console.log("Match Found");
  // }else{
  //   console.log("Not Found");
  // }
})

app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res)=>{
  let title = req.body.heading_blog;
  let contentPost = req.body.content_post;
  let eachPost = new PostsModel({
    title: title,
    content: contentPost
  });
  eachPost.save(err=>{
    if (!err){
      res.redirect("/");
    }
  });
  // posts.push(eachPost);
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
};

app.listen(port, function () {
  console.log("Server started on port 3000");
});
