import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

class Section extends Component {
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
        this.addToList(this.getUrl(this.state.value));
    }

    getUrl(str) {
        return str.substring(88, str.length-11)
    }

    render() {
        const listOfItems = this.state.listOfItems;

        return (
            <div>
                <h2>Playlist of the month</h2>
                <div className='playlist'>
                    <ul>
                        {listOfItems.map(i => <li key={i}>
                            <iframe width="100%" height="110" scrolling="no" frameBorder="no" allow="autoplay" src={i.description}></iframe>
                            <button key={i} onClick={this.delete.bind(this, i)}>Delete</button>
                        </li>)}
                    </ul>
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input placeholder='Add something to your set list' value={this.state.value} onChange={this.handleChange} />
                        <input type='submit' value='Add' />
                    </form>
                </div>
            </div>
        )
    }
}



export default Section;