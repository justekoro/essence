import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const SelectTypeFuel = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => {
  return (
    <Select defaultValue="gazole" value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Type d'essence" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Gazole">Gazole</SelectItem>
        <SelectItem value="E85">E85</SelectItem>
        <SelectItem value="E10">E10</SelectItem>
        <SelectItem value="SP95">SP95</SelectItem>
        <SelectItem value="GPLc">GPLc</SelectItem>
      </SelectContent>
    </Select>

  );
};

export default SelectTypeFuel;
