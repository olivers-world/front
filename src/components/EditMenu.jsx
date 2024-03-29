
import EditMenuBlock from "./EditMenuBlock";

const EditMenu = () => {
  const dataItems = [
    {
      category: "Entrées",
      items: [
        "Trio de bruschettas",
        "Salade de chèvre chaud",
        "Assiette de charcuterie",
        "Carpaccio de saumon",
        "Soupe à l'oignon gratinée",
      ],
    },
    {
      category: "Plats Principaux",
      items: [
        "Filet mignon",
        "Poulet rôti",
        "Pâtes aux fruits de mer",
        "Ratatouille",
        "Tarte à l'agneau",
      ],
    },
    {
      category: "Desserts",
      items: [
        "Tiramisu",
        "Crème brûlée",
        "Fondant au chocolat",
        "Tarte aux pommes",
        "Profiteroles",
      ],
    },
    {
      category: "Boissons",
      items: [
        "Vin rouge",
        "Vin blanc",
        "Bières artisanales",
        "Cocktails",
        "Jus de fruits frais",
      ],
    },
  ];

  const dataMenu = [
    {
      id: "1",
      name: "Le Charcutier",
      entrees: ["Trio de bruschettas"],
      platsPrincipaux: ["Filet mignon"],
      price: 18,
      desserts: [
        "Tiramisu",
        "Crème brûlée",
        "Fondant au chocolat",
        "Tarte aux pommes",
        "Profiteroles",
      ],
      boissons: [
        "Vin rouge",
        "Vin blanc",
        "Bières artisanales",
        "Cocktails",
        "Jus de fruits frais",
      ],
    },
    {
      id: "2",
      name: "Le Deuxieme",
      entrees: ["Trio de bruschettas"],
      platsPrincipaux: ["Filet mignon"],
      price: 12,
      desserts: ["Tiramisu", "Tarte aux pommes", "Profiteroles"],
      boissons: ["Vin rouge", "Cocktails", "Jus de fruits frais"],
    },
  ];

  return (
    <div className="flex flex-wrap gap-6  p-2">
      {dataMenu.map((menu, index) => {
        return (
          <EditMenuBlock
            key={`menu${index}`}
            dataItems={dataItems}
            dataMenu={menu}
          ></EditMenuBlock>
        );
      })}
    </div>
  );
};

export default EditMenu;
