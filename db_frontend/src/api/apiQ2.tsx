import api from "./api"

interface requestData {
    name: string;
    address: string;
    bank : string;
    tax : string;
    phoneNumbers : string[];
}

export function requestMapper(formData: any): requestData {
    const { Name, Address, Bank, Tax, PhoneNumbers } = formData;
    const params = {
        name: Name,
        address: Address,
        bank : Bank,
        tax : Tax,
        phoneNumbers : PhoneNumbers,
    };
    return params;
}

export function responseMapper(data: any): any{
    return data;
}

export async function apiQ2(requestData: requestData) {
    const { name, address, bank, tax, phoneNumbers } = requestData;
    const params = {
        name, 
        address,
        bank,
        tax,
        phoneNumbers,
    }
    console.log(params);
    return api.post("/ques2", {params});
}
    
