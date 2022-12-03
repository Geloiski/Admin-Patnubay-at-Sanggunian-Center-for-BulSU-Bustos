import React, { useState } from "react";

import style from "../../styles/CreateUser";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";

import {
  Container,
  Stack,
  Box,
  Link,
  Typography,
  Breadcrumbs,
  Paper,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  FormHelperText,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import DateTimePicker from "@mui/lab/DateTimePicker";
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import LoadingButton from "@mui/lab/LoadingButton";

import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
// icon
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

// dropzone
import { useDropzone } from "react-dropzone";
//backend
import { db, storage } from "../../utils/firebase";
import {
  serverTimestamp,
  addDoc,
  collection

} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";

import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Philippines")

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  mt: 20,
};

const thumb = {
  display: "inline-flex",
  border: 1,
  color: "black",
  marginBottom: 8,
  marginRight: 8,
  width: 170,
  height: 170,
  padding: 4,
  boxSizing: "border-box",
  borderRadius: 100,
  
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
  borderRadius: 100,
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};
const imgEmpty = {
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  width: "30%",
  height: "100%",
};
const thumbInnerEmpty = {
  display: "block",
  minWidth: 0,
  overflow: "hidden",
  borderRadius: 50,
};

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 200,
//   height: 100,
//   boxShadow: 24,
//   p: 4,
// };

