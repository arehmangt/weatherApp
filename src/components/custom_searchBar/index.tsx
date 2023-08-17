import React, { useState } from "react";
import {RxCross2} from "react-icons/rx";

import styles from "./index.module.css";

const SearchBar = ({
  label = "Label",
  placeholder = "nothing passed",
  type = "text",
  onHandleChange,
  value,
  name,
  className,
  disabled = false,
  isLoading = false,
  clearValue,
}: {
  label?: string;
  placeholder?: string;
  type?: string;
  onHandleChange?: (e: any) => void;
  value?: any;
  name?: string;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
  clearValue?: ()=>void;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handlerFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  return (
    <div
      className={`${
        styles.textFieldDiv
      } d-flex flex-column justify-content-center ${
        isFocused ? styles.inputFocused : ""
      }`}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div className="w-100">
          <div
            className={`${styles.label} ${
              isFocused ? styles.labelFocused : ""
            }`}
          >
            {label}
          </div>
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            className={`${styles.input} ${className}`}
            disabled={disabled}
            onChange={onHandleChange}
            value={value}
            onFocus={handlerFocus}
            onBlur={handleBlur}
          />
        </div>
        {isLoading && <div
          className={"text-primary text-opacity-75 spinner-border "}
          role="status"        />}
        {
          value.length >= 1 && !isLoading && <RxCross2 onClick={clearValue} />
        }
      </div>
    </div>
  );
};
export default SearchBar;
