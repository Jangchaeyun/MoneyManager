import React, { useState } from "react";
import Input from "./input";

const AddCategoryForm = () => {
  const [category, setCategory] = useState({
    name: "",
    type: "income",
    icon: "",
  });
  const categoryTypeOptions = [
    { value: "income", label: "소득" },
    { value: "expense", label: "비용" },
  ];

  const handleChange = (key, value) => {
    setCategory({ ...category, [key]: value });
  };
  return (
    <div className="p-4">
      <Input
        value={category.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="카테고리 이름"
        placeholder="예: 프리랜서, 급여, 식료품"
        type="text"
      />

      <Input
        label="카테고리 타입"
        value={category.type}
        onChange={({ target }) => handleChange("type", target.value)}
        isSelect={true}
        options={categoryTypeOptions}
      />
    </div>
  );
};

export default AddCategoryForm;
