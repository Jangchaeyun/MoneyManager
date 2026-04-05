import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndPoints";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList";
import Modal from "../components/Modal";
import { Plus } from "lucide-react";
import AddIncome from "../components/AddIncomeForm";

const Income = () => {
  useUser();
  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
      if (response.status === 200) {
        console.log("Income list", response.data);
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("소득 내역을 가져오는 데 실패했습니다:", error);
      toast.error(
        error.response?.data?.message ||
          "소득 내역을 가져오는 데 실패했습니다.",
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchIncomeCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("소득"),
      );
      if (response.status === 200) {
        console.log("income categories", response.data);
        setCategories(response.data);
      }
    } catch (error) {
      console.log("소득 범주를 가져오는 데 실패했습니다:", error);
      toast.error(
        error.data?.message ||
          "해당 카테고리에 대한 소득 카테고리를 가져오는 데 실패했습니다.",
      );
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
    fetchIncomeCategories();
  }, []);

  return (
    <Dashboard activeMenu="소득">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <button
              className="add-btn"
              onClick={() => setOpenAddIncomeModal(true)}
            >
              <Plus size={15} className="text-lg" /> 소득원 추가
            </button>
          </div>
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => console.log("deleting the income", id)}
          />

          <Modal
            isOpen={openAddIncomeModal}
            onClose={() => setOpenAddIncomeModal(false)}
            title="소득원 추가"
          >
            <AddIncome
              onAddIncome={(income) => console.log("Add Income", income)}
              categories={categories}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  );
};

export default Income;
