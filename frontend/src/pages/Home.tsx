import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");

  const addTocartHandeler = () => {};



  if (isError) toast.error("Can not fetch the products");
  return isLoading ? (
    <Skeleton width="80vw" />
  ) : (
    <div className="home">
      <section></section>
      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>

      <main>
        {data?.products.map((i) => (
          <ProductCard
            key={i._id}
            productId={i._id}
            name={i.name}
            price={i.price}
            stock={i.stock}
            handeler={addTocartHandeler}
            photo={i.photo}
          />
        ))}
      </main>
    </div>
  );
};

export default Home;
