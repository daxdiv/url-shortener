import { SidePanelContext } from "../utils/contexts";
import { useContext } from "react";

const useSidePanel = () => {
  return useContext(SidePanelContext);
};

export default useSidePanel;
