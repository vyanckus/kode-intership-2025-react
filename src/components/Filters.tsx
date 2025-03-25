import styled from "styled-components";
import { Department } from "../types/employeeType";

const FilterContainer = styled.nav`
  overflow-x: auto;
  white-space: nowrap;
`;

const FilterButton = styled.button<{ isActive: boolean }>`
  padding: 8px 12px;
  cursor: pointer;
  line-height: 133%
  white-space: nowrap;
  overflow-wrap: normal;
  background-color: transparent;
  transition: color 0.3s ease;
  font-weight: ${({ isActive }) => (isActive ? "600" : "500")};
  color: ${({ isActive }) => (isActive ? "#050510" : "#97979b")};

  &:focus {
    outline: none;
    border-bottom: 2px solid #6534ff; 
    transition: border-bottom 0.3s ease-in-out;
  }
`;

interface FiltersProps {
  selectedDepartment: Department | null;
  onDepartmentSelect: (department: Department | null) => void;
}

const departmentOptions: { value: Department | null; label: string }[] = [
  { value: null, label: "Все" },
  { value: "android", label: "Android" },
  { value: "ios", label: "iOS" },
  { value: "design", label: "Дизайн" },
  { value: "management", label: "Менеджмент" },
  { value: "qa", label: "QA" },
  { value: "back_office", label: "Бэк-офис" },
  { value: "frontend", label: "Frontend" },
  { value: "hr", label: "HR" },
  { value: "pr", label: "PR" },
  { value: "backend", label: "Backend" },
  { value: "support", label: "Техподдержка" },
  { value: "analytics", label: "Аналитика" },
];

function Filters({ selectedDepartment, onDepartmentSelect }: FiltersProps) {
  return (
    <FilterContainer>
      {departmentOptions.map((option) => (
        <FilterButton
          key={option.value?.toString() || "all"}
          isActive={option.value === selectedDepartment}
          onClick={() => onDepartmentSelect(option.value)}
        >
          {option.label}
        </FilterButton>
      ))}
    </FilterContainer>
  );
}

export default Filters;
