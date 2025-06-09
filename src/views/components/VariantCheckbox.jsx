import React from "react";
import styled from "styled-components";

const VariantCheckbox = React.memo(({ id, label, checked, onChange }) => {
  return (
    <OptionItem>
      <HiddenCheckbox
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />

      <OptionLabel htmlFor={id}>
        <StyledCheckbox htmlFor={id} checked={checked}>
          <CheckIcon viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </CheckIcon>
        </StyledCheckbox>
        {label}
      </OptionLabel>
    </OptionItem>
  );
});

VariantCheckbox.displayName = "VariantCheckbox";

const OptionItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #333;
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`;
const StyledCheckbox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: 2px solid ${(props) => (props.checked ? "#4285f4" : "#aaa")};
  border-radius: 4px;
  background: ${(props) => (props.checked ? "#4285f4" : "white")};
  margin-right: 0.5rem;
  transition: all 0.2s;
`;
const CheckIcon = styled.svg`
  width: 12px;
  height: 12px;
  visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  stroke: white;
  stroke-width: 3px;
  fill: none;
`;

export default VariantCheckbox;
