import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  Category,
  categoryState,
  IToDo,
  selectedCategoryIdState,
  toDoState,
} from '../atoms';


function ToDo({ text, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoryState);
  // const setCategories = useSetRecoilState(categoryState);
  const selectedCategoryId = useRecoilValue(selectedCategoryIdState);
  const deleteToDo = () =>{
    setToDos((oldToDos) => {
      // 수정하고 싶은 인덱스의 넘버를 가져온다.
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    })
    // setCategories(categories.filter((data) => data.id !==id))


  }
  const updateCategory =
    (category: Category) => (event: React.MouseEvent<HTMLButtonElement>) => {
      setToDos((oldToDos) => {
        // 수정하고 싶은 인덱스의 넘버를 가져온다.
        const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
        // const oldToDo = oldToDos[targetIndex];
        const newToDo = { text, id, categoryId: category.id };
        return [
          ...oldToDos.slice(0, targetIndex),
          newToDo,
          ...oldToDos.slice(targetIndex + 1),
        ];
      });
    };

  return (
    <li>
      <span style={{ marginRight: '10px' }}>{text}</span>
      {categories.map(
        (category) =>
          category.id !== selectedCategoryId && (
            <button onClick={updateCategory(category)}>{category.text}</button>
          )
          )}
          <button onClick={deleteToDo}>❌</button>
      {/* {category !== Categories.DOING && (
         <button name={Categories.DOING} onClick={onClick}>
           {Categories.DOING}
         </button>
       )}
       {category !== Categories.TO_DO && (
         <button name={Categories.TO_DO} onClick={onClick}>
           {Categories.TO_DO}
         </button>
       )}
       {category !== Categories.DONE && (
         <button name={Categories.DONE} onClick={onClick}>
           {Categories.DONE}
         </button>
       )} */}
    </li>
  );
}

export default ToDo;
function category(category: any): React.MouseEventHandler<HTMLButtonElement> | undefined {
  throw new Error('Function not implemented.');
}

