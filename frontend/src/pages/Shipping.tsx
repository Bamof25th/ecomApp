import { ChangeEvent, useState } from "react";
import { BiArrowBack } from "react-icons/bi";

const Shipping = () => {
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const changeHandeler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {};
  return (
    <div>
      <button>
        <BiArrowBack />
      </button>

      <form action="">
        <h1>Shipping Address</h1>
        <input
          required
          type="text"
          placeholder="Address"
          name="address"
          value={shippingInfo.address}
          onChange={changeHandeler}
        />
        <input
          required
          type="text"
          placeholder="City"
          name="city"
          value={shippingInfo.city}
          onChange={changeHandeler}
        />
        <input
          required
          type="text"
          placeholder="State"
          name="state"
          value={shippingInfo.state}
          onChange={changeHandeler}
        />

        <select
          name="Country"
          required
          value={shippingInfo.country}
          onChange={changeHandeler}
        >
          <option value="">Choose Country</option>
          <option value="india">India</option>
          <option value="usa">USA</option>
          <option value="uk">UK</option>
          <option value="japan">Japan</option>
        </select>

        <input
          required
          type="text"
          placeholder="Pin Code"
          name="pinCode"
          value={shippingInfo.pinCode}
          onChange={changeHandeler}
        />
      </form>
    </div>
  );
};

export default Shipping;
