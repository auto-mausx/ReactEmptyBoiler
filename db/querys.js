const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'todolist'
});

connection.connect(err => {
  if(err){
    console.log('couldn\'t connect to database')
  } else{
    console.log('connected to mysql database!')
  }
});

const postTask = (task, callback) => {
  connection.query('INSERT INTO tasks (task) VALUES (?)', [task], (err,data) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, err)
    }
  })
}

const getTasks = (callback) => {
  connection.query('SELECT * FROM tasks', (err, data) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, err)
    }
  })
}

const deleteTask = (id, callback) => {
  connection.query("DELETE FROM tasks WHERE id = " + id, (err, data) => {
    if (err) {
      console.log("problem deleting task in query");
      callback(err, null);
    } else {
      callback(null, data);
    }
  })
};

module.exports = {postTask, getTasks, deleteTask}