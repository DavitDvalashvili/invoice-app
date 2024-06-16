import { MdKeyboardArrowLeft } from "react-icons/md";
import CustomDatePicker from "./CustomDatePicker";
import CustomSelect from "./CustomSelect";
import { useState, useEffect } from "react";
import { IItem, IInvoice } from "../../types/types";
import { IoMdTrash } from "react-icons/io";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { IInputBox } from "@/types/types";
import axios from "axios";
import useWindowWidth from "@/hooks/useWindowWidth";
import { v4 as uuidv4 } from "uuid";

const InputBox = ({ setShowInputBox, mode, invoiceData }: IInputBox) => {
  const windowWidth = useWindowWidth();
  const [itemTotals, setItemTotals] = useState<number[]>([]);
  const [status, setStatus] = useState<string>("");
  const [Price, setPrice] = useState<number>(0);
  const [Quantity, setQuantity] = useState<number>(0);

  const ItemObject: IItem = {
    itemName: "",
    itemQuantity: undefined,
    itemPrice: undefined,
    itemTotal: 0,
    itemId: uuidv4(),
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<IInvoice>({
    defaultValues: {
      items: [ItemObject],
      paymentTerms: 30,
      invoiceDate: new Date(),
    },
  });

  const { fields, append, remove } = useFieldArray<IInvoice | any>({
    control,
    name: "items",
  });

  const addItemInputs = () => {
    append(ItemObject);
  };

  const onSubmit: SubmitHandler<IInvoice> = async (data) => {
    try {
      if (fields.length > 0 && mode === "create") {
        const response = await axios.post(`/api/invoices/${status}`, data);
        reset();
        setShowInputBox(false);
      } else if (fields.length > 0 && mode === "update") {
        const response = await axios.post(
          `/api/invoice/${invoiceData.id}`,
          data
        );
        reset();
        setShowInputBox(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (mode === "update") {
      (Object.keys(invoiceData) as (keyof IInvoice)[]).forEach((field) => {
        setValue(field, invoiceData[field]);
      });
    }
  }, [mode, invoiceData, setValue]);

  return (
    <>
      <section className="pt-[33px] md:pt-[59px] px-6 md:px-[56px] pb-[22px] md:pb-[47px] max-w-[616px] bg-white dark:bg-RiverStyx md:rounded-tr-[20px] md:rounded-br-[20px]">
        {windowWidth && windowWidth < 768 && (
          <p className="flex justify-start items-center gap-[12.66px] font-bold">
            <MdKeyboardArrowLeft className="text-VenetianNights text-[22px] leading-[15px]" />
            <span
              className="text-[15px], leading-[15px] tracking-[-0.25px] text-RuinedSmores dark:text-white"
              onClick={() => {
                reset(), setShowInputBox(false);
              }}
            >
              Go back
            </span>
          </p>
        )}
        {mode === "create" && (
          <h3 className="text-[24px] leading-8 font-bold tracking-[-0.5px] text-RuinedSmores dark:text-white mt-[26px] md:mt-0">
            New Invoice
          </h3>
        )}
        {mode === "update" && (
          <h3 className="text-[24px] leading-8 font-bold tracking-[-0.5px] text-RuinedSmores dark:text-white mt-[26px] md:mt-0">
            Edit <span className="text-PurpleImpression">#</span>
            {invoiceData.number}
          </h3>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="mt-[22px] md:mt-[46px]">
            <legend className="text-[15px], leading-[15px] tracking-[-0.25px] text-VenetianNights font-bold mb-[24px]">
              Bill From
            </legend>
            <div className="flex flex-row flex-wrap ">
              <div className="flex flex-row mb-[25px] flex-wrap justify-between w-full group">
                <label
                  htmlFor="street"
                  className={`text-[13px] leading-[15px] tracking-[-0.1px]  font-medium ${
                    errors.street
                      ? "text-KhmerCurry"
                      : "dark:text-StoicWhite text-TrueLavender"
                  } group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite `}
                >
                  Street Address
                </label>
                <span className="text-[11px] leading-[13px] tracking-[-0.1px] text-KhmerCurry border-solid group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite">
                  {errors.street?.message}
                </span>
                <input
                  className={`w-full mt-[9px] rounded-[4px] bg-white focus:border-VenetianNights dark:focus:border-VenetianNights  dark:bg-Kon border-[1px] focus:outline-none text-[15px], leading-[15px] tracking-[-0.25px] font-bold px-[20px] pt-[18px] pb-[15px] text-RuinedSmores dark:text-white ${
                    errors.street
                      ? "border-KhmerCurry"
                      : "dark:border-RoyalCurtsy border-StoicWhite"
                  }`}
                  {...register("street", {
                    required: "Can't be empty",
                    maxLength: 30,
                  })}
                />
              </div>

              <div className="flex gap-[23px] md:gap-[24px]">
                <div className="flex flex-row mb-[25px] md:mb-[49px] flex-wrap justify-between md:w-[152px] group">
                  <label
                    htmlFor="city"
                    className={`text-[13px] leading-[15px] tracking-[-0.1px]  font-medium ${
                      errors.city
                        ? "text-KhmerCurry"
                        : "dark:text-StoicWhite text-TrueLavender"
                    } group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite `}
                  >
                    City
                  </label>
                  <span className="text-[11px] leading-[13px] tracking-[-0.1px] text-KhmerCurry border-solid group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite">
                    {errors.city?.message}
                  </span>
                  <input
                    className={`w-full mt-[9px] focus:border-VenetianNights dark:focus:border-VenetianNights  rounded-[4px] bg-white dark:bg-Kon border-[1px] focus:outline-none text-[15px], leading-[15px] tracking-[-0.25px] font-bold px-[20px] pt-[18px] pb-[15px] text-RuinedSmores dark:text-white ${
                      errors.city
                        ? "border-KhmerCurry"
                        : "dark:border-RoyalCurtsy border-StoicWhite"
                    } `}
                    {...register("city", {
                      required: "Can't be empty",
                      maxLength: 30,
                    })}
                  />
                </div>

                <div className="flex flex-row mb-[25px] md:mb-[49px] flex-wrap justify-between md:w-[152px] group">
                  <label
                    htmlFor="postCode"
                    className={`text-[13px] leading-[15px] tracking-[-0.1px]  font-medium ${
                      errors.postCode
                        ? "text-KhmerCurry"
                        : "dark:text-StoicWhite text-TrueLavender"
                    } group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite`}
                  >
                    Post Code
                  </label>
                  <span className="text-[11px] leading-[13px]  tracking-[-0.1px] text-KhmerCurry border-solid group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite">
                    {errors.postCode?.message}
                  </span>
                  <input
                    className={`w-full mt-[9px] rounded-[4px] focus:border-VenetianNights dark:focus:border-VenetianNights  bg-white dark:bg-Kon border-[1px] focus:outline-none text-[15px], leading-[15px] tracking-[-0.25px] font-bold px-[20px] pt-[18px] pb-[15px] text-RuinedSmores dark:text-white ${
                      errors.postCode
                        ? "border-KhmerCurry"
                        : "dark:border-RoyalCurtsy border-StoicWhite"
                    }`}
                    {...register("postCode", {
                      required: "Can't be empty",
                      maxLength: 10,
                    })}
                  />
                </div>
              </div>

              <div className="flex flex-row mb-[25px] md:mb-[49px] flex-wrap justify-between w-full md:w-[152px] md:ml-[24px] group">
                <label
                  htmlFor="country"
                  className={`text-[13px] leading-[15px] tracking-[-0.1px]  font-medium ${
                    errors.country
                      ? "text-KhmerCurry"
                      : "dark:text-StoicWhite text-TrueLavender"
                  } group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite`}
                >
                  Country
                </label>
                <span className="text-[11px] leading-[13px] tracking-[-0.1px] text-KhmerCurry border-solid group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite">
                  {errors.country?.message}
                </span>
                <input
                  className={`w-full mt-[9px] rounded-[4px] bg-white focus:border-VenetianNights dark:focus:border-VenetianNights  dark:bg-Kon border-[1px] focus:outline-none text-[15px], leading-[15px] tracking-[-0.25px] font-bold px-[20px] pt-[18px] pb-[15px] text-RuinedSmores dark:text-white ${
                    errors.country
                      ? "border-KhmerCurry"
                      : "dark:border-RoyalCurtsy border-StoicWhite"
                  }`}
                  {...register("country", {
                    required: "Can't be empty",
                    maxLength: 30,
                  })}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="mt-[16px]">
            <legend className="text-[15px], leading-[15px] tracking-[-0.25px] text-VenetianNights font-bold mb-[24px]">
              Bill To
            </legend>
            <div className="flex flex-row flex-wrap ">
              <div className="flex flex-row mb-[25px] flex-wrap justify-between w-full group">
                <label
                  htmlFor="clientName"
                  className={`text-[13px] leading-[15px] tracking-[-0.1px]  font-medium ${
                    errors.clientName
                      ? "text-KhmerCurry"
                      : "dark:text-StoicWhite text-TrueLavender"
                  } group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite`}
                >
                  Clients Name
                </label>
                <span className="text-[11px] leading-[13px] tracking-[-0.1px] text-KhmerCurry border-solid group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite">
                  {errors.clientName?.message}
                </span>
                <input
                  className={`w-full mt-[9px] rounded-[4px] bg-white focus:border-VenetianNights dark:focus:border-VenetianNights  dark:bg-Kon border-[1px] focus:outline-none text-[15px], leading-[15px] tracking-[-0.25px] font-bold px-[20px] pt-[18px] pb-[15px] text-RuinedSmores dark:text-white ${
                    errors.clientName
                      ? "border-KhmerCurry"
                      : "dark:border-RoyalCurtsy border-StoicWhite"
                  }`}
                  {...register("clientName", {
                    required: "Can't be empty",
                    maxLength: 20,
                  })}
                />
              </div>
              <div className="flex flex-row mb-[25px] flex-wrap justify-between w-full group">
                <label
                  htmlFor="clientEmail"
                  className={`text-[13px] leading-[15px] tracking-[-0.1px]  font-medium ${
                    errors.clientEmail
                      ? "text-KhmerCurry"
                      : "dark:text-StoicWhite text-TrueLavender"
                  } group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite`}
                >
                  Clients Email
                </label>
                <span className="text-[11px] leading-[13px] tracking-[-0.1px] text-KhmerCurry border-solid group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite">
                  {errors.clientEmail?.message}
                </span>
                <input
                  className={`w-full mt-[9px] rounded-[4px] bg-white focus:border-VenetianNights dark:focus:border-VenetianNights  dark:bg-Kon border-[1px] focus:outline-none text-[15px], leading-[15px] tracking-[-0.25px] font-bold px-[20px] pt-[18px] pb-[15px] text-RuinedSmores dark:text-white ${
                    errors.clientEmail
                      ? "border-KhmerCurry"
                      : "dark:border-RoyalCurtsy border-StoicWhite"
                  }`}
                  {...register("clientEmail", {
                    required: "Can't be empty",
                    maxLength: 30,
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
              </div>
              <div className="flex flex-row mb-[25px] flex-wrap justify-between w-full group">
                <label
                  htmlFor="clientStreet"
                  className={`text-[13px] leading-[15px] tracking-[-0.1px]  font-medium ${
                    errors.clientStreet
                      ? "text-KhmerCurry"
                      : "dark:text-StoicWhite text-TrueLavender"
                  } group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite`}
                >
                  Street Address
                </label>
                <span className="text-[11px] leading-[13px] tracking-[-0.1px] text-KhmerCurry border-solid group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite">
                  {errors.clientStreet?.message}
                </span>
                <input
                  className={`w-full mt-[9px] rounded-[4px] bg-white focus:border-VenetianNights dark:focus:border-VenetianNights  dark:bg-Kon border-[1px] focus:outline-none text-[15px], leading-[15px] tracking-[-0.25px] font-bold px-[20px] pt-[18px] pb-[15px] text-RuinedSmores dark:text-white ${
                    errors.clientStreet
                      ? "border-KhmerCurry"
                      : "dark:border-RoyalCurtsy border-StoicWhite"
                  }`}
                  {...register("clientStreet", {
                    required: "Can't be empty",
                    maxLength: 20,
                  })}
                />
              </div>
              <div className="flex gap-[23px] md:gap-[24px]">
                <div className="flex flex-row mb-[25px] md:mb-[49px] flex-wrap justify-between md:w-[152px] group">
                  <label
                    htmlFor="clientCity"
                    className={`text-[13px] leading-[15px] tracking-[-0.1px]  font-medium ${
                      errors.clientCity
                        ? "text-KhmerCurry"
                        : "dark:text-StoicWhite text-TrueLavender"
                    } group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite`}
                  >
                    City
                  </label>
                  <span className="text-[11px] leading-[13px] tracking-[-0.1px] text-KhmerCurry border-solid group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite">
                    {errors.clientCity?.message}
                  </span>
                  <input
                    className={`w-full mt-[9px] rounded-[4px] bg-white focus:border-VenetianNights dark:focus:border-VenetianNights  dark:bg-Kon border-[1px] focus:outline-none text-[15px], leading-[15px] tracking-[-0.25px] font-bold px-[20px] pt-[18px] pb-[15px] text-RuinedSmores dark:text-white ${
                      errors.clientCity
                        ? "border-KhmerCurry"
                        : "dark:border-RoyalCurtsy border-StoicWhite"
                    }`}
                    {...register("clientCity", {
                      required: "Can't be empty",
                      maxLength: 30,
                    })}
                  />
                </div>

                <div className="flex flex-row mb-[25px] md:mb-[49px] flex-wrap justify-between md:w-[152px] group">
                  <label
                    htmlFor="clientPostCode"
                    className={`text-[13px]   leading-[15px] tracking-[-0.1px]  font-medium ${
                      errors.clientPostCode
                        ? "text-KhmerCurry"
                        : "dark:text-StoicWhite text-TrueLavender"
                    } group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite`}
                  >
                    Post Code
                  </label>
                  <span className="text-[11px] leading-[13px] tracking-[-0.1px] text-KhmerCurry border-solid group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite">
                    {errors.clientPostCode?.message}
                  </span>
                  <input
                    className={`w-full mt-[9px] rounded-[4px] bg-white dark:bg-Kon focus:border-VenetianNights dark:focus:border-VenetianNights   border-[1px] focus:outline-none text-[15px], leading-[15px] tracking-[-0.25px] font-bold px-[20px] pt-[18px] pb-[15px] text-RuinedSmores dark:text-white ${
                      errors.clientPostCode
                        ? "border-KhmerCurry"
                        : "dark:border-RoyalCurtsy border-StoicWhite"
                    }`}
                    {...register("clientPostCode", {
                      required: "Can't be empty",
                      maxLength: 10,
                    })}
                  />
                </div>
              </div>

              <div className="flex flex-row mb-[41px] md:mb-[49px] flex-wrap justify-between w-full md:w-[152px] md:ml-[24px] group">
                <label
                  htmlFor="clientCountry"
                  className={`text-[13px] leading-[15px] tracking-[-0.1px]  font-medium ${
                    errors.clientCountry
                      ? "text-KhmerCurry"
                      : "dark:text-StoicWhite text-TrueLavender"
                  } group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite`}
                >
                  Country
                </label>
                <span className="text-[11px] leading-[13px] tracking-[-0.1px] text-KhmerCurry border-solid group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite">
                  {errors.clientCountry?.message}
                </span>
                <input
                  className={`w-full mt-[9px] rounded-[4px] bg-white focus:border-VenetianNights dark:focus:border-VenetianNights  dark:bg-Kon border-[1px] focus:outline-none text-[15px], leading-[15px] tracking-[-0.25px] font-bold px-[20px] pt-[18px] pb-[15px] text-RuinedSmores dark:text-white ${
                    errors.clientCountry
                      ? "border-KhmerCurry"
                      : "dark:border-RoyalCurtsy border-StoicWhite"
                  }`}
                  {...register("clientCountry", {
                    required: "Can't be empty",
                    maxLength: 30,
                  })}
                />
              </div>
              <div className="flex flex-row flex-wrap w-full justify-between ">
                <div className="flex flex-row mb-[25px] md:mb-[49px]  flex-wrap  justify-between w-full md:w-[240px] group">
                  <label
                    htmlFor="invoiceDate"
                    className={`text-[13px] leading-[15px] tracking-[-0.1px]  font-medium ${
                      errors.invoiceDate
                        ? "text-KhmerCurry"
                        : "dark:text-StoicWhite text-TrueLavender"
                    } group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite`}
                  >
                    Invoice Date
                  </label>
                  <span className="text-[11px] leading-[13px] tracking-[-0.1px] text-KhmerCurry border-solid group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite">
                    {errors.invoiceDate?.message}
                  </span>
                  <div className="w-full">
                    <CustomDatePicker name="invoiceDate" control={control} />
                  </div>
                </div>

                <div className="flex flex-row mb-[25px] md:mb-[49px] flex-wrap justify-between w-full md:w-[240px] group">
                  <label
                    htmlFor="paymentTerms"
                    className={`text-[13px] leading-[15px] tracking-[-0.1px]  font-medium ${
                      errors.invoiceDate
                        ? "text-KhmerCurry"
                        : "dark:text-StoicWhite text-TrueLavender"
                    } group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite`}
                  >
                    Payment Terms
                  </label>
                  <span className="text-[11px] leading-[13px] tracking-[-0.1px] text-KhmerCurry border-solid group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite ">
                    {errors.paymentTerms?.message}
                  </span>
                  <div className="w-full mt-[9px]">
                    <CustomSelect name="paymentTerms" control={control} />
                  </div>
                </div>
              </div>

              <div className="flex flex-row mb-[25px] flex-wrap justify-between w-full group">
                <label
                  htmlFor="description"
                  className={`text-[13px] leading-[15px] tracking-[-0.1px]  font-medium ${
                    errors.description
                      ? "text-KhmerCurry"
                      : "dark:text-StoicWhite text-TrueLavender"
                  } group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite `}
                >
                  Project Description
                </label>
                <span className="text-[11px] leading-[13px] tracking-[-0.1px] text-KhmerCurry border-solid group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite">
                  {errors.description?.message}
                </span>
                <input
                  className={`w-full mt-[9px] rounded-[4px] bg-white focus:border-VenetianNights dark:focus:border-VenetianNights  dark:bg-Kon border-[1px] focus:outline-none text-[15px], leading-[15px] tracking-[-0.25px] font-bold px-[20px] pt-[18px] pb-[15px] text-RuinedSmores dark:text-white ${
                    errors.description
                      ? "border-KhmerCurry"
                      : "dark:border-RoyalCurtsy border-StoicWhite"
                  }`}
                  {...register("description", {
                    required: "Can't be empty",
                    maxLength: 50,
                  })}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-[18px] font-bold leading-[32px] tracking-[-0.0375px] text-StoneWash pt-[24px] md:pt-[2px] pb-[22px] md:pb-[14px]">
              Item List
            </legend>
            {fields.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:gap-[16px] mb-[49px] md:mb-[18px] "
              >
                <div className="flex flex-row mb-[25px] md:mb-[0px] flex-wrap justify-between w-full md:w-[214px] group">
                  <label
                    htmlFor={`items[${index}].itemName`}
                    className={`text-[13px] leading-[15px] tracking-[-0.1px] font-medium ${
                      errors.items?.[index]?.itemName
                        ? "text-KhmerCurry"
                        : "dark:text-StoicWhite text-TrueLavender"
                    } group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite`}
                  >
                    Name
                  </label>
                  {errors.items?.[index]?.itemName && (
                    <span className="text-[11px] leading-[13px] tracking-[-0.1px] text-KhmerCurry border-solid group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite">
                      {errors.items?.[index]?.itemName?.message}
                    </span>
                  )}
                  <input
                    className={`w-full mt-[15px] rounded-[4px] bg-white focus:border-VenetianNights dark:focus:border-VenetianNights  dark:bg-Kon border-[1px] focus:outline-none text-[15px] leading-[15px] tracking-[-0.25px] font-bold px-[20px] pt-[18px] pb-[15px] text-RuinedSmores dark:text-white  ${
                      errors.items?.[index]?.itemName
                        ? "border-KhmerCurry"
                        : "dark:border-RoyalCurtsy border-StoicWhite"
                    }`}
                    {...register(`items.${index}.itemName`, {
                      required: "Can't be empty",
                    })}
                  />
                </div>
                <div className="flex flex-raw gap-[16px] justify-between ">
                  <div className="flex flex-col justify-center items-start gap-[9px] md:gap-[15px] md:justify-start group">
                    <label
                      htmlFor={`items[${index}].itemQuantity`}
                      className={`text-[13px] leading-[15px] tracking-[-0.1px] font-medium ${
                        errors.items?.[index]?.itemQuantity && !Quantity
                          ? "text-KhmerCurry"
                          : "dark:text-StoicWhite text-TrueLavender"
                      } group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite`}
                    >
                      Qty.
                    </label>
                    <input
                      min="0"
                      className={`w-[69px] rounded-[4px] bg-white dark:bg-Kon focus:border-VenetianNights dark:focus:border-VenetianNights  border-[1px] focus:outline-none text-[15px] leading-[15px] tracking-[-0.25px] font-bold px-[20px] pt-[18px] pb-[15px] text-RuinedSmores dark:text-white  ${
                        errors.items?.[index]?.itemQuantity && !Quantity
                          ? "border-KhmerCurry"
                          : "dark:border-RoyalCurtsy border-StoicWhite"
                      }`}
                      type="number"
                      {...register(`items.${index}.itemQuantity`, {
                        required: "Can't be empty",
                      })}
                      onChange={(e) => {
                        const quantity: number = parseInt(e.target.value) || 0;
                        const fieldName = `items.${index}.itemPrice` as const; // Assertion to make it a valid key
                        const priceString = watch(fieldName) as
                          | string
                          | undefined;
                        const price: number = priceString
                          ? parseInt(priceString)
                          : 0;
                        const total: number = quantity * price;

                        // Ensure the dynamic field name is type-safe
                        const itemTotalFieldName =
                          `items.${index}.itemTotal` as const;

                        // Update itemTotal in the form state
                        setValue(itemTotalFieldName, total);

                        // Update itemTotal in the component state
                        setItemTotals((prevTotals) => {
                          const newTotals = [...prevTotals];
                          newTotals[index] = total;
                          return newTotals;
                        });

                        setQuantity(Number(e.target.value));
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-center items-start gap-[9px] md:gap-[15px] md:justify-start group">
                    <label
                      htmlFor={`items[${index}].itemPrice`}
                      className={`text-[13px] leading-[15px] tracking-[-0.1px] font-medium ${
                        errors.items?.[index]?.itemPrice && !Price
                          ? "text-KhmerCurry"
                          : "dark:text-StoicWhite text-TrueLavender"
                      } group-focus-within:text-TrueLavender group-focus-within:dark:text-StoicWhite`}
                    >
                      Price
                    </label>
                    <input
                      min="0"
                      className={`w-[69px] rounded-[4px] bg-white dark:bg-Kon focus:border-VenetianNights dark:focus:border-VenetianNights  border-[1px] focus:outline-none text-[15px] leading-[15px] tracking-[-0.25px] font-bold px-[20px] pt-[18px] pb-[15px] text-RuinedSmores dark:text-white ${
                        errors.items?.[index]?.itemPrice && !Price
                          ? "border-KhmerCurry"
                          : "dark:border-RoyalCurtsy border-StoicWhite"
                      }`}
                      {...register(`items.${index}.itemPrice`, {
                        required: "Can't be empty",
                        pattern: {
                          value: /^\d+(\.\d+)?$/,
                          message: "Enter a valid price",
                        },
                      })}
                      onChange={(e) => {
                        const price: number = parseInt(e.target.value) || 0;
                        const fieldName =
                          `items.${index}.itemQuantity` as const;
                        const quantityString = watch(fieldName) as
                          | string
                          | undefined;
                        const quantity: number = quantityString
                          ? parseInt(quantityString)
                          : 0;
                        const total: number = quantity * price;

                        // Ensure the dynamic field name is type-safe
                        const itemTotalFieldName =
                          `items.${index}.itemTotal` as const;

                        // Update itemTotal in the form state
                        setValue(itemTotalFieldName, total);

                        // Update itemTotal in the component state
                        setItemTotals((prevTotals) => {
                          const newTotals = [...prevTotals];
                          newTotals[index] = total;
                          return newTotals;
                        });

                        setPrice(Number(e.target.value));
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-center items-start gap-[9px] md:gap-[15px] md:justify-start">
                    <label
                      htmlFor={`items[${index}].itemTotal`}
                      className="text-[13px] leading-[15px] tracking-[-0.1px]  font-medium dark:text-StoicWhite text-TrueLavender"
                    >
                      Total
                    </label>
                    <input
                      className="w-[50px] bg-white dark:bg-RiverStyx focus:outline-none focus:border-VenetianNights dark:focus:border-VenetianNights  text-[15px], leading-[15px] tracking-[-0.25px] font-bold pt-[18px] pb-[15px] text-PurpleImpression"
                      type="number"
                      {...register(`items.${index}.itemTotal`)}
                      value={itemTotals[index]}
                    />
                  </div>
                  <IoMdTrash
                    onClick={() => {
                      remove(index);
                    }}
                    className="cursor-pointer w-[20px] h-[100%] pt-[24px] md:pt-[0px] my-auto text-PurpleImpression md:mt-[13px]"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                addItemInputs();
              }}
              className=" w-full py-[18px] text-[15px] leading-[15px] font-bold tracking-[-0.25px] rounded-[24px] mb-[34px]  text-TrueLavender bg-WashMe hover:bg-StoicWhite transition duration-300 ease-in-out dark:bg-RoyalCurtsy dark:text-StoicWhite dark:hover:bg-white "
            >
              + Add New Item
            </button>
          </fieldset>
          {fields.length <= 0 && (
            <span className="text-KhmerCurry text-[13px] font-semibold leading-[15px] tracking-[-0.25px]  block">
              - An item must be added
            </span>
          )}

          {mode === "create" && (
            <div className=" flex justify-end items-center gap-[7px] mb-[32px] mt-[41px]">
              <button
                type="button"
                id="discard"
                onClick={() => {
                  reset(), setShowInputBox(false);
                }}
                className=" pl-[18px] pr-[19px] pt-[18px] pb-[15px]  md:pl-[24px] md:pr-[25px] md:pb-[15px] md:pt-[18px] text-[15px] leading-[15px] font-bold tracking-[-0.25px] rounded-[24px] text-TrueLavender bg-WashMe dark:bg-RoyalCurtsy dark:text-StoicWhite hover:bg-StoicWhite dark:hover:bg-white transition duration-300 ease-in-out md:mr-auto "
              >
                Discard
              </button>
              <button
                type="submit"
                id="draft"
                className="pl-[16.11px] pr-[13.89px]  pb-[15px] pt-[18px] md:pl-[24px] md:pr-[22px] text-[15px] leading-[15px] font-bold tracking-[-0.25px] rounded-[24px] text-PurpleImpression bg-CarbonBlue dark:text-StoicWhite hover:bg-RuinedSmores dark:hover:bg-Kon transition duration-300 ease-in-out"
                onClick={() => {
                  setStatus("draft");
                }}
              >
                Save as Draft
              </button>
              <button
                className="pl-[16px] pr-[15px] md:pl-[24px] md:pr-[23px] pb-[15px] pt-[18px] text-[15px] leading-[15px] font-bold tracking-[-0.25px] rounded-[24px] text-white bg-VenetianNights dark:text-StoicWhite hover:bg-ForgottenPurple transition duration-300 ease-in-out"
                type="submit"
                id="send"
                onClick={() => {
                  setStatus("all");
                }}
              >
                Save & Send
              </button>
            </div>
          )}
          {mode === "update" && (
            <div className=" flex justify-end items-center gap-[7px] mb-[32px] mt-[41px]">
              <button
                type="button"
                id="discard"
                onClick={() => {
                  reset(), setShowInputBox(false);
                }}
                className=" pl-[18px] pr-[19px] pt-[18px] pb-[15px]  md:pl-[24px] md:pr-[25px] md:pb-[15px] md:pt-[18px] text-[15px] leading-[15px] font-bold tracking-[-0.25px] rounded-[24px] text-TrueLavender bg-WashMe dark:bg-RoyalCurtsy dark:text-StoicWhite hover:bg-StoicWhite dark:hover:bg-white transition duration-300 ease-in-out "
              >
                Cancel
              </button>
              <button
                className="pl-[16px] pr-[15px] md:pl-[24px] md:pr-[23px] pb-[15px] pt-[18px] text-[15px] leading-[15px] font-bold tracking-[-0.25px] rounded-[24px] text-white bg-VenetianNights dark:text-StoicWhite hover:bg-ForgottenPurple transition duration-300 ease-in-out"
                type="submit"
                id="update"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </section>
    </>
  );
};

export default InputBox;
