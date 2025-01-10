import styled from "styled-components";
import i18n from "@i18n/i18n.config"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  border-bottom: 1px solid #c0c0c0;
  padding-bottom: 14px;
  .left {
    display: flex;
    align-items: center;
    .logo {
      width: 8%;
      height: auto;
    }
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

interface CommonHeaderProps {
  logoUrl: string;
  title?: string;
  slogan?: string;
  businessName?: string;
  businessDescription?: string;
}

const CommonHeader = ({
  logoUrl,
  title,
  slogan,
  businessName,
  businessDescription,
}: CommonHeaderProps) => {
  return (
    <Container>
      <div className="left">
        <img src={logoUrl} alt="header" className="logo" />
        <span>{i18n.__('common.brand')}</span>
        <span>{slogan}</span>
      </div>
      <div className="right">
        <span>{businessName}</span>
        <span>{businessDescription}</span>
      </div>
    </Container>
  );
};

export default CommonHeader;
