import Nav from "./Nav";
import { GQL_RIFIOMENU } from "../queries/GQL_RIFIORIRE";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

const Header = () => {
  const { data } = useQuery(GQL_RIFIOMENU);
  const [menu, setMenu] = useState();

  useEffect(() => {
    data && setMenu(data.menu.menuItems.nodes);
  }, [data]);
  return (
    <>
      {menu && (
        <div className="header">
          <Nav menu={menu} />
        </div>
      )}
    </>
  );
};

export default Header;
