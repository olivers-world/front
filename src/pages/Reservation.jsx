import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import img from "../images/bg-img-2.jpeg";
import axios from "../api/axios";

const FORM_URL = "";

function Reservation() {
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [date, setDate] = useState();
  const [selectedHours, setSelectedHours] = useState(12);
  const [selectedMinutes, setSelectedMinutes] = useState(0);
  const [peopleNumber, setPeopleNumber] = useState(1);

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

    const formattedDate = date.toISOString();

    const userInfo = JSON.parse(userInfoString);
    const email = userInfo.email;

    try {
      const response = await axios.post(
        FORM_URL,
        JSON.stringify({ 
          user: email,
          date: formattedDate,
          nbPersonnne: peopleNumber,
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
      if (!err?.response) {
        console.log("Pas de réponse serveur");
      } else if (err.response?.status === 500) {
        console.log("Database error");
      } else {
        console.log("Échec de l'inscription");
      }
      errRef.current.focus();
    }
  };

  useEffect(() => {
    updateDateReservation();
  }, [selectedHours, selectedMinutes, calendarDate]);

  return (
    <div>
      <NavBar backgroundColor={"#988F72"} />

      <div
        className="h-screen w-screen flex justify-center items-center z-10
      bg-hero-bg bg-cover after:content['d'] after:bg-opacity-50 after:absolute after:top-0 after:bg-black after:w-screen after:h-screen"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 z-10 bg-white p-4 rounded-xl ">
          <Calendar
            className="rounded-lg p-2 border-none "
            onChange={(selectedDate) => handleCalendarDate(selectedDate)}
          />

          <form
            onSubmit={handleSubmit}
            className="flex flex-col rounded-xl h-full bg-white p-4 max-w-[350px]"
          >
            <div>
              <span className="mr-2 font-medium text-lg">
                Je veux arriver vers :
              </span>

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

            <div className="my-4 flex-1 overflow-y-auto">
              <div className="flex flex-wrap gap-2 max-h-[112px]">
                <div className="px-4 py-1 w-fit rounded-lg bg-baseprimary text-white">
                  19:30
                </div>
                <div className="px-4 py-1 w-fit rounded-lg bg-baseprimary text-white">
                  19:30
                </div>
                <div className="px-4 py-1 w-fit rounded-lg bg-baseprimary text-white">
                  19:30
                </div>
                <div className="px-4 py-1 w-fit rounded-lg bg-baseprimary text-white">
                  19:30
                </div>
                <div className="px-4 py-1 w-fit rounded-lg bg-baseprimary text-white">
                  19:30
                </div>
                <div className="px-4 py-1 w-fit rounded-lg bg-baseprimary text-white">
                  19:30
                </div>
                <div className="px-4 py-1 w-fit rounded-lg bg-baseprimary text-white">
                  19:30
                </div>
                <div className="px-4 py-1 w-fit rounded-lg bg-baseprimary text-white">
                  19:30
                </div>
                <div className="px-4 py-1 w-fit rounded-lg bg-baseprimary text-white">
                  19:30
                </div>
                <div className="px-4 py-1 w-fit rounded-lg bg-baseprimary text-white">
                  19:30
                </div>
                <div className="px-4 py-1 w-fit rounded-lg bg-baseprimary text-white">
                  19:30
                </div>
                <div className="px-4 py-1 w-fit rounded-lg bg-baseprimary text-white">
                  19:30
                </div>
                <div className="px-4 py-1 w-fit rounded-lg bg-baseprimary text-white">
                  19:30
                </div>
                <div className="px-4 py-1 w-fit rounded-lg bg-baseprimary text-white">
                  19:30
                </div>
                <div className="px-4 py-1 w-fit rounded-lg bg-baseprimary text-white">
                  19:30
                </div>
              </div>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className=" w-full bg-white font-medium p-2 rounded-lg text-baseprimary border-baseprimary border text-base"
            >
              Réserver
            </button>
          </form>
          {/* <div>
            <div>Heure: {selectedHours}</div>
            <div>Minutes: {selectedMinutes}</div>
            <div>Date Entière: {calendarDate && calendarDate.toString()}</div>
            <div>--------------</div>
            <div>Calendar Date: {date && date.toString()}</div>
          </div> */}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Reservation;
