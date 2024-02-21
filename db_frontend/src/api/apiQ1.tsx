import api from './api';

interface RequestData {
  categoryID: string;
  categoryName: string;
  searchByID: boolean;
  enableDateTimeRange: boolean;
  dateFrom: string;
  dateTo: string;
  timeFrom: string;
  timeTo: string;
}

export function requestMapper(formData: any): RequestData {
  const { materialID, materialName, searchByID, enableDateTimeRange, timeFrom, timeTo } = formData;
  const params = {
    categoryID: materialID,
    categoryName: materialName,
    searchByID,
    enableDateTimeRange,
    dateFrom: timeFrom.format("YYYY-MM-DD"),
    dateTo: timeTo.format("YYYY-MM-DD"),
    timeFrom: timeFrom.format("HH:mm:ss"),
    timeTo: timeTo.format("HH:mm:ss"),
  };
  return params;
}

export function responseMapper(data: any): any {
  console.log(data);
  if (!data) {
    return [];
  }
  return data;
}

export async function apiQ1(requestData: RequestData): Promise<any> {
  const { categoryID, categoryName, searchByID, enableDateTimeRange, dateFrom, dateTo, timeFrom, timeTo } = requestData;
  const params = {
    categoryID,
    categoryName,
    searchByID,
    enableDateTimeRange,
    dateFrom,
    dateTo,
    timeFrom,
    timeTo,
  };
  console.log(params);
  return api.get("/ques1", { params });
}