import React, { useContext } from "react";
import { CalcButton } from "./Button";
import "../App.scss";
import { AppContext } from "../AppContext";
const characters: string[] = [
  "=",
  "C",
  "*",
  ":",
  "-",
  "+",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
  "0",
  ""
];

export const Calculator: React.FC = () => {
  const {
    result,
    operator,
    numberTyping,
    clean,
    operatorToUse,
    title
  } = useContext(AppContext);

  return (
    <div className="calculator-wrapper">
      <h2 className="calculator-title">{title}</h2>
      <div className="calculator">
        <div>
          <h3 className="result-small">
            {result.smallScreen}
            {operator.sign}
          </h3>
        </div>
        <div className="result">
          <h1>{result.numToDisplay}</h1>
        </div>
        {characters.map((val: string, ind: number) => {
          if (Number(val) || val === "0" || val === ".") {
            return (
              <CalcButton key={ind} handleClick={() => numberTyping(val)}>
                {val}
              </CalcButton>
            );
          } else if (val === "C") {
            return (
              <CalcButton key={ind} handleClick={() => clean()}>
                {val}
              </CalcButton>
            );
          } else {
            return (
              <CalcButton key={ind} handleClick={() => operatorToUse(val)}>
                {val}
              </CalcButton>
            );
          }
        })}
      </div>
    </div>
  );
};
