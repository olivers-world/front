import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import img from "../images/bg-img-2.jpeg";

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(date);
    console.log("Formulaire soumis !");
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
        <div className="flex items-center flex-col z-10">
          <Calendar
            className="rounded-xl p-2 mb-4"
            onChange={(selectedDate) => handleCalendarDate(selectedDate)}
          />
          <div className="">
            <form onSubmit={handleSubmit} className="rounded-xl bg-white p-2 ">
              <select
                onChange={handleHourChange}
                value={selectedHours}
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

              <span className="mx-1">H</span>

              <select
                name="minutes"
                onChange={(minutes) => handleMinutesChange(minutes)}
                value={selectedMinutes}
                id=""
                className="mr-4"
              >
                <option value="00">00</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>

              <span className="mr-2">Nombre de personnes :</span>
              <input
                type="number"
                name=""
                className="w-10"
                id=""
                min="1"
                value={peopleNumber}
                onChange={handlePeopleNumber}
              />

              <button
                type="submit"
                onClick={handleSubmit}
                className="ml-4 bg-primary p-2 rounded-lg text-white text-base"
              >
                Réserver
              </button>
            </form>
          </div>
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
