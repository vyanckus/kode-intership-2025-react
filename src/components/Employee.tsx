import React from "react";
import styled from "styled-components";
import { EmployeeType } from "../types/employeeType";
import { Link } from "react-router-dom";

const EmployeeContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 4px 6px 0;
  text-decoration: none;
  color: inherit;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Avatar = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  margin-right: 16px;
`;

const EmployeeInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const NamePositionContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

const Name = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 125%;
  color: #050510;
  margin-right: 4px;
`;

const Position = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 129%;
  color: #97979b;
`;

const Department = styled.div`
  font-weight: 400;
  font-size: 13px;
  line-height: 123%;
  color: #55555c;
`;

const Birthday = styled.span`
  margin-left: auto;
  font-size: 15px;
  line-height: 133%;
  color: #55555c;
`;

interface EmployeeProps {
  employee: EmployeeType;
  showBirthday?: boolean;
}

const departmentMap: { [key: string]: string } = {
  android: "Android",
  ios: "iOS",
  design: "Дизайн",
  management: "Менеджмент",
  qa: "QA",
  back_office: "Бэк-офис",
  frontend: "Frontend",
  hr: "HR",
  pr: "PR",
  backend: "Backend",
  support: "Техподдержка",
  analytics: "Аналитика",
};

const Employee: React.FC<EmployeeProps> = ({ employee, showBirthday }) => {
  const birthday = new Date(employee.birthday);
  const day = birthday.getDate();
  const month = birthday.toLocaleString("ru-RU", { month: "short" });
  const russianDepartment =
    departmentMap[employee.department] || employee.department;

  return (
    <Link
      to={`/employee/${employee.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <EmployeeContainer>
        <Avatar
          src={employee.avatarUrl}
          alt={`${employee.firstName} ${employee.lastName}`}
        />
        <EmployeeInfo>
          <NamePositionContainer>
            <Name>
              {employee.firstName} {employee.lastName}
            </Name>
            <Position>{employee.position}</Position>
          </NamePositionContainer>
          <Department>{russianDepartment}</Department>
        </EmployeeInfo>
        {showBirthday && (
          <Birthday>
            {day} {month}
          </Birthday>
        )}
      </EmployeeContainer>
    </Link>
  );
};

export default Employee;
