import React, { Component } from 'react';
import Expenses from './Expenses';
import AddExpense from './AddExpense';
import Search from './Search';
import './App.css';

class App extends Component {
    
    // default dummy data
    state = {
        expenses: [
            {date: '2019-05-01', amount: 100, category: 'Food', notes: 'Weekly Grocery Trip', isEditing: false},
            {date: '2019-07-01', amount: 200, category: 'Transportation', notes: 'Monthly Commuter Pass', isEditing: false},
            {date: '2019-09-01', amount: 700, category: 'Shelter', notes: 'Monthly Rent', isEditing: false}
        ],
        isOldestFirst: true,
        isLeastAmountFirst: true,
        categorySearchFilterText: ''
    }

    // (newExpense) is received from AddExpense.js
    addExpense = (newExpense) => {
        let expenses = [...this.state.expenses, newExpense];
        this.setState({
            expenses
        });
    }

    // when edit button is pressed
    // (i) is received from Expenses.js
    pressEditBtn = (i) => {
        let expenses = this.state.expenses;
        expenses[i].isEditing = true;
        this.setState({
            expenses
        });
    }

    // (i, date, amount, category, notes) is received from Expenses.js
    updateExpense = (i, date, amount, category, notes) => {
        let expenses = this.state.expenses;
        expenses[i].date = date;
        expenses[i].amount = amount;
        expenses[i].category = category;
        expenses[i].notes = notes;
        expenses[i].isEditing = false;

        this.setState({
            expenses
        });
    }

    // (i) is received from Expenses.js
    pressDelete = (i) => {
        let expenses = this.state.expenses.filter((e, index) => {
            return index !== i;
        });
        this.setState({
            expenses
        });
    }

    // Option to toggle sort by Date
    toggleSortDate = () => {
        const {expenses} = this.state
        let newExpensesList = expenses
        if (this.state.isOldestFirst) {
            newExpensesList = expenses.sort((a, b) => new Date(b.date) - new Date(a.date))
        } else {
            newExpensesList = expenses.sort((a, b) => new Date(a.date) - new Date(b.date))
        }
        this.setState({
            isOldestFirst: !this.state.isOldestFirst,
            expenses: newExpensesList
        })
    }

    // Option to toggle sort by Amount
    toggleSortAmount = () => {
        const {expenses} = this.state
        let newExpensesList = expenses
        if (this.state.isLeastAmountFirst) {
            newExpensesList = expenses.sort((a, b) => b.amount - a.amount)
        } else {
            newExpensesList = expenses.sort((a, b) => a.amount - b.amount)
        }
        this.setState({
            isLeastAmountFirst: !this.state.isLeastAmountFirst,
            expenses: newExpensesList
        })
    }

    // filter by category
    filterUpdate = (value) => {
        this.setState({
            categorySearchFilterText: value
        })
    }

    render() {
        return (
            <div className='container'>
                <div className='logo_header'>
                    <div className='logo'>Logo Holder</div>
                    <h1 className='logo_header_titile'>SpendWatcher</h1>
                </div>
                <div className='Sort__Buttons__Group'>
                    <button onClick={this.toggleSortDate}>Sort Expenses by DATE</button>
                    <button onClick={this.toggleSortAmount}>Sort Expenses by AMOUNT</button>
                </div>
                <Search 
                    categorySearchFilterText={this.state.categorySearchFilterText} 
                    filterUpdate={this.filterUpdate} 
                /> 
                <Expenses 
                    allExpenses={this.state.expenses} 
                    pressEditBtn={this.pressEditBtn} 
                    updateExpense={this.updateExpense} 
                    pressDelete={this.pressDelete} 
                    categorySearchFilterText={this.state.categorySearchFilterText}
                />
                <AddExpense 
                    addExpense={this.addExpense} 
                />
            </div>
        );
    }
}

export default App;