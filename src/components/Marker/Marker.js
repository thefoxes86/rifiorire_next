const Marker = ({ name, color }) => {
  return (
    <button
      className={`absolute xl:top-72 lg:top-44 top-24 lg:px-7 lg:py-2 px-4 py-0  -left-2 bg-${color} rounded-tl-3xl rounded-br-3xl px-7 py-2 text-white lowercase w-auto`}
    >
      {name}
    </button>
  );
};

export default Marker;
