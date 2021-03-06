import Layout from "../../src/components/Layout";
import client from "../../src/components/ApolloClient";
import Product from "../../src/components/Product";
import {
  PRODUCT_BY_CATEGORY_SLUG,
  PRODUCT_CATEGORIES_SLUGS,
} from "../../src/queries/product-by-category";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import TitleAndText from "../../src/components/TitleAndText";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default function CategorySingle(props) {
  const [value, setValue] = useState();
  const router = useRouter();

  const handleOnchange = (val) => {
    setValue(val);
  };

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { categoryName, products } = props;

  return (
    <Layout>
      <div className="product-categories-container container mx-auto my-32 px-4 xl:px-0">
        <TitleAndText title={categoryName} color="black" text="" />
        <div className="container mx-auto my-10 w-100 flex flex-col items-start justify-center">
          <Link href="/categorie">
            <a>
              <h3 className="color-primary text-lg font-thin">
                tutte le categorie
              </h3>
            </a>
          </Link>
          <MultiSelect onChange={handleOnchange} options={options} />
        </div>
        <div className="product-categories grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {undefined !== products && products?.length
            ? products.map((product) => (
                <Product key={product?.id} product={product} />
              ))
            : ""}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const {
    params: { slug },
  } = context;

  const { data } = await client.query({
    query: PRODUCT_BY_CATEGORY_SLUG,
    variables: { slug },
  });

  return {
    props: {
      categoryName: data?.productCategory?.name ?? "",
      products: data?.productCategory?.products?.nodes ?? [],
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: PRODUCT_CATEGORIES_SLUGS,
  });

  const pathsData = [];

  data?.productCategories?.nodes &&
    data?.productCategories?.nodes.map((productCategory) => {
      if (!isEmpty(productCategory?.slug)) {
        pathsData.push({ params: { slug: productCategory?.slug } });
      }
    });

  return {
    paths: pathsData,
    fallback: true,
  };
}
