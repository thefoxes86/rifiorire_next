const GenericPageContent = ({ title = null, content = "" }) => {
  return (
    <section class="flex flex-col md:px-36 p-5 items-start w-full mt-32">
      <h2
        className={`md:text-5xl text-3xl md:p-10 p-5 font-thin text-black text-center top-40`}
      >
        {title}
      </h2>
      <div
        className="p-5 mt-10"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </section>
  );
};

export default GenericPageContent;
