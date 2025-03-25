import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as CloseIcon } from "../assets/icons/close.svg";

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSortChange: (sortOrder: "alphabetical" | "birthday") => void;
  currentSortOrder: "alphabetical" | "birthday";
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgba(5, 5, 16, 0.16);
`;

const ModalWrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 26px 16px;
  border-radius: 20px;
  width: 373px;
  height: 192px;
  background-color: #fff;
`;

const ModalCloseButton = styled(CloseIcon)`
  position: absolute;
  top: 24px;
  right: 23px;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  align-self: center;
  margin-bottom: auto;
  font-size: 20px;
  font-weight: 600;
  line-height: 120%;
  text-align: center;
  color: #050510;
`;

const ModalRadioWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  column-gap: 60px;
`;

const ModalRadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 30px;
  font-weight: 500;
  font-size: 16px;
  line-height: 125%;
  color: #050510;

  input {
    display: none;
  }

  .custom-radio {
    width: 24px;
    height: 24px;
    border: 2px solid #6534ff;
    border-radius: 50%;
    position: relative;
    margin-right: 12px;
    transition: background-color 0.2s;

    &.checked {
      background-color: #6534ff;

      &::after {
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #ffffff;
        position: absolute;
        top: 6px;
        left: 6px;
      }
    }
  }
`;

interface CustomRadioProps {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const CustomRadio: React.FC<CustomRadioProps> = ({
  label,
  checked,
  onChange,
  value,
}) => (
  <ModalRadioLabel>
    <input type="radio" value={value} checked={checked} onChange={onChange} />
    <div className={`custom-radio ${checked ? "checked" : ""}`} />
    {label}
  </ModalRadioLabel>
);

function SortModal({
  isOpen,
  onClose,
  onSortChange,
  currentSortOrder,
}: SortModalProps) {
  const [selectedOption, setSelectedOption] = useState<
    "alphabetical" | "birthday"
  >(currentSortOrder);

  const handleChange = (sortOrder: "alphabetical" | "birthday") => {
    setSelectedOption(sortOrder);
    onSortChange(sortOrder);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalWrap onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Сортировка</ModalTitle>
        <ModalCloseButton onClick={onClose} />
        <ModalRadioWrap>
          <CustomRadio
            label="По алфавиту"
            value="alphabetical"
            checked={selectedOption === "alphabetical"}
            onChange={() => handleChange("alphabetical")}
          />
          <CustomRadio
            label="По дню рождения"
            value="birthday"
            checked={selectedOption === "birthday"}
            onChange={() => handleChange("birthday")}
          />
        </ModalRadioWrap>
      </ModalWrap>
    </ModalOverlay>
  );
}

export default SortModal;
