interface IButtonProps {
  text: string;
  type: "submit" | "reset" | "button" | undefined;
  className?: string;
  onClick?: () => void;
}

const Button = ({ text, type, className = "", onClick }: IButtonProps) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
