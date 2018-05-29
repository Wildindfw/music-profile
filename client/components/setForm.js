import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    
    render() {
        return (
            <div>
                <form onSubmit={props.handleSubmit}>
                    <input placeholder='Add something to your set list' value={this.state.value} onChange={this.handleChange} />
                    <input type='submit' value='Submit' />
                </form>
            </div>
        )
    }
}

export default Form;