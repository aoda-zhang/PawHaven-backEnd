import styled from "styled-components";
const Container = styled.div`
  font-size: 10px;
  text-align: center;
  width: 100%;
  padding-top: 14px;
  border-top: 1px solid #c0c0c0;
`;
const CommonFooter = () => {
  return (
    <Container>
      <span className="pageNumber"> </span>/
      <span className="totalPages"> </span>
    </Container>
  );
};

export default CommonFooter;
