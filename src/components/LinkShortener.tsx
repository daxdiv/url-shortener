import Button from "./common/Button";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import { env } from "../env/client.mjs";
import { BiCopy } from "react-icons/bi";
import { IoOpenOutline } from "react-icons/io5";
import { copyToClipboard } from "../utils/copyToClipboard";
interface IShortenedUrls {
  shortenUrl: string;
  aliasOf: string;
}

const Input = () => {
  const [url, setUrl] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState<IShortenedUrls[]>([]);
  const shortenUrlMutation = trpc.url.shorten.useMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (url === "") return;

    shortenUrlMutation.mutate(
      { url },
      {
        onSuccess: ({ shortenUrl, aliasOf }) => {
          console.log(`created ${shortenUrl} - alias of ${aliasOf}`);

          setShortenedUrls((prev) => [...prev, { shortenUrl, aliasOf }]);
          setUrl("");
        },
      }
    );
  };

  return (
    <form
      className="flex flex-col items-center justify-center"
      onSubmit={handleSubmit}
    >
      <div>
        <input
          type="text"
          placeholder="Your URL goes here"
          className="mr-2 h-12 w-96 rounded-lg bg-gray-700 px-4 text-lg font-normal focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <Button text="Shorten" type="submit" />
      </div>

      <ul className="mt-4 items-center justify-center font-normal">
        {shortenedUrls.map(({ shortenUrl, aliasOf }) => (
          <li
            key={`${Math.random()}-${shortenUrl}`}
            className="flex items-center justify-center"
          >
            {env.NEXT_PUBLIC_BASE_URL.replace("http://", "")}/{shortenUrl}
            <BiCopy
              className="ml-4 mr-2 cursor-pointer hover:text-blue-600"
              onClick={() => {
                copyToClipboard(`${env.NEXT_PUBLIC_BASE_URL}/${shortenUrl}`);
              }}
            />
            <IoOpenOutline
              className="mr-2 cursor-pointer hover:text-blue-600"
              onClick={() => {
                window.open(`${env.NEXT_PUBLIC_BASE_URL}/${shortenUrl}`);
              }}
            />
            <span> ({aliasOf})</span>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default Input;
