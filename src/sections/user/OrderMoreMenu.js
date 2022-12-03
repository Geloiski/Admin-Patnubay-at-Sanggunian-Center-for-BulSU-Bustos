import { useRef, useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText,Box,Modal, Typography, Button,Divider, TextField } from '@mui/material';
// component
import Iconify from '../../components/Iconify';
import style from "../../styles/EditOrderModal";
// ----------------------------------------------------------------------
// import {useHistory} from 'react-router-dom';
// import EditOrder from '../../components/modal/EditOrder';

// Import Icon
import ReceiptIcon from "@mui/icons-material/Receipt";
//redux
import { useSelector } from "react-redux";

//firebase
import { db } from "../../utils/firebase";
import { doc, updateDoc,  addDoc,
  serverTimestamp,collection } from "firebase/firestore";

export default function OrderMoreMenu({id}) {

  const user = useSelector((state) => state.user);
  // const history = useHistory();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  // const buttonEdit = () => {
  //   history.push('/edituser');
  // }
  const [tracking, setTracking] = useState( user.orders.filter((order) => order.id === id)[0].JntTracking);

  const buttonAcceptOrder = async() => {

      await updateDoc(doc(db, "Orders", id), {
      OrderStatus: "Processing",
      JntTracking: tracking,
    });
  }

  const buttonDelivered = async() => {

    await updateDoc(doc(db, "Orders", id), {
    OrderStatus: "Delivered",
  });
  await addDoc(collection(db, "Finance"), {
    OrderId: user.orders.filter((order) => order.id === id)[0].OrderId,
    Total: user.orders.filter((order) => order.id === id)[0].Total,
    Created: serverTimestamp(),
  });
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
        <MenuItem onClick={() => setOpenEdit(true)} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>

      <Modal open={openEdit}
      onClose={() => {setOpenEdit(false); setIsOpen(false)}}
    
    >
      <Box sx={style.boxModal}>
        <Box sx={style.modalContainer}>
          <Box sx={style.headerModal}>
            <ReceiptIcon sx={style.modalIcon} />
            <Typography sx={style.modalHeadText}>
              Order Information
            </Typography>
          </Box>

          <Box sx={style.perItemModal}>
            <Typography sx={style.modalLabel}>
              {user.orders.filter((order) => order.id === id)[0].OrderId}
            </Typography>

            <Typography sx={style.modalLabel}>
              {user.orders.filter((order) => order.id === id)[0].ProductName}
            </Typography>

            <Typography sx={style.modalLabel}>
              Quantity:{" "}
              {user.orders.filter((order) => order.id === id)[0].ProductQty}
            </Typography>

            <Typography sx={style.modalLabel}>
              Amount:{" "}
              {user.orders.filter((order) => order.id === id)[0].Total}
            </Typography>

            <Typography sx={style.modalLabel}>
              {user.orders.filter((order) => order.id === id)[0].Payment}
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Typography sx={style.modalLabel}>
              {user.orders.filter((order) => order.id === id)[0].BuyerName}
            </Typography>

            <Typography sx={style.modalLabel}>
              {user.orders.filter((order) => order.id === id)[0].BuyerAddress}
            </Typography>

            <Typography sx={style.modalLabel}>
              {
                user.orders.filter((order) => order.id === id)[0]
                  .BuyerContactNumber
              }
            </Typography>

            <Typography sx={style.modalLabel}>
              {user.orders.filter((order) => order.id === id)[0].BuyerMessage}
            </Typography>

            <Divider sx={{ my: 1 }} />
            <Typography sx={style.modalLabel}>
            J{"&"}T Tracking Number
            </Typography>
            <TextField  sx={style.textBoxModal}
            value={tracking}
            onChange={(e) => setTracking(e.target.value)}
            disabled={user.orders.filter((order) => order.id === id)[0].OrderStatus === "Delivered" ? true : false}
            />

     

          </Box>

          <Box sx={style.perItemModal}>
            <Button
              sx={style.logoutButton}
              onClick={() => setOpenEdit(false)}
            >
              Cancel
            </Button>
          </Box>

          <Box sx={style.perItemModal}>
            <Button sx={style.saveButton} onClick={() => buttonAcceptOrder()}
               disabled={user.orders.filter((order) => order.id === id)[0].OrderStatus === "Delivered" ? true : false}
            >{user.orders.filter((order) => order.id === id)[0].JntTracking === undefined ? "Accept Order" : "Update" }</Button>
         
          </Box>

          <Box sx={style.perItemModal}>
            <Button sx={style.saveButton} onClick={() => buttonDelivered()} 
            disabled={user.orders.filter((order) => order.id === id)[0].JntTracking === undefined || user.orders.filter((order) => order.id === id)[0].OrderStatus === "Delivered" ? true : false}
            >Delivered</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
    </>
  );
}
