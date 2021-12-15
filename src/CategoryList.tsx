import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { Category, categoryState } from "./atoms";
function CategoryList({ text, id}: Category) {
  const setToDos = useSetRecoilState(categoryState);

  const deleteCategory = () => {
    setToDos((oldToDos) => {
      // 수정하고 싶은 인덱스의 넘버를 가져온다.
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    })
  }
  return (
    <li>
      <span>{text}</span>
      <button onClick={deleteCategory}>❌</button>
    </li>
  );
}
export default CategoryList;
