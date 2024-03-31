import PropTypes from "prop-types"
import { useState, useEffect } from "react";
import { getReservations, deleteReservation, updateReservation } from "@/services/api.js";
import { useSnackbar } from "notistack";

const ReservationBlock = ({
  id,
  initialName,
  initialDate,
  initialTime,
  initialPeopleNumber,
  DateHeure,
  onDelete
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState(initialName);
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);
  const [peopleNumber, setPeopleNumber] = useState(initialPeopleNumber);

  const formatDateToISO = (date) => {
    const tzOffset = new Date().getTimezoneOffset() * 60000; // offset en millisecondes
    const localISOTime = (new Date(date - tzOffset)).toISOString().slice(0, -1);
    return localISOTime;
  };

  // Logique pour gérer les changements d'état et l'envoi des données
  const UpdateReservation = async () => {
    console.log("name : " + name);
    console.log("date : " + date);
    console.log("time : " + time);
    console.log("peopleNumber : " + peopleNumber);

    const newDate = new Date(date + 'T' + time);
    const formattedDate = formatDateToISO(newDate);
    console.log("newDate : " + newDate);

    try {
      const response = await updateReservation(id, name, formattedDate, peopleNumber);
      enqueueSnackbar('Réservation modifiée',{variant:"success"});
    } catch (error) {
      enqueueSnackbar("Erreur lors de la modification!",{variant:"error"});
      console.error("Erreur lors de la modification de la réservation", error);
    }
  };

  const DeleteReservation = async () => {
    try {
      const response = await deleteReservation(id);
      onDelete(id);
      enqueueSnackbar('Réservation annulée',{variant:"success"});
    } catch (error) {
      enqueueSnackbar("Erreur lors de l'annulation!",{variant:"error"});
      console.error("Erreur lors de la suppression de la réservation", error);
    }
  };

  return (
    <div className="bg-secondary w-fit min-w-[204px] flex-1 max-w-[250px] text-white rounded-md p-2 mt-4">
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

      <div className="mt-2 flex justify-between">
        <button
          onClick={UpdateReservation}
          className="bg-white text-primary px-4 py-1 mr-2 rounded-sm"
        >
          Modifier
        </button>
        <button 
          onClick={DeleteReservation}
          className="bg-white text-primary px-4 py-1  rounded-sm">
          Annuler
        </button>
      </div>
    </div>
  );
};

ReservationBlock.propTypes = {
  id: PropTypes.number,
  initialDate: PropTypes.any,
  initialName: PropTypes.string,
  initialPeopleNumber: PropTypes.number,
  initialTime: PropTypes.any,
  DateHeure: PropTypes.any,
  onUpdate: PropTypes.func
}

//////////////////// PARENT

const EditReservation = () => {
  const todayDate = new Date();
  const todayHours = new Date().getHours();
  const todayMinutes = new Date().getMinutes();

  const [filterDate, setFilterDate] = useState(
    todayDate.toISOString().split("T")[0]
  );
  const [filterName, setFilterName] = useState("");
  const [filterTime, setFilterTime] = useState(
    `${todayHours}:${todayMinutes < 10 ? "0" : "" + todayMinutes}`
  );

  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const getReservation = async () => {
      const formattedFromDate = `${filterDate} ${filterTime}:00`;
      const formattedToDate = `${filterDate} ${parseInt(filterTime, 10) + 1}:00`;
  
      try {
        const reservations = await getReservations(
          formattedFromDate,
          formattedToDate
        );
  
        setReservations(reservations);
      } catch (error) {
        console.error(
          "EditReservation : Erreur lors de la récupération des réservations",
          error
        );
      }
    };

    getReservation();
  }, [filterDate, filterTime]);

  // const [reservations, setReservations] = useState([
  //   {
  //     name: "COURTARI ",
  //     date: "2024-03-20",
  //     time: "19:00",
  //     peopleNumber: 4,
  //     id: 1,
  //   },
  // ]);

  const updateReservationInState = (updatedReservation) => {
    setReservations(
      reservations.map((reservation) =>
        reservation.ID === updatedReservation.ID
          ? updatedReservation
          : reservation
      )
    );
  };

  const deleteReservationFromState = (idToDelete) => {
    setReservations(reservations.filter(reservation => reservation.ID !== idToDelete));
  };

  const filteredReservations = reservations.map((reservation) => {
    // Convertit la date et l'heure UTC en objet Date local
    const localDateTime = new Date(reservation.DateHeure);
    const date = localDateTime.toISOString().split('T')[0]; // Extrait la date au format YYYY-MM-DD
    const hours = localDateTime.getHours(); // Obtient l'heure locale
    const minutes = localDateTime.getMinutes(); // Obtient les minutes locales
  
    // Formate l'heure locale pour assurer un format à deux chiffres
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
  
    return {
      ...reservation,
      DateHeure:localDateTime,
      date:date,
      time: `${formattedHours}:${formattedMinutes}`, // Heure locale au format HH:mm
    };
  }).filter((reservation) => {
    return (
      reservation.Nom.toLowerCase().includes(filterName.toLowerCase()) &&
      (filterDate ? reservation.date === filterDate : true)
    );
  });
  
  

  return (
    <>
      <div className="flex flex-wrap gap-4">
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
            className="border w-32 px-2 py-2 rounded-sm mb-2 "
            onChange={(e) => setFilterDate(e.target.value)}
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
        {filteredReservations.map((reservation) => {
          return (
            <ReservationBlock
              key={`reservation${reservation.ID}`}
              id={reservation.ID}
              initialName={reservation.Nom}
              initialDate={reservation.date}
              initialTime={reservation.time}
              initialPeopleNumber={reservation.NbPersonnes}
              onUpdate={updateReservationInState}
              onDelete={deleteReservationFromState}
            />
          );
        })}
      </div>
    </>
  );
};

export default EditReservation;
