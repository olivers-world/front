import DashboardInfo from "../components/DashboardInfo";
import DashboardInfoLine from "../components/DashboardInfoLine";
import InfoBullet from "../components/InfoBullet";
import ReservationChart from "../components/ReservationChart";
import InputBullet from "../components/InputBullet";
const Dashboard = () => {
  return (
    <>
      <div className="bg-primary py-2 rounded-lg">
        <span className="px-4 py-1 block uppercase font-medium text-white">
          Nombre de réservations
        </span>
        <DashboardInfoLine>
          <span>ce jour</span>
          <InfoBullet info={0} />
        </DashboardInfoLine>
        <DashboardInfoLine>
          <span>cette semaine</span>
          <InfoBullet info={0} />
        </DashboardInfoLine>
        <DashboardInfoLine>
          <span>ce mois</span>
          <InfoBullet info={0} />
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
