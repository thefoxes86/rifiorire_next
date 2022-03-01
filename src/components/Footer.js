import FooterLink from "./FooterLink";

const Footer = () => (
  <>
    <div
      id="menu-footer"
      className="w-100 grid xs:grid-cols-1 sm:grid-cols-6 md:grid-cols-12 p-16"
    >
      <div className="col-span-3 flex flex-col items-start gap-y-4 my-10">
        <FooterLink
          title="INFO"
          list={[
            { name: "CONTATTI", link: "/contatti" },
            { name: "MATERIALI", link: "/materiali" },
            { name: "GUIDA DELLE TAGLIE", link: "/guida-alle-taglie" },
            { name: "RESI", link: "/reso" },
          ]}
        />
      </div>
      <div className=" col-span-3 flex flex-col items-start gap-y-4  my-10">
        <FooterLink
          title="L'AZIENDA"
          list={[
            { name: "ABOUT US", link: "/about-us" },
            { name: "IL NEGOZIO", link: "#" },
          ]}
        />
      </div>
      <div className=" col-span-3 flex flex-col items-start gap-y-4  my-10">
        <FooterLink
          title="NOTE LEGALI"
          list={[
            { name: "CONDIZIONI DI VENDITA", link: "/condizioni-generali" },
            { name: "PRIVACY POLICY", link: "/privacy-policy" },
          ]}
        />
      </div>
      <div className=" col-span-3 flex flex-col items-start gap-y-4  my-10">
        <FooterLink
          title="COLLEZIONI"
          list={[
            { name: "SPRING 2022", link: "#" },
            { name: "SUMMER 2022", link: "#" },
          ]}
        />
      </div>
    </div>
    <footer className="mx-auto text-center bg-white border-t border-black w-100 shadow">
      <div className="pt-3">
        Copyright &copy; {new Date().getFullYear()}RIFIORIRE S.N.C. - All rights
        reserved
      </div>
      <div className="py-2">
        {" "}
        Privacy Policy - Terms and Conditions - Credits xdesigners{" "}
      </div>
    </footer>
  </>
);

export default Footer;
