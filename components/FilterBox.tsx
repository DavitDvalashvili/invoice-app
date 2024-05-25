import React from "react";
import CustomCheckbox from "./CustomCheckbox";
import { useState } from "react";

const FilterBox = () => {
  const [selected, setSelected] = useState<null | string>(null);

  return (
    <div className="rounded-lg p-6 w-48 h-32 flex  flex-col gap-4 drop-shadow-2xl shadow-ChillInTheAir dark:shadow-Silver bg-white dark:bg-RoyalCurtsy">
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
