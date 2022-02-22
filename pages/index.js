import client from "../src/components/ApolloClient";
import { GQL_RIFIORIRECASA } from "../src/queries/GQL_RIFIORIRE";
import Slider from "../src/components/Slider";
import TitleAndText from "../src/components/TitleAndText";
import CategoryProductsLeft from "../src/components/CategoryProductsLeft";
import CategoryProductsRight from "../src/components/CategoryProductsRight";
import CustomButton from "../src/components/CustomButton";
import BackroundImage from "../src/components/BackgroundImage";
import Helmet from "helmet";
import Layout from "../src/components/Layout";

const Home = ({ secondCategory, firstCategory, page, pagebuilder, menu }) => {
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
        <Slider />
        <TitleAndText
          title={pagebuilder.titleSection1 || ""}
          text={pagebuilder.textSections1 || ""}
          link={pagebuilder.linkSection1 || "#"}
          color="violet"
        />
        <CategoryProductsLeft
          title={pagebuilder.titleCategory1 || ""}
          link={pagebuilder.linkSection1 || "#"}
          img={pagebuilder.imageCategory1 || ""}
          products={firstCategory}
        />
        <CategoryProductsRight
          title={pagebuilder.titleCategory2 || ""}
          link={pagebuilder.linkSection2 || "#"}
          img={pagebuilder.imageCategory2 || ""}
          products={secondCategory}
        />
        <CustomButton path="#" text="Category" withLine={true} color="black" />
        {/* {secondCategory && <IndexProductsLittle products={secondCategory} />} */}
        <BackroundImage
          img="images/demo-about-image.png"
          title="Ciao, siamo Rebecca e Simone"
          text="Pensiamo che ogni gioiello debba essere…"
          link="#"
        />
        <TitleAndText
          title={pagebuilder.titleSection2 || ""}
          text={pagebuilder.textSection2 || ""}
          link={pagebuilder.linkSection2 || "#"}
          color="primary"
        />
        <BackroundImage img="images/demo-footer-img.png" />
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
      page: data.page,
      menu: data.menu.menuItems.nodes,
      pagebuilder: data.page.pagebuilder,
      firstCategory: data.firstCategory.nodes,
      secondCategory: data.secondCategory.nodes,
      loading,
      networkStatus,
    },
    revalidate: 1,
  };
}
