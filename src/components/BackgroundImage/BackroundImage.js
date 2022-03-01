import SimpleArrow from "../../components/SVG/SimpleArrow";
import Link from "next/link";

const BackroundImage = ({ img, title = null, text = null, link = null }) => {
  return (
    <div
      className=" relative w-100 h-96 my-20 flex items-center justify-center flex-col bg-cover"
      style={{ backgroundImage: `url(${img})` }}
    >
      {title && (
        <>
          <div className="absolute top-0 left-0 w-screen h-96 bg-black opacity-80 z-0 "></div>
          <h3 className="text-6xl text-white font-thin p-4 z-10">{title}</h3>
          <p className="text-white font-thin mt-8 z-10">{text}</p>
          {link && (
            <div className="absolute z-10 right-5 bottom-3 mr-10 mb-5">
              <Link href={link}>
                <a>
                  <SimpleArrow customClass="w-10" />
                </a>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BackroundImage;
