import { FaCheckCircle } from "react-icons/fa";
import { MdDangerous } from "react-icons/md";
import { AiFillInfoCircle } from "react-icons/ai";
import useDialog from "../../hooks/useDialog";

type TDialogVariant = "success" | "error" | "info";

const classNamesIconsMap: Record<
  TDialogVariant,
  { classNames: string; icon: JSX.Element }
> = {
  success: {
    classNames: "border-green-600 bg-green-400",
    icon: <FaCheckCircle />,
  },
  error: {
    classNames: "border-red-600 bg-red-400",
    icon: <MdDangerous />,
  },
  info: {
    classNames: "border-blue-600 bg-blue-400",
    icon: <AiFillInfoCircle />,
  },
};

const Dialog = ({
  text,
  variant,
}: {
  text: string;
  variant: TDialogVariant;
}) => {
  const ref = useDialog();
  const data = classNamesIconsMap[variant];

  return (
    <div
      ref={ref}
      className={`fixed bottom-2 flex animate-dialog-in items-center justify-center rounded-lg border py-2 px-2 ${data.classNames}`}
    >
      {data.icon}
      <p className="ml-2">{text}</p>
    </div>
  );
};

export default Dialog;
