import api from "./api"

interface requestData {
    supplierID: string;
    supplierName: string;
    searchByID: boolean;
    supplierPhoneNumber: string;
    searchByPhoneNumber: boolean;
}

export function requestMapper(formData: any): requestData {
    const { SupplierID, SupplierName, SearchbyID, supplierPhoneNumber, searchbyPhoneNumber} = formData;
    const params = {
        supplierID: SupplierID,
        supplierName: SupplierName,
        searchByID: SearchbyID,
        supplierPhoneNumber: supplierPhoneNumber,
        searchByPhoneNumber: searchbyPhoneNumber
    };
    return params;
}

export function responseMapper(data: any): any{
    return data;
}

export async function apiQ3(requestData: requestData) {
    const { supplierID, supplierName, searchByID, supplierPhoneNumber, searchByPhoneNumber } = requestData;
    const params = {
        supplierID,
        supplierName,
        searchByID,
        supplierPhoneNumber,
        searchByPhoneNumber
    }
    console.log(params);
    return api.get("/ques3", {params});
}
    
