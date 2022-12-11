import Link from "next/link";
import Button from "./Button";

const Header = () => {
  return (
    <header className="fixed top-0 flex w-full items-center justify-between bg-gray-700 py-2 px-4">
      <h1 className="text-center text-2xl font-bold">
        <Link href="/">NextJS URL Shortener</Link>
      </h1>
      <nav className="flex items-center justify-center space-x-4">
        <Button
          text="Sign in"
          type="button"
          className="text-md w-24 rounded-lg bg-blue-600 px-3 py-2 font-bold text-white transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </nav>
    </header>
  );
};

export default Header;
