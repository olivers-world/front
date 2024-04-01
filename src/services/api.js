import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1945/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Rerservations

export const createReservations = async (
  email,
  nom,
  formattedDate,
  peopleNumber
) => {
  return (
    await api.post("/reservation/create", {
      email: email,
      nom: nom,
      date: formattedDate,
      nbPersonne: peopleNumber,
    })
  ).data;
};

export const getReservations = async (from, to) => {
  return (
    await api.get("/reservation/get", {
      params: {
        from: from,
        to: to,
      },
    })
  ).data;
};

export const updateReservation = async (id, nom, dateHeure, nbPersonne) => {
  return (
    await api.put("/reservation/update", {
      reservationId: id,
      newNom: nom,
      newDate: dateHeure,
      newNbPersonne: nbPersonne,
    })
  ).data;
};

export const deleteReservation = async (id) => {
  return (
    await api.delete("/reservation/delete", {
      data: { reservationId: id },
    })
  ).data;
};

// Inventaires

export const createInventaire = async (date) => {
  return (
    await api.post("/inventaire/create", {
      date: date,
    })
  ).data;
};

export const getMostRecentInventaire = async () => {
  return (await api.get("/inventaire/get")).data;
};

// Nettoyages

export const createNettoyage = async (date) => {
  return (
    await api.post("/nettoyage/create", {
      date: date,
    })
  ).data;
};

export const getMostRecentNettoyage = async () => {
  return (await api.get("/nettoyage/get")).data;
};

// Plats

export const createPlat = async (nom, prix, types) => {
  return (
    await api.post("/plat/create", {
      nom: nom,
      prix: prix,
      types: types,
    })
  ).data;
};

export const getPlat = async () => {
  return (await api.get("/plat/get")).data;
};

export const getPlatsByTypes = async () => {
  return (await api.get("/plat/getByTypes")).data;
};

export const updatePlat = async (nom, newNom, newPrix, newTypes) => {
  return (
    await api.put("/plat/update", {
      nom: nom,
      newNom: newNom,
      newPrix: newPrix,
      newTypes: newTypes,
    })
  ).data;
};

export const deletePlat = async (nom) => {
  return (
    await api.delete("/plat/delete", {
      data: { nom: nom },
    })
  ).data;
};


// Menus

export const createMenu = async (menu, prix) => {
  return (
    await api.post("/menu/create", {
      menu: menu,
      prix: prix
    })
  ).data;
};

export const getMenu = async () => {
  return (await api.get("/menu/get")).data;
};

export const updateMenu = async (menu, newMenu, newPrix) => {
  return (
    await api.put("/menu/update", {
      menu: menu,
      newMenu: newMenu,
      newPrix: newPrix
    })
  ).data;
};

export const deleteMenu = async (menu) => {
  return (
    await api.delete("/menu/delete", {
      data: { menu: menu },
    })
  ).data;
};
