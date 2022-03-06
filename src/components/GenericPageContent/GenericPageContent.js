const GenericPageContent = ({ title = null, content = "" }) => {
  return (
    <section class="flex flex-col md:px-72 p-5 items-start w-full mt-32 page">
      <h2
        className={`md:text-5xl text-3xl md:py-10 py-5 font-thin text-black text-left top-40`}
      >
        {title}
      </h2>
      <div
        className="py-5 mt-10"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </section>
  );
};

export default GenericPageContent;
