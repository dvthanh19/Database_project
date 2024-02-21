import React from 'react'
import CollapsibleTable from './Table';

interface priceHistory {
  date: string;
  price: number;
}

interface Category {
  ID: string;
  name: string;
  color: string;
  quantity: number;
  priceHistory: priceHistory[];
}
interface Supplier {
    supplierName: string;
    supplierID: string;
    categories: Category[];
}

interface Props {
  supplier: Supplier;
}

// cột nào là cột key (lưu ý giá trị là key trong cái dict chứ không phải tên cột)
const keyKeys = ['ID'];
// tên các cột
const columns = ['Category ID', 'Category Name', 'Color', 'Quantity'];
// tên các cột trong dict
const columnKeys = ['ID', 'name', 'color', 'quantity'];
// tên các cột trong bảng con
const innerColumns = ['Date', 'Price ($)',];
// tên các cột trong dict của bảng con
const innerColumnKeys = ['date', 'price'];
// tựa đề của bảng con
const innerTableTitle = 'Price History';
// key nào để truy cập vào bảng con
const innerTableIdentifier = 'priceHistory';
// cột nào là cột key trong bảng con
const innerKeyKeys = ['date'];

const CategoryInfo = ({ supplier }: Props) => {
  const [open, setOpen] = React.useState(false);
  const rows = supplier.categories;
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

export default CategoryInfo
