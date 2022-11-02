import Link from "next/link";
import Button from "./Button";
import { useState } from "react";
import { trpc } from "../../../utils/trpc";
import { env } from "../../../env/client.mjs";

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
          <li key={`${Math.random()}-${shortenUrl}`}>
            <Link
              href={aliasOf}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600"
            >
              {env.NEXT_PUBLIC_BASE_URL}/{shortenUrl}
            </Link>
            <span> - alias of {aliasOf}</span>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default Input;
