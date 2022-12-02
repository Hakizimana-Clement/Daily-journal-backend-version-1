//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

///////// CRAZY right !! ///////////////

////////////////////////////////// create Global variable /////////////////////////////////////////

let posts = [];

/////////////////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// HOME ROUTE ///////////////////////////////////
app.get("/", function (req, res) {
  res.render("home", {
    home: homeStartingContent,
    posts: posts,
  });

  //THIS IS WHAT I MISS IN CHALLENGE 11
  // console.log(posts);
});

///////////////////////////////// ABOUT ROUTE ///////////////////////////////////
app.get("/about", function (req, res) {
  res.render("about", { about: aboutContent });
});
///////////////////////////////// CONTACT ROUTE ///////////////////////////////////
app.get("/contact", function (req, res) {
  res.render("contact", { contact: contactContent });
});
///////////////////////////////// COMPOSE ROUTE (GET METHOD) ///////////////////////
app.get("/compose", function (req, res) {
  res.render("compose");
});
///////////////////////////////// COMPOSE ROUTE  (POST METHOOD ////////////////////
app.post("/compose", function (req, res) {
  let post = {
    title: req.body.title,
    content: req.body.content,
  };

  posts.push(post);

  res.redirect("/");
});
///////////////////////////////// POSTS ROUTE + ROUTE PARAMS ////////////////////

//1.this is for new route (localhost:3000/posts/:postName)
app.get("/posts/:postName", function (req, res) {
  //2.this is for know the following parameter user write
  //Example localhost:3000/posts/day1. the requestTitle help to know it.
  //2.1._.lowecase it to put it in lowercase iseing lodash module.
  let requestTitle = _.lowerCase(req.params.postName);

  //3.This is for target if the title in home.ejs (root route is equal to the posts/:postName,)
  posts.forEach(function (post) {
    //3.1.Here we just make the post.tile in const called storedTitle
    const storedTitle = _.lowerCase(post.title);

    //3.1.Here we use if statement to see if storedTile is equal t0 requestTitle then
    // console.log("match found ") when is true.
    if (storedTitle === requestTitle) {
      res.render("post", {
        title: post.title,
        content: post.content,
      });
    }
  });
});

/////////////////////////////////////////////////////////////////////////////////
app.listen(process.env.PORT || 1212, function () {
  console.log("Server started on port 1212");
});
