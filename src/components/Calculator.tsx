import React, { useState } from "react";
import { CalcButton } from "./Button";
import "../App.scss";

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

interface IResult {
  numToDisplay: string;
  smallScreen: string;
  res: number;
}

interface IOperator {
  status: boolean;
  sign: string;
}

export const Calculator: React.FC = () => {
  const [result, setResult] = useState<IResult>({
    numToDisplay: "0",
    smallScreen: "",
    res: 0
  });

  const [operator, setOperator] = useState<IOperator>({
    status: false,
    sign: ""
  });

  // display result on screen
  function numberTyping(digit: string): void {
    if (result.numToDisplay === "0") {
      setResult({ ...result, numToDisplay: digit });
    } else if (operator.status) {
      setResult({
        ...result,
        numToDisplay: digit,
        smallScreen: result.smallScreen + operator.sign
      });
    } else {
      setResult({ ...result, numToDisplay: result.numToDisplay + digit });
    }

    setOperator({ status: false, sign: "" });
  }

  // manage operator click
  function operatorToUse(newOperator: string): void {
    if (operator.status) {
      setOperator({ ...operator, sign: newOperator });
    } else {
      setResult({
        ...result,
        smallScreen: result.smallScreen + result.numToDisplay
      });
      setOperator({ status: true, sign: newOperator });
    }
  }

  return (
    <div className="calculator-wrapper">
      <h2 className="calculator-title">Fix me!</h2>
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
          if (Number(val) || val === "0") {
            return (
              <CalcButton key={ind} handleClick={() => numberTyping(val)}>
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
