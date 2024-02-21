import api from './api';
import dayjs from 'dayjs';

interface RequestData {
  customerID: string;
  customerPhoneNumber: string;
  searchByID: boolean;
}

export function requestMapper(formData: any): RequestData {
  const params = {
    customerID: formData.ID,
    customerPhoneNumber: formData.phoneNumber,
    searchByID: formData.searchByID,
  };
  return params;
}

export function responseMapper(data: any): any {
  if (!data) {
    return {};
  }
  return {
    ...data,
    debtDateCount: data.debtStartDate ? dayjs().diff(dayjs(data.debtStartDate), 'day') : 0,
  };
}

export async function apiQ4(requestData: RequestData): Promise<any> {
  const { customerID, customerPhoneNumber, searchByID } = requestData;
  const params = {
    customerID,
    customerPhoneNumber,
    searchByID
  };
  console.log(params);
  return api.get("/ques4", { params });
}