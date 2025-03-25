import React, { useState } from "react";
import styled, { css } from "styled-components";
import { ReactComponent as SearchIconGray } from "../assets/icons/search-gray.svg";
import { ReactComponent as SearchIconBlack } from "../assets/icons/search-black.svg";
import { ReactComponent as SortIconGray } from "../assets/icons/sort-gray.svg";
import { ReactComponent as SortIconPurple } from "../assets/icons/sort-purple.svg";
import SortModal from "./SortModal";

const TopAppBarContainer = styled.header`
  padding: 16px 16px 0 16px;
  border-bottom: 1px solid #f7f7f8;
`;

const SearchTitle = styled.h2`
  margin-bottom: 18px;
  font-weight: 700;
  font-size: 24px;
  line-height: 117%;
  color: #050510;
`;

const SearchInputContainer = styled.div<{ $isFocused: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 22px;
  border-radius: 16px;
  padding: 8px 12px;
  background-color: #f7f7f8;
  width: 100%;
  min-height: 40px;
  position: relative;
`;

const SearchInput = styled.input`
  margin-right: 8px;
  width: 100%;
  outline: none;
  font-weight: 400;
  font-size: 15px;
  line-height: 133%;
  border: none;
  background-color: transparent;
  color: #050510;
  caret-color: #6246ea;

  &::placeholder {
    font-weight: 500;
    color: #c3c3c6;
  }
`;

const SearchIconGrayStyled = styled(SearchIconGray)`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const SearchIconBlackStyled = styled(SearchIconBlack)`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const SortButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  border-radius: 4px;

  &:focus-visible {
    outline: none;
  }
`;

const SortIconGrayStyled = styled(SortIconGray)`
  width: 21px;
  height: 12px;
`;

const SortIconPurpleStyled = styled(SortIconPurple)`
  width: 21px;
  height: 12px;
`;

const JobTitleList = styled.ul`
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  margin: 0;
  padding: 0;
  list-style: none;
`;

const JobTitleItem = styled.li<{ $active: boolean }>`
  padding: 8px 12px;
  cursor: pointer;
  font-weight: 500;
  line-height: 133%
  white-space: nowrap;
  overflow-wrap: normal;
  color: #97979b;
  background-color: transparent;
  transition: color 0.3s ease;

  ${(props) =>
    props.$active &&
    css`
      font-weight: 600;
      color: #050510;
      border-bottom: 2px solid #6534ff;
      transition: border-bottom 0.3s ease-in-out;
    `}
`;

interface TopAppBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedJobTitle: string;
  setSelectedJobTitle: (jobTitle: string) => void;
  onSortChange: (sortType: "alphabetical" | "birthday") => void;
  currentSortOrder: "alphabetical" | "birthday";
}

const TopAppBar: React.FC<TopAppBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedJobTitle,
  setSelectedJobTitle,
  onSortChange,
  currentSortOrder,
}) => {
  const jobTitles = [
    "Все",
    "Android",
    "iOS",
    "Дизайн",
    "Менеджмент",
    "QA",
    "Бэк-офис",
    "Frontend",
    "HR",
    "PR",
    "Backend",
    "Техподдержка",
    "Аналитика",
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleJobTitleClick = (jobTitle: string) => {
    setSelectedJobTitle(jobTitle);
  };

  const [isFocused, setIsFocused] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [isSortButtonHovered, setIsSortButtonHovered] = useState(false);

  return (
    <TopAppBarContainer>
      <SearchTitle>Поиск</SearchTitle>
      <SearchInputContainer $isFocused={isFocused}>
        {isFocused ? <SearchIconBlackStyled /> : <SearchIconGrayStyled />}
        <SearchInput
          type="text"
          placeholder="Введите имя, тег, почту..."
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <SortButton
          onClick={() => setIsSortModalOpen(true)}
          onMouseEnter={() => setIsSortButtonHovered(true)}
          onMouseLeave={() => setIsSortButtonHovered(false)}
        >
          {isSortButtonHovered ? (
            <SortIconPurpleStyled />
          ) : (
            <SortIconGrayStyled />
          )}
        </SortButton>
      </SearchInputContainer>
      <JobTitleList>
        {jobTitles.map((jobTitle) => (
          <JobTitleItem
            key={jobTitle}
            $active={selectedJobTitle === jobTitle}
            onClick={() => handleJobTitleClick(jobTitle)}
          >
            {jobTitle}
          </JobTitleItem>
        ))}
      </JobTitleList>
      <SortModal
        isOpen={isSortModalOpen}
        onClose={() => setIsSortModalOpen(false)}
        onSortChange={(sortOrder) => {
          onSortChange(sortOrder);
          setIsSortModalOpen(false);
        }}
        currentSortOrder={currentSortOrder}
      />
    </TopAppBarContainer>
  );
};

export default TopAppBar;
