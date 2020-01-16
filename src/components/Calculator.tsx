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
  breakpoint: boolean;
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
    res: 0,
    breakpoint: false
  });

  const [operator, setOperator] = useState<IOperator>({
    status: true,
    sign: ""
  });

  // display result on screen
  function numberTyping(digit: string): void {
    if (result.breakpoint) {
      clean();
    } else {
      if (operator.status) {
        console.log("im here...");

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
  }

  // handle operator click
  function operatorToUse(newOperator: string): void {
    calculate();

    //removing dot at the end of the digit
    const checkedDigit: string = result.dotAtEnd
      ? result.numToDisplay.slice(0, -1)
      : result.numToDisplay;

    console.log(result.breakpoint);
    console.log(newOperator);

    if (result.breakpoint) {
      setResult({
        ...result,
        smallScreen: result.res.toString(),
        breakpoint: false
      });
    } else if (!result.smallScreen) {
      setResult({
        ...result,
        numToDisplay: checkedDigit,
        smallScreen: checkedDigit,
        dotInNum: false,
        dotAtEnd: false,
        res: Number(checkedDigit)
      });
    } else if (newOperator === "=") {
      setResult({
        numToDisplay: calculate().toString(),
        smallScreen: result.smallScreen + operator.sign + checkedDigit,
        dotInNum: false,
        dotAtEnd: false,
        res: calculate(),
        breakpoint: true
      });
    } else if (!operator.status) {
      setResult({
        ...result,
        numToDisplay: calculate().toString(),
        smallScreen: result.smallScreen + operator.sign + checkedDigit,
        dotInNum: false,
        dotAtEnd: false,
        res: calculate()
      });
    }

    setOperator({ status: true, sign: newOperator });
  }

  // execute the canculation
  function calculate(): number {
    switch (operator.sign) {
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

  // handle clean button
  function clean(): void {
    setResult({
      numToDisplay: "0",
      smallScreen: false,
      dotInNum: false,
      dotAtEnd: false,
      res: 0,
      breakpoint: false
    });
    setOperator({ status: true, sign: "" });
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
