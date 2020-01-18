import React, { Component } from 'react';
import './AddExpense.css';

class AddExpense extends Component {

    state = {
        date: null,
        amount: null,
        category: null,
        notes: null,
        isEditing: false
    }

    // call addExpense from (App.js)
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addExpense(this.state);
        e.target.reset();
    }

    // update state
    updateState = (e) => {
        this.setState({
            [e.target.name]:e.target.value,
        });
    }

    render() {
        return (
            <div className='row'>
                <form onSubmit={this.handleSubmit}>
                    <div className='input-field col date'>
                        <input name='date' autoComplete='off' required type='date' onChange={this.updateState} />
                    </div>
                    <div className='input-field col amount'>
                        <input name='amount' autoComplete='off' placeholder='100' required type='number' onChange={this.updateState} />
                    </div>
                    <div className='input-field col category'>
                        <input name='category' autoComplete='off' placeholder='Food' required type='text' onChange={this.updateState} />
                    </div>
                    <div className='input-field col notes'>
                        <input name='notes' autoComplete='off' placeholder='Great meal!' required type='text' onChange={this.updateState} /> 
                    </div>
                    <div className='input-field col Add__Button'>
                        <input type='submit' value='Add Expense' className='btn blue' />
                    </div>
                </form>
            </div>
        );
    }
}

export default AddExpense;