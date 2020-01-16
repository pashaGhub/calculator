import React, { createContext } from "react";

interface IResult {
  numToDisplay: string;
  smallScreen: string | boolean;
  dotInNum: boolean;
  dotAtEnd: boolean;
  res: number;
  breakpoint: boolean;
}

interface IState {
  result: IResult;
}

const initialState: IState = {
  result: {
    numToDisplay: "0",
    smallScreen: false,
    dotInNum: false,
    dotAtEnd: false,
    res: 0,
    breakpoint: false
  }
};

export const AppContext = createContext<IState>(initialState);

function reducer() {}

export function ContextProvider(props: any): JSX.Element {
  return (
    <AppContext.Provider value={initialState}>
      {props.children}
    </AppContext.Provider>
  );
}
