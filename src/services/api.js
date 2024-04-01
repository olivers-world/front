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
  return (
    await api.get("/inventaire/get")
  ).data;
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
  return (
    await api.get("/nettoyage/get")
  ).data;
};