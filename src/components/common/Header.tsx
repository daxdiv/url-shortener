import { signIn, signOut, useSession } from "next-auth/react";

import Button from "./Button";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import Link from "next/link";
import useSidePanel from "../../hooks/useSidePanel";

// TODO: prevent user-select here and in UrlShortener.tsx

const Header = () => {
  const { open, setOpen } = useSidePanel();
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 flex w-full items-center justify-between border-b border-b-white bg-gray-700 py-2 px-4">
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
      <div className="flex items-center justify-center space-x-2">
        <Button
          text={session ? "Sign Out" : "Sign In"}
          type="button"
          className="text-md w-24 rounded-lg bg-blue-600 px-3 py-1 font-bold text-white transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600"
          onClick={() => {
            session ? signOut() : signIn();
          }}
        />
        {open ? (
          <IoCloseSharp
            size={32}
            color="white"
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          />
        ) : (
          <IoMdMenu
            size={32}
            className="cursor-pointer"
            onClick={() => setOpen(true)}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
