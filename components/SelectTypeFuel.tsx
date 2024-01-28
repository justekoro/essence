import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const SelectTypeFuel = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => {
  return (
    <Select defaultValue="gazole" value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Type d'essence" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="gazole">Gazole</SelectItem>
        <SelectItem value="e85">E85</SelectItem>
        <SelectItem value="e10">E10</SelectItem>
        <SelectItem value="sp95">SP95</SelectItem>
        <SelectItem value="gplc">GPLc</SelectItem>
      </SelectContent>
    </Select>

  );
};

export default SelectTypeFuel;
