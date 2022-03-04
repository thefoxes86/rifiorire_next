import Link from "next/link";
import ArrayCategory from "../SVG/ArrowCategory";
import Product from "../Product";
import { useEffect } from "react";
// import IndexProducts from "components/Product/IndexProducts.component";

const CategoryProductsLeft = ({ title, img, link, products, text }) => {
  return (
    <>
      {products && (
        <section className="grid grid-cols-6 mt-72 md:grid-cols-12 w-screen">
          <div className="md:col-span-7 col-span-6 h-96 bg-primary relative flex flex-col justify-center items-center overflow-x-visible mb-20">
            <Link href={link || "#"}>
              <a>
                <h3 className="text-white text-6xl absolute font-thin tracking-wide mb-5 z-10 md:pl-30">
                  {title}
                </h3>
                <ArrayCategory />
              </a>
            </Link>
            <img
              className="w-2/4 bottom-10 z-0 md:w-2/5 md:left-2/3 md:absolute md:bottom-10 bg-center"
              src={img.link || "./images/img-category.png"}
              srcSet={img.srcSet}
            />
          </div>
          <div className="md:col-span-1 hidden"></div>
          <div className="col-span-6 md:col-span-4">
            <h3 className="text-center md:px-36 px-5">{text}</h3>
            <div className=" container md:ml-20 ml-0 flex gap-10 items-center justify-center pr-10 mt-10">
              {undefined !== products && products?.length
                ? products.map((product) => (
                    <div className="col-span-6">
                      <Product key={product?.id} product={product} />
                    </div>
                  ))
                : "Nessun prodotto in questa categoria"}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CategoryProductsLeft;
