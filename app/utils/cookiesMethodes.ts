// Cookie utility functions
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setCookie = (
  name: string,
  value: string,
  expirationMinutes: number
): void => {
  cookies.set(name, value, {
    path: "/",
    secure: true,
    sameSite: "strict",
    expires: convertMinuteToDate(expirationMinutes),
  });
};

export const getCookie = (name: string): string | null => {
  return cookies.get(name) || null;
};

export const deleteCookie = (name: string): void => {
  cookies.remove(name, { path: "/" });
};

export const checkCookieExists = (name: string): boolean => {
  return cookies.get(name) !== undefined;
};

export const getAllCookies = (): { [key: string]: string } => {
  return cookies.getAll();
};

// Helper function to convert minutes to Date object
const convertMinuteToDate = (minutes: number): Date => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + minutes);
  return date;
};
