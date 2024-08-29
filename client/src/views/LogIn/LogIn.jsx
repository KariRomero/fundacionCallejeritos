import LogInComponent from "../../components/LogInComponent/LogInComponent";

const LogIn = () => {
  return (
    <section className="min-h-screen flex items-center justify-center p-8">
      <div className="flex items-center justify-center space-x-16">
        <div>
          <h1 className="title">Bienvenido a la Fundación</h1>
          <p className="paragraph max-w-md">
            Estamos comprometidos con el rescate y cuidado de animales. Inicia sesión para ser parte de nuestra misión.
          </p>
        </div>
        <LogInComponent />
      </div>
    </section>
  );
};

export default LogIn;
