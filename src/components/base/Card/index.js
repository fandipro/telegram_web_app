import React from "react";
// import style from "./card.module.css";

const Card = ({ className, children, ...props }) => {
  return <div className={className}>{children}</div>;
};

export default Card;
