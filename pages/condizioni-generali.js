import client from "../src/components/ApolloClient";
import { GQL_RIFIORIREGENERICPAGE } from "../src/queries/GQL_RIFIORIRE";

import Helmet from "helmet";
import Layout from "../src/components/Layout";

import GenericPageContent from "../src/components/GenericPageContent";

const CondizioniGenerali = ({ page, menu }) => {
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
        <GenericPageContent title={page?.title} content={page?.content} />
      </Layout>
    </>
  );
};

export default CondizioniGenerali;

export async function getStaticProps() {
  const { data, loading, networkStatus } = await client.query({
    query: GQL_RIFIORIREGENERICPAGE,
    variables: {
      idPage: "167",
    },
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