export default function Create() {

  const user = useSelector((state) => state.user);
  const const_term = 1024;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const DateNow = new Date();

  //dropzone

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    maxSize: 3100000,
    accept: "image/*",
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      // setFieldValue("avatar", "gago");
    },
  });

  //snapbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const remove = (file) => () => {
    console.log("removeFile...");
    getRootProps.onDrop.acceptedFiles.splice(
      getRootProps.onDrop.acceptedFiles.indexOf(file),
      1
    );
  };
  const thumbs = 
    <div style={thumb} >
      <div style={thumbInner}>
        <img src={user.currentUserData[0].Image} style={img} alt="hahah" />
        {/* <DeleteIcon onClick={remove} /> */}
      </div>
    </div> 
 

  const thumbsEmpty = (
    <div style={thumb}>
      <div style={thumbInnerEmpty}>
        <AddAPhotoRoundedIcon style={imgEmpty} />
        {/* <Typography fontSize={10} color="textPrimary">Upload photo</Typography> */}
      </div>
    </div>
  );

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <Box sx={{ my: 2, border: 1, borderRadius: 2, p: 2, color: "red" }}>
      <Typography key={file.path} sx={{ fontSize: 12, fontWeight: 700 }}>
        {file.path} - {(file.size / const_term ** 2).toFixed(3)} Mb
      </Typography>
      {errors.map((e) => (
        <Typography key={e.code} sx={{ fontSize: 12 }}>
          {" "}
          {e.message}
        </Typography>
      ))}
    </Box>
  ));

  //yup and formik

  const LoginSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too Short!")
      .required("Title is Required"),
    description: Yup.string()
    .min(2, "Too Short!")
    .required("Description is Required"),
    date: Yup.string().required("Date is required"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      title: "",
      description: "",
      date: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async() => {

    
      const scheduleDate = new Date(formik.values.date);
      console.log(scheduleDate);

      const auth = getAuth();
      await addDoc(collection(db, "Appointment"), {
        Title: formik.values.title,
        Description: formik.values.description,
        UserType: user.currentUserData[0].UserType,
        Date: scheduleDate,
        Status: "Pending",
        StudentUser: "",
        CreatedUser: auth.currentUser.uid,
        Created: serverTimestamp(),
      });

      await addDoc(collection(db, "History"), {
        Title: `Created Counseling ${formik.values.title} Record`,
        CreatedUser: auth.currentUser.uid,
        Created: serverTimestamp(),
      });
      resetForm({
        values: {
          date: "",
        },
      });
    },
  });
  // console.log("files", files);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    errors,
    touched,
    // values,
    resetForm,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    setSubmitting,
    // getFieldMeta,
  } = formik;

  // const isWeekday = (date) => {
  //   const day = date.getDay();
  //   return day !== 0 && day !== 6;
  // };

  // const dateToTime = date => date.toLocaleString('en-PH');
  
  // const dateString = new Date();
  // const userOffset = new Date().getTimezoneOffset()*60*1000;
  // const localDate = new Date(dateString);
  // const utcDate = new Date(localDate.getTime());


  return (
    <Container sx={{ mt: 12, mb: 5 }}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Crete Counseling Successfully
        </Alert>
      </Snackbar>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Box direction="column" alignItems="center">
            <Typography variant="h4" gutterBottom>
              Create Counseling
            </Typography>
            <Breadcrumbs
              sx={{ ml: 0.5 }}
              separator={
                <Box
                  sx={{
                    width: 4,
                    height: 4,
                    bgcolor: "gray",
                    borderRadius: "50%",
                    mx: 1,
                  }}
                />
              }
            >
              <Link
                component={RouterLink}
                underline="hover"
                color="inherit"
                to="/listappointment"
              >
                <Typography color="text.primary" variant="body2">
                Counseling
                </Typography>
              </Link>
              <Typography color="gray" variant="body2">
                Create
              </Typography>
            </Breadcrumbs>
          </Box>
        </Stack>

        <Box sx={{ flexGrow: 1 }}>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Item>
                    <Box sx={{ p: 2 }}>
                      <Box >
                        <input
                          // {...getFieldMeta("avatar")}
                          {...getInputProps() }
                        />
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}
                        >
                          <Box style={thumbsContainer}>
                            <Box sx={{ m: 1, position: "relative" }}>
                              {thumbs.length !== 0 ? thumbs : thumbsEmpty}

                              {loading && (
                                <CircularProgress
                                  size={110}
                                  sx={{
                                    color: "primary",
                                    position: "absolute",
                                    top: -6,
                                    left: -6,
                                    zIndex: 1,
                                  }}
                                />
                              )}
                            </Box>
                          </Box>
                          <Typography >
                        Hi I'm {user.currentUserData[0].UserType === "Doctor" ? "Dr." : "Admin"} {user.currentUserData[0].UserName}
                          </Typography>
                          {avatarError === true ? (
                            <Typography variant="caption" color="error">
                              Avatar is required
                              {/* {touched.email && errors.avatar}{" "} */}
                            </Typography>
                          ) : (
                            <Typography />
                          )}
                        </Box>
                      </Box>
                      {fileRejectionItems}
                    </Box>
                  </Item>
                </Grid>

                <Grid item xs={12} md={8}>
                  <Item>
                    <Box
                      display="grid"
                      // gridTemplateColumns="repeat(12, 1fr)"
                      sx={style.boxGrid}
                      gap={2}
                    >
                      <Box gridColumn="span 12">
                        <TextField
                          fullWidth
                          type="name"
                          label="Title"
                          {...getFieldProps("title")}
                          error={Boolean(touched.title && errors.title)}
                          helperText={touched.title && errors.title}
                        />
                      </Box>

                      <Box gridColumn="span 12">
                        <TextField
                          fullWidth
                          type="name"
                          label="Description"
                          {...getFieldProps("description")}
                          error={Boolean(touched.description && errors.description)}
                          helperText={touched.description && errors.description}
                        />
                      </Box>

                      

                      {/* <Box gridColumn="span 12">
                        <TextField
                          disabled
                          fullWidth
                          type="name"
                          label="Specialties"
                          {...getFieldProps("specialties")}
                          error={Boolean(
                            touched.specialties && errors.specialties
                          )}
                          helperText={touched.specialties && errors.specialties}
                        />
                      </Box> */}

                      <Box gridColumn="span 12">
                        <LocalizationProvider dateAdapter={DateAdapter}>
                          <DateTimePicker
                            name="date"
                            format="MM/dd/yyy"
                            label="Schedule Date and Time"
                            {...getFieldProps("date")}
                            onChange={(value) => setFieldValue("date", value)}
                            error={Boolean(
                              touched.date && errors.date
                            )}
                            renderInput={(params) => (
                              <TextField fullWidth {...params} />
                            )}
                            // disableTimes = { [1, 2, 3, 4, 5, 6, 7, 8]}
                            minDate={dayjs()}
                          //  shouldDisableDate={isWeekday(formik.values.date)}
                            
                            
                            
                          />
                        </LocalizationProvider>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        my: 2,
                      }}
                    >
                      <LoadingButton
                        style={{ textTransform: "Capitalize", borderRadius: 8 }}
                        size="small"
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                      >
                        Create Schedule
                      </LoadingButton>
                    </Box>
                  </Item>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </Box>
      </Container>
    </Container>
  );
}
