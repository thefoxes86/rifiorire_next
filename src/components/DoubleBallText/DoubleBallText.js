import Link from "next/link";

const DoubleBallText = ({ textRight = null, textLeft = null }) => {
  return (
    <section class="grid grid-cols-1 mt-48 gap-1 md:grid-cols-2">
      <div className="flex items-start md:p-72 px-10 justify-center flex-col relative">
        <div className=" w-72 h-72 bg-primary rounded-full md:absolute opacity-90 -top-5 -right-10"></div>
        <h2
          className={`md:text-5xl text-3xl md:p-10 p-5 font-thin text-black text-center absolute top-40`}
        >
          {textLeft}
        </h2>
      </div>

      <div className="flex items-end justify-center md:p-72 px-10 flex-col relative md:m-0 -m-7">
        <div className=" w-72 h-72 bg-secondary rounded-full md:absolute opacity-90 -top-5 -left-10"></div>
        <h2
          className={`md:text-5xl text-3xl md:p-10 p-5 font-thin text-black text-center absolute top-40`}
        >
          {textRight}
        </h2>
      </div>
    </section>
  );
};

export default DoubleBallText;
