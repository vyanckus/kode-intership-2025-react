import React from "react";
import styled from "styled-components";

const SkeletonContainer = styled.div`
  padding: 16px;
`;

const SkeletonItem = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 0;
  margin-bottom: 4px;
  background-color: #ffffff;
`;

const SkeletonAvatar = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: #f0f0f0;
  margin-right: 16px;
`;

const SkeletonText = styled.div`
  width: 180px;
  height: 60px;
  background-color: #f0f0f0;
`;

const EmployeeListSkeleton: React.FC = () => {
  return (
    <SkeletonContainer>
      {Array.from({ length: 10 }).map((_, index) => (
        <SkeletonItem key={index}>
          <SkeletonAvatar />
          <SkeletonText />
        </SkeletonItem>
      ))}
    </SkeletonContainer>
  );
};

export default EmployeeListSkeleton;
