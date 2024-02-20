/* eslint-disable react/no-unescaped-entities */
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

// Pour importer une image :
// import img from "../images/img-1.png";

const Contact = () => {
  return (
    <div className="absolute h-screen w-screen bg-hero-bg bg-cover after:content['d'] after:bg-opacity-50 after:absolute after:top-0 after:bg-black after:w-screen after:h-screen">
      <NavBar></NavBar>
      
      <div className="z-10 h-screen w-screen absolute flex flex-col justify-center items-center">
        <div className="mb-32 w-fit flex items-center flex-col">
          <h1 className="text-5xl text-white mb-4">Oliver's World</h1>
          <button className="bg-primary text-white px-4 py-2 rounded-sm">
            Réserver ici
          </button>
        </div>
      </div>

      <div className="h-screen w-screen"></div>

      <Footer></Footer>
    </div>
  );
};

export default Contact;
