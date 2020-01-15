import React from "react";

interface CalcButtonProps {
  children: string;
  handleClick: Function;
}

export const CalcButton: React.FC<CalcButtonProps> = props => (
  <div className="calc-button" onClick={() => props.handleClick()}>
    {props.children}
  </div>
);
