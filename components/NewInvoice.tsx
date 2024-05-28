import { MdDescription, MdKeyboardArrowLeft } from "react-icons/md";
import CustomDatePicker from "./CustomDatePicker";
import CustomSelect from "./CustomSelect";
import { useState } from "react";
import { IItem } from "@/types/types";
import { RiDeleteBin7Fill } from "react-icons/ri";

const NewInvoice = () => {
  const [items, setItems] = useState<IItem[]>([
    {
      name: "",
      quantity: 0,
      price: 0,
      total: 0,
      id: Math.floor(Math.random() * 1000).toString(),
    },
  ]);

  const addItemInputs = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setItems([
      ...items,
      {
        name: "",
        quantity: 0,
        price: 0,
        total: 0,
        id: Math.floor(Math.random() * 1000).toString(),
      },
    ]);
  };

  const deleteItemInputs = (targetItemId: string) => {
    const updateItems = items.filter((item) => item.id !== targetItemId);
    setItems(updateItems);
  };

  return (
    <main>
      <aside>
        <p>
          <MdKeyboardArrowLeft />
          <span>Go back</span>
        </p>
        <h3>New Invoice</h3>
        <form>
          <section id="billFrom">
            <p>Bill From</p>
            <div>
              <div>
                <div>
                  <label htmlFor="street">Street Address</label>
                  <span>{"cant't be empty"}</span>
                </div>
                <input type="text" name="street" id="street" />
              </div>
              <div>
                <div>
                  <label htmlFor="city">City</label>
                  <span>{"cant't be empty"}</span>
                </div>
                <input type="text" name="city" id="city" />
              </div>
              <div>
                <div>
                  <label htmlFor="postCode">Post Code</label>
                  <span>{"cant't be empty"}</span>
                </div>
                <input type="text" name="postCode" id="postCode" />
              </div>
              <div>
                <div>
                  <label htmlFor="country">Country</label>
                  <span>{"cant't be empty"}</span>
                </div>
                <input type="text" name="postCode" id="country" />
              </div>
            </div>
          </section>
          <section id="BillTo">
            <p>Bill To</p>
            <div>
              <div>
                <div>
                  <label htmlFor="name">{"Client's Name"}</label>
                  <span>{"cant't be empty"}</span>
                </div>
                <input type="text" name="name" id="name" />
              </div>
              <div>
                <div>
                  <label htmlFor="email">{"Client's Email"}</label>
                  <span>{"cant't be empty"}</span>
                </div>
                <input type="email" name="email" id="email" />
              </div>
              <div>
                <div>
                  <label htmlFor="street">Street Address</label>
                  <span>{"cant't be empty"}</span>
                </div>
                <input type="text" name="street" id="street" />
              </div>
              <div>
                <div>
                  <div>
                    <label htmlFor="street">City</label>
                    <span>{"cant't be empty"}</span>
                  </div>
                  <input type="text" name="city" id="city" />
                </div>
                <div>
                  <div>
                    <label htmlFor="postCode">Post Code</label>
                    <span>{"cant't be empty"}</span>
                  </div>
                  <input type="text" name="postCode" id="postCode" />
                </div>
                <div>
                  <div>
                    <label htmlFor="country">Country</label>
                    <span>{"cant't be empty"}</span>
                  </div>
                  <input type="text" name="country" id="country" />
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <label htmlFor="date">Invoice Date</label>
                    <span>{"cant't be empty"}</span>
                  </div>
                  <CustomDatePicker />
                </div>
                <div>
                  <div>
                    <label htmlFor="terms">Payment Terms</label>
                    <span>{"cant't be empty"}</span>
                    <CustomSelect />
                  </div>
                </div>
                <div>
                  <div>
                    <label htmlFor="description">Project Description</label>
                    <span>{"cant't be empty"}</span>
                    <input
                      type="text"
                      placeholder="Description"
                      name="description"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="itemLIst">
            <p>item Name</p>
            {items.map((item) => (
              <div key={item.id}>
                <div>
                  <label htmlFor="itemName">Item Name</label>
                  <span>{"cant't be empty"}</span>
                  <input type="text" name="itemName" id="itemName" />
                </div>
                <div>
                  <label htmlFor="Qty">Qty.</label>
                  <span>{"cant't be empty"}</span>
                  <input type="number" name="Qty" id="Qty" />
                </div>
                <div>
                  <label htmlFor="price">Qty.</label>
                  <span>{"cant't be empty"}</span>
                  <input type="number" name="price" id="price" />
                </div>
                <div>
                  <label htmlFor="price">Total</label>
                  <span>{"cant't be empty"}</span>
                  <input type="number" name="total" id="total" />
                </div>
                <RiDeleteBin7Fill
                  onClick={() => {
                    deleteItemInputs(item.id);
                  }}
                />
              </div>
            ))}
            <button onClick={addItemInputs}>Add new Item</button>
          </section>
          <div id="buttons">
            <button id="discard">Discard</button>
            <button id="draft">Save as Draft</button>
            <button id="send">Save & Send</button>
          </div>
        </form>
      </aside>
    </main>
  );
};

export default NewInvoice;
