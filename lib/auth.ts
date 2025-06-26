import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  sub: string;
  role: string;
  companyName: string;
  exp: number;
}




export const getUserFromToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};
