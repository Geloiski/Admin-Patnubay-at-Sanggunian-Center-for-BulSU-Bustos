import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import style from "../../styles/EditPatientModal";
import {
  Box,
  Modal,
  TextField,
  Typography,
  Button,
  Divider,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormControlLabel,
  Switch,
} from "@mui/material";

// Import Icon
import ReceiptIcon from "@mui/icons-material/Receipt";
//redux
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import DateTimePicker from "@mui/lab/DateTimePicker";
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { format, compareAsc } from "date-fns";
//firebase
import { db } from "../../utils/firebase";
import {
  doc,
  updateDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

EditAppointment.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

export default function EditAppointment({ id, patientId, open, handleOpen }) {
  const user = useSelector((state) => state.user);
  // const [patient, setPatient] = useState([]);
  const [disableEdit, setDisableEdit] = useState(true);

  // const buttonAcceptOrder = async() => {

  //     await updateDoc(doc(db, "Orders", id), {
  //     OrderStatus: "Processing",
  //     JntTracking: tracking,
  //   });
  // }

  // const scheduleDate = new Date(   user.filter((patient) => patient.id === id)
  // .map((patient) => patient.Date));
  // format(new Date((Date1.seconds*1000)), 'PPpp')

  const dateSeconds =
    user.appointments
      .filter((patient) => patient.id === id)
      .map((patient) => patient.Date)[0].seconds * 1000;

  const finaldate = format(new Date(dateSeconds), "PPpp");

  console.log(format(new Date(dateSeconds), "PPpp"));

  const [payload, setPayload] = useState({
    FullName: user.users
      .filter((patient) => patient.UserUid === patientId)
      .map((patient) => patient.UserName)
      .toString(),

    ContactNumber: user.users
      .filter((patient) => patient.UserUid === patientId)
      .map((patient) => patient.ContactNumber)
      .toString(),

    Date: finaldate,

    Title: user.appointments
      .filter((patient) => patient.id === id)
      .map((patient) => patient.Title)
      .toString(),

    Message: user.appointments
      .filter((patient) => patient.id === id)
      .map((patient) => patient.Message)
      .toString(),

    Status: user.appointments
      .filter((patient) => patient.id === id)
      .map((patient) => patient.Status)
      .toString(),

    AdminMessage: user.appointments
      .filter((patient) => patient.id === id)
      .map((patient) => patient.AdminMessage)
      .toString(),
  });

  const handleChange = (props) => (event) => {
    setPayload({ ...payload, [props]: event.target.value });
  };

  const auth = getAuth();

  const cancelSchedule = async () => {
    const dateSchedule = new Date(payload.Date);

    await updateDoc(doc(db, "Appointment", id), {
      // FullName: payload.FullName,
      // ContactNumber: payload.ContactNumber,
      // Date: dateSchedule,
      // Title: "",
      Message: "",
      Counselor: auth.currentUser.uid,
      AdminMessage: payload.AdminMessage,
      Status: "Cancel By Admin",
    });

    await addDoc(collection(db, "History"), {
      Title: `Update Appointment of ${payload.FullName} is Cancelled Schedule Record`,
      CreatedUser: auth.currentUser.uid,
      StudentUser: patientId,
      Created: serverTimestamp(),
    });

    // text message api
    // const res = await fetch("/api/sendMessage", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     to: `${"+63" + payload.ContactNumber.substring(0, 10)}`,
    //     body: `Hi ${payload.FullName} Your appointment has been CANCELED, Check your Appointment https://sanpedro-healthcenter.netlify.app/`,
    //   }),
    // });

    // const data = await res.json();
    // if (data.success) {
    //   alert("Message Sent");
    // } else {
    //   alert("An Error has occurred.");
    // }

    alert("Counseling Updated");
    handleOpen();

  };

  const acceptSchedule = async () => {
    const dateSchedule = new Date(payload.Date);
    await updateDoc(doc(db, "Appointment", id), {
      // FullName: payload.FullName,
      // ContactNumber: payload.ContactNumber,
      Date: dateSchedule,
      Title: payload.Title,
      Message: payload.Message,
      AdminMessage: payload.AdminMessage,
      Counselor: auth.currentUser.uid,
      Status: "Accepted",
    });

    await addDoc(collection(db, "History"), {
      Title: `Update Appointment of ${payload.FullName} is Accepted Schedule Record`,
      CreatedUser: auth.currentUser.uid,
      StudentUser: patientId,
      Created: serverTimestamp(),
    });



    alert("Appointment Updated");
    handleOpen();
  };

  const followUpSchedule = async () => {
    const dateSchedule = new Date(payload.Date);
    await updateDoc(doc(db, "Appointment", id), {
      // FullName: payload.FullName,
      // ContactNumber: payload.ContactNumber,
      Date: dateSchedule,
      Title: payload.Title,
      Message: payload.Message,
      AdminMessage: payload.AdminMessage,
      Status: "Follow Up",
    });

    await addDoc(collection(db, "History"), {
      Title: `Update Appointment of ${payload.FullName} is for Follow Up Schedule Record`,
      CreatedUser: auth.currentUser.uid,
      StudentUser: patientId,
      Created: serverTimestamp(),
    });

    const DateNow = new Date();

    alert("Appointment Updated");
    handleOpen();
  };

  const doneSchedule = async () => {
    const dateSchedule = new Date(payload.Date);
    await updateDoc(doc(db, "Appointment", id), {
      // FullName: payload.FullName,
      // ContactNumber: payload.ContactNumber,
      Date: dateSchedule,
      Title: payload.Title,
      Message: payload.Message,
      AdminMessage: payload.AdminMessage,
      Status: "Done",
    });

    await addDoc(collection(db, "History"), {
      Title: `Update Appointment of ${payload.FullName} is Done Schedule Record`,
      CreatedUser: auth.currentUser.uid,
      StudentUser: patientId,
      Created: serverTimestamp(),
    });

    const DateNow = new Date();
    // text message api
    // const res = await fetch("/api/sendMessage", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     to: `${"+63" + payload.ContactNumber.substring(0, 10)}`,
    //     body: `Hi ${payload.FullName} Your Appointment is Done Date ${DateNow}, Thank you for using San Pedro Health Center`,
    //   }),
    // });

    // const data = await res.json();
    // if (data.success) {
    //   alert("Message Sent");
    // } else {
    //   alert("An Error has occurred.");
    // }

    alert("Appointment Updated");
    handleOpen();
  };

  // useEffect(() => {
  //   setPatient(user.patients)
  //   console.log(id)
  // }, []);

  return (
    <Box>
      <Modal
        id={id}
        open={open}
        onClose={() => {
          handleOpen();
          setDisableEdit(true);
        }}
      >
        <Box sx={style.boxModal}>
          <Box sx={style.modalContainer}>
            <Box sx={style.headerModal}>
              <ReceiptIcon sx={style.modalIcon} />
              <Typography sx={style.modalHeadText}>
                Student Counseling Information
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  value={disableEdit}
                  onChange={() => setDisableEdit(!disableEdit)}
                />
              }
              label="Edit"
              sx={{ mb: 1 }}
            />

            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
              <Box gridColumn="span 12">
                <TextField
                  disabled
                  label="Full Name"
                  sx={style.textBoxModal}
                  defaultValue={payload.FullName}
                  onChange={handleChange("FullName")}
                />
              </Box>

              <Box gridColumn="span 12">
                <TextField
                  disabled
                  label="Student Number"
                  sx={style.textBoxModal}
                  defaultValue={payload.ContactNumber}
                  onChange={handleChange("ContactNumber")}
                />
              </Box>

              <Box gridColumn="span 12">
                <LocalizationProvider dateAdapter={DateAdapter}>
                  <DateTimePicker
                    disabled={disableEdit}
                    format="MM/dd/yyy"
                    label="Schedule Date"
                    value={payload.Date}
                    onChange={(newValue) => {
                      setPayload({ ...payload, Date: newValue });
                    }}
                    renderInput={(params) => (
                      <TextField
                        sx={style.textBoxModal}
                        fullWidth
                        {...params}
                      />
                    )}
                    minDate={dayjs()}
                  />
                </LocalizationProvider>
              </Box>

              <Box gridColumn="span 12">
                <TextField
                  disabled={disableEdit}
                  label="Type of Counseling"
                  sx={style.textBoxModal}
                  defaultValue={payload.Title}
                  onChange={handleChange("Title")}
                />
              </Box>

              <Box gridColumn="span 12">
                <TextField

                  multiline
                  rows={3}
                  disabled
                  label="Student Message"
                  sx={style.textBoxModal}
                  defaultValue={payload.Message}
                  onChange={handleChange("Message")}

                />
              </Box>

              <Box gridColumn="span 12">
                <TextField
                  disabled={disableEdit}
                  multiline
                  rows={3}
                  label="Counselor Message"
                  sx={style.textBoxModal}
                  defaultValue={payload.AdminMessage}
                  onChange={handleChange("AdminMessage")}

                />
              </Box>
            </Box>

            {/* <Typography sx={style.modalLabel}>
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
              // value={tracking}
              // onChange={(e) => setTracking(e.target.value)}
              
              /> */}
            <Box
              sx={
                user.appointments
                  .filter((patient) => patient.id === id)
                  .map((patient) => patient.Status)
                  .toString() === "Accepted"
                  ? style.perItemModal
                  : style.perItemModalNone
              }
            >
              <Button
                sx={style.followUpButton}
                onClick={followUpSchedule}
                disabled={disableEdit}
              >
                Follow Up
              </Button>
            </Box>

            <Box
              sx={
                user.appointments
                  .filter((patient) => patient.id === id)
                  .map((patient) => patient.Status)
                  .toString() === "Accepted"
                  ? style.perItemModal :
                  user.appointments
                    .filter((patient) => patient.id === id)
                    .map((patient) => patient.Status)
                    .toString() === "Follow Up"
                    ? style.perItemModal : user.appointments
                      .filter((patient) => patient.id === id)
                      .map((patient) => patient.Status)
                      .toString() === "Confirmed"
                      ? style.perItemModal
                      : style.perItemModalNone
              }
            >
              <Button
                sx={style.uploadButton}
                onClick={doneSchedule}
                disabled={disableEdit}
              >
                Done Schedule
              </Button>
            </Box>

            <Box
              sx={
                user.appointments
                  .filter((patient) => patient.id === id)
                  .map((patient) => patient.Status)
                  .toString() === "Accepted"
                  ? style.perItemModalNone
                  : user.appointments
                    .filter((patient) => patient.id === id)
                    .map((patient) => patient.Status)
                    .toString() === "Follow Up"
                    ? style.perItemModalNone
                    : user.appointments
                      .filter((patient) => patient.id === id)
                      .map((patient) => patient.Status)
                      .toString() === "Failed to Attend"
                      ? style.perItemModalNone
                      : user.appointments
                        .filter((patient) => patient.id === id)
                        .map((patient) => patient.Status)
                        .toString() === "Confirmed"
                        ? style.perItemModalNone
                        : user.appointments
                          .filter((patient) => patient.id === id)
                          .map((patient) => patient.Status)
                          .toString() === "Done"

                          ? style.perItemModalNone
                          : user.appointments
                            .filter((patient) => patient.id === id)
                            .map((patient) => patient.Status)
                            .toString() === "Cancel By Admin"
                            ? style.perItemModalNone
                            : user.appointments
                              .filter((patient) => patient.id === id)
                              .map((patient) => patient.Status)
                              .toString() === "Cancel By Student"
                              ? style.perItemModalNone
                              : null
              }
            >
              <Button
                sx={style.uploadButton}
                onClick={acceptSchedule}
                disabled={
                  disableEdit ||
                  user.appointments
                    .filter((patient) => patient.id === id)
                    .map((patient) => patient.StudentUser)
                    .toString() === ""
                }
              >
                Accept Schedule
              </Button>
            </Box>

            <Box
              sx={
                user.appointments
                  .filter((patient) => patient.id === id)
                  .map((patient) => patient.Status)
                  .toString() === "Accepted"
                  ? style.perItemModalNone
                  : user.appointments
                    .filter((patient) => patient.id === id)
                    .map((patient) => patient.Status)
                    .toString() === "Follow Up"
                    ? style.perItemModalNone
                    : user.appointments
                      .filter((patient) => patient.id === id)
                      .map((patient) => patient.Status)
                      .toString() === "Confirmed"
                      ? style.perItemModalNone
                      : user.appointments
                        .filter((patient) => patient.id === id)
                        .map((patient) => patient.Status)
                        .toString() === "Failed to Attend"
                        ? style.perItemModalNone
                        : user.appointments
                          .filter((patient) => patient.id === id)
                          .map((patient) => patient.Status)
                          .toString() === "Done"
                          ? style.perItemModalNone
                          : user.appointments
                            .filter((patient) => patient.id === id)
                            .map((patient) => patient.Status)
                            .toString() === "Cancel By Admin"
                            ? style.perItemModalNone
                            : user.appointments
                              .filter((patient) => patient.id === id)
                              .map((patient) => patient.Status)
                              .toString() === "Cancel By Student"
                              ? style.perItemModalNone
                              : null
              }
            >
              <Button
                sx={style.CancelButton}
                onClick={cancelSchedule}
                disabled={disableEdit}
              >
                Cancel Schedule
              </Button>
            </Box>

            <Box sx={style.perItemModal}>
              <Button sx={style.logoutButton} onClick={handleOpen}>
                Close
              </Button>
            </Box>

            <Box sx={style.perItemModal}>
              {/* <Button sx={style.saveButton} onClick={() => buttonAcceptOrder()}>{user.orders.filter((order) => order.id === id)[0].JntTracking === undefined ? "Accept Order" : "Update" }</Button> */}
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
