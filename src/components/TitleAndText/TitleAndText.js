import Link from "next/link";

const TitleAndText = ({ title, text, link, color }) => {
  return (
    <>
      <section class="grid grid-cols-1 gap-1 my-40 md:pl-16 md:grid-cols-2">
        <div className="flex items-center justify-end">
          <h2 className={`text-7xl p-10 font-thin color-${color}`}>{title}</h2>
        </div>

        <div
          className="flex items-start justify-center p-10 flex-col"
          style={{ borderLeft: "1px solid black" }}
        >
          <p className={`color-${color}`}>{text}</p>
          {link && (
            <p className="mt-10">
              <Link href={link}>
                <a>view our selection</a>
              </Link>
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default TitleAndText;
