import React, { useState } from "react";
import { Select } from "antd";

interface SelectOption {
  label: string;
  value: string;
}

interface CheckboxDropdownSelectProps {
  options: SelectOption[];
  placeholder: string;
  value?: string[];
  onChange?: (value: string[]) => void;
}

export default function CheckboxDropdownSelect({
  options,
  placeholder,
  value,
  onChange
}: CheckboxDropdownSelectProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>(value || []);

  const handleChange = (newValue: string[]) => {
    setSelectedItems(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Select
      className="custom-multi-element-selector"
      mode="multiple"
      allowClear
      placeholder={placeholder}
      value={value || selectedItems}
      onChange={handleChange}
      style={{
        opacity: 1,
        marginRight: '8px'
      }}
      options={options}
    />
  );
}