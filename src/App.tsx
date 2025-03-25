import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import EmployeeList from "./components/EmployeeList";
import EmployeeDetails from "./components/EmployeeDetails";
import TopAppBar from "./components/TopAppBar";
import GlobalStyle from "./styles/globalStyles";
import ErrorScreen from "./components/ErrorScreen";
import EmployeeListSkeleton from "./components/EmployeeListSkeleton";
import { getUsers } from "./api/getUsers";

const HiddenH1 = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJobTitle, setSelectedJobTitle] = useState("Все");
  const [sortType, setSortType] = useState<"alphabetical" | "birthday">(
    "alphabetical"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSortChange = (sort: "alphabetical" | "birthday") => {
    setSortType(sort);
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      await getUsers();
    } catch (e: any) {
      setError("Failed to load employees.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchData();
  };

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <HiddenH1>Список сотрудников компании</HiddenH1>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <TopAppBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedJobTitle={selectedJobTitle}
                    setSelectedJobTitle={setSelectedJobTitle}
                    onSortChange={handleSortChange}
                    currentSortOrder={sortType}
                  />
                  {loading ? (
                    <EmployeeListSkeleton />
                  ) : error ? (
                    <ErrorScreen onRetry={handleRetry} />
                  ) : (
                    <EmployeeList
                      searchQuery={searchQuery}
                      selectedJobTitle={selectedJobTitle}
                      sortType={sortType}
                    />
                  )}
                </>
              }
            />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
