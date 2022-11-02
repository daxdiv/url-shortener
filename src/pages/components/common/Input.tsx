import { useRef } from "react";
import Button from "./Button";

const Input = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form>
      <input
        type="text"
        placeholder="Your link goes here"
        className="mr-2 h-12 w-96 rounded-lg bg-gray-700 px-4 text-lg font-normal focus:outline-none focus:ring-2 focus:ring-blue-600"
        value={inputRef.current?.value}
        onChange={(e) => {
          if (inputRef.current) {
            inputRef.current.value = e.target.value;
          }
        }}
      />

      <Button text="Shorten" type="submit" />
    </form>
  );
};

export default Input;
