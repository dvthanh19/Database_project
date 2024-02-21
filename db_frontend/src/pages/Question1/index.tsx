import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  List,
  ListItem,
  ListItemText,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import Layout from "../../components/Layout";

import { GridColDef } from '@mui/x-data-grid';

import dayjs from 'dayjs';
import DataTable from "./Table";

import { apiQ1, responseMapper, requestMapper } from "../../api/apiQ1";


const columns: GridColDef[] = [
  { field: 'import_date', headerName: 'Date', width: 120 },
  { field: 'import_time', headerName: 'Time', width: 90 },
  { field: 'quantity', headerName: 'Quantity', width: 150, type: 'number'},
  { field: 'price', headerName: 'Price ($)', width: 150 , type: 'number'},
];

interface ImportInfo {
  date: string;
  time: string;
  quantity: number;
  price: number;
}

interface Data {
  categoryID: string;
  categoryName: string;
  supplierID: string;
  supplierName: string;
  supplierPhoneNumbers: string[];
  importInfos: ImportInfo[];
}

export default function Question1() {
  const defaultTimeTo = dayjs();
  const defaultTimeFrom = defaultTimeTo.subtract(12, "hour");

  var [formData, setFormData] = useState({
    materialName: "",
    materialID: "",
    searchByID: false,
    enableDateTimeRange: false,
    timeFrom: defaultTimeFrom,
    timeTo: defaultTimeTo,
  });


  var [searchResult, setSearchResult] = useState<Data[]>([]);

  var [searchClick, setSearchClick] = useState(false);

  var [isLoading, setIsLoading] = useState(false);

  const handleFormChange = (dataName: string) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
    setFormData({ ...formData, [dataName]: event.target.value });
  };

  const validateForm = () => {
    if (formData.searchByID) {
      if (formData.materialID == "") {
        return false;
      }
    } else {
      if (formData.materialName == "") {
        return false;
      }
    }

    if (!formData.enableDateTimeRange) {
      return true;
    }

    const dateIsNotFuture = defaultTimeTo.isAfter(formData.timeFrom) && defaultTimeTo.isAfter(formData.timeTo)
    const validRange = formData.timeTo.isAfter(formData.timeFrom)
    if (!dateIsNotFuture || !validRange) {
      return false;
    }

    return true;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    if (searchResult.length != 0) {
      setSearchResult([]);
    }
    setSearchClick(!searchClick);

    if (validateForm() == false) {
      console.log("Invalid form")
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiQ1(requestMapper(formData));
      setSearchResult(responseMapper(response.data));
      console.log(response.data)
    } catch (error) {
      console.log(error);

    }
    setIsLoading(false);
  };

  const handleDateChange = (dateName: string) => (date: dayjs.Dayjs | null) => {
    setFormData({ ...formData, [dateName]: date });
  };

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
    return (searchResult.map((row, index) => 
        <Container key={index} sx={{ width: "100%", marginTop: 3, marginBottom: 3, borderRadius:12, justifyContent: "center", alignItems: "start", display: "flex", bgcolor: "#fafafa"}}>
          <Stack direction="column" spacing={3}>
            <Typography variant="h4" fontWeight={700}>{row.categoryName} #{row.categoryID}</Typography>

            <Stack direction="row" spacing={3}>
              <Typography variant="h5" fontWeight={700}>Supplier name:</Typography>
              <Typography variant="h5">{row.supplierName}</Typography>
            </Stack>

            <Stack direction="row" spacing={3}>
              <Typography variant="h5" fontWeight={700}>Supplier ID:</Typography>
              <Typography variant="h5">{row.supplierID}</Typography>
            </Stack>

            <Typography variant="h5" fontWeight={700}>Supplier phone numbers:</Typography>
            <List sx={{ marginTop: 3, marginBottom: 3}}>
              {row.supplierPhoneNumbers.map((phoneNumber, index) => 
                <ListItem key={index}>
                  <ListItemText primary={phoneNumber} />
                </ListItem>
              )}
            </List>

            <Typography variant="h5" fontWeight={700}>Import information:</Typography>
            <DataTable searchResult={row.importInfos} columns={columns} categoryID={row.categoryID}/>

          </Stack>
        </Container>
      )
    )
  }

  return (
    <Layout>
      {/* TODO: Add your implementation below */}
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Stack direction="column" spacing={3}>
            <Typography variant="h4" fontWeight={700}>Search material purchasing information</Typography>
            <FormGroup>
              <Stack direction="column" spacing={2}>
                <FormLabel>Material Information</FormLabel>
                <FormControlLabel
                  control={<Switch
                    value={formData.searchByID}
                    onChange={e => {
                      setFormData({ ...formData, searchByID: !formData.searchByID, materialName: "", materialID: "" })
                    }}
                  />}
                  label="Search by ID"
                />
                <TextField
                  id="select-category"
                  key="select-category"
                  label="Category Name"
                  placeholder="Name"
                  required={!formData.searchByID}
                  value={formData.materialName}
                  disabled={formData.searchByID}
                  onChange={e => handleFormChange("materialName")(e)}
                >
                </TextField>

                <TextField 
                  id="id"
                  key="id" 
                  label="Category ID" 
                  placeholder="ID"
                  required={formData.searchByID}
                  value={formData.materialID}
                  disabled={!formData.searchByID}
                  onChange={e => handleFormChange("materialID")(e)}
                />

                <FormLabel>Supply Information</FormLabel>

                <FormControlLabel
                  control={<Switch
                    value={formData.enableDateTimeRange}
                    onChange={e => {
                      setFormData({ ...formData, enableDateTimeRange: !formData.enableDateTimeRange, timeFrom: defaultTimeFrom, timeTo: defaultTimeTo })
                    }}
                  />}
                  label="Date time range"
                />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                  <DateTimePicker
                    label="Time from"
                    value={formData.timeFrom}
                    onChange={(newValue) => handleDateChange("timeFrom")(newValue)}
                    disabled={!formData.enableDateTimeRange}
                    maxDateTime={formData.timeTo}
                    ampm={false}
                    disableFuture
                  />

                  <DateTimePicker
                    label="Time to"
                    value={formData.timeTo}
                    onChange={(newValue) => handleDateChange("timeTo")(newValue)}
                    disabled={!formData.enableDateTimeRange}
                    minDateTime={formData.timeFrom}
                    ampm={false}
                    disableFuture
                  />
                </DemoContainer>
              </LocalizationProvider>


                <Button 
                  type="submit"
                  variant="contained"
                  sx={{ width: 100, borderRadius: 12 }}>
                  Search
                </Button>
              </Stack>
            </FormGroup>
          </Stack>
        </FormControl>
      </form>
      {displaySearchResult()}
    </Layout>
  );
}
