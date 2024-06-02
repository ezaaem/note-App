import React from "react";

const sizes = {
  xs: "text-[13px] font-normal leading-5",
  lg: "text-[26px] font-normal leading-8",
  s: "text-[15px] font-normal",
  md: "text-base font-normal leading-[27px]",
};

const Text = ({ children, className = "", as, size = "xs", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component className={`text-blue_gray-400 font-inter ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
