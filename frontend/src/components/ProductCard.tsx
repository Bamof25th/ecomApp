import { FaPlus } from "react-icons/fa";

type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handeler: () => void;
};
const server = "asdasdasda";
const ProductCard = ({
  productId,
  photo,
  name,
  price,
  stock,
  handeler,
}: ProductsProps) => {
  return <div className="product-card">
    <img src="https://m.media-amazon.com/images/I/61RJn0ofUsL._AC_UY218_.jpg" alt={name} />
    <p>{name}</p>
    <span>₹{price}</span>

    <div>
        <button onClick={()=>handeler}>
            <FaPlus/>
        </button>
    </div>
  </div>;
};

export default ProductCard;
