import { useState } from 'react';
import toast from 'react-hot-toast';
import { MdOutlineSearch } from 'react-icons/md';
import {
  SearchbarStyles,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery === '') {
      toast.error('Это не похоже на запрос, попробуйте ещё раз', {
        duration: 1000,
      });

      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };
  const handleInputChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase().trim());
  };

  return (
    <SearchbarStyles>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit" aria-label="Search Button">
          <MdOutlineSearch size={26} />
        </SearchFormButton>

        <SearchFormInput
          onChange={handleInputChange}
          value={searchQuery}
          type="text"
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarStyles>
  );
}
