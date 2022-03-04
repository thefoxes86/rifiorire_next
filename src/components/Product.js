import Link from "next/link";
import { useState, useEffect } from "react";
import AddToCartButton from "../components/cart/AddToCartButton";
import Price from "./single-product/price";
import Marker from "./Marker";
import Image from "../image";
import { DEFAULT_PRODUCT_HOME_IMG_URL } from "../constants/urls";

const Product = (props) => {
  const { product } = props;
  const [dateNow, setDateNow] = useState();

  useEffect(() => {
    let date = new Date();
    setDateNow(date.getTime());
  }, []);

  return (
    // @TODO Need to handle Group products differently.
    undefined !== product && "GroupProduct" !== product.__typename ? (
      <div className="relative product flex flex-col p-6`">
        <Link href={`/product/${product?.slug}`}>
          <a className="w-auto h-auto overflow-hidden relative">
            <Image
              className="object-contain transform hover:scale-110 duration-500 ease-in-out bg-center"
              width="500"
              height="500"
              loading="lazy"
              sourceUrl={product?.image?.sourceUrl ?? ""}
              defaultImgUrl={DEFAULT_PRODUCT_HOME_IMG_URL}
              altText={product?.image?.altText ?? product?.slug}
            />
          </a>
        </Link>
        {product?.onSale && <Marker name="sale" color="violet" />}
        {dateNow - Date.parse(product?.date) < 864000000 && (
          <Marker name="new" color="primary" />
        )}

        <p className="pt-2 text-center text-black font-thin text-2xl">
          <Price
            salesPrice={product?.price}
            regularPrice={product?.regularPrice}
          />
        </p>

        <div className="flex justify-center pt-1">
          <p className="text-black font-thin text-md text-center cursor-pointer">
            {product.name ? product.name : ""}
          </p>
        </div>

        {/* <AddToCartButton product={product} /> */}
      </div>
    ) : (
      ""
    )
  );
};

export default Product;
