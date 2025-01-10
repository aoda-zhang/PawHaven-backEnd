import React from "react";
import styled from "styled-components";
const Container = styled.div`
  font-size: 10px;
  text-align: center;
  width: 100%;
  padding-top: 14px;
  border-top: 1px solid #C0C0C0;
`;
const CommonFooter = () => {
  return (
    <Container>
      <span className="pageNumber"> </span>页，共
      <span className="totalPages"> </span>页
    </Container>
  );
};

export default CommonFooter;
