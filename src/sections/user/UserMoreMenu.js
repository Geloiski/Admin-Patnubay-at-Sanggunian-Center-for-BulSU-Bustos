import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../components/Iconify';
import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";

// ----------------------------------------------------------------------
// import {useHistory} from 'react-router-dom';

export default function UserMoreMenu({id}) {
  // const history = useHistory();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // const buttonEdit = () => {
  //   history.push('/edituser');
  // }

  const buttonDelete = async() => {
    await deleteDoc(doc(db, "NewsBlogs", id));

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
        <MenuItem  component={RouterLink} to={`/viewuser?user=${id}`} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="ic:baseline-remove-red-eye" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        {/* history.push(`editproduct?product=${id}`); */}
        <MenuItem component={RouterLink} to={`/edituser?user=${id}`} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        {/* <MenuItem  sx={{ color: 'text.secondary' }} onClick={ buttonDelete}>
          <ListItemIcon>
            <Iconify icon="material-symbols:delete" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem> */}
      </Menu>
    </>
  );
}
