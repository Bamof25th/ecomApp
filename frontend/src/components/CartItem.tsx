type CartItemProps = {
import { Link } from 'react-router-dom';
    cartItem: any;
}


const CartItem = ({cartItem} : CartItemProps) => {

  const {photo, name , stock , quantity, price, productId} = cartItem;
  return (
    <div className="cart-item">
        <img src={photo} alt={name} />
        <article>
          <Link to={`product/`}/>
        </article>
      </div>
  )
}

export default CartItem