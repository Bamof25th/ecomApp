import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/store";
import { CartItem } from "../types/types";
type CartItemProps = {
  cartItem: CartItem;
  incrementHandeler: (cartItem: CartItem) => void;
  decrementHandeler: (cartItem: CartItem) => void;
  removeHandeler: (id: string) => void;
};

const CartItem = ({
  cartItem,
  incrementHandeler,
  decrementHandeler,
  removeHandeler,
}: CartItemProps) => {
  const { photo, name, quantity, price, productId } = cartItem;
  return (
    <div className="cart-item">
      <img src={`${server}/${photo}`} alt={name} />
      <article>
        <Link to={`product/${productId}`}>{name}</Link>
        <span> ₹{price}</span>
      </article>

      <div className="">
        <button onClick={() => decrementHandeler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => incrementHandeler(cartItem)}>+</button>
      </div>

      <button onClick={() => removeHandeler(productId)}>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
