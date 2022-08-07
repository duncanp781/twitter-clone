import React from "react";
import { TextInputStyled } from "./Styled/TextInput.styled";

type Props = {
  id: string;
  text: string;
  placeholder?: string;
  defaultVal?: string;
  maxlength? : number;
};

function TextInput({ id, text, placeholder, defaultVal, maxlength = 30 }: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "16px",
        alignItems: "center",
      }}
    >
      <label htmlFor={id}>{text}</label>
      <TextInputStyled
        type="text"
        id={id}
        placeholder={placeholder}
        defaultValue={defaultVal}
        name={id}
        maxLength = {maxlength}
      />
    </div>
  );
}

export default TextInput;
