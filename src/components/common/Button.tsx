interface IButtonProps {
  text: string;
  type: "submit" | "reset" | "button" | undefined;
}

const Button = ({ text, type }: IButtonProps) => {
  return (
    <button
      type={type}
      className="h-12 w-24 rounded-lg bg-blue-600 text-lg font-normal text-white transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600"
    >
      {text}
    </button>
  );
};

export default Button;
