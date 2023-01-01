import { createContext } from "react";

export const SidePanelContext = createContext({
  open: false,
  // eslint-disable-next-line
  setOpen: (o: boolean) => {},
});
export const SidePanelProvider = SidePanelContext.Provider;
