import React from "react";
import { Link } from "react-router-dom";

const MiniSidebar = () => {
  return (
    <div className="basis-[5rem]">
      <div className="flex items-center justify-center h-[5rem]">
        <img src="src/assets/logo.png" height={28} width={28} alt="logo"></img>
      </div>
      <div className="mt-8 flex flex-1 flex-col items-center justify-center">
        <ul className="flex gap-10 flex-col">
          <li className="">
            <Link>
              <img
                src="src/utils/grid-svgrepo-com.svg"
                width={20}
                height={20}
              ></img>
            </Link>
          </li>
          <li>
            <Link>
              {" "}
              <img
                src="src/utils/file-check-alt-1-svgrepo-com.svg"
                width={20}
                height={20}
              ></img>
            </Link>
          </li>
          <li>
            <Link>
              {" "}
              <img
                src="src/utils/stopwatch-svgrepo-com.svg"
                width={20}
                height={20}
              ></img>
            </Link>
          </li>
          <li>
            <Link>
              {" "}
              <img
                src="src/utils/data-element-infographic-deadline-time-graph-svgrepo-com.svg"
                width={20}
                height={20}
              ></img>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MiniSidebar;
