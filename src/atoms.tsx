import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist()

export interface Category {
  text: string;
  id: number;
}
// toDos 배열
export const categoryState = atom<Category[]>({
  key: 'category',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const selectedCategoryIdState = atom<number | undefined>({
  key: 'selectedCategoryId',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export interface IToDo {
  text: string;
  categoryId: number;
  id: number;
}

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: 'toDoSelector',

  get: ({ get }) => {
    const todos = get(toDoState);
    const categoryId = get(selectedCategoryIdState);
    return todos.filter((todo) => todo.categoryId === categoryId);
  },
});
