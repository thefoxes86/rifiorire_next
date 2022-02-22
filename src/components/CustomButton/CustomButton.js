import Link from "next/link";
import { useEffect, useState } from "react";

const CustomButton = ({ path, text, withLine, color }) => {
  const [classColor, setClassColor] = useState({
    line: "border-t border-black w-full block ml-3",
    button:
      "bg-black rounded-tl-3xl rounded-br-3xl px-10 py-3 text-white lowercase ",
  });
  useEffect(() => {
    setClassColor({
      lineL: `border-t border-${color} w-full block mr-3`,
      lineR: `border-t border-${color} w-full block ml-3`,
      button: `bg-${color} rounded-tl-3xl rounded-br-3xl px-10 py-3 text-white lowercase`,
    });
  }, [color]);
  return (
    <div className="flex w-auto items-center justify-center my-10">
      {withLine && <span className={classColor.lineL}></span>}
      <Link href={path}>
        <a>
          <button className={classColor.button}>{text}</button>
        </a>
      </Link>
      {withLine && <span className={classColor.lineR}></span>}
    </div>
  );
};

export default CustomButton;
