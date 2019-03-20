var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs(
  'tasklist',
  ["tasklist"]
);

// Get All Tasks
router.get("/tasks", function(req, res, next) {
  db.tasklist.find(function(err, tasks) {
    if (err) {
      res.send(err);
    }
    res.json(tasks);
  });
});

// Get Single Task
router.get("/task/:id", function(req, res, next) {
  db.tasklist.findOne({ _id: mongojs.ObjectId(req.params.id) }, function(
    err,
    task
  ) {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
});

//Save Task
router.post("/task", function(req, res, next) {
  var task = req.body;
  console.log(task);
  if (!task.title) {
    res.status(400);
    res.json({
      error: "Bad Data"
    });
  } else {
    db.tasklist.save(task, function(err, task) {
      if (err) {
        res.send(err);
      }
      res.json(task);
    });
  }
});

// Delete Task
router.delete("/task/:id", function(req, res, next) {
  db.tasklist.remove({ _id: mongojs.ObjectId(req.params.id) }, function(
    err,
    task
  ) {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
});

// Update Task
router.put("/task/:id", function(req, res, next) {
  var task = req.body;
  var updTask = {};

  if (task.title) {
    updTask.title = task.title;
  }

  if (!updTask) {
    res.status(400);
    res.json({
      error: "Bad Data"
    });
  } else {
    db.tasklist.update(
      { _id: mongojs.ObjectId(req.params.id) },
      updTask,
      {},
      function(err, task) {
        if (err) {
          res.send(err);
        }
        res.json(task);
      }
    );
  }
});

module.exports = router;
