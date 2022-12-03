
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Box,
  Link,
  Breadcrumbs,
  Card,
  Table,
  Stack,
  Avatar,
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
import AddIcon from '@mui/icons-material/Add';
// components
// import Page from '../components/Page';
import Label from '../../components/Label';
// import Scrollbar from '../components/Scrollbar';
// import Iconify from '../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, AppointmentMoreMenu } from '../../sections/user';
//
// import USERLIST from '../../_mocks_/user';
import { useSelector } from 'react-redux';
// ----------------------------------------------------------------------

//date fns
import { format, compareAsc } from 'date-fns';
import { Description } from '@mui/icons-material';
import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { async } from '@firebase/util';
const TABLE_HEAD = [
  { id: 'title', label: 'Title', alignRight: false },
  // { id: 'description', label: 'Description', alignRight: false },
  { id: 'name', label: 'Student', alignRight: false },
  { id: 'studentNumber', label: '#', alignRight: false },
  { id: 'Date', label: 'Schedule Date', alignRight: false },
  { id: 'Status', label: 'Status', alignRight: false },
  { id: '' }
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
    return filter(array, (_user) => _user.Title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}



export default function List() {

  const user = useSelector((state) => state.user);
  // const USERLIST = user.appointments.filter((appointment) => appointment.CreatedUser === user.currentUserData[0].id);
  const USERLIST = user.appointments;
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('Title');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.Title);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const isItGreaterThan = async (id, date1, days) => {
    var firstDate = new Date(date1);
    var secondDate = new Date();
    var time = days * 60 * 60 * 24 * 1000
    if ((secondDate.getTime() - firstDate.getTime()) < time) {

    } else {
      await updateDoc(doc(db, "Appointment", id), {
        Status: "Failed to Attend",
      });
    }
  }
  useEffect(() => {
    const q = query(collection(db, "Appointment"), where("Status", "!=", 'Done'));
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const dateSeconds = (doc.data().Date).seconds * 1000;
        const finaldate = format(new Date(dateSeconds), "PPpp");
        isItGreaterThan(doc.id, finaldate, 1)
      });
    });
  }, [])



  // useEffect(() => {
  //   isItGreaterThan(finaldate, 2)
  // }, [finaldate])

  return (

    <Container sx={{ mt: 12, mb: 5 }}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Box direction="column" alignItems="center">
            <Typography variant="h4" gutterBottom>
              List Counseling
            </Typography>
            <Breadcrumbs
              sx={{ ml: .5 }}
              separator={
                <Box
                  sx={{ width: 4, height: 4, bgcolor: "gray", borderRadius: "50%", mx: 1 }}
                />
              }
            >
              <Link component={RouterLink} underline="hover" color="inherit" to="/listappointment">
                <Typography color="text.primary" variant="body2">
                  Counseling
                </Typography>
              </Link>
              <Typography color="gray" variant="body2">
                List
              </Typography>
            </Breadcrumbs>
          </Box>

          <Button
            variant="contained"
            component={RouterLink}
            to="/createappointment"
            startIcon={<AddIcon />}
          >
            Create Schedule
          </Button>

        </Stack>


        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />


          <TableContainer sx={{ minWidth: "auto" }}>
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
                    const { id, Title, Description, UserType, Image, Created, PatientUser, Reason, Message, Status, StudentUser, Date: Date1 } = row;
                    const isItemSelected = selected.indexOf(Title) !== -1;


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
                          {/* <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, Title)}
                            /> */}
                        </TableCell>
                        <TableCell align="left">{Title}</TableCell>
                        {/* <TableCell align="left">{Description}</TableCell> */}
                        <TableCell align="left">{user.users.filter((user) => user.id === StudentUser).map(user => user.UserName)}</TableCell>
                        <TableCell align="left">{user.users.filter((user) => user.id === StudentUser).map(user => user.ContactNumber)}</TableCell>
                        <TableCell align="left" >{format(new Date((Date1.seconds * 1000)), 'PPpp')} </TableCell>
                        <TableCell align="left">
                          <Label
                            variant="ghost"
                            color={((Status === 'Failed to Attend') && 'error') || ((Status === 'Follow Up' || Status === 'Pending' || Status === "Cancel By Student" || Status === 'Cancel By Admin') && 'warning') || 'success'}
                          >
                            {Status}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <AppointmentMoreMenu id={id} />
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
