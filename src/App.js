import './App.css';
import React, { useEffect, useState ,  Fragment } from 'react'
import  TransactionList from './Transaction'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

function App() {
  const [list, setList] = useState([])
  const [rowsPerPage, setRowsPerPage]= useState(10)

  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });

  const classes = useStyles();
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const addTransactionsFor3Months = (transaction) => {
    for(let i = 0 ; i < 90; i++){
      const price = Math.ceil( Math.random() * (i*10 - i*2) + Math.random()*(1000-i))
      transaction.addTransaction(price, i+1)
    }
  }

  useEffect(() => {
    const transactionUtil = new TransactionList()
    addTransactionsFor3Months(transactionUtil)
    const data =  transactionUtil.getLast3MonthsList()
    setList(data)
  }, [])

  const columns = [
    {
      label: 'Transaction id',
      id: 'id',
    },
    {
      label: 'Price($)',
      id: 'price',
    },
    {
      label: 'Reward points',
      id: 'rewards',
    },
  ];
  
  return (
    <div className="App">
      <Fragment>
        <div style={{ maxWidth: '80%',  margin: '0 auto' }}>
        <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={list.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Paper>
        </div>
        <p><u>Note: Test cases not implemeneted</u></p>
      </Fragment>
    </div>
  );
}

export default App;
