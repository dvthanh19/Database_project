import { Collapse, Divider, IconButton, ListItem, ListItemText } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react'
import CollapsibleTable from './CollapsibleTable';

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
  categoryColor: string;
  orders: Order[];
}

interface Props {
  category: Category;
}

// cột nào là cột key (lưu ý giá trị là key trong cái dict chứ không phải tên cột)
const keyKeys = ['ID'];
// tên các cột
const columns = ["ID", "Name", "Bolt number", "Color"];
// tên các cột trong dict
const columnKeys = ["categoryID", "categoryName", "boltNumber", "color"]
// tên các cột trong bảng con
const innerColumns = ["Bolt ID", "Length"];
// tên các cột trong dict của bảng con
const innerColumnKeys = ["boltID", "length"];
// tựa đề của bảng con
const innerTableTitle = 'Bolt info';
// key nào để truy cập vào bảng con
const innerTableIdentifier = 'bolts';
// cột nào là cột key trong bảng con
const innerKeyKeys = ['boltID'];

const CategoryInfo = ({ category }: any) => {
  const [open, setOpen] = React.useState(false);
  const rows = category;
  return (
    <React.Fragment>
      {/* <Divider/>
      <ListItem onClick={() => setOpen(!open)}>
      <IconButton
          aria-label="expand table"
          size="small"
          onClick={() => setOpen(!open)}
          >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        <ListItemText primary={category.categoryName} secondary={"#" + category.categoryID}/>
      </ListItem>
      <ListItem> */}
        {/* <Collapse in={open} timeout="auto"> */}
          <CollapsibleTable
            rows={rows}
            columns={columns}
            innerTableTitle={innerTableTitle}
            innerColumns={innerColumns}
            innerTableIdentifier={innerTableIdentifier}
            columnKeys={columnKeys}
            innerColumnKeys={innerColumnKeys}
            keyKeys={keyKeys}
            innerKeyKeys={innerKeyKeys}
            />
        {/* </Collapse>
      </ListItem> */}
    </React.Fragment>
  )
}

export default CategoryInfo