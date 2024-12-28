import { ReactNode } from "react";

interface ButtonProps {
  type?: "primary" | "cancel";
  className?: string;
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const Button = ({
  type = "primary",
  children,
  className = "",
  onClick,
  disabled = false,
  ...props
}: ButtonProps) => {
  const baseStyle = "py-1 rounded-full font-medium transition-all px-2";


  const types = {
    primary: `text-white font-medium  ${disabled ? "bg-neutral-400 text-gray-200" : "bg-purple-400 hover:bg-purple-500"}`,
    cancel:
      `font-medium ${disabled ? "bg-neutral-400 text-gray-200" : "border-gray-400 text-gray-500 hover:bg-gray-400 hover:text-white hover:text-white"} border-2 rounded-full`,
  };

  const typeStyles = types[type];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
  };

  return (
    <button
      className={`${baseStyle} ${typeStyles} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
