import client from "../src/components/ApolloClient";
import { GQL_RIFIORIRECONTATTI } from "../src/queries/GQL_RIFIORIRE";
import TitleAndText from "../src/components/TitleAndText";
import Helmet from "helmet";
import Layout from "../src/components/Layout";
import ContactForm from "../src/components/ContactForm";

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
            "Una collezione pensata per……. Harumquo doluptae doluptas doluptatur re exeratiatus, que corio berum des doluptia quatur, officid ucimolorum doluptatqui dolenihil milles cus as incto offic to et aceri sequia volupta et abore sequo."
          }
          color="violet"
        />
        <ContactForm />
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
