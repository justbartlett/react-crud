import React, {Component} from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: {},
            key: ''
        };
    }

    componentDidMount() {
        const ref = firebase.firestore().collection('tasks').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                this.setState({
                    task: doc.data(),
                    key: doc.id,
                    isLoading: false
                });
            } else {
                console.log('No document found');
            }
        });
    }

    delete(id) {
        firebase.firestore().collection('tasks').doc(id).delete().then(() => {
            console.log('Task deleted succesfully');
            this.props.history.push('/')
        }).catch((err) => {
            console.error('Error deleting task: ', err);
        });
    }

    render() {
        return (
            <div class='container'>
                <div class='panel panel-default'>
                    <div class='panel-heading'>
                        <h4><Link to='/'>Task List</Link></h4>
                        <h3 class='panel-title'>{this.state.task.title}</h3>
                    </div>
                    <div class='panel-body'>
                        <dl>
                            <dt>Description:</dt>
                            <dd>{this.state.task.description}</dd>
                            <dt>Author: </dt>
                            <dd>{this.state.task.author}</dd>
                        </dl>
                        <Link to={`/edit/${this.state.key}`} class='btn btn-success'>Edit</Link>&nbsp;
                        <button onClick={this.delete.bind(this, this.state.key)} class='btn btn-danger'>Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Show;