
import { filter } from 'lodash';
// import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Box,
  Link,
  Breadcrumbs,
  Card,
  Table,
  Stack,
//   Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// components
// import Page from '../components/Page';
// import Label from '../components/Label';
// import Scrollbar from '../components/Scrollbar';
// import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, } from '../sections/user';
//
// import USERLIST from '../../_mocks_/user';
import { useSelector } from 'react-redux';
// ----------------------------------------------------------------------

//date fns
import { format } from 'date-fns';
const TABLE_HEAD = [
  { id: 'OrderId', label: 'Order Id', alignRight: false },
  { id: 'OrderStatus', label: 'Amount', alignRight: false },
  { id: 'Created', label: 'Created', alignRight: false },
  { id: '' },
  { id: 's' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.OrderId.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}



export default function Finance() {
  const [total, setTotal] = useState(0);
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  const user = useSelector((state) => state.user);
  const USERLIST = user.finances;
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('OrderId');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.OrderId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, OrderId) => {
    const selectedIndex = selected.indexOf(OrderId);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, OrderId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  
  useEffect(() => {
    var rows = [0];
    // let pro = 0;
    for (let i = 0; i < user.finances.length; i++) {
      rows = user.finances.map((finance) => (finance.Total));
    //   console.log(pro);
    //   rows.push(pro);
    }
    setTotal(rows.reduce(reducer));

  
    // console.log(urlId);
    // console.log(location.state.quantity);
    // console.log("row",rows.reduce(reducer))
  }, [total, user,]);

  return (

    <Container sx={{ mt: 12, mb:5  }}>
    


      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Box direction="column" alignItems="center">
          <Typography variant="h4" gutterBottom>
            Order List
          </Typography>
          <Breadcrumbs
        sx={{ ml:.5}}
        separator={
          <Box
            sx={{ width: 4, height: 4, bgcolor: "gray", borderRadius: "50%", mx: 1 }}
          />
        }
      >
        <Link component={RouterLink} underline="hover" color="inherit" to="/order">
          <Typography color="text.primary" variant="body2">
            Order
          </Typography>
        </Link>
        <Typography color="gray" variant="body2">
          List
        </Typography>
      </Breadcrumbs>
         
      </Box>
         
          <Button
            variant="contained"
           
          >
            Total Earnings {total}.00
          </Button>

        
        </Stack>
        

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

       
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, Total, OrderId, Created } = row;
                      const isItemSelected = selected.indexOf(OrderId) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, OrderId)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              {/* <Avatar alt={OrderId} src={ProductImage} /> */}
                              <Typography variant="subtitle2" noWrap>
                                {OrderId}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{Total}</TableCell>
                          <TableCell align="left">{format(new Date((Created.seconds*1000)), 'MM/dd/yyyy')} </TableCell>
                          {/* <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={(OrderStatus === 'Pending' && 'warning') || 'success'}
                            >
                              {sentenceCase(OrderStatus)} 
                            </Label>
                          </TableCell> */}

                          <TableCell align="right">
                            {/* <OrderMoreMenu id={id} /> */}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
         
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      </Container>
    
  );
}
