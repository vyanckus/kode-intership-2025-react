import { useState, useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";
import { EmployeeType } from "../types/employeeType";
import { getUsers } from "../api/getUsers";
import Employee from "./Employee";
import NoResults from "./NoResults";

const ListContainer = styled.div`
  padding: 16px;
`;

const YearSeparator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 24px 0;
  font-weight: 500;
  font-size: 15px;
  line-height: 133%;
  color: #c3c3c6;
  
  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #c3c3c6;
    margin: 0 24px;
`;

interface EmployeeListProps {
  searchQuery: string;
  selectedJobTitle: string;
  sortType: "alphabetical" | "birthday";
}

function EmployeeList({
  searchQuery,
  selectedJobTitle,
  sortType,
}: EmployeeListProps) {
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sortEmployees = useCallback(
    (
      employeesToSort: EmployeeType[],
      order: "alphabetical" | "birthday"
    ): EmployeeType[] => {
      const sortedEmployees = [...employeesToSort];

      sortedEmployees.sort((a, b) => {
        if (order === "alphabetical") {
          return a.firstName.localeCompare(b.firstName);
        } else if (order === "birthday") {
          const dateA = new Date(a.birthday);
          const dateB = new Date(b.birthday);

          const monthA = dateA.getMonth();
          const dayA = dateA.getDate();
          const monthB = dateB.getMonth();
          const dayB = dateB.getDate();

          if (monthA !== monthB) {
            return monthA - monthB;
          } else {
            return dayA - dayB;
          }
        }
        return 0;
      });

      return sortedEmployees;
    },
    []
  );

  const filterEmployees = useCallback(
    (
      employeesToFilter: EmployeeType[],
      query: string,
      jobTitle: string
    ): EmployeeType[] => {
      let filteredEmployees = [...employeesToFilter];

      const departmentMap: { [key: string]: string } = {
        Все: "Все",
        Android: "android",
        iOS: "ios",
        Дизайн: "design",
        Менеджмент: "management",
        QA: "qa",
        "Бэк-офис": "back_office",
        Frontend: "frontend",
        HR: "hr",
        PR: "pr",
        Backend: "backend",
        Техподдержка: "support",
        Аналитика: "analytics",
      };

      if (jobTitle !== "Все") {
        const departmentValue = departmentMap[jobTitle];
        filteredEmployees = filteredEmployees.filter(
          (employee) => employee.department === departmentValue
        );
      }

      if (query) {
        filteredEmployees = filteredEmployees.filter((employee) => {
          const fullName =
            `${employee.firstName} ${employee.lastName}`.toLowerCase();
          const userTag = employee.userTag.toLowerCase();
          const searchTerm = query.toLowerCase();

          return fullName.includes(searchTerm) || userTag.includes(searchTerm);
        });
      }

      return filteredEmployees;
    },
    []
  );

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUsers();
        setEmployees(data);
      } catch (e: any) {
        setError("Failed to load employees.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = useMemo(
    () => filterEmployees(employees, searchQuery, selectedJobTitle),
    [employees, searchQuery, selectedJobTitle]
  );

  const sortedEmployees = useMemo(
    () => sortEmployees(filteredEmployees, sortType),
    [filteredEmployees, sortType]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (sortedEmployees.length === 0) {
    return <NoResults />;
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const upcomingBirthdays: EmployeeType[] = [];
  const pastBirthdays: EmployeeType[] = [];

  sortedEmployees.forEach((employee) => {
    const birthday = new Date(employee.birthday);
    birthday.setFullYear(currentYear);
    if (birthday >= currentDate) {
      upcomingBirthdays.push(employee);
    } else {
      pastBirthdays.push(employee);
    }
  });

  return (
    <ListContainer>
      {upcomingBirthdays.map((employee) => (
        <Employee
          key={employee.id}
          employee={employee}
          showBirthday={sortType === "birthday"}
        />
      ))}

      {sortType === "birthday" && pastBirthdays.length > 0 && (
        <YearSeparator>{currentYear}</YearSeparator>
      )}

      {pastBirthdays.map((employee) => (
        <Employee
          key={employee.id}
          employee={employee}
          showBirthday={sortType === "birthday"}
        />
      ))}
    </ListContainer>
  );
}

export default EmployeeList;
