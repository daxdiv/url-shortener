import { BiCopy } from "react-icons/bi";
import { Fragment } from "react";
import type { IShortenedUrls } from "./UrlShortener.jsx";
import { IoOpenOutline } from "react-icons/io5";
import { copyToClipboard } from "../utils/helpers";
import { env } from "../env/client.mjs";

interface IUrlsProps {
  data: IShortenedUrls[];
}

// TODO: scroll to bottom when new url is added

const UrlsList = ({ data }: IUrlsProps) => {
  if (data.length === 0) return null;

  return (
    <div className="relative mt-6 flex max-h-80 w-full max-w-xl flex-col overflow-hidden rounded-lg border-gray-200 text-center font-normal">
      <div className="flex">
        <div className="w-1/2 border-b-white border-r-white bg-gray-700 py-2 text-white">
          Shorten URL
        </div>
        <div className="w-1/2 border-b-white bg-gray-700 py-2 text-white">
          Alias of
        </div>
      </div>

      <div className="overflow-scroll">
        {data.map(({ shortenUrl, aliasOf }, i) => (
          <Fragment key={`${Math.random()}-${shortenUrl}`}>
            <div className="flex w-full justify-between">
              <div
                className={`flex w-1/2 items-center justify-between border-r-white p-2 font-thin ${
                  i % 2 !== 0 ? "bg-gray-700" : ""
                }`}
              >
                <p>
                  {env.NEXT_PUBLIC_BASE_URL.replace("http://", "")}/{shortenUrl}
                </p>
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
                className={`w-1/2 p-2 font-thin ${
                  i % 2 !== 0 ? "bg-gray-700" : ""
                } overflow-hidden overflow-ellipsis whitespace-nowrap`}
              >
                {aliasOf}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
      <p className="ml-2 mt-4 text-left text-sm font-bold">
        {data.length} shortened URLs
      </p>
    </div>
  );
};

export default UrlsList;
