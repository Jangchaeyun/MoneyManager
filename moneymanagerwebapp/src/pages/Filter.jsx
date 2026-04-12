import { Search } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndPoints";
import toast from "react-hot-toast";

const Filter = () => {
  useUser();
  const [type, setType] = useState("소득");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortField, setSortField] = useState("날짜");
  const [sortOrder, setSortOrder] = useState("오름차순");
  const [transactions, setTransactions] = useState([]);
  const [keyword, setKeyword] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(type, startDate, endDate, sortField, keyword);
    setLoading(true);
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS, {
        type,
        startDate,
        endDate,
        keyword,
        sortField,
        sortOrder,
      });
      console.log("transactions: ", response.data);
      setTransactions(response.data);
    } catch (error) {
      console.error("거래 내역을 가져오는 데 실패했습니다.: ", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dashboard activeMenu="필터">
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">거래 필터링</h2>
        </div>
        <div className="card p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold ">필터를 선택하세요</h5>
          </div>
          <form className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-1">
                유형
              </label>
              <select
                value={type}
                id="type"
                className="w-full border rounded px-3 py-2"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="income">소득</option>
                <option value="expense">비용</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="startdate"
                className="block text-sm font-medium mb-1"
              >
                시작 날짜
              </label>
              <input
                value={startDate}
                id="startdate"
                type="date"
                className="w-full border rounded px-3 py-2"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="enddate"
                className="block text-sm font-medium mb-1"
              >
                종료 날짜
              </label>
              <input
                value={endDate}
                id="enddate"
                type="date"
                className="w-full border rounded px-3 py-2"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="sorfield"
                className="block text-sm font-medium mb-1"
              >
                정렬 필드
              </label>
              <select
                value={sortField}
                id="sorfield"
                className="w-full border rounded px-3 py-2"
                onChange={(e) => setSortField(e.target.value)}
              >
                <option value="date">날짜</option>
                <option value="amount">금액</option>
                <option value="category">카테고리</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="sortorder"
                className="block text-sm font-medium mb-1"
              >
                정렬 순서
              </label>
              <select
                value={sortOrder}
                id="sortorder"
                className="w-full border rounded px-3 py-2"
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">오름차순</option>
                <option value="desc">내림차순</option>
              </select>
            </div>
            <div className="sm:col-span-1 md:col-span-1 flex items-end">
              <div className="w-full">
                <label
                  value={keyword}
                  id="keyword"
                  htmlFor="keyword"
                  className="block text-sm font-medium mb-1"
                  onChange={(e) => setKeyword(e.target.value)}
                >
                  검색
                </label>
                <input
                  type="text"
                  placeholder="검색..."
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <button
                onClick={handleSearch}
                className="ml-2 mb-1 p-2 bg-pink-800 hover:bg-pink-800 text-white rounded flex items-center justify-center cursor-pointer"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dashboard>
  );
};

export default Filter;
