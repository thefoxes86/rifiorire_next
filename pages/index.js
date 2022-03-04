import client from "../src/components/ApolloClient";
import {
  FIRST_CATEGORY_HOME,
  GQL_RIFIORIRECASA,
} from "../src/queries/GQL_RIFIORIRE";
import Slider from "../src/components/Slider";
import TitleAndText from "../src/components/TitleAndText";
import CategoryProductsLeft from "../src/components/CategoryProductsLeft";
import CategoryProductsRight from "../src/components/CategoryProductsRight";
import CustomButton from "../src/components/CustomButton";
import BackroundImage from "../src/components/BackgroundImage";
import Helmet from "helmet";
import Layout from "../src/components/Layout";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const Home = ({ page, pagebuilder, menu }) => {
  const [products, setProducts] = useState({
    firstCategory: "",
    secondCategory: "",
  });
  const productRequest =
    pagebuilder &&
    client.query({
      query: FIRST_CATEGORY_HOME,
      variables: {
        cat1: pagebuilder?.category || "all",
        cat2: pagebuilder?.category2 || "all",
      },
    });

  productRequest.then((res) => {
    setProducts(res.data);
  });

  return (
    <>
      <Layout menu={menu}>
        <Helmet>
          <title>{page.title ? page.title : ""}</title>
          <meta name="description" content="WooCommerce webshop" />
          <meta name="keywords" content="Ecommerce, WooCommerce" />
          <meta
            property="og:title"
            content={page.title ? page.title : ""}
            key="pagetitle"
          />
        </Helmet>

        {pagebuilder && (
          <>
            <Slider slides={pagebuilder?.slides} />
            <TitleAndText
              title={pagebuilder?.singleTitleSection1 || ""}
              text={pagebuilder?.singleTextSection1 || ""}
              link={pagebuilder?.singleLinkSection1 || "#"}
              textLink={pagebuilder?.singleLinkText1 || ""}
              color="violet"
            />
            {products?.firstCategory && (
              <CategoryProductsLeft
                title={pagebuilder?.titleCategory1 || ""}
                link={`/category/${pagebuilder.category}` || "#"}
                img={pagebuilder?.imageCategory1 || ""}
                text={pagebuilder?.textCategory1 || ""}
                products={products?.firstCategory?.nodes}
              />
            )}
            {products?.secondCategory && (
              <CategoryProductsRight
                title={pagebuilder?.titleCategory2 || ""}
                link={`/category/${pagebuilder.category2}` || "#"}
                text={pagebuilder?.textCategory1 || ""}
                img={pagebuilder?.imageCategory2 || ""}
                products={products?.secondCategory?.nodes}
              />
            )}
            {/* <CustomButton
              path="#"
              text="Category"
              withLine={true}
              color="black"
            /> */}

            <BackroundImage
              img={
                (pagebuilder?.aboutSectionImage?.mediaItemUrl &&
                  pagebuilder?.aboutSectionImage?.mediaItemUrl) ||
                "images/demo-about-image.png"
              }
              title={pagebuilder?.aboutSectionTitle}
              text={pagebuilder?.aboutSectionText}
              link="/about-us"
            />
            <TitleAndText
              title={pagebuilder?.singleTitleSection2 || ""}
              text={pagebuilder?.singleTextSection2 || ""}
              link={pagebuilder?.singleLinkSection2 || "#"}
              textLink={pagebuilder?.singleLinkText2 || ""}
              color="primary"
            />
            <BackroundImage
              img={
                pagebuilder?.imagePreFooterFull?.mediaItemUrl ||
                "images/demo-footer-img.png"
              }
            />
          </>
        )}
      </Layout>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const { data, loading, networkStatus } = await client.query({
    query: GQL_RIFIORIRECASA,
  });

  return {
    props: {
      page: data?.page,
      pagebuilder: data?.page?.pagebuilder,
      loading,
      networkStatus,
    },
    revalidate: 1,
  };
}
