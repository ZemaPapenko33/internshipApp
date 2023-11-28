import { EnumImportance } from '../../shared/consts/enum';
import { SelectTodoWrapper } from './SelectTodoStyled';

interface ISelectTodo {
  selectValue: string;
  selectChangeHandler?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectTodo: React.FC<ISelectTodo> = ({ selectValue, selectChangeHandler }) => {
  return (
    <SelectTodoWrapper
      onChange={selectChangeHandler}
      value={selectValue}
      defaultValue={EnumImportance.LOW}
    >
      <option value={EnumImportance.LOW}>Low</option>
      <option value={EnumImportance.MEDIUM}>Medium</option>
      <option value={EnumImportance.HIGH}>High</option>
    </SelectTodoWrapper>
  );
};

export default SelectTodo;
