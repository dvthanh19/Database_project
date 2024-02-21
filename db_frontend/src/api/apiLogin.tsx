import api from './api';

interface RequestData {
  username: string;
  password: string;
  isSafe: boolean;
}

interface ResponseData {
  status: string;
  message: string;
}

interface FormData {
  username: string;
  password: string;
  isSafe: boolean;
}

export const requestMapper = (formData: FormData): RequestData => {
  const { username, password, isSafe } = formData;
  const params = {
    username,
    password,
    isSafe,
  };
  return params;
}

export const responseMapper = (response: any): ResponseData => {
  if (!response) {
    return {
      status: "Failed",
      message: "Something unexpected happened.",
    };
  }
  return {
    status: response.data.status,
    message: response.data.message,
  };
}

export const apiLogin = async (requestData: RequestData): Promise<any> => {
  const { username, password, isSafe } = requestData;
  const params = {
    username,
    password,
  };
  console.log(requestData);
  if (isSafe) {
    return api.post("/login/safe", params);
  } else {
    return api.post("/login/unsafe", params);
  }
}