import Nav from "./Nav";

const Header = ({ menu }) => {
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
