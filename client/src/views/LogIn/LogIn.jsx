import LogInComponent from "../../components/LogInComponent/LogInComponent";

const LogIn = () => {
  return (
    <section className="min-h-screen flex items-center justify-center p-8">
      <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-x-16 md:space-y-0">
        <div className="text-center md:text-left">
          <h1 className="title text-2xl font-bold">Bienvenido a la Fundación</h1>
          <p className="paragraph max-w-md mx-auto md:mx-0">
            Estamos comprometidos con el rescate y cuidado de animales. Inicia sesión para ser parte de nuestra misión.
          </p>
        </div>
        <LogInComponent />
      </div>
    </section>
  );
};

export default LogIn;
