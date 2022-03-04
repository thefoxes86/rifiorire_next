import Layout from "../../src/components/Layout";
import { useRouter } from "next/router";
import client from "../../src/components/ApolloClient";
import AddToCartButton from "../../src/components/cart/AddToCartButton";
import {
  PRODUCT_BY_SLUG_QUERY,
  PRODUCT_SLUGS,
} from "../../src/queries/product-by-slug";
import { isEmpty } from "lodash";
import GalleryCarousel from "../../src/components/single-product/gallery-carousel";
import Price from "../../src/components/single-product/price";
import Collapsible from "react-collapsible";
import { useEffect, useState } from "react";

export default function Product(props) {
  const [activeImage, setActiveImage] = useState({ src: "", srcSet: "" });
  const { product } = props;

  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const handleActiveImage = (e) => {
    setActiveImage({
      src: e.target.src,
      srcSet: e.target.srcSet,
    });
  };

  useEffect(() => {
    setActiveImage({
      src: product?.image?.sourceUrl,
      srcSet: product?.image?.srcSet,
    });
  }, [product]);

  return (
    <Layout>
      {product ? (
        <div className="single-product container flex flex-wrap items-center pt-4 pb-12 mx-auto">
          <div className="grid grid-cols-1 md:gap-4 gap-0 mt-40  lg:grid-cols-7 xl:grid-cols-7 md:grid-cols-2">
            <div className="col-span-4 md:col-span-1 flex md:flex-col w-100">
              {!isEmpty(product.image) && (
                <div className="w-full">
                  <img
                    src={product?.image?.sourceUrl}
                    alt="Product Image"
                    className="w-auto"
                    srcSet={product?.image?.srcSet}
                    onMouseOver={handleActiveImage}
                  />
                </div>
              )}
              {!isEmpty(product?.galleryImages?.nodes) &&
                product?.galleryImages?.nodes.map((item, index) => (
                  <div className="md:ml-0 ml-2 w-full md:mt-3">
                    <img
                      key={item?.id}
                      src={item?.mediaItemUrl}
                      loading="lazy"
                      onMouseOver={handleActiveImage}
                      alt={item?.altText ? item?.altText : item?.title}
                    />
                  </div>
                ))}
            </div>

            {!isEmpty(product.image) && (
              <div className="w-100 col-span-2 md:mt-0 mt-2">
                <img
                  src={activeImage.src && activeImage.src}
                  alt="Product Image"
                  width="100%"
                  height="auto"
                  className="h-96 md:h-screen object-cover "
                  srcSet={activeImage.srcSet && activeImage.srcSet}
                />
              </div>
            )}

            <div className="product-info ml-8 col-span-4">
              <h4 className=" products-main-title text-3xl uppercase text-left">
                {product?.name}
              </h4>
              <br />
              <div className="flex w-100 border-b border-black"></div>
              <p className=" text-lg uppercase">CODE</p>

              <p className="pt-1 mt-4 text-xl text-gray-900">
                <Price
                  salesPrice={product?.price}
                  regularPrice={product?.regularPrice}
                />
              </p>

              <p
                dangerouslySetInnerHTML={{
                  __html: product.description,
                }}
                className="product-description pt-1 mt-4 text-sm font-thin text-black"
              />

              <div className="pt-1 mt-2">
                <AddToCartButton product={product} />
              </div>
              <div className="pt-1 mt-10">
                <Collapsible
                  trigger="DETTAGLI PRODOTTO"
                  triggerClassName=" text-lg uppercase"
                  triggerOpenedClassName="text-lg uppercase"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product?.productsDetail?.dettagliProdotto,
                    }}
                  ></div>
                </Collapsible>
                <Collapsible
                  trigger="MATERIALI"
                  triggerClassName=" text-lg uppercase"
                  triggerOpenedClassName="text-lg uppercase"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product?.productsDetail?.materiali,
                    }}
                  ></div>
                </Collapsible>
                <Collapsible
                  trigger="DETTAGLI SPEDIZIONE"
                  triggerClassName=" text-lg uppercase"
                  triggerOpenedClassName="text-lg uppercase"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product?.productsDetail?.dettagliSpedizione,
                    }}
                  ></div>
                </Collapsible>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </Layout>
  );
}

export async function getStaticProps(context) {
  const {
    params: { slug },
  } = context;

  const { data } = await client.query({
    query: PRODUCT_BY_SLUG_QUERY,
    variables: { slug },
  });

  return {
    props: {
      product: data?.product || {},
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: PRODUCT_SLUGS,
  });

  const pathsData = [];

  data?.products?.nodes &&
    data?.products?.nodes.map((product) => {
      if (!isEmpty(product?.slug)) {
        pathsData.push({ params: { slug: product?.slug } });
      }
    });

  return {
    paths: pathsData,
    fallback: true,
  };
}
