import React, { useState } from "react";
import { IConfirmDeleteProps } from "@/types/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const ConfirmDelete = ({
  showDelete,
  setShowDelete,
  number,
  id,
}: IConfirmDeleteProps) => {
  const [deleting, setDeleting] = useState<boolean>(false);

  const router = useRouter();

  const DeleteInvoice = async () => {
    try {
      setDeleting(true);
      const response = await axios.delete(`/api/invoice/${id}`);
      if (response.status === 200) {
        setDeleting(false);
        setShowDelete(false);
        router.push(`/invoices`);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <main className="w-[100vw] h-[100%] absolute top-0 left-0 bg-blackLight flex justify-center items-tom p-[24px] ">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: -1, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white dark:bg-Kon rounded-[8px] sticky top-1/2 transform -translate-y-1/2  h-[220px] md:h-[249px] p-[32px] md:p-[48px] pt-[34px] md:pt-[51px] max-w-[480px] ">
          <h2 className="text-[24px] leading-[32px] tracking-[-0.5px] text-RuinedSmores dark:text-white font-bold mb-[8px] md:mb-[12px]">
            Confirm Deletion
          </h2>
          <p className="text-[13px] leading-[22px] tracking-[-0.1px] text-PurpleImpression font-medium mb-[22px] md:mb-[12px]">
            {`Are you sure you want to delete invoice #${number}? This action
          cannot be undone.`}
          </p>
          <div className="flex justify-end items-center gap-[8px] ">
            <button
              onClick={() => {
                setShowDelete(false);
              }}
              className=" pl-[24px] pr-[23px] pb-[15px] pt-[18px] text-[15px] leading-[15px] font-bold tracking-[-0.25px] rounded-[24px] text-TrueLavender bg-WashMe dark:bg-RoyalCurtsy dark:text-StoicWhite hover:bg-StoicWhite dark:hover:bg-white transition duration-300 ease-in-out "
            >
              Cancel
            </button>
            <button
              onClick={DeleteInvoice}
              disabled={deleting}
              className="pl-[24px] pr-[25px] pb-[15px] pt-[18px] text-[15px] leading-[15px] font-bold tracking-[-0.25px] rounded-[24px] text-white bg-KhmerCurry hover:bg-AmericanPink transition duration-300 ease-in-out"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default ConfirmDelete;
