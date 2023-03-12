import React, { Component } from 'react';
import css from '../styles.module.css';
class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleChange = e => {
    this.setState({ inputValue: e.currentTarget.value });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form
          className={css.SearchForm}
          onSubmit={e => {
            e.preventDefault();
            console.log('🎅 ~ this.state.inputValue:', this.state.inputValue);
            this.props.onSubmit(this.state.inputValue);
          }}
        >
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
