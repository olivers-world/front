import axios from "axios";

const api = axios.create({
  baseURL: "localhost:1945/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const getReservations = async (email, formattedDate, peopleNumber) => {
  return (
    await api.post("/reservation/create", {
      user: email,
      date: formattedDate,
      nbPersonne: peopleNumber,
    })
  ).data;
};

export const getReservationsFake = async () => {
  return [
    {
      ID: 25,
      Utilisateur: "test@fake.fr",
      NbPersonnes: 8,
      DateHeure: "2024-03-15 12:02:00",
      Statut: "Prise",
    },
  ];
};
