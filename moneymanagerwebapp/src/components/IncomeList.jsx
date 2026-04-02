import { Download, Mail } from "lucide-react";
import React from "react";

const IncomeList = ({ transactions }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">소득원</h5>
        <div className="flex items-center justify-end gap-2">
          <button className="card-btn">
            <Mail size={15} className="text-base" />
            이메일
          </button>
          <button className="card-btn">
            <Download size={15} className="text-base" />
            다운로드
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">

      </div>
    </div>
  );
};

export default IncomeList;
