import Button from "./common/Button";
import Dialog from "./common/Dialog";
import Header from "./common/Header";
import Urls from "./Urls";
import { isValidUrl } from "../utils/helpers";
import { trpc } from "../utils/trpc";
import { useReducer } from "react";

export interface IShortenedUrls {
  shortenUrl: string;
  aliasOf: string;
}
interface IState {
  url: string;
  error: string;
  success: boolean;
  shortenedUrls: IShortenedUrls[];
}
type TAction =
  | { type: "typing-url"; payload: string }
  | { type: "set-error"; payload: string }
  | { type: "set-success"; payload: boolean }
  | { type: "add-shortened-url"; payload: IShortenedUrls };

const reducer = (state: IState, action: TAction) => {
  switch (action.type) {
    case "typing-url":
      return {
        ...state,
        url: action.payload,
      };
    case "set-error":
      return {
        ...state,
        success: false,
        url: "",
        error: action.payload,
      };
    case "set-success":
      return {
        ...state,
        success: action.payload,
      };
    case "add-shortened-url":
      return {
        ...state,
        success: true,
        url: "",
        error: "",
        shortenedUrls: [...state.shortenedUrls, action.payload],
      };
    default:
      return state;
  }
};

const UrlShortener = () => {
  const [state, dispatch] = useReducer(reducer, {
    url: "",
    error: "",
    success: false,
    shortenedUrls: [],
  });
  const shortenUrlMutation = trpc.url.shorten.useMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (state.url === "" || !isValidUrl(state.url)) {
      dispatch({
        type: "set-error",
        payload: "Please insert a valid or absolute URL",
      });

      return;
    }

    shortenUrlMutation.mutate(
      { url: state.url },
      {
        onSuccess: async ({ shortenUrl, aliasOf }) => {
          dispatch({
            type: "add-shortened-url",
            payload: { shortenUrl, aliasOf },
          });
          setTimeout(() => {
            dispatch({
              type: "set-success",
              payload: false,
            });
          }, 2200);
        },
        onError: () => {
          dispatch({
            type: "set-error",
            payload: "An error occurred, please try again",
          });
          setTimeout(() => {
            dispatch({
              type: "set-error",
              payload: "",
            });
          }, 2200);
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
            {/* <p
              className={`absolute top-[-1.5rem] left-0 text-sm font-normal text-red-600 ${
                error ? "block animate-shaking" : "hidden"
              }`}
            >
              {error}
            </p> */}
            <input
              type="text"
              placeholder="Your URL goes here"
              className={`mr-4 h-12 w-96 rounded-lg bg-gray-700 px-4 text-lg font-normal focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                state.error &&
                "animate-shaking ring-2 ring-red-600 placeholder:text-red-600 focus:ring-2 focus:ring-red-600"
              }`}
              value={state.url}
              onChange={(e) => {
                dispatch({
                  type: "typing-url",
                  payload: e.target.value,
                });
              }}
            />
            <Button
              text={shortenUrlMutation.isLoading ? "Loading..." : "Shorten"}
              type="submit"
              className={`h-12 w-24 rounded-lg ${
                shortenUrlMutation.isLoading ? "bg-blue-500" : "bg-blue-600"
              } text-lg font-bold text-white transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600`}
            />
          </div>
        </form>

        <Urls data={state.shortenedUrls} />

        {state.error !== "" && <Dialog text={state.error} variant="error" />}
        {state.success && (
          <Dialog text="Successfully shortened URL" variant="success" />
        )}
      </div>
    </>
  );
};

export default UrlShortener;
