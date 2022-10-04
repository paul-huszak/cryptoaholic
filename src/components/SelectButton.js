import React from "react";

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <span
      onClick={onClick}
      className={selected ? "select-button-active" : "select-button"}
    >
      {children}
    </span>
  );
};

export default SelectButton;
