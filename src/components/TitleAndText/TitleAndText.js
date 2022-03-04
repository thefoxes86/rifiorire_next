import Link from "next/link";

const TitleAndText = ({
  title,
  text = "",
  link = "",
  color,
  textLink = null,
}) => {
  return (
    <>
      <section class="grid grid-cols-1 gap-1 my-40 md:grid-cols-2">
        <div className="flex items-center justify-center">
          <h2
            className={`md:text-7xl text-5xl md:p-12 p-5 font-thin color-${color} text-center`}
          >
            {title}
          </h2>
        </div>

        <div
          className="flex items-start justify-center p-10 lg:px-48 px-10 flex-col"
          style={{ borderLeft: "1px solid black" }}
        >
          <p className={`color-${color} text-center`}>{text}</p>
          {link && (
            <p className="mt-10 text-center w-full">
              <Link href={link} className="text-center">
                <a className="text-center">{textLink} </a>
              </Link>
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default TitleAndText;
