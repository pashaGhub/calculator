import React, { createContext, useState } from "react";

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
interface IState {
  result: IResult;
  operator: IOperator;
}

const initialState: IState = {
  result: {
    numToDisplay: "0",
    smallScreen: false,
    dotInNum: false,
    dotAtEnd: false,
    res: 0,
    breakpoint: false
  },
  operator: {
    status: true,
    sign: ""
  }
};

export const AppContext = createContext<IState | any>(initialState);

export function ContextProvider(props: any): JSX.Element {
  const [result, setResult] = useState<IResult>(initialState.result);
  const [operator, setOperator] = useState<IOperator>(initialState.operator);
  const [title, setTitle] = useState<string>("Welcome");

  // display result on screen
  function numberTyping(digit: string): void {
    if (result.breakpoint) {
      clean();
    } else {
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
  }

  // handle operator click
  function operatorToUse(newOperator: string): void {
    calculate();

    //removing dot at the end of the digit
    const checkedDigit: string = result.dotAtEnd
      ? result.numToDisplay.slice(0, -1)
      : result.numToDisplay;

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

  // handle title changing
  function handleTitleChange(newTitle: string): void {
    setTitle(newTitle);
    clean();
  }

  return (
    <AppContext.Provider
      value={{
        result,
        operator,
        numberTyping,
        operatorToUse,
        clean,
        title,
        handleTitleChange
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
