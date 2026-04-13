import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";

const Home = () => {
  useUser();
  return (
    <div>
      <Dashboard activeMenu="대시보드">
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
          </div>
          <div className="grid-cols-1 md:grid-cols-2 gap-6 mt-6"></div>
        </div>
      </Dashboard>
    </div>
  );
};

export default Home;
