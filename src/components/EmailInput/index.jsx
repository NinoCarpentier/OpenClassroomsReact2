import styled from "styled-components";
import { useState } from "react";

import { useTheme } from "../../utils/hooks";
import colors from "../../utils/styles/colors";

const InputWrapper = styled.div`
  color: ${({ theme }) => (theme === "light" ? colors.dark : "white")};
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  color: ${({ theme }) => (theme === "light" ? colors.dark : "white")};
`;

const StyledInput = styled.input`
  border: none;
  color: ${({ theme }) => (theme === "light" ? colors.dark : "white")};
  background-color: transparent;
  border-bottom: 1px solid
    ${({ theme }) => (theme === "light" ? colors.dark : "white")};
  margin-top: 5px;
  margin-bottom: 15px;
`;

const EmailInput = () => {
  const [inputValue, setInputValue] = useState("");
  const { theme } = useTheme();

  return (
    <InputWrapper theme={theme}>
      <StyledLabel theme={theme}>Adresse Email</StyledLabel>
      <StyledInput
        value={inputValue}
        theme={theme}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </InputWrapper>
  );
};

export default EmailInput;
