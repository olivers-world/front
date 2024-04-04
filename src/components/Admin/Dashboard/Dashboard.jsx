import React, { useState, useEffect, useRef } from "react";
import {
  getReservations,
  getMostRecentInventaire,
  getMostRecentNettoyage,
  createNettoyage,
  createInventaire,
} from "@/services/api"; // Exemple, ajustez selon votre structure
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import DashboardInfo from "./DashboardInfo";
import DashboardInfoLine from "./DashboardInfoLine";
import InfoBullet from "../../ui/InfoBullet";
import ReservationChart from "@/components/Admin/Dashboard/ReservationChart";
import InputBullet from "../../ui/InputBullet";

const Dashboard = () => {
  const [hasChanged, setHasChanged] = useState(false);
  const timerIdRef = useRef(null);

  const [reservationsToday, setReservationsToday] = useState(0);
  const [reservationsThisWeek, setReservationsThisWeek] = useState(0);
  const [reservationsThisMonth, setReservationsThisMonth] = useState(0);

  const [inventaireCount, setInventaireCount] = useState(0);
  const [nettoyageCount, setNettoyageCount] = useState(0);

  useEffect(() => {
    const fetchReservationsData = async () => {
      const today = new Date(new Date().setHours(0, 0, 0, 0));
      const firstDayOfWeek = new Date(
        today.setDate(today.getDate() - today.getDay())
      );
      const firstDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0,
        23,
        59,
        59
      );
      const lastDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0,
        23,
        59,
        59
      );

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
        const monthlyReservations = await getReservations(fromMonth, toToday);

        setReservationsToday(dailyReservations.length);
        setReservationsThisWeek(weeklyReservations.length);
        setReservationsThisMonth(monthlyReservations.length);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de réservation",
          error
        );
      }
    };

    const fetchInventaireData = async () => {
      try {
        const inventaire = await getMostRecentInventaire();
        const mostRecentDateFromNow = dayjs(inventaire.Date)
          .diff(dayjs(), "day")
          .valueOf();

        setInventaireCount(mostRecentDateFromNow);
        console.log(mostRecentDateFromNow);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des inventaires",
          error
        );
      }
    };

    const fetchNettoyageData = async () => {
      try {
        const nettoyage = await getMostRecentNettoyage();
        const mostRecentDateFromNow = dayjs(nettoyage.Date)
          .diff(dayjs(), "day")
          .valueOf();

        setNettoyageCount(mostRecentDateFromNow);
        console.log(mostRecentDateFromNow);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des nettoyages",
          error
        );
      }
    };

    fetchInventaireData();
    fetchReservationsData();
    fetchNettoyageData();
  }, []);

  useEffect(() => {
    if (hasChanged) {
      timerIdRef.current = setTimeout(() => {
        updateValues();
      }, 2000);

      return () => clearTimeout(timerIdRef.current);
    }
  }, [inventaireCount, nettoyageCount, hasChanged]);

  const updateValues = async () => {
    console.log("Envoyer nouvelles données");
    try {
      const dateInventaire = dayjs()
        .add(inventaireCount, "day")
        .format("YYYY-MM-DD");
      const dateNettoyage = dayjs()
        .add(nettoyageCount, "day")
        .format("YYYY-MM-DD");

      const inventaire = await createInventaire(dateInventaire);
      const nettoyage = await createNettoyage(dateNettoyage);
    } catch (error) {
      console.error("Erreur lors de l'envoi des nouvelles données", error);
    }
  };

  const handleChange = (newValue, setStateFunction) => {
    setHasChanged(true);
    setStateFunction(newValue);
  };

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
        <InputBullet
          info={inventaireCount}
          onChange={(value) => handleChange(value, setInventaireCount)}
        />
      </DashboardInfo>

      <DashboardInfo width="w-fit">
        <span>
          Refaire le grand nettoyage de la cuisine dans
          <InputBullet
            trapped={true}
            info={nettoyageCount}
            onChange={(value) => handleChange(value, setNettoyageCount)}
          />
          jours
        </span>
      </DashboardInfo>

      <ReservationChart />
    </>
  );
};

export default Dashboard;
