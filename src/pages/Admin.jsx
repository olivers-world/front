import Dashboard from "../components/Admin/Dashboard/Dashboard";
import MakeRecipeT from "../components/Admin/MakeRecipe/MakeRecipeT";
import { useState, useEffect } from "react";
import EditReservation from "../components/Admin/EditReservation/EditReservation";
import Avis from "../components/Admin/Avis/Avis";
import EditMenu from "../components/Admin/EditMenu/EditMenu";
import AddMenuElement from "../components/Admin/AddMenuElement/AddMenuElement";

const Section = ({
  children,
  display,
  handleSetActiveSection,
  active,
  handleMenu,
  canExpand,
}) => {
  return (
    <section
      className={`cursor-pointer capitalize bg-white py-4 px-4 border-b 
      ${active ? "font-medium" : ""} 
      ${display ? "" : "hidden"}`}
      onClick={() => {
        handleSetActiveSection(children);
        canExpand ? handleMenu() : "";
      }}
    >
      {children}
    </section>
  );
};

const Admin = () => {
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(true);

  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    if (window.innerWidth > 1280) {
      setExpanded(true);
      setCanExpand(false);
    }

    const handleResize = () => {
      if (window.innerWidth > 1280) {
        setExpanded(true);
        setCanExpand(false);
      } else {
        setCanExpand(true);
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
    { name: "modifier les menus", active: false },
    { name: "ajouter, modifier plat...", active: false },
  ]);

  const handleSetActiveSection = (name) => {
    setActiveSection(name);
    if (window.innerWidth < 1280) {
      setExpanded(false);
    }

    setSections((prevSections) =>
      prevSections.map((section) => ({
        ...section,
        active: section.name === name,
      }))
    );
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "confectionner un menu":
        return <MakeRecipeT />;
      case "modifier, annuler une réservation":
        return <EditReservation />;
      case "avis":
        return <Avis />;
      case "modifier les menus":
        return <EditMenu />;
      case "ajouter, modifier plat...":
        return <AddMenuElement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <div className="mx-8 min-h-screen mt-12 md:mt-0">
        <section className="flex flex-wrap max-w-6xl mx-auto my-8 ">
          <aside className=" border h-fit w-full text-center xl:w-fit">
            {sections.map((section, index) => {
              return (
                <Section
                  display={expanded || section.active}
                  key={index}
                  handleMenu={handleMenu}
                  canExpand={canExpand}
                  handleSetActiveSection={handleSetActiveSection}
                  active={section.active}
                >
                  {section.name}
                </Section>
              );
            })}
          </aside>
          <section className="w-full py-4 px-4 xl:max-w-[835px]  border">
            {renderActiveSection()}
          </section>
        </section>
      </div>
    </>
  );
};

export default Admin;


<section className="text-left lg:text-center border border-red-600">
  <h1>Hello world!</h1>
</section>

