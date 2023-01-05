import { FaRedoAlt } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { env } from "../../env/client.mjs";
import { formatDate } from "../../utils/helpers";
import { trpc } from "../../utils/trpc";
import { useState } from "react";

const SidePanel = ({ open }: { open: boolean }) => {
  const [clicked, setClicked] = useState(false);
  const {
    data: urls,
    error,
    isLoading,
    refetch,
  } = trpc.url.getAllByUserId.useQuery(undefined, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const handleDelete = () => {
    // TODO
  };

  return (
    <div
      className={`fixed top-[3.1rem] right-0 min-h-screen w-[21rem] ${
        open ? "animate-grow" : "animate-shrink"
      } bg-gray-700`}
    >
      <div className="mx-2 mt-4 flex items-center justify-between">
        <p className="text-xl font-bold text-white">
          Your recent URLs{" "}
          {urls && urls.length > 0 && (
            <span className="text-sm text-gray-400">
              ({urls?.length} total)
            </span>
          )}
        </p>
        <div className="flex justify-center gap-2">
          <FaRedoAlt
            className={`cursor-pointer text-white ${clicked && "animate-spin"}`}
            onClick={() => {
              refetch();
              setClicked((c) => !c);
              setTimeout(() => {
                setClicked((c) => !c);
              }, 1000);
            }}
          />
        </div>
      </div>

      {error && (
        <p className="mx-2 mt-6 text-sm text-white">
          You must be logged in to see your recent activities
        </p>
      )}
      {urls && urls.length === 0 && (
        <p className="mx-2 mt-6 text-sm text-white">
          You have no recent activities
        </p>
      )}

      {!isLoading && (
        <div className="max-h-[50rem] overflow-scroll">
          {urls?.map((u, i) => (
            <div className="mx-2 flex items-center justify-between" key={u.id}>
              <div className="flex items-center">
                <label htmlFor={`url-${i}`} className="mt-2">
                  <FiTrash2
                    className="cursor-pointer text-red-600 transition-transform hover:scale-[1.15]"
                    size={18}
                    onClick={handleDelete}
                  />
                </label>
                <div className="mx-2 mt-4 flex w-12 flex-col" id={`url-${i}`}>
                  <p className="text-sm text-white">
                    {env.NEXT_PUBLIC_BASE_URL.replace("http://", "")}/
                    {u.shortenUrl}
                  </p>
                  <a
                    href={u.aliasOf}
                    target="_blank"
                    rel="noreferrer"
                    className="w-48 overflow-hidden overflow-ellipsis whitespace-nowrap text-xs text-gray-400 hover:text-blue-600 hover:underline"
                  >
                    {u.aliasOf.replace(/https?:\/\/(www\.)?/g, "")}
                  </a>
                </div>
              </div>
              <p className="text-xs text-gray-400">{formatDate(u.createdAt)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidePanel;
