import React from "react";
import NavBar from "../components/NavBar";
import Dashboard from "../components/Dashboard";
import Footer from "../components/Footer";

const Admin = () => {
  return (
    <>
      <NavBar linkscolor="black" />
      <div className="h-[100px]"></div>
      <div className="mx-8 min-h-screen">
        <section className="flex flex-wrap max-w-6xl mx-auto my-8 ">
          <aside className="border w-fit">
            <section className="py-4 px-4 border-b font-medium">
              Dashboard
            </section>
            <section className="py-4 px-4 border-b">
              Confectionner un plat
            </section>
            <section className="py-4 px-4 border-b">
              Modifier, annuler une réservation
            </section>

            <section className="py-4 px-4 border-b">Avis</section>
          </aside>
          <section className="w-full py-4 px-4 max-w-[835px] border">
            <Dashboard></Dashboard>
          </section>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
