import React from "react";

const Input = ({ value, width, backgroundColor, border, className, type, children, ...props }) => {
  return (
    <div>
      <input value={value} style={{ width: width, border: border, backgroundColor: backgroundColor }} type={type} className={className} {...props}>
        {children}
      </input>
    </div>
  );
};

export default Input;
