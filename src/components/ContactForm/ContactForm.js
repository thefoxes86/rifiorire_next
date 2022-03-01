import { useForm } from "react-hook-form";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <section class="grid grid-cols-1 gap-1 my-40 md:pl-16 md:grid-cols-2">
        <div className="flex items-center flex-col">
          <div className=" w-72 h-72 bg-primary rounded-full opacity-90"></div>
          <div className=" w-72 h-72 bg-secondary rounded-full opacity-90 -mt-10"></div>
        </div>

        <div className="flex items-start justify-center p-10 flex-col">
          <form
            className="flex flex-col gap-3 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* register your input into the hook by invoking the "register" function */}
            <input
              placeholder="Nome"
              className=" border border-black rounded-none px-5 py-2 outline-1 outline-red-300"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className=" text-red-600 text-sm">Campo obbligatorio</span>
            )}
            <input
              placeholder="Mail"
              className=" border border-black rounded-none px-5 py-2 outline-1 outline-red-300"
              {...register("mail", { required: true })}
            />
            {errors.mail && (
              <span className=" text-red-600 text-sm">Campo obbligatorio</span>
            )}
            <input
              placeholder="Oggetto"
              className=" border border-black rounded-none px-5 py-2 outline-1 outline-red-300"
              {...register("oggetto", { required: true })}
            />
            {errors.oggetto && (
              <span className=" text-red-600 text-sm">Campo obbligatorio</span>
            )}
            <textarea
              placeholder="Messaggio"
              className=" border border-black rounded-none h-36 px-5 py-2 outline-1 outline-red-300"
              {...register("messaggio")}
            />

            {/* errors will return when field validation fails  */}

            <input
              className="px-5 py-3 uppercase font-thin bg-secondary text-white hover:bg-primary w-32 text-center"
              type="submit"
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
