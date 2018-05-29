import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfItems: [],
            value: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addToList = this.addToList.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        fetch('/all', { method: 'GET' })
        .then(res => { return res.json() })
            .then(res => {
                if (res) {
                    this.setState({
                        listOfItems: res,
                        value: ''
                    })
                }
            })
    }

    addToList(data) {
        fetch('/add', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ description: data, date: new Date() }) })
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        listOfItems: [...this.state.listOfItems, { description: data }],
                        value: ''
                    });
                }
            });
    }

    delete(item) {
        fetch('/', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) })
            .then((res) => {
                if (res.status === 200) {
                    const newState = [...this.state.listOfItems];
                    if (newState.indexOf(item) > -1) {
                        newState.splice(newState.indexOf(item), 1);
                        this.setState({ listOfItems: newState, value: '' });
                    }
                }
            });
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.addToList(this.state.value);
    }

    render() {
        const listOfItems = this.state.listOfItems;

        return (
            <div>
                <div className='set-list'>
                    <ul>
                        {listOfItems.map(i => <li key={i}>
                            <span>{i.description}</span>
                            <button key={i} onClick={this.delete.bind(this, i)}>Delete</button>
                        </li>)}
                    </ul>
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input placeholder='Add something to your todo list' value={this.state.value} onChange={this.handleChange} />
                        <input type='submit' value='Add' />
                    </form>
                </div>
            </div>
        )
    }
}

export default App;