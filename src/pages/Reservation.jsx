/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { createReservations, getReservations } from "@/services/api.js";
import { useSnackbar } from "notistack";

const Modale = ({
  closeModal,
  date,
  selectedSlot,
  peopleNumber,
  handleSubmit,
  handleEmailChange,
  handleNameChange,
  email,
  name,
}) => {
  let dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center  z-40 after:content[''] after:bg-opacity-50 after:absolute after:top-0 after:bg-black after:w-screen after:h-screen">
      <div className="relative bg-white sm:-translate-y-1/2 mx-2 z-50 p-8 rounded-lg border shadow-xl">
        <h2 className="text-2xl font-semibold mb-4">
          Réservation pour le {date.toLocaleDateString("fr-FR", dateOptions)}
        </h2>
        <p className="text-lg">
          Pour <span className="font-medium">{peopleNumber}</span> personnes à
          <span className="font-medium"> {selectedSlot}</span>
        </p>
        <input
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          className="mb-2 w-full rounded-md border border-gray-400 py-1 my-4 pl-2 pr-4  :text-gray-300 sm:mb-0"
        />

        <input
          type="text"
          placeholder="Votre nom"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          className="mb-2 w-full rounded-md border border-gray-400 py-1 my-4 pl-2 pr-4  :text-gray-300 sm:mb-0"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="border w-full mx-auto mt-4 px-2 py-2 font-medium rounded-sm text-white float-right bg-primary"
        >
          Réserver
        </button>
        <button
          onClick={closeModal}
          className="bg-primary absolute -top-2 right-2 text-xs text-white px-2 py-1 rounded-md mt-4"
        >
          X
        </button>
      </div>
    </div>
  );
};

Modale.propTypes = {
  handleEmailChange: PropTypes.func,
  handleNameChange: PropTypes.func,
  closeModal: PropTypes.func,
  date: PropTypes.shape({
    toLocaleDateString: PropTypes.func,
  }),
  handleSubmit: PropTypes.func,
  peopleNumber: PropTypes.number,
  selectedSlot: PropTypes.string,
  email: PropTypes.string,
  name: PropTypes.string,
};

