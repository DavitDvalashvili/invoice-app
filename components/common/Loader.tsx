import React from "react";
import { Oval } from "react-loader-spinner";

// Loader component to display centered loading indicator
const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-72px)] md:h-[calc(100vh-80px)] lg:h-[100vh]">
      <Oval
        height={50}
        width={50}
        color="#7C5DFA"
        wrapperStyle={{}}
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#7C5DFA"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default Loader;

// LoaderFilter component to display loading indicator with specific margin-top
export const LoaderFilter = () => {
  return (
    <div className="flex justify-center items-start  mt-[256px]  ">
      <Oval
        height={50}
        width={50}
        color="#7C5DFA"
        wrapperStyle={{}}
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#7C5DFA"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};
