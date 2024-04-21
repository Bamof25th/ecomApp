import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const addTocartHandeler = () => {};
  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>

      <main>
        <ProductCard
          productId="sad"
          name="macbook"
          price={2132311}
          stock={12}
          handeler={addTocartHandeler}
          photo="https://m.media-amazon.com/images/I/61RJn0ofUsL._AC_UY218_.jpg"
        />
      </main>
    </div>
  );
};

export default Home;
