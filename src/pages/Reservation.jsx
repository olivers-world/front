import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

function Reservation() {
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [date, setDate] = useState();
  const [selectedHours, setSelectedHours] = useState(12);
  const [selectedMinutes, setSelectedMinutes] = useState(0);

  const handleHourChange = (hour) => {
    setSelectedHours(hour.target.value);
  };

  const handleMinutesChange = (minutes) => {
    setSelectedMinutes(minutes.target.value);
  };

  const handleCalendarDate = (selectedDate) => {
    setCalendarDate(selectedDate);
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

      <div className="h-screen w-screen bg-white flex justify-center items-center">
        <div className="flex items-center flex-col">
          <Calendar
            onChange={(selectedDate) => handleCalendarDate(selectedDate)}
          ></Calendar>
          <div className="">
            <form onSubmit={handleSubmit}>
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

              <select
                name="minutes"
                onChange={(minutes) => handleMinutesChange(minutes)}
                value={selectedMinutes}
                id=""
              >
                <option value="00">00</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>

              <button type="submit" onClick={handleSubmit}>
                Réserver
              </button>
            </form>
          </div>
          <div>
            <div>Heure: {selectedHours}</div>
            <div>Minutes: {selectedMinutes}</div>
            <div>Date Entière: {calendarDate && calendarDate.toString()}</div>
            <div>--------------</div>
            <div>Calendar Date: {date && date.toString()}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Reservation;
