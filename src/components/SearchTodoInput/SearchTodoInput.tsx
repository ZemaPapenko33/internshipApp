import { SearchTodoInputWrapper } from './SearchTodoInputStyled';

interface ISearchInput {
  searchInputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchTodoInput: React.FC<ISearchInput> = ({ searchInputChangeHandler }) => {
  return (
    <SearchTodoInputWrapper
      onChange={searchInputChangeHandler}
      type="text"
      placeholder="Search todo"
    />
  );
};

export default SearchTodoInput;
