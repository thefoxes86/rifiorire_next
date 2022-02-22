import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

import { filteredVariantPrice } from "utils/functions/functions";
import { useEffect, useState } from "react";
import Marker from "../Marker";
import Price from "../single-product/price";

const ProductsList = ({ products, col }) => {
  const [column, setColumn] = useState("md:w-1/4");
  const [dateNow, setDateNow] = useState();
  useEffect(() => {
    let date = new Date();
    setDateNow(date.getTime());

    switch (col) {
      case 1:
        setColumn("md:w-100");
        break;
      case 2:
        setColumn("md:w-1/2");
        break;
      case 3:
        setColumn("md:w-1/3 w-1/2");
        break;
      case 4:
        setColumn("md:w-1/4 w-1/2");
        break;
      case 5:
        setColumn("md:w-1/5 w-1/2");
        break;

      default:
        setColumn("md:w-1/4 w-1/2");
        break;
    }
  }, []);
  return (
    <>
      {column && (
        <section className="container mx-auto bg-white">
          <div id="product-container" className="flex flex-wrap items-center">
            {products ? (
              products.map(
                ({
                  databaseId,
                  name,
                  price,
                  regularPrice,
                  salePrice,
                  onSale,
                  slug,
                  image,
                  variations,
                  date,
                }) => (
                  <div
                    key={uuidv4()}
                    className={`flex flex-col p-6 ${column} relative`}
                  >
                    <Link
                      href={`/prodotto/${encodeURIComponent(
                        slug
                      )}?id=${encodeURIComponent(databaseId)}`}
                    >
                      <a className="w-auto h-auto overflow-hidden relative">
                        {image ? (
                          <img
                            id="product-image"
                            className="object-contain transform hover:scale-110 duration-500 ease-in-out"
                            alt={name}
                            src={image.sourceUrl}
                          />
                        ) : (
                          <img
                            id="product-image"
                            className="object-contain transform hover:scale-110 duration-500 ease-in-out"
                            alt={name}
                            src={""}
                          />
                        )}
                      </a>
                    </Link>
                    {onSale && <Marker name="sale" color="violet" />}
                    {dateNow - Date.parse(date) < 864000000 && (
                      <Marker name="new" color="primary" />
                    )}

                    {/* Display sale price when on sale */}
                    {onSale && (
                      <>
                        <div className="flex justify-center">
                          <div className="pt-2 text-black font-thin text-lg">
                            {variations && filteredVariantPrice(price)}
                            {!variations && salePrice}
                          </div>
                          <div className="pt-2 ml-2 text-black font-thin text-lg line-through">
                            {variations && filteredVariantPrice(price, "right")}
                            {!variations && regularPrice}
                          </div>
                        </div>
                      </>
                    )}
                    {/* Display regular price when not on sale */}
                    {!onSale && (
                      <p className="pt-2 text-center text-black font-thin text-lg">
                        {" "}
                        {price}
                      </p>
                    )}

                    <Link
                      href={`/prodotto/${encodeURIComponent(
                        slug
                      )}?id=${encodeURIComponent(databaseId)}`}
                    >
                      <a>
                        <div className="flex justify-center pt-1">
                          <p className="text-black font-thin text-md text-center cursor-pointer">
                            {name}
                          </p>
                        </div>
                      </a>
                    </Link>
                  </div>
                )
              )
            ) : (
              <div className="mx-auto text-xl font-thin text-center text-gray-800 no-underline uppercase">
                Attualmente Non ci sono prodotti in questa categoria
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default ProductsList;
