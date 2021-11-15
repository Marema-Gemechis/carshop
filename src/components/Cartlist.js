import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useFilters, useGlobalFilter, useTable } from 'react-table';
import { Button } from '@mui/material';

import Addcar from './Addcar';
import Editcar from './Editcar';

const Cartlist = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchData = async () => {
    const response = await fetch('https://carstockrest.herokuapp.com/cars');
    if (response.ok) {
      const data = await response.json();
      setCars(data._embedded.cars);
    }
  };

  const deleteCar = useCallback(async (link) => {
    try {
      if (window.confirm('Are you sure you want to')) {
        await fetch(link, { method: 'DELETE' });
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Brand',
        accessor: 'brand'
      },
      {
        Header: 'Model',
        accessor: 'model'
      },
      {
        Header: 'Color',
        accessor: 'color'
      },
      {
        Header: 'Fuel',
        accessor: 'fuel'
      },
      {
        Header: 'Price',
        accessor: 'price'
      },
      {
        accessor: '_links.self.href',
        filterable: false,
        sortable: false,
        Cell: (row) => (
          <Button
            variant='outlined'
            color='error'
            onClick={() => deleteCar(row.value)}
          >
            Delete
          </Button>
        )
      },
      {
        id: 'edit',
        filterable: false,
        sortable: false,
        Cell: ({ row }) => (
          <Editcar originalCar={row.original} updateCar={updateCar} />
        )
      }
    ],
    [deleteCar]
  );

  const data = useMemo(() => cars, [cars]);

  const tableInstance = useTable(
    { columns, data },
    useFilters,
    useGlobalFilter
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const addCar = async (carData) => {
    try {
      await fetch('https://carstockrest.herokuapp.com/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(carData)
      });

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const updateCar = async (carData, link) => {
    try {
      await fetch(link, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(carData)
      });

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Addcar addCar={addCar} />
      <table
        {...getTableProps()}
        style={{ border: 'solid 1px blue', Width: '100%' }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: 'solid 3px red',
                    background: 'aliceblue',
                    color: 'black',
                    fontWeight: 'bold',
                    width: '20%'
                  }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        border: 'solid 1px gray',
                        background: 'papayawhip'
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Cartlist;
