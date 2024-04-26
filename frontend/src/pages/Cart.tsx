import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";

const cartItems = [];
const subTotal = 4000;
const tax = Math.round(subTotal * 0.18);
const shippingCharges = 200;
const discount = 200;
const total = subTotal + tax + shippingCharges;

const Cart = () => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isvalidcouponCode, setIsValidCouponCode] = useState<boolean>(false);

  useEffect(() => {
    const  timeOutId = setTimeout(()=>{

      if(Math.random() > 0.5) setIsValidCouponCode(true);

      else setIsValidCouponCode(false);
    },1000)
  
    return () => {
      clearTimeout(timeOutId);
    }
  }, [couponCode])
  
  return (
    <div className="cart">
      <main>
       { cartItems.map((i) => {
          
        })}
      </main>
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
      </aside>
    </div>
  );
};

export default Cart;
