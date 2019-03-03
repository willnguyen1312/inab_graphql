/// <reference types="react-scripts" />

declare namespace NodeJS {
  export interface ProcessEnv {
    REACT_APP_SERVER_URL: string;
  }
}

export interface ErrorType {
  path: string;
  message: string;
}
