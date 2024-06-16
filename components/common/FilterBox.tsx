import React from "react";
import CustomCheckbox from "./CustomCheckbox";
import { IFilterBox } from "@/types/types";

const FilterBox = ({
  selected,
  setSelected,
  setHideFilterBox,
  hideFilterBox,
}: IFilterBox) => {
  return (
    <div
      onChange={() => setHideFilterBox(!hideFilterBox)}
      className="rounded-lg p-6 w-48 h-40 flex  flex-col gap-4 drop-shadow-2xl shadow-ChillInTheAir dark:shadow-Silver
     bg-white dark:bg-RoyalCurtsy absolute top-[42px]"
    >
      <CustomCheckbox
        selected={selected}
        setSelected={setSelected}
        status="all"
      />
      <CustomCheckbox
        selected={selected}
        setSelected={setSelected}
        status="draft"
      />
      <CustomCheckbox
        selected={selected}
        setSelected={setSelected}
        status="pending"
      />
      <CustomCheckbox
        selected={selected}
        setSelected={setSelected}
        status="paid"
      />
    </div>
  );
};

export default FilterBox;
