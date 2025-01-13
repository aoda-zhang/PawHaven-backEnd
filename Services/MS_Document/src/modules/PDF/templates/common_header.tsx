import styled from "styled-components";
import i18n from "@i18n/i18n.config";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 16px;
  border-bottom: 1px solid #c0c0c0;
  padding-left: 20px;
  padding-bottom: 14px;
  .logo {
    width: 8%;
    height: auto;
  }
  .brand {
    font-size: 24px;
    font-weight: bold;
  }
  .slogan {
    font-size: 16px;
    font-weight: normal;
    font-style: italic;
    color: #c0c0c0;
    margin-left: 10px;
  }
`;

interface CommonHeaderProps {
  logoUrl: string;
  title?: string;
  slogan?: string;
}

const CommonHeader = ({ logoUrl, title, slogan }: CommonHeaderProps) => {
  return (
    <Container>
      <img src={logoUrl} alt="header" className="logo" />
      <span className="brand">{title ?? i18n.__("common.brand")}</span>
      <span className="slogan">{slogan ?? i18n.__("common.slogan")}</span>
    </Container>
  );
};

export default CommonHeader;
