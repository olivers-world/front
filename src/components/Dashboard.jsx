import React, { useState, useEffect } from "react";
import { getReservations } from "@/services/api"; // Exemple, ajustez selon votre structure

import DashboardInfo from "../components/DashboardInfo";
import DashboardInfoLine from "../components/DashboardInfoLine";
import InfoBullet from "../components/InfoBullet";
import ReservationChart from "../components/ReservationChart";
import InputBullet from "../components/InputBullet";

const Dashboard = () => {
  const [reservationsToday, setReservationsToday] = useState(0);
  const [reservationsThisWeek, setReservationsThisWeek] = useState(0);
  const [reservationsThisMonth, setReservationsThisMonth] = useState(0);

  useEffect(() => {
    const fetchReservationsData = async () => {
      const today = new Date(new Date().setHours(0, 0, 0, 0));
      const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);

      const formatDate = (date) => date.toISOString().split("T")[0];
      const formatDateTime = (date, time) => `${formatDate(date)}T${time}`;

      // Aujourd'hui
      const fromToday = formatDateTime(new Date(), "00:00:00");
      const toToday = formatDateTime(new Date(), "23:59:59");

      // Cette semaine
      const fromWeek = formatDate(firstDayOfWeek);
      const toWeek = formatDate(new Date());

      // Ce mois
      const fromMonth = formatDate(firstDayOfMonth);
      const toMonth = formatDate(lastDayOfMonth);

      try {
        const dailyReservations = await getReservations(fromToday, toToday);
        const weeklyReservations = await getReservations(fromWeek, toWeek);
        const monthlyReservations = await getReservations(fromMonth, toMonth);

        setReservationsToday(dailyReservations.length);
        setReservationsThisWeek(weeklyReservations.length);
        setReservationsThisMonth(monthlyReservations.length);
      } catch (error) {
        console.error("Erreur lors de la récupération des données de réservation", error);
      }
    };

    fetchReservationsData();
  }, []);

  return (
    <>
      <div className="bg-primary py-2 rounded-lg">
        <span className="px-4 py-1 block uppercase font-medium text-white">
          Nombre de réservations
        </span>
        <DashboardInfoLine>
          <span>ce jour</span>
          <InfoBullet info={reservationsToday} />
        </DashboardInfoLine>
        <DashboardInfoLine>
          <span>cette semaine</span>
          <InfoBullet info={reservationsThisWeek} />
        </DashboardInfoLine>
        <DashboardInfoLine>
          <span>ce mois</span>
          <InfoBullet info={reservationsThisMonth} />
        </DashboardInfoLine>
      </div>

      <DashboardInfo width="w-full">
        <span>Refaire l&apos;inventaire dans </span>
        <InputBullet info={0} />
      </DashboardInfo>

      <DashboardInfo width="w-fit">
        <span>
          Refaire le grand nettoyage de la cuisine dans
          <InputBullet trapped={true} info={0} />
          jours
        </span>
      </DashboardInfo>

      <ReservationChart />
    </>
  );
};

export default Dashboard;
