import * as React from 'react';
import Layout from '../../components/Layout';
import { Button, CircularProgress, Container, FormControlLabel, List, ListItem, ListItemText, Stack, Switch, TextField, Typography } from '@mui/material';
import { apiQ4, requestMapper, responseMapper } from '../../api/apiQ4';
import OrderInfo from './OrderInfo';

interface PaymentHistory {
  date: string;
  time: string;
  amount: number;
}

interface Order {
  ID: string;
  boltID: string;
  dateTimeMade: string;
  totalPrice: number;
  status: string;
  dateTimeProcessed: string;
  cancelReason: string;
  staffID: string;
  staffFName: string;
  staffLName: string;
  paymentHistory: PaymentHistory[];
}

interface Category {
  categoryID: string;
	categoryName: string;
  orders: Order[];
}

interface SearchResult {
  ID: string;
  fname: string;
	lName: string;
	address: string;
	arrearage: number;
	debtStartDate: string;
	phoneNumbers: string[];
  categories: Category[];
}

export default function Question4() {
  const [ID, setID] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [searchByID, setSearchByID] = React.useState(true);
  const [searchResult, setSearchResult] = React.useState<any>({});
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSearch = async (e: any) => {
    e.preventDefault();

    const formData = {
      ID,
      phoneNumber,
      searchByID,
    }
    setIsLoading(true);
    try {
      const resonse = await apiQ4(requestMapper(formData));
      console.log(resonse.data);
      setSearchResult(responseMapper(resonse.data));
    } catch (error) {
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

    if (Object.keys(searchResult).length == 0) {
      return (
        <Container sx={{ height: 400, marginTop: 20, justifyContent: "center", alignItems: "start", display: "flex"}}>
          <Typography variant="h4">No result found</Typography>
        </Container>
      )
    }

    return (
      <Stack direction="column" spacing={3} marginBottom={3}>
        <Typography variant="h4" fontWeight={700}>Search result for customer #{searchResult.ID}</Typography>
        <Stack direction="row" spacing={3}>
          <Typography variant="h5" fontWeight={700}>ID:</Typography>
          <Typography variant="h5">{searchResult.ID}</Typography>
        </Stack>

        <Stack direction="row" spacing={3}>
          <Typography variant="h5" fontWeight={700}>First name:</Typography>
          <Typography variant="h5">{searchResult.fName}</Typography>
        </Stack>

        <Stack direction="row" spacing={3}>
          <Typography variant="h5" fontWeight={700}>Last name:</Typography>
          <Typography variant="h5">{searchResult.lName}</Typography>
        </Stack>

        <Stack direction="row" spacing={3}>
          <Typography variant="h5" fontWeight={700}>Address:</Typography>
          <Typography variant="h5">{searchResult.address}</Typography>
        </Stack>

        <Typography variant="h5" fontWeight={700}>Phone number(s):</Typography>
        <List sx={{ marginTop: 3, marginBottom: 3}}>
          {searchResult.phoneNumbers.map((phoneNumber: string, index: number) => 
            <ListItem key={index}>
              <ListItemText primary={phoneNumber} />
            </ListItem>
          )}
        </List>

        <Stack direction="row" spacing={3}>
          <Typography variant="h5" fontWeight={700}>Customer mode:</Typography>
          <Typography variant="h5">{searchResult.mode}</Typography>
        </Stack>
        
        {searchResult.arrearage &&
          <Stack direction="row" spacing={3}>
            <Typography variant="h5" fontWeight={700}>Arrearage:</Typography>
            <Typography variant="h5">{searchResult.arrearage}</Typography>
          </Stack>
        }

        {searchResult.arrearage &&
          <Stack direction="row" spacing={3}>
            <Typography variant="h5" fontWeight={700}>Debt date count:</Typography>
            <Typography variant="h5">{searchResult.debtDateCount}</Typography>
          </Stack>
          
        }

        {searchResult.arrearage &&
          <Stack direction="row" spacing={3}>
            <Typography variant="h5" fontWeight={700}>Debt start date:</Typography>
            <Typography variant="h5">{searchResult.debtStartDate}</Typography>
          </Stack>
        }
        
        {/* Infos about each category */}
        <Typography variant="h5" fontWeight={700}>Orders:</Typography>
        <List>
            <OrderInfo category={searchResult.orders}/>
        </List>

      </Stack>
    )
  
  }

  return (
    <Layout>
      <form onSubmit={handleSearch}>
        <Stack direction="column" spacing={3} marginBottom={3}>
          <Typography variant="h4" fontWeight={700}>Search orders details for customer</Typography>
          <FormControlLabel
            control={<Switch
              checked={searchByID}
              onChange={e => setSearchByID(!searchByID)}
            />}
            label="Search by ID"
          />
          <TextField 
            label="Customer ID"
            variant="outlined"
            value={ID}
            placeholder="ID"
            required={searchByID}
            disabled={!searchByID}
            onChange={(event) => setID(event.target.value)}
          />
          <TextField 
            label="Customer phone number"
            variant="outlined"
            value={phoneNumber}
            placeholder="Phone number"
            required={!searchByID}
            disabled={searchByID}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ width: 100, borderRadius: 12 }}
            >
            Search
            </Button>
        </Stack>
      </form>
      {displaySearchResult()}
    </Layout>
  );
}
