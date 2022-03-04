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
            "e siamo i titolari e fondatori di Rifiorire Jewels. La nascita del nostro Brand ha origine con il nostro incontro: l’incontro di due ragazzi innamorati con un punto di domanda sul proprio futuro. Il nostro continuo frequentarci e confrontarci, ci ha portato a voler esprimere la nostra voglia di fare, creando qualcosa che rispecchiasse le nostre passioni ed i nostri valori. Per portare avanti ciò, ci siamo esposti in prima persona, con lo scopo di trasmettere la nostra trasparenza, affidabilità e cura del dettaglio, con maggior efficacia. Non ci soffermiamo troppo su noi due, non siamo noi l’oggetto reale del discorso, lo sono i nostri gioielli. Le collezioni e i prodotti Rifiorire sono il frutto di un’attenta e continua ricerca, per far sì che i nostri clienti abbiano sempre qualcosa di originale e versatile, con un tocco di classe in più, che rende unica la persona che li indossa."
          }
          link={""}
          color="violet"
        />
        <BackroundImage
          img={
            "https://backoffice.rifiorire.com/wp-content/uploads/2022/03/REV-about-rifiorire_home-scaled.jpg"
          }
        />
        <DoubleBallText
          textLeft="Il mio essere socievole e determinata "
          textRight="Il mio essere responsabile e creativo "
        />
        <TitleAndText
          title={"vieni in negozio"}
          text={
            "Vieni a trovarci nel nostro store in centro a Viareggio. Saremo a tua disposizione per regalarti la miglior esperienza di acquisto: un’esperienza che ti aiuterà a trovare il giusto regalo per te stess* o per una persona cara."
          }
          link={"/contatti"}
          color="violet"
        />
        <BackroundImage
          img={
            "https://backoffice.rifiorire.com/wp-content/uploads/2022/03/REV-foto-interno-negozio_home-scaled.jpg"
          }
        />
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
