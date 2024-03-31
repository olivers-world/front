import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { getReservations } from "@/services/api.js"; // Assurez-vous que le chemin est correct

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const ReservationChart = () => {
  const [chartData, setChartData] = useState({
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
  });

  let options = {
    scales: {
        y: {
            min: 0,
            ticks: {
                stepSize: 1
            }
        }
    }
  };


  useEffect(() => {
    const fetchReservations = async () => {
      const today = new Date();
      const firstDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
      const lastDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0,
        23,
        59,
        59
      );

      // Formatage des dates en YYYY-MM-DD
      const from = `${firstDayOfMonth.toISOString().split("T")[0]} 00:00:00`;
      const to = lastDayOfMonth
        .toISOString()
        .replace("T", " ")
        .replace(".000Z", "");

      console.log("from : " + from);
      console.log("to : " + to);

      try {
        const reservationsData = await getReservations(from, to);

        // Transformer les données
        const countsByDay = reservationsData.reduce((acc, curr) => {
          const day = new Date(curr.DateHeure).getDate();
          acc[day] = (acc[day] || 0) + 1;
          return acc;
        }, {});

        // Générer les labels et les données pour le graphique
        const labels = Array.from(
          { length: lastDayOfMonth.getDate() },
          (_, i) =>
            `${(i + 1).toString().padStart(2, "0")}/${(today.getMonth() + 1)
              .toString()
              .padStart(2, "0")}`
        );
        const data = labels.map((label) => {
          const day = parseInt(label.split("/")[0], 10); // Obtenir le jour à partir du label
          return countsByDay[day] || 0; // Retourner le nombre de réservations ou 0 si aucune
        });

        setChartData({
          labels,
          datasets: [
            {
              label: "Nombre de réservations du mois",
              data,
              backgroundColor: "#81764B",
              borderColor: "#988F72",
            },
          ],
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des réservations", error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="border p-4 rounded-lg mt-12">
      <h2 className="font-medium py-2 mb-4 text-lg">
        Graphique du nombre de réservation effectué via le site
      </h2>
      {chartData.labels.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
};

export default ReservationChart;
