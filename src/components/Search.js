import React, { Component } from 'react';
import './Search.css';

class Search extends Component {

    filterUpdate = () => {
        const val = this.myValue.value;
        this.props.filterUpdate(val)
    }

    render() {
        return (
            <form>
                <input
                    type='text'
                    ref={ (value) => this.myValue = value }
                    placeholder='Type to Filter by Category...'
                    onChange={this.filterUpdate}
                />
            </form>
        )
    }
}

export default Search;