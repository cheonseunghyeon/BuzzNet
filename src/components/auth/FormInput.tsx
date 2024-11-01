import React from "react";
import { FormInputProps } from "../types";

const FormInput: React.FC<FormInputProps> = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-3 mb-8 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={onChange}
    />
  );
};

export default FormInput;
