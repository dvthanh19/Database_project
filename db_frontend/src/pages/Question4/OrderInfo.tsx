import { Collapse, Divider, IconButton, ListItem, ListItemText } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react'
import BigTable from './Table';

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

interface Props {
  category: Category;
}

// cột nào là cột key (lưu ý giá trị là key trong cái dict chứ không phải tên cột)
const keyKeys = ['ID'];
// tên các cột
const columns = ['Order ID', 'Date Time Made', 'Total Price ($)', 'Status', 'Date Time Processed', 'Cancel Reason', 'Staff ID', 'Staff First Name', 'Staff Last Name'];
// tên các cột trong dict
const columnKeys = ['ID', 'dateTimeMade', 'totalPrice', 'status', 'dateTimeProcessed', 'cancelReason', 'staffID', 'staffFName', 'staffLName'];
// tên các cột trong bảng con
const innerColumns1 = ['Date', 'Time', 'Amount ($)',];
// tên các cột trong dict của bảng con
const innerColumnKeys1 = ['date', 'time', 'amount'];
// tựa đề của bảng con
const innerTableTitl1e1 = 'Payment history';
// key nào để truy cập vào bảng con
const innerTableIdentifier1 = 'paymentHistory';
// cột nào là cột key trong bảng con
const innerKeyKeys1 = ['date', 'time'];

const innerColumns2 = ["Bolt number", "Category name", "color"]
const innerColumnKeys2 = ["boltNumber", "categoryName", "color"]
const innerTableTitle2 = "Category info"
const innerTableIdentifier2 = "categories"
const innerKeyKeys2 = ["boltNumber", "categoryID"]

const inner2Columns = ["Bolt ID", "Length"]
const inner2ColumnsKeys = ["boltID", "length"]
const inner2TableTitle = "Bolt info"
const inner2TableIdentifier = "bolts"
const inner2KeyKeys = ["boltID"]

const OrderInfo = ({ category }: any) => {
  // const [open, setOpen] = React.useState(false);
  // const rows = category.orders;
  const rows = category;
  // console.log("Rows:")
  // console.log(rows);
  return (
    <React.Fragment>
      <Divider/>
      {/* <ListItem onClick={() => setOpen(!open)}>
      <IconButton
          aria-label="expand table"
          size="small"
          onClick={() => setOpen(!open)}
          >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        <ListItemText primary={category.categoryName} secondary={"#" + category.categoryID}/>
      </ListItem> */}
      {/* <ListItem>
        <Collapse in={open} timeout="auto"> */}
          <BigTable
            rows={rows}
            columns={columns}
            columnKeys={columnKeys}
            keyKeys={keyKeys}
            innerTableTitle1={innerTableTitl1e1}
            innerColumns1={innerColumns1}
            innerTableIdentifier1={innerTableIdentifier1}
            innerColumnKeys1={innerColumnKeys1}
            innerKeyKeys1={innerKeyKeys1}
            innerTableTitle2={innerTableTitle2}
            innerColumns2={innerColumns2}
            innerTableIdentifier2={innerTableIdentifier2}
            innerColumnKeys2={innerColumnKeys2}
            innerKeyKeys2={innerKeyKeys2}
            inner2TableTitle={inner2TableTitle}
            inner2Columns={inner2Columns}
            inner2TableIdentifier={inner2TableIdentifier}
            inner2ColumnsKeys={inner2ColumnsKeys}
            inner2KeyKeys={inner2KeyKeys}
            />
        {/* </Collapse>
      </ListItem> */}
    </React.Fragment>
  )
}

export default OrderInfo