import React from "react";
import InputBar from "./components/InputBar";
import List from "./components/List";
import Axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todolist: [],
      input: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.getToDos = this.getToDos.bind(this);
  }

  componentDidMount() {
    //get data on initial render
    this.getToDos()
  }

  getToDos() {
    Axios.get('/tasks')
    .then(res => {
      console.log('Success')
      this.setState({todolist: res.data})
    })
    .catch(err => {
      console.log(err.message)
    })
  }


  addTask() {
    console.log('this does a post request');
    Axios.post('/tasks',{ input: this.state.input,});

    .then((response => {
      this.setState( {input: '',});

    }))
    .then(()=> this.getToDos())
    .catch((err) => {
      console.log( "something went wrong posting a task from client")
    })

  }

  deleteTask(id) {
    console.log(`this deletes an id matching ${id}`);
    Axios.delete(`/tasks`, {data: {id}})
    .then(() => {
      this.getToDos();
    })
    .catch((err) => console.log("problem deleting task from client", err));
  }

  onInputChange(event) {
    this.setState({
      input: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <h1>toDo list</h1>
        <InputBar
          value={this.state.input}
          onInputChange={this.onInputChange}
          addTask={this.addTask}
        />
        <List
          todolist={this.state.todolist}
          deleteTask={this.deleteTask}
        />
      </div>
    );
  }
}

export default App;
