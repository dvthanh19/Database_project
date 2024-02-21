import React, { useState } from "react";
import { TextField, Typography,Button, Stack, IconButton, Container, Alert} from "@mui/material";
import Layout from "../../components/Layout";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { apiQ2 } from "../../api/apiQ2";
import { requestMapper } from "../../api/apiQ2";
import { responseMapper } from "../../api/apiQ2";
import axios, { AxiosError } from "axios";

export default function Question2() {
  
  const [name,setName] = useState('');
  const [errorName, setErrorName] = useState(false)

  const [address,setAddress] = useState('');
  const [errorAddress, setErrorAddress] = useState(false)

  const [bank,setBank] = useState('');
  const [errorBank, setErrorBank] = useState(false)

  const [tax,setTax] = useState('');
  const [errorTax, setErrorTax] = useState(false)

  const [phoneNumbers, setPhoneNumbers] = useState([""]);
  const [errorPhoneNumbers, setErrorPhoneNumbers] = useState([false])
  const [statusMessage, setStatusMessage] = useState<String>('')
  const [responseData, setResponseData] = useState<any>({});

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) =>{
    e.preventDefault()
    const formData = {
      Name: name,
      Address: address,
      Bank: bank,
      Tax: tax,
      PhoneNumbers: phoneNumbers,
    }
    setResponseData({})
    setStatusMessage('')
    try {
      const response = await apiQ2(requestMapper(formData))
      setResponseData(responseMapper(response.data))
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
  
        if (axiosError.response?.status === 400) {
          console.error('Bad Request: The request is invalid.');
          const responseData = axiosError.response?.data;
          const errorMessage = typeof responseData === 'string' ? responseData : 'An unexpected error occurred';
          setStatusMessage(errorMessage);
        } else {
          console.error(`HTTP error! Status: ${axiosError.response?.status}`);
        }
      } else {
        console.error('Error:', error);
      }
    }
  }
  const displaySearchResult = () => {
    if (statusMessage != '') {
      return (
        <Alert severity="error">{statusMessage}</Alert>
      )
    }

    if(Object.keys(responseData).length != 0){
      return (
        <Container sx={{ width: "100%", marginTop: 3, marginBottom: 3, borderRadius:12, justifyContent: "center", alignItems: "start", display: "flex", bgcolor: "#fafafa"}}>
        <Stack direction="column" spacing={3} marginBottom={3}>
           <Stack direction="row" spacing={3}>
          <Typography variant="h5" fontWeight={700}>Success:</Typography>
          <Typography variant="h5">{responseData.success}</Typography>
        </Stack>
       <Stack direction="row" spacing={3}>
          <Typography variant="h5" fontWeight={700}>Status message:</Typography>
          <Typography variant="h5">{responseData.statusMessage}</Typography>
        </Stack>
        <Stack direction="row" spacing={3}>
          <Typography variant="h5" fontWeight={700}>Supplier Code:</Typography>
          <Typography variant="h5">{responseData.supplierCode}</Typography>
        </Stack>
        <Stack direction="row" spacing={3}>
          <Typography variant="h5" fontWeight={700}>Staff ID:</Typography>
          <Typography variant="h5">{responseData.staffID}</Typography>
        </Stack>
        <Stack direction="row" spacing={3}>
          <Typography variant="h5" fontWeight={700}>Staff First Name:</Typography>
          <Typography variant="h5">{responseData.staffFName}</Typography>
        </Stack>
  
        <Stack direction="row" spacing={3}>
          <Typography variant="h5" fontWeight={700}>Staff Last Name:</Typography>
          <Typography variant="h5">{responseData.staffLName}</Typography>
        </Stack>        
  </Stack>
  </Container>

        )
    }

    
    
  }

  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneRegex =/^[0-9]{10}$/
    return phoneRegex.test(phoneNumber);
  };

  const handleChangePhoneNumbers = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const value = e.target.value;
    const list = [...phoneNumbers];
    list[index] = value;
    setPhoneNumbers(list);
    const errorList = [...errorPhoneNumbers];
    errorList[index] = !validatePhoneNumber(value);
    setErrorPhoneNumbers(errorList);
  }
  
  
  const handleBankAccountChange=(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    const value = e.target.value;
    setBank(value);
    const BankAccountRegex =/^[0-9]{9,15}$/
    setErrorBank(!BankAccountRegex.test(value));
  };

  const handleTaxCodeChange=(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    const value = e.target.value;
    setTax(value);
    const TaxCodeRegex =/^[0-9a-zA-Z]{10,13}$/
    setErrorTax(!TaxCodeRegex.test(value));
  }

  const handleNameChange=(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    const value = e.target.value;
    setName(value);
    const NameRegex =/^.{1,50}$/
    setErrorName(!NameRegex.test(value));
  }

  const handleAddressChange=(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    const value = e.target.value;
    setAddress(value);
    const AddressRegex =/^.{1,60}$/
    setErrorAddress(!AddressRegex.test(value));
  }
 
  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2} justifyContent="center" alignItems="start" sx={{ width: "800px", marginBottom: 15 }}>
          <Typography gutterBottom variant="h3" align="center" color="#7777fc">Sign Up</Typography>
          <TextField
            key="name"
            onChange={handleNameChange}
            fullWidth
            label="Name"
            variant="outlined"
            color="primary"
            required
            placeholder="Enter your name"
            value={name}
            error={errorName}
            helperText={errorName ? "Invalid Name!" : ''}
            />
          <TextField
            key="address"
            onChange={handleAddressChange}
            fullWidth
            label="Address"
            variant="outlined"
            color="primary"
            required
            placeholder="Enter your address"
            margin="dense"
            value={address}
            error={errorAddress}
            helperText={errorAddress ? "Invalid Address!" : ''}
            />
          <TextField
            key="bank account"
            onChange={handleBankAccountChange}
            fullWidth
            label="Bank Account"
            variant="outlined"
            color="primary"
            required
            placeholder="Enter your bank account"
            margin="dense"
            value={bank}
            error={errorBank}
            helperText={errorBank?"Invalid Bank!":''}
          />
          <TextField
            key="tax code"
            onChange={handleTaxCodeChange}
            fullWidth
            label="Tax code"
            variant="outlined"
            color="primary"
            required
            placeholder="Enter your tax code"
            margin="dense"
            value={tax}
            error={errorTax}
            helperText={errorTax ? "Invalid Tax Code!" : ''}
          />

          {phoneNumbers.map((phoneNumber, index) => 
            <Stack spacing={2} direction="row" justifyContent="start" alignItems="center">
              <TextField
                key={"phone number " + index}
                onChange={e => handleChangePhoneNumbers(e, index)}
                label={ "Phone Number " + (index + 1)}
                variant="outlined"
                color="primary"
                required
                placeholder="Enter your phone number"
                margin="dense"
                value={phoneNumber}
                error={errorPhoneNumbers[index]}
                helperText={errorPhoneNumbers[index] ?"Invalid Phone Number!" : ""}
                sx={{ width: "500px" }}
                />
              { index != 0 && 
                <IconButton
                  onClick={() => {
                    const list = [...phoneNumbers];
                    list.splice(index, 1);
                    setPhoneNumbers(list);
                  }}
                >
                  <DeleteIcon/>
                </IconButton>
              }
            </Stack>
          )}
          <Button
            sx={{ width: "500px" }}
            variant="outlined"
            onClick={() => setPhoneNumbers([...phoneNumbers, ""])}
          >
            <AddIcon/>
            <Typography variant="body2" sx={{ flex: 1 }}>
              Add phone number
            </Typography>
          </Button>
          
          <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <Button
              type="submit"
              color="primary"
              variant="contained"
              sx={{ borderRadius: 12 }}
              >
              Submit
            </Button>

              <Button
                variant="outlined"
                sx={{ borderRadius: 12 }}
                onClick={() => {
                  setName('');
                  setAddress('');
                  setBank('');
                  setTax('');
                  setPhoneNumbers([""]);
                  setErrorBank(false);
                  setErrorPhoneNumbers([false]);
                }}
                >
                Clear
            </Button>

          </Stack>
        
        </Stack>

      </form>
      {displaySearchResult()}
    </Layout>
  );
}
