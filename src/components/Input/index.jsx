import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded-[7px]",
};
const variants = {
  fill: {
    gray_100: "bg-gray-100",
    white_A700: "bg-white-A700",
  },
};
const sizes = {
  sm: "h-[45px] px-5",
  xs: "h-[34px] pl-2 pr-[35px] text-[13px]",
};

const Input = React.forwardRef(
  (
    {
      className = "",
      name = "",
      placeholder = "",
      type = "text",
      children,
      label = "",
      prefix,
      suffix,
     
      shape = "",
      variant = "fill",
      size = "sm",
      color = "gray_100",
      ...restProps
    },
    ref,
  ) => {
   

    return (
      <>
        <div
          className={`${className} flex items-center justify-center rounded-[7px] ${shapes[shape] || ""} ${variants[variant]?.[color] || variants[variant] || ""} ${sizes[size] || ""}`}
        >
          {!!label && label}
          {!!prefix && prefix}
          <input ref={ref} type={type} name={name}   placeholder={placeholder} {...restProps} />
          {!!suffix && suffix}
        </div>
      </>
    );
  },
);

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["sm", "xs"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf(["gray_100", "white_A700"]),
};

export { Input };
