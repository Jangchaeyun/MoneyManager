import React from "react";
import CustomPieChart from "./CustomPieChart";
import { addThousandsSeparator } from "../util/util";

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const COLORS = ["#A78BFA", "#6EE7B7", "#FCA5A5"];

  const balanceData = [
    { name: "총 잔액", amount: totalBalance },
    { name: "총 비용", amount: totalExpense },
    { name: "총 수입", amount: totalIncome },
  ];
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">재무 개요</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="총 잔액"
        totalAmount={`${addThousandsSeparator(totalBalance)}원`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
