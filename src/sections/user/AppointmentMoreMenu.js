import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------
// import {useHistory} from 'react-router-dom';
import EditAppointment from '../../components/modal/EditAppointment';
import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
export default function AppointmentMoreMenut({id, patient }) {
  // const history = useHistory();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // const buttonEdit = () => {
  //   history.push('/edituser');
  // }
  const [open, setOpen] = useState(false);


  const handleOpen = () => { 
    setOpen(!open);
  }

  const [patientId] = useState(id);
  const [patientUrd] = useState(patient);

  const buttonDelete = async() => {
    await deleteDoc(doc(db, "Appointment", id));

  }
  return (
    <>
  
    
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {/* <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem> */}
        {/* history.push(`editproduct?product=${id}`); */}
        <MenuItem  sx={{ color: 'text.secondary' }} onClick={handleOpen}>
          <ListItemIcon >
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit & View" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem  sx={{ color: 'text.secondary' }} onClick={ buttonDelete}>
          <ListItemIcon>
            <Iconify icon="material-symbols:delete" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
     


      <EditAppointment id={patientId} patientId={patientUrd} open={open} handleOpen={handleOpen}  />
    </>
  );
}
