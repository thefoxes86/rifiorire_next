import Head from "next/head";
import { AppProvider } from "./context/AppContext";
import Header from "./Header";
import Footer from "./Footer";
import client from "./ApolloClient";
import Router from "next/router";
import NProgress from "nprogress";
import { ApolloProvider } from "@apollo/client";
import { GQL_RIFIOMENU } from "../queries/GQL_RIFIORIRE";
import { useState, useRef } from "react";
import Loading from "./Loading";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
// const scroll = new LocomotiveScroll();
const Layout = (props) => {
  const containerRef = useRef(null);
  const menuQuery = client.query({ query: GQL_RIFIOMENU });
  const [menu, setMenu] = useState();
  menuQuery.then((res) => setMenu(res.data?.menu?.menuItems?.nodes));

  return (
    // <LocomotiveScrollProvider
    //   options={{
    //     smooth: true,
    //     getDirection: true,
    //     // ... all available Locomotive Scroll instance options
    //   }}
    //   watch={
    //     [
    //       //..all the dependencies you want to watch to update the scroll.
    //       //  Basicaly, you would want to watch page/location changes
    //       //  For exemple, on Next.js you would want to watch properties like `router.asPath` (you may want to add more criterias if the instance should be update on locations with query parameters)
    //     ]
    //   }
    //   containerRef={containerRef}
    // >
    // <main className="main-container" data-scroll-container ref={containerRef}>
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
    // </main>
    // </LocomotiveScrollProvider>
  );
};

export default Layout;
