import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import CollapsibleTable from './CollapsibleTable';
import CategoryInfo from './CategoryInfo';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  price: number,
) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

interface RowProps {
  rowKey: string;
  row: any;
  columnKeys: string[];
  keyKeys: string[];
  innerTableTitle1: string;
  innerColumns1: string[];
  innerTableIdentifier1: string;
  innerColumnKeys1: string[];
  innerKeyKeys1: string[];
  innerTableTitle2: string;
  innerColumns2: string[];
  innerTableIdentifier2: string;
  innerColumnKeys2: string[];
  innerKeyKeys2: string[];
  inner2TableTitle: string;
  inner2Columns: string[];
  inner2TableIdentifier: string;
  inner2ColumnsKeys: string[];
  inner2KeyKeys: string[];
}

function Row({ rowKey, row, innerTableTitle1, innerColumns1, innerTableIdentifier1, columnKeys, innerColumnKeys1, keyKeys, innerKeyKeys1, innerTableTitle2, innerColumns2, innerTableIdentifier2, innerColumnKeys2, innerKeyKeys2 }: RowProps) {
  const [open, setOpen] = React.useState(false);

  const innerRowMaker = (innerRow: any, innerKeyKeys: any, innerColumnKeys: any) => {
    var key = rowKey;
    for (const innerKeyKey of innerKeyKeys) {
      key = key + innerRow[innerKeyKey];
    }
    return (
      <TableRow key={key}>
        {innerColumnKeys.map((innerColumnKey: any) => (
          <TableCell align="right">{innerRow[innerColumnKey]}</TableCell>
        ))}
      </TableRow>
    )
  }


  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} key={rowKey}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {columnKeys.map((column) => (
          <TableCell align="right">{row[column]}</TableCell>
        ))}
      </TableRow>
      <TableRow key={rowKey + "inner table"}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columnKeys.length + 1}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {innerTableTitle1}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow key={rowKey + "inner header"}>
                    {innerColumns1.map((column) => (
                      <TableCell align="right">{column}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row[innerTableIdentifier1].map((innerRow: any) => (
                    innerRowMaker(innerRow, innerKeyKeys1, innerColumnKeys1)
                  ))}
                </TableBody>
              </Table>
            </Box>

            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {innerTableTitle2}
              </Typography>
                <CategoryInfo category={row[innerTableIdentifier2]}/>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

interface Props {
  rows: any[];
  columns: string[];
  columnKeys: string[];
  keyKeys: string[];
  innerTableTitle1: string;
  innerColumns1: string[];
  innerTableIdentifier1: string;
  innerColumnKeys1: string[];
  innerKeyKeys1: string[];
  innerTableTitle2: string;
  innerColumns2: string[];
  innerTableIdentifier2: string;
  innerColumnKeys2: string[];
  innerKeyKeys2: string[];
  inner2TableTitle: string;
  inner2Columns: string[];
  inner2TableIdentifier: string;
  inner2ColumnsKeys: string[];
  inner2KeyKeys: string[];
}

export default function BigTable( { rows, columns, columnKeys, keyKeys, innerTableTitle1, innerColumns1, innerTableIdentifier1, innerColumnKeys1, innerKeyKeys1, innerTableTitle2, innerColumns2, innerTableIdentifier2, innerColumnKeys2, innerKeyKeys2, inner2TableTitle, inner2Columns, inner2TableIdentifier, inner2ColumnsKeys, inner2KeyKeys}: Props ) {
  
  const tableRowMaker = (row: any) => {
    var key = '';
    for (const keyKey of keyKeys) {
      key = key + row[keyKey];
    }
    return (
      <Row rowKey={key} row={row} innerTableTitle1={innerTableTitle1} innerColumns1={innerColumns1} innerTableIdentifier1={innerTableIdentifier1} columnKeys={columnKeys} innerColumnKeys1={innerColumnKeys1} keyKeys={keyKeys} innerKeyKeys1={innerKeyKeys1} innerTableTitle2={innerTableTitle2} innerColumns2={innerColumns2} innerTableIdentifier2={innerTableIdentifier2} innerColumnKeys2={innerColumnKeys2} innerKeyKeys2={innerKeyKeys2} inner2TableTitle={inner2TableTitle} inner2Columns={inner2Columns} inner2TableIdentifier={inner2TableIdentifier} inner2ColumnsKeys={inner2ColumnsKeys} inner2KeyKeys={inner2KeyKeys}/>
    )
  }
  
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow key="header">
            <TableCell />
            {columns.map((column) => (
              <TableCell align="right">{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => 
            tableRowMaker(row)   
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}