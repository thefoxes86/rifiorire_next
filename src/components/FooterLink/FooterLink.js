import Link from "next/link";
const FooterLink = ({ title, list }) => {
  return (
    <>
      <h4 className=" color-black uppercase font-bold">{title || ""}</h4>
      <ul className="flex flex-col gap-2">
        {list &&
          list.map(({ name, link }) => (
            <li>
              <Link href={link}>
                <a>{name}</a>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default FooterLink;
