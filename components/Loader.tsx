import React from "react";
import { Oval } from "react-loader-spinner";

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
