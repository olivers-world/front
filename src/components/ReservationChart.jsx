import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const data = {
  labels: Array.from(
    { length: 31 },
    (_, i) => `${(i + 1).toString().padStart(2, "0")}/01`
  ),
  datasets: [
    {
      label: "Nombre de réservation du mois",
      data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 30)), // Génère un nombre aléatoire de réservations pour l'exemple
      backgroundColor: "#81764B",
      borderColor: "#988F72",
      borderPrintColor: "#81764B",
    },
  ],
};

const ReservationChart = () => {
  return (
    <div className="border p-4 rounded-lg mt-12">
      <h2 className="font-medium py-2 mb-4 text-lg">
        Graphique du nombre de réservation effectué via le site
      </h2>
      <Line data={data} />
    </div>
  );
};

export default ReservationChart;
