import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1945/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Rerservations

export const createReservations = async (email, nom, formattedDate, peopleNumber) => {
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
      params: { // Ajoutez cet objet pour contenir les paramètres
        from: from,
        to: to,
      },
    })
  ).data;
};