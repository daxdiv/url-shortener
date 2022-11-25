import Button from "./common/Button";
import { Fragment, useState } from "react";
import { trpc } from "../utils/trpc";
import { env } from "../env/client.mjs";
import { BiCopy } from "react-icons/bi";
import { IoOpenOutline } from "react-icons/io5";
import { copyToClipboard, isValidUrl } from "../utils/helpers";

interface IShortenedUrls {
  shortenUrl: string;
  aliasOf: string;
}

const LinkShortener = () => {
  const [url, setUrl] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState<IShortenedUrls[]>([]);
  const [error, setError] = useState(false);
  const shortenUrlMutation = trpc.url.shorten.useMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (url === "") return;
    if (!isValidUrl(url)) {
      setUrl("");
      setError(true);

      return;
    }

    shortenUrlMutation.mutate(
      { url },
      {
        onSuccess: ({ shortenUrl, aliasOf }) => {
          console.log(`created ${shortenUrl} - alias of ${aliasOf}`);

          setShortenedUrls((prev) => [...prev, { shortenUrl, aliasOf }]);
          setUrl("");
          setError(false);
        },
      }
    );
  };

  return (
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
            Please insert a valid or absolute URL
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
          <Button text="Shorten" type="submit" />
        </div>
      </form>

      {shortenedUrls.length > 0 && (
        <div
          className="mt-6 grid w-full grid-cols-2 overflow-hidden rounded-lg border-gray-200 text-center font-normal"
          style={{
            gridTemplateRows: `repeat(${shortenedUrls.length}, minmax(0, 1fr))`,
          }}
        >
          <div className="border-b-white border-r-white bg-gray-700 py-2 text-white">
            Shorten URL
          </div>
          <div className="border-b-white bg-gray-700 py-2 text-white">
            Alias of
          </div>

          {shortenedUrls.map(({ shortenUrl, aliasOf }, i) => (
            <Fragment key={`${Math.random()}-${shortenUrl}`}>
              <div
                className={`flex items-center justify-between  border-r-white p-2 font-thin ${
                  i % 2 !== 0 ? "bg-gray-700" : ""
                }`}
              >
                {env.NEXT_PUBLIC_BASE_URL.replace("http://", "")}/{shortenUrl}
                <div className="flex items-center justify-center">
                  <BiCopy
                    className="ml-4 mr-2 cursor-pointer hover:text-blue-600"
                    onClick={() => {
                      copyToClipboard(
                        `${env.NEXT_PUBLIC_BASE_URL}/${shortenUrl}`
                      );
                    }}
                  />
                  <IoOpenOutline
                    className="mr-2 cursor-pointer hover:text-blue-600"
                    onClick={() => {
                      window.open(`${env.NEXT_PUBLIC_BASE_URL}/${shortenUrl}`);
                    }}
                  />
                </div>
              </div>
              <div
                className={`p-2 font-thin ${i % 2 !== 0 ? "bg-gray-700" : ""}`}
              >
                {aliasOf}
              </div>
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default LinkShortener;
