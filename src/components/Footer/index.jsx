import styled from "styled-components";

import Emailinput from "../EmailInput";
import colors from "../../utils/styles/colors";
import { useTheme } from "../../utils/hooks";

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 60px;
`;

const NightModeButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${colors.secondary};
`;

const Footer = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <FooterContainer>
      <Emailinput theme={theme} />
      <NightModeButton onClick={() => toggleTheme()}>
        Changer de mode : {theme === "light" ? "☀️" : "🌙"}
      </NightModeButton>
    </FooterContainer>
  );
};

export default Footer;
