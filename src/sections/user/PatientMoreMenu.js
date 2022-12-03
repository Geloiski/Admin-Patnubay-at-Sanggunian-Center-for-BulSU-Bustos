import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------
// import {useHistory} from 'react-router-dom';
import EditPatient from '../../components/modal/EditPatient';

export default function PatienMoreMenut({id, category }) {
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
console.log(patientId)
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
        { category !== 'Medicine Record' && (
        <MenuItem  sx={{ color: 'text.secondary' }} onClick={handleOpen}>
          <ListItemIcon >
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit & View" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>)}

      </Menu>

      <EditPatient id={patientId} open={open} handleOpen={handleOpen}  />
    </>
  );
}
