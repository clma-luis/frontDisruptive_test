import React from "react";

interface ThumbsDownIconProps {
  width?: number;
  height?: number;
}

const ThumbsDownIcon = (props: ThumbsDownIconProps) => {
  const { width = 24, height = 24 } = props;
  return (
    <svg
      className="mb-1 text-icon dark:text-icon group-hover:text-primary "
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M8.97 14.316H5.004c-.322 0-.64-.08-.925-.232a2.022 2.022 0 0 1-.717-.645 2.108 2.108 0 0 1-.242-1.883l2.36-7.201C5.769 3.54 5.96 3 7.365 3c2.072 0 4.276.678 6.156 1.256.473.145.925.284 1.35.404h.114v9.862a25.485 25.485 0 0 0-4.238 5.514c-.197.376-.516.67-.901.83a1.74 1.74 0 0 1-1.21.048 1.79 1.79 0 0 1-.96-.757 1.867 1.867 0 0 1-.269-1.211l1.562-4.63ZM19.822 14H17V6a2 2 0 1 1 4 0v6.823c0 .65-.527 1.177-1.177 1.177Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default ThumbsDownIcon;
