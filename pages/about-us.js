import client from "../src/components/ApolloClient";
import { GQL_RIFIORIRECHISIAMO } from "../src/queries/GQL_RIFIORIRE";

import TitleAndText from "../src/components/TitleAndText";

import BackroundImage from "../src/components/BackgroundImage";
import Helmet from "helmet";
import Layout from "../src/components/Layout";
import DoubleBallText from "../src/components/DoubleBallText";

const AboutUs = ({ page, menu }) => {
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
          title={"ciao siamo Rebecca e Simone"}
          text={
            "Harumquo doluptae doluptas doluptatur re exeratiatus, que corio berum des doluptia quatur, officid ucimolorum doluptatqui dolenihil milles cus as incto offic to et aceri sequia volupta et abore sequo."
          }
          link={""}
          color="violet"
        />
        <BackroundImage img={"/images/demo-about-image.png"} />
        <DoubleBallText
          textLeft="La mia spontaneità e la mia organizzazione… "
          textRight="La mia determinazione la mia spensieratezza…"
        />
        <TitleAndText
          title={"vieni in negozio"}
          text={
            "Vieni a trovarci nel nostro negozio in centro a Viareggio.  Potrai provare tutte le nostre creazioni oppure fare un regalo speciale e personalizzabile. Un’esperienza che ti aiuterà a trovare il giusto gioiello quotidiano…"
          }
          link={"/contatti"}
          color="violet"
        />
        <BackroundImage img={"/images/demo-about-image.png"} />
      </Layout>
    </>
  );
};

export default AboutUs;

export async function getStaticProps() {
  const { data, loading, networkStatus } = await client.query({
    query: GQL_RIFIORIRECHISIAMO,
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
