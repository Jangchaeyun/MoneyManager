import { Coins, Wallet, WalletCards } from "lucide-react";
import Dashboard from "../components/Dashboard";
import InfoCard from "../components/InfoCard";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndPoints";
import toast from "react-hot-toast";

const Home = () => {
  useUser();

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
      if (response.status === 200) {
        setDashboardData(response.data);
      }
      console.log(response.data);
    } catch (error) {
      console.error(
        "대시보드 데이터를 가져오는 중 오류가 발생했습니다. ",
        error,
      );
      toast.error("뭔가 잘못됐어요!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  return (
    <div>
      <Dashboard activeMenu="대시보드">
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard
              icon={<WalletCards />}
              label="총 잔액"
              value={`${(dashboardData?.totalBalance || 0).toLocaleString("ko-KR")}`}
              color="bg-pink-800"
            />
            <InfoCard
              icon={<Wallet />}
              label="총 수입"
              value={`${(dashboardData?.totalIncome || 0).toLocaleString("ko-KR")}`}
              color="bg-green-800"
            />
            <InfoCard
              icon={<Coins />}
              label="총 비용"
              value={`${(dashboardData?.totalExpense || 0).toLocaleString("ko-KR")}`}
              color="bg-red-600"
            />
          </div>
          <div className="grid-cols-1 md:grid-cols-2 gap-6 mt-6"></div>
        </div>
      </Dashboard>
    </div>
  );
};

export default Home;
