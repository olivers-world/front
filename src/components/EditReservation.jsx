import React from "react";
import { useState, useEffect } from "react";
import axios from "@/api/axios";

const GET_URL = "/api/reservation/get";

const ReservationBlock = ({
  id, // Supposons que chaque réservation a un id unique
  initialName,
  initialDate,
  initialTime,
  initialPeopleNumber,
  onUpdate,
}) => {
  const [name, setName] = useState(initialName);
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);
  const [peopleNumber, setPeopleNumber] = useState(initialPeopleNumber);

  // Logique pour gérer les changements d'état et l'envoi des données
  const sendUpdateToServer = async () => {};

  return (
    <div className="bg-secondary w-fit text-white rounded-md p-2 mt-4">
      <div className="flex gap-6">
        <div className="font-medium">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-secondary w-24 uppercase text-white"
          />
        </div>
        <div>
          <svg
            className={`inline  mr-1  svg-icon cursor-pointer text-white w-4 align-middle overflow-hidden`}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M737.236281 284.26342c0 139.840928-114.332754 253.224348-255.411942 253.224348-141.079188 0-255.370667-113.38342-255.370667-253.224348 0-139.923478 114.332754-253.306899 255.411942-253.306898 141.079188 0 255.370667 113.38342 255.370667 253.306898z m-255.411942 253.224348c235.145739 0 425.672812 142.4 425.672811 411.845565H56.192802c0-269.445565 190.527072-411.845565 425.672812-411.845565z"
            />
          </svg>
          <input
            type="number"
            value={peopleNumber}
            onChange={(e) => setPeopleNumber(parseInt(e.target.value, 10))}
            className="bg-secondary w-12 text-white"
          />
        </div>
      </div>
      <input
        type="date"
        value={date}
        className="bg-secondary"
        onChange={(e) => setDate(e.target.value)}
      />
      <br />
      <input
        type="time"
        value={time}
        className="bg-secondary"
        onChange={(e) => setTime(e.target.value)}
      />

      <div className="mt-2">
        <button
          onClick={sendUpdateToServer}
          className="bg-white text-primary px-4 py-1 mr-2 rounded-sm"
        >
          Modifier
        </button>
        <button className="bg-white text-primary px-4 py-1  rounded-sm">
          Annuler
        </button>
      </div>
    </div>
  );
};

//////////////////// PARENT

const EditReservation = () => {
  const todayDate = new Date();
  const todayHours = new Date().getHours();
  const todayMinutes = new Date().getMinutes();

  const [filterDate, setFilterDate] = useState(
    todayDate.toISOString().split("T")[0]
  );
  const [filterName, setFilterName] = useState();
  const [filterTime, setFilterTime] = useState(
    `${todayHours}:${todayMinutes < 10 ? "0" : "" + todayMinutes}`
  );

  const [reservations, setReservations] = useState([]);

  const getReservations = async () => {
    console.log("djej3");

    const formattedDate = `${filterDate} ${filterTime}:00`;
    console.log(formattedDate);

    console.log("djej4");

    try {
      const reponse = await axios.get(GET_URL, {
        params: { dateHeure: formattedDate },
      });

      setReservations(reponse.data);
    } catch (error) {
      console.error(
        "EditReservation : Erreur lors de la récupération des réservations",
        error
      );
    }
  };

  useEffect(() => {
    console.log("djej");

    getReservations();
    console.log("djej2");
  }, [filterDate, filterTime]);

  const updateReservationInState = (updatedReservation) => {
    setReservations(
      reservations.map((reservation) =>
        reservation.id === updatedReservation.id
          ? updatedReservation
          : reservation
      )
    );
  };

  return (
    <>
      <div className="flex gap-4">
        <div>
          <label htmlFor="">Nom : </label>
          <input
            type="text"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="border w-42 px-2 py-2 rounded-sm mb-2 "
          />
        </div>
        <div>
          <label htmlFor="">Date : </label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border w-32 px-2 py-2 rounded-sm mb-2 "
          />
        </div>
        <div>
          <label htmlFor="">Heure : </label>
          <input
            type="time"
            value={filterTime}
            onChange={(e) => setFilterTime(e.target.value)}
            className="border w-24 px-2 py-2 rounded-sm mb-2 "
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {reservations.map((reservation, index) => {
          return (
            <ReservationBlock
              key={`reservation${reservation.id}`}
              id={reservation.id}
              initialName={reservation.name}
              initialDate={reservation.date}
              initialTime={reservation.time}
              initialPeopleNumber={reservation.peopleNumber}
              onUpdate={updateReservationInState}
            />
          );
        })}
      </div>
    </>
  );
};

export default EditReservation;
