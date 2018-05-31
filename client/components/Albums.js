import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

class Albums extends Component {
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
        this.getUrl = this.getUrl.bind(this)
    }

    componentDidMount() {
        fetch('/albums', { method: 'GET' })
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
        fetch('/add', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: data, date: new Date() }) })
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        listOfItems: [...this.state.listOfItems, { title: data }],
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
        this.addToList(this.getUrl(this.state.value));
    }

    getUrl(str) {
        return str.substring(13, str.length-101)
    }

    render() {
        const listOfItems = this.state.listOfItems;

        return (
            <div>
                <h2>Favorite Albums</h2>
                <div className='playlist'>
                    <ul>
                        {listOfItems.map(i => <li key={i}>
                            <iframe src={i.title} width="100%" height="300" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                            <button key={i} onClick={this.delete.bind(this, i)}>Delete</button>
                        </li>)}
                    </ul>
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input className='field' placeholder='Add an album' value={this.state.value} onChange={this.handleChange} />
                        <input className='button' type='submit' value='Add' />
                    </form>
                </div>
            </div>
        )
    }
}



export default Albums;