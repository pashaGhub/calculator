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
  smallScreen: string | boolean;
  dotInNum: boolean;
  dotAtEnd: boolean;
  res: number;
}

interface IOperator {
  status: boolean;
  sign: string;
}

export const Calculator: React.FC = () => {
  const [result, setResult] = useState<IResult>({
    numToDisplay: "0",
    smallScreen: false,
    dotInNum: false,
    dotAtEnd: false,
    res: 0
  });

  const [operator, setOperator] = useState<IOperator>({
    status: true,
    sign: ""
  });

  // display result on screen
  function numberTyping(digit: string): void {
    if (operator.status) {
      digit === "."
        ? setResult({
            ...result,
            numToDisplay: "0" + digit,
            dotInNum: true,
            dotAtEnd: true
          })
        : setResult({ ...result, numToDisplay: digit });
    } else if (!result.dotInNum) {
      digit === "."
        ? setResult({
            ...result,
            numToDisplay: result.numToDisplay + digit,
            dotInNum: true,
            dotAtEnd: true
          })
        : setResult({ ...result, numToDisplay: result.numToDisplay + digit });
    } else if (digit !== ".") {
      setResult({
        ...result,
        numToDisplay: result.numToDisplay + digit,
        dotAtEnd: false
      });
    }

    setOperator({ ...operator, status: false });
  }

  // handle operator click
  function operatorToUse(newOperator: string): void {
    //removing dot at the end of the digit
    const checkedDigit: string = result.dotAtEnd
      ? result.numToDisplay.slice(0, -1)
      : result.numToDisplay;

    if (!result.smallScreen) {
      setResult({
        ...result,
        numToDisplay: checkedDigit,
        smallScreen: checkedDigit,
        dotInNum: false,
        dotAtEnd: false
      });
      setOperator({ status: true, sign: newOperator });
    } else if (!operator.status) {
      setResult({
        ...result,
        numToDisplay: checkedDigit,
        smallScreen: result.smallScreen + operator.sign + checkedDigit,
        dotInNum: false,
        dotAtEnd: false
      });
      setOperator({ status: true, sign: newOperator });
    }
  }

  // handle clean button
  function clean(): void {
    setResult({
      numToDisplay: "0",
      smallScreen: false,
      dotInNum: false,
      dotAtEnd: false,
      res: 0
    });
    setOperator({ status: true, sign: "" });
  }

  // execute the canculation
  function canculate(operation: string): number {
    switch (operation) {
      case "+":
        return result.res + Number(result.numToDisplay);
      case "-":
        return result.res - Number(result.numToDisplay);
      case ":":
        return result.res / Number(result.numToDisplay);
      case "*":
        return result.res * Number(result.numToDisplay);
      default:
        return result.res;
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
          } else if (val === "=") {
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
