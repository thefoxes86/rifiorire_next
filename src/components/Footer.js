import { useState, useEffect } from "react";
import FooterLink from "./FooterLink";

const Footer = ({ menu }) => {
  const [collezioni, setCollezioni] = useState([]);
  const [categorie, setCategorie] = useState([]);

  useEffect(() => {
    menu.map((el) => {
      el.parentId === "cG9zdDo4OA==" &&
        setCollezioni(...collezioni, { name: el.label, link: el.path });

      el.parentId === "cG9zdDo4OA==" &&
        setCategorie(...categorie, { name: el.label, link: el.path });
    });
  }, [menu]);
  return (
    <>
      <div
        id="menu-footer"
        className="w-100 grid xs:grid-cols-1 sm:grid-cols-6 md:grid-cols-12 p-16"
      >
        <div className="col-span-3 flex flex-col items-start gap-y-4 my-10">
          <FooterLink
            title="INFO"
            list={[
              { name: "RESI", link: "/reso" },
              { name: "CONDIZIONI DI VENDITA", link: "/condizioni-generali" },
              { name: "PRIVACY POLICY", link: "/privacy-policy" },
            ]}
          />
        </div>
        <div className=" col-span-3 flex flex-col items-start gap-y-4  my-10">
          <FooterLink
            title="BRAND"
            list={[
              { name: "CONTATTI", link: "/contatti" },
              { name: "ABOUT US", link: "/about-us" },
            ]}
          />
        </div>

        <div className=" col-span-3 flex flex-col items-start gap-y-4  my-10">
          {/* {categorie && <FooterLink title="CATEGORIE" list={categorie} />} */}
        </div>
        <div className=" col-span-3 flex flex-col items-start gap-y-4  my-10">
          <>
            {/* {collezioni && <FooterLink title="COLLEZIONI" list={collezioni} />} */}
          </>
        </div>
      </div>
      <footer className="mx-auto text-center bg-white border-t border-black w-100 shadow">
        <div className="pt-3">
          Copyright &copy; {new Date().getFullYear()}RIFIORIRE S.N.C. - All
          rights reserved
        </div>
        <div className="py-2"> Privacy Policy - Terms and Conditions</div>
      </footer>
    </>
  );
};

export default Footer;
