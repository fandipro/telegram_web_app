const Button = ({ className, backgroundColor, border, children, ...props }) => {
  return (
    <button className={className} style={{ border: border, width: props.width, height: props.height, backgroundColor: backgroundColor, borderRadius: props.borderRadius, color: props.color }} {...props}>
      {children ? children : props.title}
    </button>
  );
};

// Button.defaultProps = {
//   border: "1px solid grey",
// };

export default Button;
