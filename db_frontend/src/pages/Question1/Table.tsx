import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React from 'react'

interface Props {
  searchResult: any
  columns: GridColDef[],
  categoryID: string
}

const DataTable = ( {searchResult, columns, categoryID}: Props ) => {
  return (
    <div style={{ height: 400, marginTop: 20, marginBottom: 10, display: "inline-block" }}>
        <DataGrid
          sx={{ color: "black", bgcolor: "white" }}
          rows={searchResult}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          getRowId={(row) => categoryID + row.import_date + row.import_time}
        />
      </div>
  )
}

export default DataTable