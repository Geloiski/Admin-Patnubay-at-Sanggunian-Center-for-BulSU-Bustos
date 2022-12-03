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

import DatePicker from "@mui/lab/DatePicker";
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

//firebase
import { db } from "../../utils/firebase";
import { doc, updateDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

EditPatient.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

export default function EditPatient({ id, open, handleOpen }) {
  const user = useSelector((state) => state.user);
  // const [patient, setPatient] = useState([]);
  const [disableEdit, setDisableEdit] = useState(true);

  // const buttonAcceptOrder = async() => {

  //     await updateDoc(doc(db, "Orders", id), {
  //     OrderStatus: "Processing",
  //     JntTracking: tracking,
  //   });
  // }

  const [payload, setPayload] = useState({
    Category: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.Category)
      .toString(),
    Id: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.id)
      .toString(),
    FullName: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.FullName)
      .toString(),

    Gender: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.Gender)
      .toString(),
    BirthDate: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.BirthDate)
      .toString(),
    BirthPlace: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.BirthPlace)
      .toString(),
    BloodType: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.BloodType)
      .toString(),
    CivilStatus: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.CivilStatus)
      .toString(),
    SpouseName: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.SpouseName)
      .toString(),
    ResidentAddress: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.ResidentAddress)
      .toString(),
    ContactNumber: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.ContactNumber)
      .toString(),
    FamilyMember: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.FamilyMember)
      .toString(),
    EducationalAttainment: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.EducationalAttainment)
      .toString(),
    FourpsMember: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.FourpsMember)
      .toString(),
    HouseNumber: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.HouseNumber)
      .toString(),

    // Treatment Record

    Age: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.Age)
      .toString(),
    ConstutationDate: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.ConstutationDate)
      .toString(),
    BloodPressure: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.BloodPressure)
      .toString(),
    Temperature: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.Temperature)
      .toString(),
    Weight: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.Weight)
      .toString(),
    PurposeVisit: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.PurposeVisit)
      .toString(),
    Diagnosis: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.Diagnosis)
      .toString(),
    MedicalTreatment: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.MedicationTreatment)
      .toString(),
    LaboratoryFinding: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.LaboratoryFinding)
      .toString(),

    RefferedFrom: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.RefferedFrom)
      .toString(),
    RefferedTo: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.RefferedTo)
      .toString(),
    ReasonRefferal: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.ReasonRefferal)
      .toString(),
    RefferedBy: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.RefferedBy)
      .toString(),
    ChiefComplaint: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.ChiefComplaint)
      .toString(),

    // Prenatal Record
    ConstutationDate: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.ConstutationDate)
      .toString(),
    Gravidity: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.Gravidity)
      .toString(),
    Parity: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.Parity)
      .toString(),
    Term: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.Term)
      .toString(),
    Preterm: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.Preterm)
      .toString(),
    LiveBirth: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.LiveBirth)
      .toString(),
    Abortion: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.Abortion)
      .toString(),
    Syphilis: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.Syphilis)
      .toString(),
    LMP: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.LMP)
      .toString(),
    EDC: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.EDC)
      .toString(),
    AOG: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.AOG)
      .toString(),
    TI: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.TI)
      .toString(),
    Iron: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.Iron)
      .toString(),
    Others: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.Others)
      .toString(),
    Penicillin: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.Penicillin)
      .toString(),
    ScheduleNextVisit: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.ScheduleNextVisit)
      .toString(),
    FundicHeight: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.FundicHeight)
      .toString(),
    FatalHeartTone: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.FatalHeartTone)
      .toString(),

    // Immunization Record
    Grade: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.Grade)
      .toString(),
    School: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.School)
      .toString(),
    DateBirth: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.DateBirth)
      .toString(),

    Allergies: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.Allergies)
      .toString(),
    HealthCondition: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.HealthCondition)
      .toString(),
    ChickenPox: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.ChickenPox)
      .toString(),
    ChickenPoxVaccine: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.ChickenPoxVaccine)
      .toString(),
    ReactionVaccine: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.ReactionVaccine)
      .toString(),
    Pregnant: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.Pregnant)
      .toString(),
    Consent: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.Consent)
      .toString(),
    Relationship: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.Relationship)
      .toString(),
    Work: user.patients
      .filter((patient) => patient.id === id)
      .map((patient) => patient.Work)
      .toString(),
  });

  console.log(disableEdit);
  console.log(payload.Category);

  const handleChange = (props) => (event) => {
    setPayload({ ...payload, [props]: event.target.value });
  };

  const auth = getAuth();

  const updatePatient = async () => {
    await updateDoc(doc(db, "Patients", id), {
      FullName: payload.FullName,
      Gender: payload.Gender,
      BirthDate: payload.BirthDate.toString(),
      BirthPlace: payload.BirthPlace,
      BloodType: payload.BloodType,
      CivilStae: payload.SpouseName,
      ResidentAdtus: payload.CivilStatus,
      SpouseNamdress: payload.ResidentAddress,
      ContactNumber: payload.ContactNumber,
      FamilyMember: payload.FamilyMember,
      EducationalAttainment: payload.EducationalAttainment,
      FourpsMember: payload.FourpsMember,
      HouseNumber: payload.HouseNumber,
    });

    await addDoc(collection(db, "History"), {
      Title: `Update Patient ${payload.FullName} Resident Record`,
      CreatedUser: auth.currentUser.uid,
      Created: serverTimestamp(),
    });

    alert("Patient Updated");
    handleOpen();
  };

  const updatePatientTreatment = async () => {
    await updateDoc(doc(db, "Patients", id), {
      FullName: payload.FullName,
      ResidentAddress: payload.ResidentAddress,
      Age: Number(payload.Age),
      ConstutationDate: payload.ConstutationDate.toString(),
      BloodPressure: payload.BloodPressure,
      Temperature: payload.Temperature,
      Weight: payload.Weight,
      PurposeVisit: payload.PurposeVisit,
      Diagnosis: payload.Diagnosis,
      MedicationTreatment: payload.MedicalTreatment,
      LaboratoryFinding: payload.LaboratoryFinding,

      RefferedFrom: payload.RefferedFrom,
      RefferedTo: payload.RefferedTo,
      ReasonRefferal: payload.ReasonRefferal,
      RefferedBy: payload.RefferedBy,
      ChiefComplaint: payload.ChiefComplaint,
    });

    await addDoc(collection(db, "History"), {
      Title: `Update Patient ${payload.FullName} Treatment Record`,
      CreatedUser: auth.currentUser.uid,
      Created: serverTimestamp(),
    });

    alert("Patient Updated");
    handleOpen();
  };

  const updatePatientPrenatal = async () => {
    await updateDoc(doc(db, "Patients", id), {
      FullName: payload.FullName,
      ResidentAddress: payload.ResidentAddress,
      Age: Number(payload.Age),
      ContactNumber: payload.ContactNumber,

      Gravidity: payload.Gravidity,
      Parity: payload.Parity,
      Term: payload.Term,
      Preterm: payload.Preterm,
      LiveBirth: payload.LiveBirth,
      Abortion: payload.Abortion,
      Syphilis: payload.Syphilis,

      LMP: payload.LMP,
      EDC: payload.EDC,
      AOG: payload.AOG,
      TI: payload.TI,
      Iron: payload.Iron,
      Others: payload.Others,
      Penicillin: payload.Penicillin,

      ScheduleNextVisit: payload.ScheduleNextVisit.toString(),
      FundicHeight: payload.FundicHeight,
      FatalHeartTone: payload.FatalHeartTone,
    });

    await addDoc(collection(db, "History"), {
      Title: `Update Patient ${payload.FullName} Prenatal Record`,
      CreatedUser: auth.currentUser.uid,
      Created: serverTimestamp(),
    });

    alert("Patient Updated");
    handleOpen();
  };

  const updatePatientImmunization = async () => {
    await updateDoc(doc(db, "Patients", id), {
      FullName: payload.FullName,
      ResidentAddress: payload.ResidentAddress,
      Age: Number(payload.Age),
      ContactNumber: payload.ContactNumber,

      Grade: payload.Grade,
      School: payload.School,
      DateBirth: payload.DateBirth.toString(),

      Allergies: payload.Allergies,
      HealthCondition: payload.HealthCondition,
      ChickenPox: payload.ChickenPox,
      ChickenPoxVaccine: payload.ChickenPoxVaccine,
      ReactionChickenPoxVaccine: payload.ChickenPoxVaccine,
      Pregnant: payload.Pregnant,
      Consent: payload.Consent,
      Relationship: payload.Relationship,
      Work: payload.Work,   
    });

    await addDoc(collection(db, "History"), {
      Title: `Update Patient ${payload.FullName} Immunization Record`,
      CreatedUser: auth.currentUser.uid,
      Created: serverTimestamp(),
    });

    alert("Patient Updated");
    handleOpen();
  };

  // useEffect(() => {
  //   setPatient(user.patients)
  //   console.log(id)
  // }, []);

  return (
    <Box>
      {payload.Category === "Resident Information" ? (
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
                  Patient Resident Information
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
                    disabled={disableEdit}
                    label="Full Name"
                    sx={style.textBoxModal}
                    defaultValue={payload.FullName}
                    // onChange={handleChange("FullName")}
                  />
                </Box>
                <Box gridColumn="span 6">
                  <FormControl
                    fullWidth
                    sx={style.textBoxModal}
                    disabled={disableEdit}
                  >
                    <InputLabel>Gender</InputLabel>
                    <Select
                      defaultValue={payload.Gender}
                      label="Gender"
                      onChange={handleChange("Gender")}
                    >
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                      <MenuItem value={"Others"}>Others</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box gridColumn="span 6">
                  <LocalizationProvider dateAdapter={DateAdapter}>
                    <DatePicker
                      disabled={disableEdit}
                      format="MM/dd/yyy"
                      label="Birth Date"
                      value={payload.BirthDate}
                      onChange={(newValue) => {
                        setPayload({ ...payload, BirthDate: newValue });
                      }}
                      renderInput={(params) => (
                        <TextField
                          sx={style.textBoxModal}
                          fullWidth
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Box>

                <Box gridColumn="span 6">
                  <FormControl
                    fullWidth
                    sx={style.textBoxModal}
                    disabled={disableEdit}
                  >
                    <InputLabel>Blood Type</InputLabel>
                    <Select
                      defaultValue={payload.BloodType}
                      label="Blood Type"
                      onChange={handleChange("BloodType")}
                    >
                      <MenuItem value={"A"}>A</MenuItem>
                      <MenuItem value={"B"}>B</MenuItem>
                      <MenuItem value={"AB"}>AB</MenuItem>
                      <MenuItem value={"O"}>O</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box gridColumn="span 6">
                  <TextField
                    disabled={disableEdit}
                    label="Birth Place"
                    sx={style.textBoxModal}
                    defaultValue={payload.BirthPlace}
                    onChange={handleChange("BirthPlace")}
                  />
                </Box>
                <Box gridColumn="span 6">
                  <FormControl
                    fullWidth
                    sx={style.textBoxModal}
                    disabled={disableEdit}
                  >
                    <InputLabel>Civil Status</InputLabel>
                    <Select
                      defaultValue={payload.CivilStatus}
                      label="Civil Status"
                      onChange={handleChange("CivilStatus")}
                    >
                      <MenuItem value={"Married"}>Married</MenuItem>
                      <MenuItem value={"Widowed"}>Widowed</MenuItem>
                      <MenuItem value={"Separated"}>Separated</MenuItem>
                      <MenuItem value={"Divorced"}>Divorced</MenuItem>
                      <MenuItem value={"Single "}>Single </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box gridColumn="span 6">
                  <TextField
                    disabled={disableEdit}
                    label="Spouse Name"
                    sx={style.textBoxModal}
                    defaultValue={payload.SpouseName}
                    onChange={handleChange("SpouseName")}
                  />
                </Box>
                <Box gridColumn="span 6">
                  <TextField
                    disabled={disableEdit}
                    label="Resident Address"
                    sx={style.textBoxModal}
                    defaultValue={payload.ResidentAddress}
                    onChange={handleChange("ResidentAddress")}
                  />
                </Box>
                <Box gridColumn="span 6">
                  <TextField
                    disabled={disableEdit}
                    label="Contact Number"
                    type="number"
                    sx={style.textBoxModal}
                    defaultValue={payload.ContactNumber}
                    onChange={handleChange("ContactNumber")}
                  />
                </Box>
                <Box gridColumn="span 6">
                  <TextField
                    disabled={disableEdit}
                    label="Family Member"
                    sx={style.textBoxModal}
                    defaultValue={payload.FamilyMember}
                    onChange={handleChange("FamilyMember")}
                  />
                </Box>
                <Box gridColumn="span 6">
                  <TextField
                    disabled={disableEdit}
                    label=" Educational Attainment"
                    sx={style.textBoxModal}
                    defaultValue={payload.EducationalAttainment}
                    onChange={handleChange("EducationalAttainment")}
                  />
                </Box>
                <Box gridColumn="span 6">
                  <FormControl
                    fullWidth
                    sx={style.textBoxModal}
                    disabled={disableEdit}
                  >
                    <InputLabel>4ps Member</InputLabel>
                    <Select
                      defaultValue={payload.FourpsMember}
                      label="4ps Member"
                      onChange={handleChange("FourpsMember")}
                    >
                      <MenuItem value={"Yes"}>Yes</MenuItem>
                      <MenuItem value={"No"}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box gridColumn="span 6">
                  <TextField
                    disabled={disableEdit}
                    label="House Number"
                    sx={style.textBoxModal}
                    defaultValue={payload.HouseNumber}
                    onChange={handleChange("HouseNumber")}
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

              <Box sx={style.perItemModal}>
                <Button
                  sx={style.uploadButton}
                  onClick={updatePatient}
                  disabled={disableEdit}
                >
                  Update Patient Information
                </Button>
              </Box>

              <Box sx={style.perItemModal}>
                <Button sx={style.logoutButton} onClick={handleOpen}>
                  Cancel
                </Button>
              </Box>

              <Box sx={style.perItemModal}>
                {/* <Button sx={style.saveButton} onClick={() => buttonAcceptOrder()}>{user.orders.filter((order) => order.id === id)[0].JntTracking === undefined ? "Accept Order" : "Update" }</Button> */}
              </Box>
            </Box>
          </Box>
        </Modal>
      ) : payload.Category === "Treatment Record" ? (
        <Modal
          id={id}
          open={open}
          onClose={() => {
            handleOpen();
            setDisableEdit(true);
          }}
          sx={{ overflow: "scroll" }}
        >
          <Box sx={style.boxModalLong}>
            <Box sx={style.modalContainer}>
              <Box sx={style.headerModal}>
                <ReceiptIcon sx={style.modalIcon} />
                <Typography sx={style.modalHeadText}>
                  Patient Treatment Record
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

              <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
                <Box gridColumn="span 12">
                  <TextField
                    disabled={disableEdit}
                    label="Full Name"
                    sx={style.textBoxModal}
                    defaultValue={payload.FullName}
                    onChange={handleChange("FullName")}
                  />
                </Box>

                <Box gridColumn="span 6">
                  <TextField
                    disabled={disableEdit}
                    label="Resident Address"
                    sx={style.textBoxModal}
                    defaultValue={payload.ResidentAddress}
                    onChange={handleChange("ResidentAddress")}
                  />
                </Box>

                <Box gridColumn="span 6">
                  <TextField
                    disabled={disableEdit}
                    type="number"
                    label="Age"
                    sx={style.textBoxModal}
                    defaultValue={payload.Age}
                    onChange={handleChange("Age")}
                  />
                </Box>

                {/* <Box gridColumn="span 6">
        <FormControl fullWidth sx={style.textBoxModal}  disabled={disableEdit}>
          <InputLabel>Gender</InputLabel>
          <Select
            defaultValue={payload.Gender}
            label="Gender"
            onChange={handleChange("Gender")}
          >
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
            <MenuItem value={"Others"}>Others</MenuItem>
          </Select>
        </FormControl>
      </Box> */}

                <Box gridColumn="span 6">
                  <Typography
                    variant="body2"
                    color="primary"
                    fontWeight="bold"
                    sx={{ mb: 1 }}
                  >
                    For CHU/RHU Only (Para sa kinatawan ng CHU/RHU Lamang){" "}
                  </Typography>

                  <Box display="grid" sx={style.boxGrid}>
                    <Box gridColumn="span 12">
                      <LocalizationProvider dateAdapter={DateAdapter}>
                        <DatePicker
                          disabled={disableEdit}
                          format="MM/dd/yyy"
                          label="Date Constutation"
                          value={payload.ConstutationDate}
                          onChange={(newValue) => {
                            setPayload({
                              ...payload,
                              ConstutationDate: newValue,
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              sx={style.textBoxModal}
                              fullWidth
                              {...params}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Blood Pressure"
                        sx={style.textBoxModal}
                        defaultValue={payload.BloodPressure}
                        onChange={handleChange("BloodPressure")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Temperature"
                        sx={style.textBoxModal}
                        defaultValue={payload.Temperature}
                        onChange={handleChange("Temperature")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Weight"
                        sx={style.textBoxModal}
                        defaultValue={payload.Weight}
                        onChange={handleChange("Weight")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Purpose of Visit"
                        sx={style.textBoxModal}
                        defaultValue={payload.PurposeVisit}
                        onChange={handleChange("PurposeVisit")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Diagnosis"
                        sx={style.textBoxModal}
                        defaultValue={payload.Diagnosis}
                        onChange={handleChange("Diagnosis")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Medical Treatment"
                        sx={style.textBoxModal}
                        defaultValue={payload.MedicalTreatment}
                        onChange={handleChange("MedicalTreatment")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Laboratory Finding"
                        sx={style.textBoxModal}
                        defaultValue={payload.LaboratoryFinding}
                        onChange={handleChange("LaboratoryFinding")}
                      />
                    </Box>
                  </Box>
                </Box>

                <Box gridColumn="span 6">
                  <Typography
                    variant="body2"
                    color="primary"
                    fontWeight="bold"
                    sx={{ mb: 1 }}
                  >
                    For Refferal Transaction Only (Para sa pag Pagsangguni
                    lamang){""}
                  </Typography>

                  <Box display="grid" sx={style.boxGrid}>
                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Reffered From"
                        sx={style.textBoxModal}
                        defaultValue={payload.RefferedFrom}
                        onChange={handleChange("RefferedFrom")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Reffered To"
                        sx={style.textBoxModal}
                        defaultValue={payload.RefferedTo}
                        onChange={handleChange("RefferedTo")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Reason for Refferal"
                        sx={style.textBoxModal}
                        defaultValue={payload.ReasonRefferal}
                        onChange={handleChange("ReasonRefferal")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Reffered By"
                        sx={style.textBoxModal}
                        defaultValue={payload.RefferedBy}
                        onChange={handleChange("RefferedBy")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Chief Complaint"
                        sx={style.textBoxModal}
                        defaultValue={payload.ChiefComplaint}
                        onChange={handleChange("ChiefComplaint")}
                      />
                    </Box>
                  </Box>
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

              <Box sx={style.perItemModal}>
                <Button
                  sx={style.uploadButton}
                  onClick={updatePatientTreatment}
                  disabled={disableEdit}
                >
                  Update Patient Information
                </Button>
              </Box>

              <Box sx={style.perItemModal}>
                <Button sx={style.logoutButton} onClick={handleOpen}>
                  Cancel
                </Button>
              </Box>

              <Box sx={style.perItemModal}>
                {/* <Button sx={style.saveButton} onClick={() => buttonAcceptOrder()}>{user.orders.filter((order) => order.id === id)[0].JntTracking === undefined ? "Accept Order" : "Update" }</Button> */}
              </Box>
            </Box>
          </Box>
        </Modal>
      ) : payload.Category === "Prenatal Record" ? (
        <Modal
          id={id}
          open={open}
          onClose={() => {
            handleOpen();
            setDisableEdit(true);
          }}
          sx={{ overflow: "scroll" }}
        >
          <Box sx={style.boxModalPrenatal}>
            <Box sx={style.modalContainer}>
              <Box sx={style.headerModal}>
                <ReceiptIcon sx={style.modalIcon} />
                <Typography sx={style.modalHeadText}>
                  Patient Prenatal Record
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

              <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
                <Box gridColumn="span 12">
                  <TextField
                    disabled={disableEdit}
                    label="Full Name"
                    sx={style.textBoxModal}
                    defaultValue={payload.FullName}
                    onChange={handleChange("FullName")}
                  />
                </Box>

                <Box gridColumn="span 12">
                  <TextField
                    disabled={disableEdit}
                    label="Resident Address"
                    sx={style.textBoxModal}
                    defaultValue={payload.ResidentAddress}
                    onChange={handleChange("ResidentAddress")}
                  />
                </Box>

                <Box gridColumn="span 6">
                  <TextField
                    disabled={disableEdit}
                    type="number"
                    label="Contact Number"
                    sx={style.textBoxModal}
                    defaultValue={payload.ContactNumber}
                    onChange={handleChange("ContactNumber")}
                  />
                </Box>

                <Box gridColumn="span 6">
                  <TextField
                    disabled={disableEdit}
                    type="number"
                    label="Age"
                    sx={style.textBoxModal}
                    defaultValue={payload.Age}
                    onChange={handleChange("Age")}
                  />
                </Box>

                <Box gridColumn="span 6">
                  <Typography
                    variant="body2"
                    color="primary"
                    fontWeight="bold"
                    sx={{ my: 2 }}
                  >
                    {" "}
                  </Typography>

                  <Box display="grid" sx={style.boxGrid}>
                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Gravidity"
                        sx={style.textBoxModal}
                        defaultValue={payload.Gravidity}
                        onChange={handleChange("Gravidity")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Parity"
                        sx={style.textBoxModal}
                        defaultValue={payload.Parity}
                        onChange={handleChange("Parity")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Term"
                        sx={style.textBoxModal}
                        defaultValue={payload.Term}
                        onChange={handleChange("Term")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Preterm"
                        sx={style.textBoxModal}
                        defaultValue={payload.Preterm}
                        onChange={handleChange("Preterm")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Live Birth"
                        sx={style.textBoxModal}
                        defaultValue={payload.LiveBirth}
                        onChange={handleChange("LiveBirth")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Abortion"
                        sx={style.textBoxModal}
                        defaultValue={payload.Abortion}
                        onChange={handleChange("Abortion")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Syphilis"
                        sx={style.textBoxModal}
                        defaultValue={payload.Syphilis}
                        onChange={handleChange("Syphilis")}
                      />
                    </Box>
                  </Box>
                </Box>

                <Box gridColumn="span 6">
                  <Typography
                    variant="body2"
                    color="primary"
                    fontWeight="bold"
                    sx={{ my: 2 }}
                  >
                    {""}
                  </Typography>

                  <Box display="grid" sx={style.boxGrid}>
                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="LMP"
                        sx={style.textBoxModal}
                        defaultValue={payload.LMP}
                        onChange={handleChange("LMP")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="EDC"
                        sx={style.textBoxModal}
                        defaultValue={payload.EDC}
                        onChange={handleChange("EDC")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="AOG"
                        sx={style.textBoxModal}
                        defaultValue={payload.AOG}
                        onChange={handleChange("AOG")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="TI"
                        sx={style.textBoxModal}
                        defaultValue={payload.TI}
                        onChange={handleChange("TI")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Iron"
                        sx={style.textBoxModal}
                        defaultValue={payload.Iron}
                        onChange={handleChange("Iron")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Others"
                        sx={style.textBoxModal}
                        defaultValue={payload.Others}
                        onChange={handleChange("Others")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Penicillin"
                        sx={style.textBoxModal}
                        defaultValue={payload.Penicillin}
                        onChange={handleChange("Penicillin")}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box gridColumn="span 12">
                  <LocalizationProvider dateAdapter={DateAdapter}>
                    <DatePicker
                      disabled={disableEdit}
                      format="MM/dd/yyy"
                      label="Schedule Next Visit"
                      value={payload.ScheduleNextVisit}
                      onChange={(newValue) => {
                        setPayload({
                          ...payload,
                          ScheduleNextVisit: newValue,
                        });
                      }}
                      renderInput={(params) => (
                        <TextField
                          sx={style.textBoxModal}
                          fullWidth
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Box>

                <Box gridColumn="span 12">
                  <TextField
                    disabled={disableEdit}
                    label="Fundic Height"
                    sx={style.textBoxModal}
                    defaultValue={payload.FundicHeight}
                    onChange={handleChange("FundicHeight")}
                  />
                </Box>

                <Box gridColumn="span 12">
                  <TextField
                    disabled={disableEdit}
                    label="Fatal Heart Tone"
                    sx={style.textBoxModal}
                    defaultValue={payload.FatalHeartTone}
                    onChange={handleChange("FatalHeartTone")}
                  />
                </Box>
              </Box>

              <Box sx={style.perItemModal}>
                <Button
                  sx={style.uploadButton}
                  onClick={updatePatientPrenatal}
                  disabled={disableEdit}
                >
                  Update Patient Information
                </Button>
              </Box>

              <Box sx={style.perItemModal}>
                <Button sx={style.logoutButton} onClick={handleOpen}>
                  Cancel
                </Button>
              </Box>

              <Box sx={style.perItemModal}>
                {/* <Button sx={style.saveButton} onClick={() => buttonAcceptOrder()}>{user.orders.filter((order) => order.id === id)[0].JntTracking === undefined ? "Accept Order" : "Update" }</Button> */}
              </Box>
            </Box>
          </Box>
        </Modal>
      ) : payload.Category === "Immunization Record" ? (
        <Modal
          id={id}
          open={open}
          onClose={() => {
            handleOpen();
            setDisableEdit(true);
          }}
          sx={{ overflow: "scroll" }}
        >
          <Box sx={style.boxModalPrenatal}>
            <Box sx={style.modalContainer}>
              <Box sx={style.headerModal}>
                <ReceiptIcon sx={style.modalIcon} />
                <Typography sx={style.modalHeadText}>
                  Patient Immunization Record
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

              <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
                <Box gridColumn="span 12">
                  <TextField
                    disabled={disableEdit}
                    label="Full Name"
                    sx={style.textBoxModal}
                    defaultValue={payload.FullName}
                    onChange={handleChange("FullName")}
                  />
                </Box>

                <Box gridColumn="span 12">
                  <TextField
                    disabled={disableEdit}
                    label="Resident Address"
                    sx={style.textBoxModal}
                    defaultValue={payload.ResidentAddress}
                    onChange={handleChange("ResidentAddress")}
                  />
                </Box>

                <Box gridColumn="span 6">
                  <TextField
                    disabled={disableEdit}
                    type="number"
                    label="Contact Number"
                    sx={style.textBoxModal}
                    defaultValue={payload.ContactNumber}
                    onChange={handleChange("ContactNumber")}
                  />
                </Box>

                <Box gridColumn="span 6">
                  <TextField
                    disabled={disableEdit}
                    type="number"
                    label="Age"
                    sx={style.textBoxModal}
                    defaultValue={payload.Age}
                    onChange={handleChange("Age")}
                  />
                </Box>

                <Box gridColumn="span 6">
                  <TextField
                    disabled={disableEdit}
                    type="name"
                    label="Grade"
                    sx={style.textBoxModal}
                    defaultValue={payload.Grade}
                    onChange={handleChange("Grade")}
                  />
                </Box>

                <Box gridColumn="span 6">
                  <TextField
                    disabled={disableEdit}
                    type="name"
                    label="School"
                    sx={style.textBoxModal}
                    defaultValue={payload.School}
                    onChange={handleChange("School")}
                  />
                </Box>

                <Box gridColumn="span 12">
                  <Typography
                    variant="body2"
                    color="primary"
                    fontWeight="bold"
                    sx={{ my: 2 }}
                  >
                    {" "}
                  </Typography>

                  <Box >
                    <Box gridColumn="span 12">
                      <LocalizationProvider dateAdapter={DateAdapter}>
                        <DatePicker
                          disabled={disableEdit}
                          format="MM/dd/yyy"
                          label="Birth Date"
                          value={payload.DateBirth}
                          onChange={(newValue) => {
                            setPayload({
                              ...payload,
                              DateBirth: newValue,
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              sx={style.textBoxModal}
                              fullWidth
                              {...params}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Does your child havae any allergies?"
                        sx={style.textBoxModal}
                        defaultValue={payload.Allergies}
                        onChange={handleChange("Allergies")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Does your child have any medical conditions that require regular visits to a doctor?
                        "
                        sx={style.textBoxModal}
                        defaultValue={payload.HealthCondition}
                        onChange={handleChange("HealthCondition")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="as your child ever had chikenpox?"
                        sx={style.textBoxModal}
                        defaultValue={payload.ChickenPox}
                        onChange={handleChange("ChickenPox")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Has your child ever had chikenpox vaccine?"
                        sx={style.textBoxModal}
                        defaultValue={payload.ChickenPoxVaccine}
                        onChange={handleChange("ChickenPoxVaccine")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Has your had a reaction to a vaccine?"
                        sx={style.textBoxModal}
                        defaultValue={payload.ReactionVaccine}
                        onChange={handleChange("ReactionVaccine")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Is your child pregnant?"
                        sx={style.textBoxModal}
                        defaultValue={payload.Pregnant}
                        onChange={handleChange("Pregant")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <FormControl
                        fullWidth
                        sx={style.textBoxModal}
                        disabled={disableEdit}
                      >
                        <InputLabel>
                          Check one of the following four options
                        </InputLabel>
                        <Select
                          defaultValue={payload.Consent}
                          label="Check one of the following four options"
                          onChange={handleChange("Consent")}
                        >
                          <MenuItem
                            value={
                              "Yes - I DO consent to the person name above receiving the vaccines's identified above"
                            }
                          >
                            Yes - I DO consent to the person name above
                            receiving the vaccines's identified above
                          </MenuItem>
                          <MenuItem
                            value={
                              "Yes - I DO consent to the person name above receiving the vaccines's"
                            }
                          >
                            Yes - I DO consent to the person name above
                            receiving the vaccines's
                          </MenuItem>
                          <MenuItem
                            value={
                              "No - I DO NOT consent to the person name above receiving the vaccines's identified above"
                            }
                          >
                            No - I DO NOT consent to the person name above
                            receiving the vaccines's identified above
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Relationship"
                        sx={style.textBoxModal}
                        defaultValue={payload.Relationship}
                        onChange={handleChange("Relationship")}
                      />
                    </Box>

                    <Box gridColumn="span 12">
                      <TextField
                        disabled={disableEdit}
                        label="Work"
                        sx={style.textBoxModal}
                        defaultValue={payload.Work}
                        onChange={handleChange("Work")}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box sx={style.perItemModal}>
                <Button
                  sx={style.uploadButton}
                  onClick={updatePatientImmunization}
                  disabled={disableEdit}
                >
                  Update Patient Information
                </Button>
              </Box>

              <Box sx={style.perItemModal}>
                <Button sx={style.logoutButton} onClick={handleOpen}>
                  Cancel
                </Button>
              </Box>

              <Box sx={style.perItemModal}>
                {/* <Button sx={style.saveButton} onClick={() => buttonAcceptOrder()}>{user.orders.filter((order) => order.id === id)[0].JntTracking === undefined ? "Accept Order" : "Update" }</Button> */}
              </Box>
            </Box>
          </Box>
        </Modal>
      ) : null}
    </Box>
  );
}
