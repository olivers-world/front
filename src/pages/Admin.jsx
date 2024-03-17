import React from "react";
import NavBar from "../components/NavBar";
import Dashboard from "../components/Dashboard";
import Footer from "../components/Footer";
import MakeRecipe from "@/components/MakeRecipe";
import { useState, useEffect } from "react";

const Section = ({ children, display, handleSetActiveSection, active }) => {
  return (
    <section
      className={`cursor-pointer capitalize bg-white py-4 px-4 border-b 
      ${active ? "font-medium" : ""} 
      ${display ? "" : "hidden"}`}
      onClick={() => handleSetActiveSection(children)}
    >
      {children}
    </section>
  );
};

const Burger = ({ expanded, handleMenu }) => {
  return (
    <div
      className={`absolute text-primary ${
        expanded ? "-rotate-90" : ""
      } transition-all duration-500 origin-center xl:hidden right-[15%] cursor-pointer top-5 w-fit h-fit font-medium text-xl z-40`}
      onClick={() => handleMenu()}
    >
      <div className="flex flex-col gap-1">
        <div className="h-[0.15em] w-8 rounded bg-primary"></div>
        <div className="h-[0.15em] w-8 rounded bg-primary"></div>
        <div className="h-[0.15em] w-8 rounded bg-primary"></div>
      </div>
    </div>
  );
};

const Admin = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    if (window.innerWidth > 1280) {
      setExpanded(true);
    }

    const handleResize = () => {
      if (window.innerWidth > 1280) {
        setExpanded(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenu = () => {
    setExpanded(!expanded);
  };

  const [sections, setSections] = useState([
    { name: "dashboard", active: true },
    { name: "confectionner un menu", active: false },
    { name: "modifier, annuler une réservation", active: false },
    { name: "avis", active: false },
  ]);

  const handleSetActiveSection = (name) => {
    setSections((prevSections) =>
      prevSections.map((section) => ({
        ...section,
        active: section.name === name,
      }))
    );

    console.log("chech");
  };

  return (
    <>
      <NavBar linkscolor="black" />

      <div className="h-[100px]"></div>

      <div className="mx-8 min-h-screen">
        <section className="flex flex-wrap max-w-6xl mx-auto my-8 ">
          <aside className="relative border w-full text-center xl:w-fit">
            <Burger handleMenu={handleMenu} expanded={expanded} />
            {sections.map((section, index) => {
              return (
                <Section
                  display={expanded || section.active}
                  key={index}
                  handleSetActiveSection={handleSetActiveSection}
                  active={section.active}
                >
                  {section.name}
                </Section>
              );
            })}
          </aside>
          <section className="w-full py-4 px-4 xl:max-w-[835px]  border">
            {/*<Dashboard /> */}
            <MakeRecipe />
          </section>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Admin;
