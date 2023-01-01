import { useSession } from "next-auth/react";

const SidePanel = ({ open }: { open: boolean }) => {
  const { data: session } = useSession();

  return (
    <div
      className={`fixed top-[3.1rem] right-0 min-h-screen w-[21rem] ${
        open ? "animate-grow" : "animate-shrink"
      } bg-gray-700`}
    >
      <p className="mx-2 mt-4 text-xl font-bold text-white">Your recent URLs</p>
      <p className="mx-2 mt-6 text-sm">
        {session ? "TODO" : "Please sign in first"}
      </p>
    </div>
  );
};

export default SidePanel;
