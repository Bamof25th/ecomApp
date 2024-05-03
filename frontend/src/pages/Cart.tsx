import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
// import CartItem from "../components/CartItem";

const cartItems = [
  {
    productId: "asdadsa",
    photo: "https://m.media-amazon.com/images/I/61RJn0ofUsL._AC_UY218_.jpg",
    name: "macbook",
    price: 30000,
    quantity: 2,
    stock: 10,
  },
];
const subTotal = 4000;
const tax = Math.round(subTotal * 0.18);
const shippingCharges = 200;
const discount = 200;
const total = subTotal + tax + shippingCharges;

const Cart = () => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isvalidcouponCode, setIsValidCouponCode] = useState<boolean>(false);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (Math.random() > 0.5) setIsValidCouponCode(true);
      else setIsValidCouponCode(false);
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [couponCode]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => {
            return <CartItem key={idx} cartItem={i} />;
          })
        ) : (
          <h1>No items added!</h1>
        )}
      </main>
      <aside>
        <p>Subtotal: ₹{subTotal}</p>
        <p>Tax: ₹{tax}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>
          Discount - <em className="red">₹{discount}</em>
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

        {couponCode &&
          (isvalidcouponCode ? (
            <span className="green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />
            </span>
          ))}
        {cartItems.length > 0 && <Link to="/shipping">checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
