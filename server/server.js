const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const port = 4000;
const { postTask, getTasks, deleteTask } = require("../db/querys.js");

app.use(express.static(path.join(__dirname, "../client/dist/")));
app.use(bodyParser.json());

app.get("/tasks", (req, res) => {
  getTasks((err, data) => {
    if (err) {
      res.status(500).send('Could not get tasks')
    } else {
      res.send(data)
    }
  })
});

app.post("/tasks", (req, res) => {
  addTask(req.body.task, (err, data) => {
    if(err) {
      res.status(500).send("err in server while adding task ");
    } else {
      res.send(data);
    }
  })
});

app.delete("/tasks", (req, res) => {
  deleteTask((req.body.id), (err, data) => {
    if (err) {
      console.log("error deleting task in server");
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  })
});

app.listen(port, () => {
  console.log(`hurray, you're connected to port ${port}`);
});
