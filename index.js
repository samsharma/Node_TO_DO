//dependencies required for the app
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//render css files
app.use(express.static("public"));
app.locals.myVar = 1;
//placeholders for added task
var task = ["Math Assignment", "Complete Web App"];

//placeholders for removed task
var complete = ["Buy Snacks", "Add to card Snacks", "Html Snacks"];

//post route for adding new task
app.post("/addtask", function (req, res) {
  var newTask = req.body.newtask;
  //add the new task from the post route
  if (newTask) {
    task.push(newTask);

    res.redirect("/");
  }
  res.redirect("/");
});

app.post("/removetask", function (req, res) {
  var completeTask = req.body.check;

  //check for the "typeof" the different completed task, then add into the complete task
  if (typeof completeTask === "string") {
    complete.push(completeTask);

    //check if the completed task already exits in the task when checked, then remove it
    task.splice(task.indexOf(completeTask), 1);
  } else if (typeof completeTask === "object") {
    for (var i = 0; i < completeTask.length; i++) {
      complete.push(completeTask[i]);
      task.splice(task.indexOf(completeTask[i]), 1);
    }
  }
  res.redirect("/");
});

app.post("/addTaskagain", function (req, res) {
  var taskAgain = req.body.checkagain;

  //check for the "typeof" the different completed task, then add into the complete task
  if (typeof taskAgain === "string") {
    task.push(taskAgain);

    //check if the completed task already exits in the task when checked, then remove it
    complete.splice(complete.indexOf(taskAgain), 1);
  } else if (typeof taskAgain === "object") {
    for (var i = 0; i < taskAgain.length; i++) {
      task.push(taskAgain[i]);
      complete.splice(complete.indexOf(taskAgain[i]), 1);
    }
  }
  res.redirect("/");
});

//render the ejs and display added task, completed task
app.get("/", function (req, res) {
  res.render("index", { task: task, complete: complete });
});

//set app to listen on port 3000
app.listen(5000, function () {
  console.log("OSFY Test App Server is running on port 5000!");
});