function Reservation() {
  const { enqueueSnackbar } = useSnackbar();

  const [calendarDate, setCalendarDate] = useState(new Date());
  const [date, setDate] = useState();

  const [selectedHours, setSelectedHours] = useState(12);
  const [selectedMinutes, setSelectedMinutes] = useState(0);

  const [peopleNumber, setPeopleNumber] = useState(1);

  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  const [reservations, setReservations] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  const [selectedSlot, setSelectedSlot] = useState("12:00");
  const [showModal, setShowModal] = useState(false);

  const handleNameChange = (name) => {
    setUserName(name);
  };

  const handleEmailChange = (email) => {
    setUserEmail(email);
  };

  const handleHourChange = (hour) => {
    setSelectedHours(hour.target.value);
  };

  const handleMinutesChange = (minutes) => {
    setSelectedMinutes(minutes.target.value);
  };

  const handleCalendarDate = (selectedDate) => {
    setCalendarDate(selectedDate);
  };

  const handlePeopleNumber = (event) => {
    setPeopleNumber(parseInt(event.target.value));
  };

  const updateDateReservation = () => {
    const updatedDate = new Date(
      calendarDate.getFullYear(),
      calendarDate.getMonth(),
      calendarDate.getDate(),
      parseInt(selectedHours, 10),
      parseInt(selectedMinutes, 10)
    );
    setDate(updatedDate);
  };

  const tileDisabled = ({ date }) => {
    return (
      date.getDay() === 0
    );
  };

  const tileClassName = ({date, view}) => {

    if(date.getDay() === 6) {
      console.log(date.getDay())
      return 'text-primary font-bold'
    } else {
      return ''
    }
  }

  const userInfoString = localStorage.getItem("userInfo");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowModal(true);
    console.log(date);
    console.log("Formulaire soumis !");

    const selectedDate = `${calendarDate.getFullYear()}-${
      calendarDate.getMonth() + 1
    }-${calendarDate.getDate()}`;
    const formattedDate = `${selectedDate} ${selectedSlot}`;
    const userInfo = userInfoString
      ? JSON.parse(userInfoString)
      : { nom: userName, email: userEmail };

    console.log("Appel API avec : ", userInfo.nom, userInfo.email);

    try {
      const reservations = await createReservations(
        userInfo.email,
        userInfo.nom,
        formattedDate,
        peopleNumber
      );

      enqueueSnackbar("Réservation prise!", { variant: "success" });
      setShowModal(false);
      console.log(reservations);
    } catch (err) {
      // Il n'y a pas de réponse du serveur
      if (!err?.response) {
        console.log("Pas de réponse serveur");
        enqueueSnackbar("Pas de réponse serveur", { variant: "error" });
      }
      // Erreur de base de données
      else if (err.response?.status === 500) {
        console.log("Database error");
        enqueueSnackbar("Créneau déjà pris", { variant: "error" });
      }
      // Pas assez de place
      else if (
        err.response?.status === 400 &&
        err.response?.data?.message === "Pas assez de place"
      ) {
        console.log("Trop de place");
        enqueueSnackbar("Plus de places disponible", { variant: "error" });
      }
      // Autres erreurs
      else {
        console.log("Échec");
        enqueueSnackbar("Échec lors de la prise de la réservation", {
          variant: "error",
        });
      }
    }
  };

  const fetchReservations = async () => {
    const formattedFromDate = `${calendarDate.getFullYear()}-${
      calendarDate.getMonth() + 1
    }-${calendarDate.getDate()} ${selectedHours}:00:00`;

    const formattedToDate = `${calendarDate.getFullYear()}-${
      calendarDate.getMonth() + 1
    }-${calendarDate.getDate()} ${parseInt(selectedHours, 10) + 1}:00:00`;

    console.log("formattedFromDate : " + formattedFromDate);
    console.log("formattedToDate : " + formattedToDate);

    try {
      console.log("call");
      const reservations = await getReservations(
        formattedFromDate,
        formattedToDate
      );
      console.log(reservations);
      setReservations(reservations);
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations", error);
    }
  };

  useEffect(() => {
    updateDateReservation();
    fetchReservations();
  }, [selectedHours, selectedMinutes, calendarDate]);

  useEffect(() => {
    const slots = [];
    for (let minute = 0; minute <= 55; minute += 5) {
      const timeString = `${selectedHours}:${minute
        .toString()
        .padStart(2, "0")}`;
      const isTaken = reservations.some(
        (reservation) =>
          new Date(reservation.DateHeure).getHours() ===
            parseInt(selectedHours) &&
          new Date(reservation.DateHeure).getMinutes() === minute
      );
      slots.push({ time: timeString, taken: isTaken });
    }
    setTimeSlots(slots);
  }, [reservations, selectedHours]);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className="w-screen z-10
      bg-hero-bg bg-cover after:content[''] after:bg-opacity-50 after:absolute after:top-0 after:bg-black after:w-screen after:h-[calc(100vh+120px)]"
    >
      <div className="h-[120px]"></div>
      <div className="h-screen flex justify-center mx-4">
        {/* Si utilisateur pas connecter */}
        {showModal && !userInfoString && (
          <Modale
            handleEmailChange={handleEmailChange}
            handleNameChange={handleNameChange}
            closeModal={closeModal}
            date={date}
            selectedSlot={selectedSlot}
            peopleNumber={peopleNumber}
            handleSubmit={(e) => handleSubmit(e)}
            email={userEmail}
            name={userName}
          ></Modale>
        )}
        <div className="grid grid-cols-1 md:my-16  md:grid-cols-2 z-10 h-fit min-h-[350px]  bg-white p-4 rounded-xl ">
          <Calendar
            tileClassName={tileClassName}
            minDate={new Date()}
            tileDisabled={tileDisabled}
            className="rounded-lg p-2 border-none"
            onChange={(selectedDate) => handleCalendarDate(selectedDate)}
          />

          <form className="flex flex-col rounded-xl  h-full bg-white px-4 py-4 max-w-[350px]">
            <div className="flex flex-wrap">
              <span className="mr-2 font-medium text-base sm:text-lg">
                Je veux arriver vers :
              </span>
              <div className="inline text-center">
                <select
                  onChange={handleHourChange}
                  value={selectedHours}
                  className=" text-xl"
                  name="hours"
                  id=""
                >
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                </select>

                <span className="mx-1 text-base">H</span>
                <select
                  name="minutes"
                  onChange={(minutes) => handleMinutesChange(minutes)}
                  value={selectedMinutes}
                  id=""
                  className="mr-4 text-xl"
                >
                  <option value="00">00</option>
                  <option value="05">05</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                  <option value="35">35</option>
                  <option value="40">40</option>
                  <option value="45">45</option>
                  <option value="50">50</option>
                  <option value="55">55</option>
                </select>
              </div>

              <div className="mt-2">
                <span className="mr-2 font-medium text-base sm:text-lg">
                  Nombre de personnes :
                </span>
                <input
                  type="number"
                  name=""
                  className="w-10 text-xl"
                  id=""
                  min="1"
                  max="8"
                  value={peopleNumber}
                  onChange={handlePeopleNumber}
                />
              </div>
            </div>

            <div className="my-8 flex-1 max-h-[125px] overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {timeSlots.map((slot, index) => (
                  <div
                    key={index}
                    onClick={(e) => {
                      setSelectedSlot(e.target.textContent);
                    }}
                    className={`px-4 flex-1 py-1 w-fit rounded-lg ${
                      slot.taken ? "!bg-neutral-400 text-white" : "bg-white"
                    }
                      ${
                        selectedSlot === slot.time
                          ? "text-white !bg-primary"
                          : ""
                      }
                       text-primary border-primary border cursor-pointer`}
                  >
                    {slot.time}
                  </div>
                ))}
              </div>
            </div>

            {userInfoString ? (
              <button
                type="button"
                onClick={handleSubmit}
                className="border w-full mx-auto px-2 py-2 font-medium rounded-sm text-white float-right bg-primary"
              >
                Réserver
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="border w-full mx-auto px-2 py-2 font-medium rounded-sm text-white float-right bg-primary"
              >
                Réserver
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
