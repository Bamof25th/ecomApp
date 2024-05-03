import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
type CartItemProps = {
  cartItem: any;
};

const CartItem = ({ cartItem }: CartItemProps) => {
  const { photo, name, quantity, price, productId } = cartItem;
  return (
    <div className="cart-item">
      <img src={photo} alt={name} />
      <article>
        <Link to={`product/${productId}`}>{name}</Link>
        <span> ₹{price}</span>
      </article>

      <div className="">
        <button>-</button>
        <p>{quantity}</p>
        <button>+</button>
      </div>

      <button>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
