import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedCategoryIdState, toDoState } from '../atoms';
interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const selectedCategoryId = useRecoilValue(selectedCategoryIdState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    if (!selectedCategoryId) {
      console.log('invalid categoryid')
      return;
    }

    setToDos((oldToDos) => [
      { text: toDo, categoryId: selectedCategoryId, id: Date.now() },
      ...oldToDos,
    ]);
    setValue('toDo', '');
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register('toDo', {
          required: 'Please write a To Do',
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
