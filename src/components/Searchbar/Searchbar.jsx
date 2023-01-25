import { useState } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const onChange = e => {
    const query = e.currentTarget.value.toLowerCase();
    setSearchQuery(query);
  };

  const onSubmiting = e => {
    e.preventDefault();
    onSubmit(searchQuery);
    e.target.reset();
    setSearchQuery('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmiting}>
        <button type="submit" className={css.SearchForm_button}>
          <span className={css.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
