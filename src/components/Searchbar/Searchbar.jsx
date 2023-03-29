import { useState } from 'react';
import PropTypes from 'prop-types';
import { VscSearch } from 'react-icons/vsc';
import {
  Header,
  SearchForm,
  SearchButton,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [searchWord, setSearchWord] = useState('');

  const handleChange = e => setSearchWord(e.target.value.toLowerCase());

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(searchWord);
    reset();
  };

  const reset = () => setSearchWord('');

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <VscSearch size={20} />
        </SearchButton>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchWord}
          onChange={handleChange}
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
