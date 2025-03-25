import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getUsers } from "../api/getUsers";
import { EmployeeType } from "../types/employeeType";
import styled from "styled-components";
import { ReactComponent as BackIcon } from "../assets/icons/back.svg";
import { ReactComponent as StarIcon } from "../assets/icons/star.svg";
import { ReactComponent as PhoneIcon } from "../assets/icons/phone.svg";

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const DetailsContainerTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  width: 100%;
  background-color: #f7f7f8;
`;

const BackLink = styled(Link)`
  align-self: flex-start;
  text-align: center;
  line-height: 24px;
  margin-bottom: 34px;
  width: 24px;
  height: 24px;
  text-decoration: none;
`;

const BackIconStyled = styled(BackIcon)`
  width: 8px;
  height: 12px;
`;

const Avatar = styled.img`
  width: 104px;
  height: 104px;
  border-radius: 50%;
  margin-bottom: 24px;
`;

const NamePositionContainer = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 12px;
`;

const Name = styled.h3`
  font-weight: 700;
  font-size: 24px;
  line-height: 117%
  text-align: center;
  color: #050510;
  margin-right: 4px;
`;

const Position = styled.p`
  font-weight: 400;
  font-size: 17px;
  line-height: 129%;
  text-align: center;
  color: #97979b;
`;

const Department = styled.p`
  font-weight: 400;
  font-size: 13px;
  line-height: 123%;
  text-align: center;
  color: #55555c;
`;

const DetailsContainerBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 28px 20px;
  width: 100%;
  background-color: #ffffff;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 54px;
  font-weight: 500;
  font-size: 16px;
  line-height: 125%;
  color: #050510;
`;

const InfoItemLeft = styled.div`
  display: flex;
  align-items: center;
`;

const StarIconStyled = styled(StarIcon)`
  margin-right: 14px;
  width: 21px;
  height: 20px;
`;

const PhoneIconStyled = styled(PhoneIcon)`
  margin-right: 14px;
  width: 21px;
  height: 20px;
`;

const Age = styled.span`
  color: #97979b;
`;

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

function EmployeeDetails() {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<EmployeeType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const allEmployees = await getUsers();
        const foundEmployee = allEmployees.find((emp) => emp.id === id);

        if (foundEmployee) {
          setEmployee(foundEmployee);
        } else {
          setError("Сотрудник не найден.");
        }
      } catch (e: any) {
        setError("Произошла ошибка при загрузке данных о сотрудниках.");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!employee) {
    return <div>Сотрудник не найден.</div>;
  }

  const birthdate = new Date(employee.birthday);
  const day = birthdate.getDate();
  const month = birthdate.toLocaleString("ru-RU", { month: "long" });
  const year = birthdate.getFullYear();
  const age = new Date().getFullYear() - year;
  const russianDepartment =
    departmentMap[employee.department] || employee.department;

  return (
    <DetailsContainer>
      <DetailsContainerTop>
        <BackLink to="/">
          <BackIconStyled />
        </BackLink>
        <Avatar src={employee.avatarUrl} alt="Аватар" />
        <NamePositionContainer>
          <Name>
            {employee.firstName} {employee.lastName}
          </Name>
          <Position>{employee.position}</Position>
        </NamePositionContainer>
        <Department>{russianDepartment}</Department>
      </DetailsContainerTop>
      <DetailsContainerBottom>
        <InfoItem>
          <InfoItemLeft>
            <StarIconStyled />
            {day} {month} {year}
          </InfoItemLeft>
          <Age>{age} лет</Age>
        </InfoItem>
        <InfoItem>
          <InfoItemLeft>
            <PhoneIconStyled />
            <a href={`tel:${employee.phone}`}>{employee.phone}</a>
          </InfoItemLeft>
          <Age></Age>
        </InfoItem>
      </DetailsContainerBottom>
    </DetailsContainer>
  );
}

export default EmployeeDetails;
