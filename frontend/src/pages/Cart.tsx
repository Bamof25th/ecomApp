import { useState } from "react";

const cartItems = [];
const subTotal = 4000;
const tax = Math.round(subTotal * 0.18);
const shippingCharges = 200;
const discount = 200;
const total = subTotal + tax + shippingCharges;

const Cart = () => {
  const [couponCode, setCouponCode] = useState<string>("");
  e;
  const [isvalidcouponCode, setIsValidCouponCode] = useState<boolean>(false);
  return (
    <div className="cart">
      <main></main>
      <aside>
        <p>Subtotal: ₹{subTotal}</p>
        <p>Tax: ₹{tax}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>
          Discount - <em>₹{discount}</em>
        </p>
        <p>
          <b>Total: ₹{total}</b>
        </p>

        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />

        {couponCode && isvalidcouponCode ? (
          <span>
            ₹{discount} off using the {couponCode}
          </span>
        ) : (
          <span>Invalid Coupon</span>
        )}
      </aside>
    </div>
  );
};

export default Cart;
