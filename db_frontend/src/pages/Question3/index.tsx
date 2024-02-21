import { Typography, TextField, Container, CircularProgress, Stack, Switch, FormGroup, FormControlLabel, Button, List, ListItem, ListItemText } from "@mui/material";
import Layout from "../../components/Layout";
import {useState} from "react"
import {apiQ3, requestMapper, responseMapper} from "../../api/apiQ3"
import CategoryInfo from "./CategoryInfo";

interface Supplier{
  supplierID: string;
  supplierName: string;
  supplierPhoneNumbers: string[];
  partnerInfo: string;
  partnerFName: string;
  partnerLName: string;
  partnerGender: string;
  partnerAddress: string;
  categories: Category[];
}

interface Category{
  ID: string;
  name: string;
  color: string;
  quantity: number;
  priceHistory: priceHistory[];
}

interface priceHistory {
  date: string;
  price: number;
}

export default function Question3() {
  var [searchResult, setSearchResult] = useState<Supplier[]>([]);
  var [isLoading, setIsLoading] = useState(false);
  var [formData, setFormData] = useState({
    SupplierName: "", 
    SupplierID: "",
    SearchbyID: false,
    supplierPhoneNumber: "",
    searchbyPhoneNumber: false
  })

  const handleSubmitSupplier = async (e: any) => {
    e.preventDefault();
    console.log(formData);
    setIsLoading(true);
    try {
      const response = await apiQ3(requestMapper(formData));
      console.log(response.data);
      setSearchResult(responseMapper(response.data));
    }
    catch(error){
      console.log(error);
    }
    setIsLoading(false);
  }

  const displaySearchResult = () => {
    if (isLoading == true) {
      return (
        <Container sx={{ height: 400, width: 900, marginTop: 20, justifyContent: "center", alignItems: "start", display: "flex"}}>
          <CircularProgress />
        </Container>
      )
    }

    if (searchResult.length == 0) {
      return (
        <Container sx={{ height: 400, marginTop: 20, justifyContent: "center", alignItems: "start", display: "flex"}}>
          <Typography variant="h4">No result found</Typography>
        </Container>
      )
    }
    
    return (<List>
      {searchResult.map((row, index) =>  
        <Container key={index} sx={{ width: "100%", marginTop: 3, marginBottom: 3, borderRadius:12, justifyContent: "center", alignItems: "start", display: "flex", bgcolor: "#fafafa"}}>
        <Stack direction="column" spacing={1}>
        <Stack direction = "row" spacing={3}>
          <Stack direction="row" spacing={1}>
          <Typography variant="h5" fontWeight={700}> Supplier Name:</Typography>
          <Typography variant="h5" fontWeight={400}> {row.supplierName}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
          <Typography variant="h5" fontWeight={700}> Supplier ID:</Typography>
          <Typography variant="h5" fontWeight={400}> {row.supplierID}</Typography>
          </Stack>        
          </Stack>
        <Typography variant="h5" fontWeight={700}>Supplier phone numbers:</Typography>
          <List sx={{ marginTop: 3, marginBottom: 3}}>
            {row.supplierPhoneNumbers.map((phoneNumber, index) => 
              <ListItem key={index}>
                <ListItemText primary={phoneNumber} />
              </ListItem>
            )}
          </List>
        <Typography variant="h5" fontWeight={700}> Partner Employee Information:</Typography>
        <Stack direction="row" spacing={1}>
          <Typography variant="h5" fontWeight={700}> Employee ID:</Typography>
          <Typography variant="h5" fontWeight={400}>{row.partnerInfo}</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Typography variant="h5" fontWeight={700}> Employee Name:</Typography>
          <Typography variant="h5" fontWeight={400}>{row.partnerLName} {row.partnerFName}</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Typography variant="h5" fontWeight={700}> Employee Gender:</Typography>
          <Typography variant="h5" fontWeight={400}> {row.partnerGender}</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Typography variant="h5" fontWeight={700}> Employee Address:</Typography>
          <Typography variant="h5" fontWeight={400}> {row.partnerAddress}</Typography>
        </Stack>
        {/* Table for information */}
        <Typography variant="h5" fontWeight={700}> Information about the categories supplied by this supplier: </Typography>
        <CategoryInfo supplier={row}/>
        {/* <List>
          {searchResult.suppliers.map((supplier: Supplier) => <CategoryInfo supplier={supplier}/> )}
        </List> */}
        </Stack>
        </Container>
      )}
      </List>
      
      )
  }
  return (
    <Layout>
      {/* TODO: Add your implementation below */}
      <Stack direction={"column"} spacing={3}>
        <Typography variant="h4" fontWeight={700}>Search Category Information</Typography>
        <FormGroup>
          <FormControlLabel 
          control = {<Switch
            value = {formData.SearchbyID}
            onChange = {e => {setFormData({...formData, SearchbyID: !formData.SearchbyID, SupplierID: '', SupplierName: '',
             supplierPhoneNumber: ''})}}
            disabled = {formData.searchbyPhoneNumber}
          />}
          label = "Search by ID"/>
          <FormControlLabel
          control = {<Switch
          value = {formData.searchbyPhoneNumber}
          onChange={e => {setFormData({...formData, searchbyPhoneNumber: !formData.searchbyPhoneNumber, SupplierID: '', SupplierName: '',
          supplierPhoneNumber: ''})}}
          />}
          label = "Search by Phone Number"
          />
        </FormGroup>
        <TextField
          id = "select-supplier"
          key= "select-supplier"
          label="Supplier Name:"
          placeholder="Name"
          required={!formData.SearchbyID}
          value={formData.SupplierName}
          disabled={formData.SearchbyID || formData.searchbyPhoneNumber}
          onChange={e => {setFormData({...formData, SupplierName: e.target.value})}}
        />
        <TextField
          id = "select-id"
          key= "select-id"
          label="Supplier ID:"
          placeholder="ID"
          required={formData.SearchbyID}
          value={formData.SupplierID}
          disabled={!formData.SearchbyID || formData.searchbyPhoneNumber}
          onChange={e => {setFormData({...formData, SupplierID: e.target.value})}}
        />
        <TextField
        id = "select-phone-number"
        key= "select-phone-number"
        label="Supplier Phone Number:"
        placeholder="Phone Number"
        required={formData.searchbyPhoneNumber}
        value={formData.supplierPhoneNumber}
        disabled={!formData.searchbyPhoneNumber}
        onChange={e => {setFormData({...formData, supplierPhoneNumber: e.target.value})}}
        />
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmitSupplier}
          sx={{ width: 100, borderRadius: 12 }}
        >
        Search
        </Button>
      </Stack>
      { isLoading &&
        <Container sx={{ height: 400, width: 900, marginTop: 20, justifyContent: "center", alignItems: "start", display: "flex"}}>
          <CircularProgress />
        </Container> }
      {displaySearchResult()}
    </Layout>
  )
};

