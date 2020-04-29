//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "This is a webpage created by Pratik Singh with the aim to learn NodeJS and to learn how to deploy server using Herokuapp.
It is a simple webpage that helps to create a Daily Blog for anyone who wants it .You Just have to click the 'Compse' button and start writting about the nmae of your Post and then go on with writting your post .It will automatically add your post on the Home page. ";
const aboutContent = "This is a webpage created by Pratik Singh with the aim to learn NodeJS and to learn how to deploy server using Herokuapp.";
const contactContent = "If you have the link to acces this webpage then you must have my Number😜 ....But Thank you for checking out my stuff!";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
