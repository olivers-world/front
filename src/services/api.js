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
  return (await api.post("/plat/create", { nom, prix, types })).data;
};

export const getPlat = async () => {
  return (await api.get("/plat/get")).data;
};

export const getPlatsByTypes = async () => {
  return (await api.get("/plat/getByTypes")).data;
};

export const updatePlat = async (id, newNom, newPrix, newTypes) => {
  return (await api.put("/plat/update", { id, newNom, newPrix, newTypes }))
    .data;
};

export const deletePlat = async (id) => {
  return (await api.delete("/plat/delete", { data: { id } })).data;
};

// Menus

export const createMenu = async (menu, prix) => {
  return (await api.post("/menu/create", { menu, prix })).data;
};

export const getMenu = async () => {
  return (await api.get("/menu/get")).data;
};

export const updateMenu = async (id, newMenu, newPrix) => {
  return (await api.put("/menu/update", { id, newMenu, newPrix })).data;
};

export const deleteMenu = async (id) => {
  return (await api.delete("/menu/delete", { data: { id } })).data;
};

// Formule du jour

export const createFormuleDuJour = async (menuID, date) => {
  return (await api.post("/formule/create", { menuID, date })).data;
};

export const getFormuleDuJour = async () => {
  return (await api.get("/formule/get")).data;
};

export const updateFormuleDuJour = async (menuID, newMenuID, newDate) => {
  return (await api.put("/formule/update", { menuID, newMenuID, newDate }))
    .data;
};

export const deleteFormuleDuJour = async (menuID) => {
  return (await api.delete("/formule/delete", { data: { menuID } })).data;
};
