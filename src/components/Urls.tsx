import { Fragment } from "react";
import { env } from "../env/client.mjs";
import { IoOpenOutline } from "react-icons/io5";
import { BiCopy } from "react-icons/bi";
import { copyToClipboard } from "../utils/helpers";
import type { IShortenedUrls } from "./LinkShortener.jsx";

interface IUrlsProps {
  data: IShortenedUrls[];
}

const UrlsList = ({ data }: IUrlsProps) => {
  if (data.length === 0) return null;

  return (
    <div
      className="mt-6 grid w-full max-w-xl grid-cols-2 overflow-hidden rounded-lg border-gray-200 text-center font-normal"
      style={{
        gridTemplateRows: `repeat(${data.length}, minmax(0, 1fr))`,
      }}
    >
      <div className="border-b-white border-r-white bg-gray-700 py-2 text-white">
        Shorten URL
      </div>
      <div className="border-b-white bg-gray-700 py-2 text-white">Alias of</div>

      {data.map(({ shortenUrl, aliasOf }, i) => (
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
                  copyToClipboard(`${env.NEXT_PUBLIC_BASE_URL}/${shortenUrl}`);
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
            className={`p-2 font-thin ${
              i % 2 !== 0 ? "bg-gray-700" : ""
            } overflow-hidden overflow-ellipsis whitespace-nowrap`}
          >
            {aliasOf}
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default UrlsList;
