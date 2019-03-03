/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Hi
// ====================================================

export interface Hi_hi {
  __typename: 'HiBack';
  message: string;
}

export interface Hi {
  hi: Hi_hi | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login {
  __typename: 'Error';
  path: string;
  message: string;
}

export interface Login {
  login: Login_login[] | null;
}

export interface LoginVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Register
// ====================================================

export interface Register_register {
  __typename: 'Error';
  path: string;
  message: string;
}

export interface Register {
  register: Register_register[] | null;
}

export interface RegisterVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
