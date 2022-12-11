import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Button from "./Button";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 flex w-full items-center justify-between bg-gray-700 py-2 px-4">
      <div className="flex items-center justify-center">
        <Link
          href="/"
          className="flex items-center justify-start text-xl font-bold"
        >
          NextJS URL Shortener{" "}
        </Link>
        {session && (
          <span className="ml-3 text-xs">
            (Logged as{" "}
            {<span className="text-blue-600">{session?.user?.name}</span>})
          </span>
        )}
      </div>
      <nav className="flex items-center justify-center space-x-4">
        <Button
          text={session ? "Sign Out" : "Sign In"}
          type="button"
          className="text-md w-24 rounded-lg bg-blue-600 px-3 py-2 font-bold text-white transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600"
          onClick={() => {
            session ? signOut() : signIn();
          }}
        />
      </nav>
    </header>
  );
};

export default Header;
