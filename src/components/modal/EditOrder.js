import React, { useState } from "react";

import style from "../../styles/EditOrderModal";
import {
  Box,
  Modal,
  TextField,
  Typography,
  Button,
  Divider,
  //   FormControl,
  //   Select,
  //   MenuItem,
  //   InputLabel,
} from "@mui/material";

// Import Icon
import ReceiptIcon from "@mui/icons-material/Receipt";
//redux
import { useSelector } from "react-redux";

//firebase
import { db } from "../../utils/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function EditOrder({ open, id,  }) {
  const user = useSelector((state) => state.user);
  const [tracking, setTracking] = useState( user.orders.filter((order) => order.id === id)[0].JntTracking);

  const buttonAcceptOrder = async() => {

      await updateDoc(doc(db, "Orders", id), {
      OrderStatus: "Processing",
      JntTracking: tracking,
    });
  }
 
  return (
    <Box>
      <Modal open={open}
    
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
              
              />

       

            </Box>

            <Box sx={style.perItemModal}>
              <Button
                sx={style.logoutButton}
                onClick={() => window.location.reload()}
              >
                Cancel
              </Button>
            </Box>

            <Box sx={style.perItemModal}>
              <Button sx={style.saveButton} onClick={() => buttonAcceptOrder()}>{user.orders.filter((order) => order.id === id)[0].JntTracking === undefined ? "Accept Order" : "Update" }</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
