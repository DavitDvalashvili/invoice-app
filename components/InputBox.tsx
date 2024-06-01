import { MdKeyboardArrowLeft } from "react-icons/md";
import CustomDatePicker from "./CustomDatePicker";
import CustomSelect from "./CustomSelect";
import { useState, useEffect } from "react";
import { IItem, IInvoice } from "@/types/types";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { IInputBox } from "@/types/types";
import axios from "axios";

const InputBox = ({ setShowInputBox }: IInputBox) => {
  const [itemTotals, setItemTotals] = useState<number[]>([]);
  const [status, setStatus] = useState<string>("");

  const ItemObject: IItem = {
    itemName: "",
    itemQuantity: undefined,
    itemPrice: undefined,
    itemTotal: 0,
    itemId: Math.floor(Math.random() * 1000).toString(),
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
      invoiceDate: Date,
    },
  });

  const { fields, append, remove } = useFieldArray<IItem>({
    control,
    name: "items",
  });

  const addItemInputs = () => {
    append(ItemObject);
  };

  const onSubmit: SubmitHandler<IInvoice> = async (data) => {
    try {
      const response = await axios.post(`/api/invoices/${status}`, data);
      reset();
      setShowInputBox(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="pt-[33px] px-6 pb-[22px]">
        <p className="flex justify-start items-center gap-[12.66px] font-bold">
          <MdKeyboardArrowLeft className="text-VenetianNights text-[22px] leading-[15px]" />
          <span className="text-[15px], leading-[15px] tracking-[-0.25px] text-RuinedSmores dark:text-white">
            Go back
          </span>
        </p>
        <h3 className="text-[24px] leading-8 font-bold tracking-[-0.5px] text-RuinedSmores dark:text-white">
          New Invoice
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="mt-[22px]">
            <legend className="text-[15px], leading-[15px] tracking-[-0.25px] text-VenetianNights font-bold mb-[24px]">
              Bill From
            </legend>
            <div className="flex flex-col flex-wrap ">
              <div className="flex flex-row mb-[20px] text-green-600 flex-wrap justify-between">
                <label
                  htmlFor="street"
                  className={`text-[13px] leading-[15px] tracking-[-0.1px]  font-medium ${
                    errors.street
                      ? "text-KhmerCurry"
                      : "dark:text-StoicWhite text-TrueLavender"
                  }`}
                >
                  Street Address
                </label>
                <span className="text-[11px], leading-[13px] tracking-[-0.1px] text-KhmerCurry border-solid">
                  {errors.street?.message}
                </span>
                <input
                  // className="w-full mt-[9px] rounded-[4px] bg-white dark:bg-Kon border-[1px] "
                  className={`w-full mt-[9px] rounded-[4px] bg-white dark:bg-Kon border-[1px] ${
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
              <div className="">
                <label htmlFor="city">City</label>
                <input
                  {...register("city", {
                    required: "Can't be empty",
                    maxLength: 30,
                  })}
                />
                <span className="error-message">{errors.city?.message}</span>
              </div>

              <div className="">
                <label htmlFor="postCode">Post Code</label>
                <input
                  {...register("postCode", {
                    required: "Can't be empty",
                    maxLength: 6,
                  })}
                />
                <span className="error-message">
                  {errors.postCode?.message}
                </span>
              </div>
              <div className="">
                <label htmlFor="country">Country</label>
                <input
                  {...register("country", {
                    required: "Can't be empty",
                    maxLength: 15,
                  })}
                />
                <span className="error-message">{errors.country?.message}</span>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Bill To</legend>
            <div className="">
              <label htmlFor="clientName">Clients Name</label>
              <input
                {...register("clientName", {
                  required: "Can't be empty",
                  maxLength: 20,
                })}
              />
              <span className="error-message">
                {errors.clientName?.message}
              </span>
            </div>
            <div className="">
              <label htmlFor="clientEmail">Clients Email</label>
              <input
                {...register("clientEmail", {
                  required: "Can't be empty",
                  maxLength: 20,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              <span className="error-message">
                {errors.clientEmail?.message}
              </span>
            </div>
            <div className="">
              <label htmlFor="clientStreet">Street Address</label>
              <input
                {...register("clientStreet", {
                  required: "Can't be empty",
                  maxLength: 20,
                })}
              />
              <span className="error-message">
                {errors.clientStreet?.message}
              </span>
            </div>
            <div className="">
              <label htmlFor="clientCity">City</label>
              <input
                {...register("clientCity", {
                  required: "Can't be empty",
                  maxLength: 15,
                })}
              />
              <span className="error-message">
                {errors.clientCity?.message}
              </span>
            </div>
            <div className="">
              <label htmlFor="clientPostCode">Post Code</label>
              <input
                {...register("clientPostCode", {
                  required: "Can't be empty",
                  maxLength: 6,
                })}
              />
              <span className="error-message">
                {errors.clientPostCode?.message}
              </span>
            </div>
            <div className="">
              <label htmlFor="clientCountry">Country</label>
              <input
                {...register("clientCountry", {
                  required: "Can't be empty",
                  maxLength: 15,
                })}
              />
              <span className="error-message">
                {errors.clientCountry?.message}
              </span>
            </div>
            <div className="">
              <label htmlFor="invoiceDate">Invoice Date</label>
              <CustomDatePicker name="invoiceDate" control={control} />
              <span className="error-message">
                {errors.invoiceDate?.message}
              </span>
            </div>
            <div className="">
              <label htmlFor="paymentTerms">Payment Terms</label>
              <CustomSelect name="paymentTerms" control={control} />
              <span className="error-message">
                {errors.paymentTerms?.message}
              </span>
            </div>
            <div className="">
              <label htmlFor="description">Project Description</label>
              <input
                {...register("description", {
                  required: "Can't be empty",
                  maxLength: 50,
                })}
              />
              <span className="error-message">
                {errors.description?.message}
              </span>
            </div>
          </fieldset>

          <fieldset>
            <legend>Item List</legend>
            {fields.map((item, index) => (
              <div key={item.itemId} className="">
                <div className="">
                  <label htmlFor={`items[${index}].itemName`}>Name</label>
                  <input
                    {...register(`items.${index}.itemName`, {
                      required: "Can't be empty",
                    })}
                  />
                  <span className="">
                    {errors.items?.[index]?.itemQuantity?.message}
                  </span>
                </div>
                <div className="">
                  <label htmlFor={`items[${index}].itemQuantity`}>Qty.</label>
                  <input
                    type="number"
                    {...register(`items.${index}.itemQuantity`, {
                      required: "Can't be empty",
                    })}
                    onChange={(e) => {
                      const quantity: number = parseInt(e.target.value) || 0;
                      const price: number =
                        parseInt(watch(`items[${index}].itemPrice`)) || 0;
                      const total: number = quantity * price;

                      // Update itemTotal in the form state
                      setValue(`items[${index}].itemTotal`, total);

                      // Update itemTotal in the component state
                      setItemTotals((prevTotals) => {
                        const newTotals = [...prevTotals];
                        newTotals[index] = total;
                        return newTotals;
                      });
                    }}
                  />
                  <span className="">
                    {errors.items?.[index]?.itemQuantity?.message}
                  </span>
                </div>
                <div className="">
                  <label htmlFor={`items[${index}].itemPrice`}>Price</label>
                  <input
                    type="number"
                    {...register(`items.${index}.itemPrice`, {
                      required: "Can't be empty",
                    })}
                    onChange={(e) => {
                      const price: number = parseInt(e.target.value) || 0;
                      const quantity: number =
                        parseInt(watch(`items[${index}].itemQuantity`)) || 0;
                      const total: number = quantity * price;

                      // Update itemTotal in the form state
                      setValue(`items[${index}].itemTotal`, total);

                      // Update itemTotal in the component state
                      setItemTotals((prevTotals) => {
                        const newTotals = [...prevTotals];
                        newTotals[index] = total;
                        return newTotals;
                      });
                    }}
                  />
                  <span className="">
                    {errors.items?.[index]?.itemPrice?.message}
                  </span>
                </div>
                <div className="">
                  <label htmlFor={`items[${index}].itemTotal`}>Total</label>
                  <input
                    type="number"
                    {...register(`items.${index}.itemTotal`)}
                    readOnly
                    value={itemTotals[index] || 0}
                  />
                </div>
                <RiDeleteBin7Fill onClick={() => remove(index)} />
              </div>
            ))}
            <button type="button" onClick={addItemInputs}>
              Add New Item
            </button>
          </fieldset>
          <div className="button-group">
            <button
              type="button"
              id="discard"
              onClick={() => {
                reset(), setShowInputBox(false);
              }}
            >
              Discard
            </button>
            <button
              type="submit"
              id="draft"
              onClick={() => {
                setStatus("draft");
              }}
            >
              Save as Draft
            </button>
            <button
              type="submit"
              id="send"
              onClick={() => {
                setStatus("all");
              }}
            >
              Save & Send
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default InputBox;
