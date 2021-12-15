import { clear } from "node:console";
import React from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState } from "./atoms";

// const category = document.querySelector("#category");


const CateOptDiv = styled.div`
  height: auto;

  word-break: break-all;
`;
const Option = styled.span`
  font-size: 30px;
`;

interface IForm {
  categoryText: string;
}


function Category_Options() {

  const setCategories = useSetRecoilState(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleCategories = ({ categoryText }: IForm) => {
    setCategories((prevCategories) => [
      { text: categoryText, id: Date.now() },
      ...prevCategories,
    ]);
    setValue("categoryText", "");
    
  };

  return (
    <CateOptDiv>
      <Option>Make Category</Option>
      <hr />
      <form onSubmit={handleSubmit(handleCategories)}>
        <input
          {...register("categoryText", { required: "please write" })}
          type="text"
          placeholder="write what you want..."
          id="input"
        />
        <button>Make!</button>
        <ul id="category"></ul>
      </form>
    </CateOptDiv>
  );
}

export default Category_Options;
