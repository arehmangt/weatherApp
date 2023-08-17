import React from "react";

import styles from "./index.module.css";

const Button = ({
  onClickHandler = () => alert("On Click Not Active"),
  children = "Nothing Entered",
  className = "",
  type = "button",
  disabled = false,
  ...rest
}: {
  type?: any;
  className?: string;
  children?: any;
  onClickHandler?: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      type={type}
      className={`${disabled ? styles.disabledButton :styles.button} ${className}`}
      disabled={disabled}
      onClick={onClickHandler}
      {...rest}
    >
      {children}
    </button>
  );
};
export default Button;
