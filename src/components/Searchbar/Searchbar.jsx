import React, { Component } from "react";
import PropTypes from 'prop-types';
import css from "./Searchbar.module.css";

export default class Searchbar extends Component {
    state = {
        query: '',
    }

    handleChange = e => {
        const { value } = e.currentTarget;
        this.setState({ query: value });
        console.log(value);
    }

    handleSubmit = e => {
        const { query } = this.state;
        e.preventDefault();
        if (query.trim() !== '') {
            this.props.onSubmit(query.trim());
        }
        // this.reset();
    }

    // reset = () => {
    //     this.setState({ query: ''})
    // }

    render () {
        const { query } = this.state;
        const { handleSubmit, handleChange } = this;
        return (
            <div className={css.searchbar}>
            <form onSubmit={handleSubmit} className={css.searchForm}> 
            <button type="submit" className={css.searchFormButton}>
                <span className={css.searchFormLabel}>Search</span>
            </button>
            <input
            value={query}
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
            />
            </form>
            </div>
        )
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };