//======================================
//==================BODY================
//======================================

export interface LoginBodyService {
  email: string;
  password: string;
}

//======================================
//===============RESPONSE===============
//======================================

export interface LoginServiceResponse {
  user: User;
  token: string;
  ok: boolean;
}

export interface User {
  id: string;
  image: string;
  name: string;
  email: string;
  role: string;
}

//======================================
//===============REGISTER===============
//======================================

export interface registerBodyService {
  userName: string;
  email: string;
  password: string;
  role: string;
}

//==============================================
//===============REGISTER RESPONSE==============
//==============================================

export interface RegisterServiceResponse {
  message: string;
  result: RegisterResult;
  ok: boolean;
}

export interface RegisterResult {
  userName: string;
  email: string;
  role: string;
  id: string;
}
