import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import img from "../images/bg-img-2.jpeg";
import axios from "../api/axios";

const CREATE_URL = "/api/reservation/create";
const GET_URL = "/api/reservation/get";

function Reservation() {
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [date, setDate] = useState();

  const [selectedHours, setSelectedHours] = useState(12);
  const [selectedMinutes, setSelectedMinutes] = useState(0);

  const [peopleNumber, setPeopleNumber] = useState(1);

  const [reservations, setReservations] = useState([]);

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

  const userInfoString = localStorage.getItem("userInfo");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(date);
    console.log("Formulaire soumis !");

    const formattedDate = `${calendarDate.getFullYear()}-${
      calendarDate.getMonth() + 1
    }-${calendarDate.getDate()} ${selectedHours}:${selectedMinutes}:00`;

    const userInfo = JSON.parse(userInfoString);
    const email = userInfo.email;

    try {
      const response = await axios.post(
        CREATE_URL,
        JSON.stringify({
          user: email,
          date: formattedDate,
          nbPersonne: peopleNumber,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
    } catch (err) {
      // Il n'y a pas de réponse du serveur
      if (!err?.response) {
        console.log("Pas de réponse serveur");
      }
      // Erreur de base de données
      else if (err.response?.status === 500) {
        console.log("Database error");
      }
      // Ici, vous vérifiez si l'erreur vient du fait qu'il n'y a pas assez de place
      else if (
        err.response?.status === 400 &&
        err.response?.data?.message === "Pas assez de place"
      ) {
        console.log("Trop de place");
      }
      // Autres erreurs
      else {
        console.log("Échec");
      }
    }
  };

  const fetchReservations = async () => {
    const formattedDate = `${calendarDate.getFullYear()}-${
      calendarDate.getMonth() + 1
    }-${calendarDate.getDate()} ${selectedHours}:${selectedMinutes}:00`;
    console.log(formattedDate);

    try {
      const response = await axios.get(GET_URL, {
        params: { dateHeure: formattedDate },
      });
      setReservations(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations", error);
      setReservations([]); // En cas d'erreur, on vide les réservations
    }
  };

  useEffect(() => {
    updateDateReservation();
    fetchReservations();
  }, [selectedHours, selectedMinutes, calendarDate]);

  return (
    <div>
      <NavBar />

      <div
        className="h-screen w-screen flex justify-center  z-10
      bg-hero-bg bg-cover after:content['d'] after:bg-opacity-50 after:absolute after:top-0 after:bg-black after:w-screen after:h-screen"
      >
        <div className="grid grid-cols-1 mt-36 md:mt-64 md:grid-cols-2 z-10 h-fit min-h-[350px]  bg-white p-4 rounded-xl ">
          <Calendar
            className="rounded-lg p-2 border-none"
            onChange={(selectedDate) => handleCalendarDate(selectedDate)}
          />

          <form
            onSubmit={handleSubmit}
            className="flex flex-col rounded-xl  h-full bg-white px-4 py-4 max-w-[350px]"
          >
            <div className="flex flex-wrap">
              <span className="mr-2 font-medium text-lg">
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
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
              </div>

              <div className="mt-2">
                <span className="mr-2 font-medium text-lg">
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
              <div className="flex flex-wrap gap-2 ">
                {/* Liste de tous les créneaux pris*/}
                {reservations.map((reservation, index) => (
                  <div
                    key={index}
                    className="px-4 py-1 w-fit rounded-lg bg-primary text-white"
                  >
                    {new Date(reservation.DateHeure).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false
                    })}
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="border w-full mx-auto px-2 py-2 font-medium rounded-sm text-primary float-right hover:text-white hover:bg-primary"
            >
              Réserver
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Reservation;
