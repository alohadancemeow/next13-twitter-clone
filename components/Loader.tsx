"use client";

import { ClipLoader } from "react-spinners";

type Props = {};

const Loader = (props: Props) => {
  return (
    <div className="flex items-center justify-center h-full">
      <ClipLoader color="lightblue" size={80} />
    </div>
  );
};

export default Loader;
