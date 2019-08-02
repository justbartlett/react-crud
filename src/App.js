import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

class App extends Component {
  constructor (props) {
    super(props);
    this.ref = firebase.firestore().collection('tasks');
    this.unsubscribe = null;
    this.state = {
      tasks: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const tasks = [];
    querySnapshot.forEach((doc) => {
      const { title, description, author } = doc.data();
      tasks.push({
        key: doc.id,
        doc,
        title,
        description,
        author,
      });
    });
    this.setState({
      tasks
    });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class='container'>
        <div class='panel panel-default'>
          <div class='panel-heading'>
            <h3 class='panel-title'>
              Task List
            </h3>
          </div>
          <div class='panel-body'>
            <h4><Link to='/create'>Add a Task</Link></h4>
            <table class='table table-stripe'>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Decription</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tasks.map(task =>
                  <tr>
                    <td><Link to={`/show/${task.key}`}>{task.title}</Link></td>
                    <td>{task.description}</td>
                    <td>{task.author}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;