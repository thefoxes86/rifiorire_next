import Head from "next/head";
import { AppProvider } from "./context/AppContext";
import Header from "./Header";
import Footer from "./Footer";
import client from "./ApolloClient";
import Router from "next/router";
import NProgress from "nprogress";
import { ApolloProvider } from "@apollo/client";
import { GQL_RIFIOMENU } from "../queries/GQL_RIFIORIRE";
import { useState } from "react";
import Loading from "./Loading";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const Layout = (props) => {
  const menuQuery = client.query({ query: GQL_RIFIOMENU });
  const [menu, setMenu] = useState();
  menuQuery.then((res) => setMenu(res.data?.menu?.menuItems?.nodes));

  return (
    <AppProvider>
      <ApolloProvider client={client}>
        {!menu ? (
          <Loading />
        ) : (
          <div>
            <Head>
              <title>Woocommerce React Theme</title>
            </Head>
            <Header menu={menu} />
            {props.children}
            <Footer menu={menu} />
          </div>
        )}
      </ApolloProvider>
    </AppProvider>
  );
};

export default Layout;
