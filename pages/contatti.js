import client from "../src/components/ApolloClient";
import { GQL_RIFIORIRECONTATTI } from "../src/queries/GQL_RIFIORIRE";
import TitleAndText from "../src/components/TitleAndText";
import Helmet from "helmet";
import Layout from "../src/components/Layout";
import ContactForm from "../src/components/ContactForm";
import AddressMap from "../src/components/AddressMap/AddressMap";

const Contatti = ({ page, menu }) => {
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
        <TitleAndText
          title={"Scrivici per maggiori dettagli"}
          text={
            "Contattaci senza impegno. Se ci racconti quali sono le tue esigenze, saremo lieti di risponderti via e-mail entro 24 ore. Se preferisci parlarci a voce, diccelo senza problemi e ti telefoneremo!"
          }
          color="violet"
        />
        <ContactForm />
        <div className="mt-10 w-screen h-72 overflow-hidden">
          {/* <AddressMap /> */}
        </div>
      </Layout>
    </>
  );
};

export default Contatti;

export async function getStaticProps() {
  const { data, loading, networkStatus } = await client.query({
    query: GQL_RIFIORIRECONTATTI,
  });

  return {
    props: {
      page: data.page,
      loading,
      networkStatus,
    },
    revalidate: 1,
  };
}
