import React, { Component } from 'react';
import './Expenses.css';

class Expenses extends Component {

    // call updateExpense from (App.js)
    handleUpdate = () => {
        this.props.updateExpense(this.indexNum, this.date.value, this.amount.value, this.category.value, this.notes.value)
    }

    render() {

        const {allExpenses, pressEditBtn, pressDelete, categorySearchFilterText} = this.props;

        const expensesList = allExpenses
            .filter(expense => {
                // remove expenses that do not match current filter category text
                return expense.category.toLowerCase().indexOf(categorySearchFilterText.toLowerCase()) >= 0
            })
            .map((expense, index) => {

                return expense.isEditing === true ? (

                    <tr key={index}>
                        <td><input type='date' ref={(val) => {this.date = val}} required defaultValue={expense.date} /></td>
                        <td><input type='number' ref={(val) => {this.amount = val}} required defaultValue={expense.amount} /></td>
                        <td><input type='text' ref={(val) => {this.category = val}} required defaultValue={expense.category} /></td>
                        <td><input type='text' ref={(val) => {this.notes = val}} required defaultValue={expense.notes} /></td>
                        <td>
                            <input type='button' value='Update' onClick={this.handleUpdate} ref={() => {this.indexNum = index}} className='btn green' />
                        </td>
                    </tr>

                ) : (

                    <tr key={index}>
                        <td className='List__Date'>{expense.date}</td>
                        <td className='List__Amount'>{expense.amount}</td>
                        <td className='List__Category'>{expense.category}</td>
                        <td className='List__Notes'>{expense.notes}</td>
                        <td>
                            <button className='btn white black-text' onClick={() => pressEditBtn(index)}>Edit</button> | <button className='btn red' onClick={() => pressDelete(index)}>Delete</button>
                        </td>
                    </tr>

                );
            });

        return (
            <table className='striped'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount ($)</th>
                        <th>Category</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expensesList}
                </tbody>
            </table>
        );
    }
}

export default Expenses;