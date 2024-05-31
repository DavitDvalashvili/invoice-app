import { MdKeyboardArrowLeft } from "react-icons/md";
import CustomDatePicker from "./CustomDatePicker";
import CustomSelect from "./CustomSelect";
import { useState } from "react";
import { IItem, IInvoice } from "@/types/types";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";

const NewInvoice = () => {
  const [itemTotals, setItemTotals] = useState<number[]>([]);

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
  } = useForm<IInvoice>({
    defaultValues: {
      items: [ItemObject],
      paymentTerms: 30,
      invoiceDate: Date.now,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const addItemInputs = () => {
    append(ItemObject);
  };

  const onSubmit: SubmitHandler<IInvoice> = (data) => {
    console.log(data);
  };

  return (
    <main className="bg-gray-500">
      <section className="aside">
        <p>
          <MdKeyboardArrowLeft />
          <span>Go back</span>
        </p>
        <h3>New Invoice</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <legend>Bill From</legend>
            <div className="">
              <label htmlFor="street">Street Address</label>
              <input
                {...register("street", {
                  required: "Can't be empty",
                  maxLength: 30,
                })}
              />
              <span className="error-message">{errors.street?.message}</span>
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
              <span className="error-message">{errors.postCode?.message}</span>
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
                    //value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
            <button type="submit" id="discard">
              Discard
            </button>
            <button type="submit" id="draft">
              Save as Draft
            </button>
            <button type="submit" id="send">
              Save & Send
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default NewInvoice;
