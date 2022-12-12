import Button from "./common/Button";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import { isValidUrl } from "../utils/helpers";
import Header from "./common/Header";
import Urls from "./Urls";

export interface IShortenedUrls {
  shortenUrl: string;
  aliasOf: string;
}

const LinkShortener = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState<IShortenedUrls[]>([]);
  const shortenUrlMutation = trpc.url.shorten.useMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (url === "" || !isValidUrl(url)) {
      setUrl("");
      setError("Please insert a valid or absolute URL");

      return;
    }

    shortenUrlMutation.mutate(
      { url },
      {
        onSuccess: ({ shortenUrl, aliasOf }) => {
          console.log(`created ${shortenUrl} - alias of ${aliasOf}`);

          setShortenedUrls((prev) => [...prev, { shortenUrl, aliasOf }]);
          setUrl("");
          setError("");
        },
        onError: () => {
          setUrl("");
          setError("An error occurred, please try again");
        },
      }
    );
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center">
        <form
          className="relative flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <div className="relative">
            <p
              className={`absolute top-[-1.5rem] left-0 text-sm font-normal text-red-600 ${
                error ? "block animate-shaking" : "hidden"
              }`}
            >
              {error}
            </p>
            <input
              type="text"
              placeholder="Your URL goes here"
              className={`mr-4 h-12 w-96 rounded-lg bg-gray-700 px-4 text-lg font-normal focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                error &&
                "animate-shaking ring-2 ring-red-600 placeholder:text-red-600 focus:ring-2 focus:ring-red-600"
              }`}
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
            <Button
              text="Shorten"
              type="submit"
              className="h-12 w-24 rounded-lg bg-blue-600 text-lg font-bold text-white transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </form>

        <Urls data={shortenedUrls} />
      </div>
    </>
  );
};

export default LinkShortener;
