'use client';

import { useState, useEffect } from 'react';
import {
  DataGrid,
  GridColDef,
  GridSortModel,
  GridToolbar,
} from '@mui/x-data-grid';
import { CircularProgress, Box } from '@mui/material';

export default function AdminPage() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [search, setSearch] = useState('');
  const [sortModel, setSortModel] = useState([
    { field: 'createdAt', sort: 'desc' },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const sortField = sortModel[0]?.field || 'createdAt';
      const sortOrder = sortModel[0]?.sort || 'desc';

      const response = await fetch(
        `/api/admin/forms?page=${
          page + 1
        }&limit=${pageSize}&search=${search}&sortField=${sortField}&sortOrder=${sortOrder}`
      );
      const data = await response.json();
      setForms(data.forms);
      setRowCount(data.total);
      setLoading(false);
    };

    fetchData();
  }, [page, pageSize, search, sortModel]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'wardNo', headerName: 'Ward No', width: 100 },
    { field: 'houseNo', headerName: 'House No', width: 100 },
    { field: 'residentName', headerName: 'Resident Name', width: 150 },
    { field: 'mobileNo', headerName: 'Mobile No', width: 150 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'households', headerName: 'Households', width: 100 },
    { field: 'propertyType', headerName: 'Property Type', width: 150 },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 150,
      type: 'dateTime',
      valueGetter: (params: any) => new Date(params.value),
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <DataGrid
          rows={forms}
          columns={columns}
          paginationModel={{ page, pageSize }}
          paginationMode='server'
          rowCount={rowCount}
          onPaginationModelChange={(model) => {
            setPage(model.page);
            setPageSize(model.pageSize);
          }}
          sortingMode='server'
          onSortModelChange={(newSortModel: GridSortModel) =>
            setSortModel(newSortModel as { field: string; sort: string }[])
          }
          slots={{ toolbar: GridToolbar }}
          filterMode='server'
          onFilterModelChange={(filterModel) =>
            setSearch(filterModel.quickFilterValues?.[0] || '')
          }
        />
      )}
    </Box>
  );
}
