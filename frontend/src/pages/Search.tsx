import { useState } from "react";
import ProductCard from "../components/ProductCard";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productAPI";
import toast from "react-hot-toast";
import { customError } from "../types/api-types";
import { Skeleton } from "../components/Loader";
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";
import { CartItem } from "../types/types";

const Search = () => {
  const dispatch = useDispatch();
  const {
    data: categoriesResponce,
    isLoading: loadingCategories,
    isError,
    error,
  } = useCategoriesQuery("");

  if (isError) toast.error((error as customError).data.message);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const {
    data: searchedData,
    isLoading: productLoading,
    isError: productIsError,
    error: productError,
  } = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    price: maxPrice,
  });
  if (productIsError) toast.error((productError as customError).data.message);

  console.log(searchedData);

  const addTocartHandeler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  const isPrevpage = page > 1;
  const isNextpage = page < 4;

  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price(Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>
        <div>
          <h4>MaxPrice : {maxPrice || ""}</h4>
          <input
            type="range"
            value={maxPrice}
            max={1000000}
            min={100}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            {!loadingCategories &&
              categoriesResponce?.categories.map((i) => (
                <option key={i} value={i}>
                  {i.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {productLoading ? (
          <Skeleton length={10} />
        ) : (
          <div className="search-product-list">
            {searchedData?.products.map((i) => (
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
          </div>
        )}

        {searchedData && searchedData?.totalPage > 1 && (
          <article>
            <button
              disabled={!isPrevpage}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>
            <span>
              {page} of {searchedData?.totalPage}
            </span>
            <button
              disabled={!isNextpage}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};

export default Search;
