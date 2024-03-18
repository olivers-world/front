import React from "react";

const ReservationResume = ({ name, date, time, peopleNumber }) => {
  return (
    <div className="bg-secondary w-fit text-white rounded-md p-2 mt-4">
      <div className="flex gap-6">
        <div className="font-medium">{name}</div>
        <div>
          <svg
            className={`inline  ml-1  svg-icon cursor-pointer text-white w-4 align-middle overflow-hidden`}
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
            className="bg-secondary w-12"
          />
        </div>
      </div>
      <input type="date" value={date} className="bg-secondary" />
      <br />
      <input type={time} value="19:30" className="bg-secondary" />

      <div className="mt-2">
        <button className="bg-white text-primary px-4 py-1 mr-2 rounded-sm">
          Modifier
        </button>
        <button className="bg-white text-primary px-4 py-1  rounded-sm">
          Annuler
        </button>
      </div>
    </div>
  );
};

const EditReservation = () => {
  return (
    <>
      <div className="flex gap-4">
        <div>
          <label htmlFor="">Nom : </label>
          <input
            type="text"
            className="border w-42 px-2 py-2 rounded-sm mb-2 "
          />
        </div>
        <div>
          <label htmlFor="">Date : </label>
          <input
            type="date"
            className="border w-32 px-2 py-2 rounded-sm mb-2 "
          />
        </div>
        <div>
          <label htmlFor="">Date : </label>
          <input
            type="time"
            className="border w-24 px-2 py-2 rounded-sm mb-2 "
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <ReservationResume
          name={"COURTARO"}
          date={"2003-10-03"}
          time={"10:30"}
          peopleNumber={18}
        />
      </div>
    </>
  );
};

export default EditReservation;