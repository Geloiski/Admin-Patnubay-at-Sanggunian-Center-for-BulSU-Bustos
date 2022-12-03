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
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  FormHelperText,
  CircularProgress,
  Snackbar,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import MuiAlert from "@mui/material/Alert";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import LoadingButton from "@mui/lab/LoadingButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
// icon
// import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import DeleteIcon from "@mui/icons-material/Delete";
// import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
// import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { format } from 'date-fns';
// dropzone
import { useDropzone } from "react-dropzone";

//backend
import { db, storage, auth } from "../../utils/firebase";
import {
  updateDoc,
  doc,
  arrayUnion,
  deleteField,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
// import { createUserWithEmailAndPassword, updatePassword } from "firebase/auth";
// import { sendEmailVerification } from "firebase/auth";
// import { getAuth } from "firebase/auth";

import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
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
  border: "1px dashed gray",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
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
// const imgEmpty = {
//   justifyContent: "center",
//   alignContent: "center",
//   alignItems: "center",
//   width: "30%",
//   height: "100%",
// };
// const thumbInnerEmpty = {
//   display: "block",
//   minWidth: 0,
//   overflow: "hidden",
//   borderRadius: 50,
// };

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

export default function View() {
  const user = useSelector((state) => state.user);
  const const_term = 1024;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  // const date = new Date();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let queryy = useQuery();
  let urlId = queryy.get("user");

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
  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="hahah" />
        <DeleteIcon onClick={remove} />
      </div>
    </div>
  ));

  console.log(
    user.users
      .filter((user) => user.id === urlId)
      .map((user, i) => user.Image[0] === "")
  );

  const thumbsDefault = user.users
    .filter((user) => user.id === urlId)
    .map((user, i) =>
      user.Image[0] === "" ? (
        <div style={thumb} key={i}>
          <div style={thumbInnerEmpty}>
            <AddAPhotoRoundedIcon style={imgEmpty} />
          </div>
        </div>
      ) : (
        <div style={thumb} key={i}>
          <div style={thumbInner}>
            <img src={user.Image} style={img} alt="image" />
          </div>
        </div>
      )
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

  // const handleShowPassword = () => {
  //   setShowPassword((show) => !show);
  // };
  // const handleShowConfirmPassword = () => {
  //   setShowConfirmPassword((show) => !show);
  // };
  const phoneFormat =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const LoginSchema = Yup.object().shape({
    // email: Yup.string()
    // .email("Email must be a valid email address")
    // .required("Email is required"),
    // password: Yup.string()
    //   .min(7, "Be at least 8 characters in length")
    //   .required("Password is required"),
    // confirmPassword: Yup.string()
    //   .when("password", {
    //     is: (val) => (val && val.length > 0 ? true : false),
    //     then: Yup.string().oneOf(
    //       [Yup.ref("password")],
    //       "Both password need to be the same"
    //     ),
    //   })
    //   .required("Confirm Password is required"),

    // avatar: Yup.string().required("Avatar is required"),
    fullName: Yup.string().required("Full Name is required"),
    phoneNumber: Yup.string()
      .matches(phoneFormat, "Phone number is invalid")
      .min(10, "Phone number is invalid")
      .max(10, "Phone number is invalid")
      .required("Phone number is required"),

    role: Yup.string().required("Role is required"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: user.users
        .filter((user) => user.id === urlId)
        .map((user) => user.UserName)
        .toString(),
      phoneNumber: user.users
        .filter((user) => user.id === urlId)
        .map((user) => user.ContactNumber)
        .toString(),
      // email: "",
      // password: "",
      // confirmPassword: "",
      // avatar: "",
      role: user.users
        .filter((user) => user.id === urlId)
        .map((user) => user.UserType)
        .toString(),

        studentNumber: user.users
        .filter((user) => user.id === urlId)
        .map((user) => user.StudentNumber)
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      console.log(formik.values.email);

      if (files.length > 0) {
        setLoading(true);
        setAvatarError(false);

        await updateDoc(doc(db, "Users", urlId), {
          UserName: formik.values.fullName,
          UserType: formik.values.role,
          ContactNumber: Number(formik.values.phoneNumber),
        });
        await Promise.all(
          files.map((image) => {
            const imageRef = ref(storage, `Users/${urlId}/${image.path}`);
            uploadBytes(imageRef, image, "data_url").then(async () => {
              const downloadURL = await getDownloadURL(imageRef);

              await updateDoc(doc(db, "Users", urlId), {
                Image: deleteField(),
                ProfilePicName: image.path,
              });
              await deleteObject(
                ref(
                  storage,
                  `Users/${urlId}/${user.users
                    .filter((user) => user.id === urlId)
                    .map((user, i) => user.ProfilePicName)}`
                )
              );

              await updateDoc(doc(db, "Users", urlId), {
                Image: arrayUnion(downloadURL),
              });
            });
            return true;
          })
        );

        await addDoc(collection(db, "History"), {
          Title: `Edit User`,
          CreatedUser: auth.currentUser.uid,
          Created: serverTimestamp(),
        });

        setSnackbarOpen(true);
        setLoading(false);
      } else if (files.length === 0) {
        setSnackbarOpen(true);
        await updateDoc(doc(db, "Users", urlId), {
          UserName: formik.values.fullName,
          UserType: formik.values.role,
          ContactNumber: Number(formik.values.phoneNumber),
        });

        await addDoc(collection(db, "History"), {
          Title: `Edit User`,
          CreatedUser: auth.currentUser.uid,
          Created: serverTimestamp(),
        });

        setSnackbarOpen(true);
        setLoading(false);
      } else {
        setAvatarError(true);
        setSubmitting(false);
      }
    },
  });
  // console.log("files", files);
  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    errors,
    touched,
    // values,
    // resetForm,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    // setFieldValue,
    setSubmitting,
    // getFieldMeta,
  } = formik;

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(
    user.formsFeedback
      .filter((form) => form.UserUid === urlId)
      .map((form) => form)
  );
  return (
    <Container sx={{ mt: 12, mb: 5 }}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Update Account Successfully
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
              View user
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
                to="/listuser"
              >
                <Typography color="text.primary" variant="body2">
                  User
                </Typography>
              </Link>
              <Typography color="gray" variant="body2">
                Edit
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
                      <Box>
                        <input
                          // {...getFieldMeta("avatar")}
                          {...getInputProps()}
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
                              {thumbs.length !== 0 ? thumbs : thumbsDefault}

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
                          {/* <Typography sx={style.imageTypography}>
                            Allowed *.jpeg, *.jpg, *.png, max size of 3.1 MB
                          </Typography> */}
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
                       <Box gridColumn="span 6">
                        <TextField
                          disabled
                          fullWidth
                          type="name"
                          label="Student Number"
                          {...getFieldProps("studentNumber")}
                          error={Boolean(touched.studentNumber && errors.studentNumber)}
                          helperText={touched.studentNumber && errors.studentNumber}
                        />
                      </Box>
                      <Box gridColumn="span 6">
                        <TextField
                          disabled
                          fullWidth
                          type="name"
                          label="Full Name"
                          {...getFieldProps("fullName")}
                          error={Boolean(touched.fullName && errors.fullName)}
                          helperText={touched.fullName && errors.fullName}
                        />
                      </Box>

                      <Box gridColumn="span 6">
                        <TextField
                          disabled
                          fullWidth
                          type="number"
                          label="Phone Number"
                          {...getFieldProps("phoneNumber")}
                          error={Boolean(
                            touched.phoneNumber && errors.phoneNumber
                          )}
                          helperText={touched.phoneNumber && errors.phoneNumber}
                        />
                      </Box>

                      <Box gridColumn="span 6">
                        <FormControl
                          disabled
                          fullWidth
                          error={Boolean(touched.role && errors.role)}
                        >
                          <InputLabel id="demo-simple-select-label">
                            Role
                          </InputLabel>
                          <Select {...getFieldProps("role")} label="Role">
                            <MenuItem value={"Counselor"}>Counselor</MenuItem>
                            <MenuItem value={"Facilitator"}>
                              Facilitator
                            </MenuItem>
                            <MenuItem value={"Student"}>Student</MenuItem>
                          </Select>
                          <FormHelperText sx={{ color: "red" }}>
                            {touched.role && errors.role}
                          </FormHelperText>
                        </FormControl>
                      </Box>
                    </Box>
                    {/* 
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
                        disabled={
                          files.length === 0 &&
                          user.users
                            .filter((user) => user.id === urlId)
                            .map((user) => user.UserName)
                            .toString() === formik.values.fullName &&
                          user.users
                            .filter((user) => user.id === urlId)
                            .map((user) => user.UserType)
                            .toString() === formik.values.role &&
                          user.users
                            .filter((user) => user.id === urlId)
                            .map((user) => user.ContactNumber)
                            .toString() === formik.values.phoneNumber &&
                          !isSubmitting
                        }
                      >
                        Update User
                      </LoadingButton>
                    </Box> */}
                  </Item>
                </Grid>

                <Grid item xs={12} md={12}>
                  <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={value}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                          onChange={handleChange}
                          aria-label="lab API tabs example"
                        >
                          <Tab label="Assessment" value={0} />
                          <Tab label="Counseling" value={1} />
                          <Tab label="History" value={2} />
                        </TabList>
                      </Box>
                      <TabPanel value={0}>
                        {/* <Box sx={{ width: "100%", typography: "body1" }}>
                          {user.formsFeedback
                            .filter((form) => form.UserUid === urlId)
                            .map((form) => (
                              <Box>
                                <Typography variant="body1" color="initial">
                                  {user.forms
                                    .filter((f) => f.id === form.FormsId)
                                    .map((f) => f.Title)}
                                </Typography>
                                {form.Forms.map((f) => (
                                  <Box>
                                    <Typography variant="body1" color="initial">
                                      Question: {f.formsQuestion}
                                    </Typography>
                                    <Typography variant="body1" color="initial">
                                      Answer: {f.formsAnswer}
                                    </Typography>
                                  </Box>
                                ))}
                              </Box>
                            ))}
                        </Box> */}


                        {user.formsFeedback
                            .filter((form) => form.UserUid === urlId)
                            .map((form) => (
                        <Accordion>
                   
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>   {user.forms
                                    .filter((f) => f.id === form.FormsId)
                                    .map((f) => f.Title)}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Box>
                                {/* <Typography variant="body1" color="initial">
                                  {user.forms
                                    .filter((f) => f.id === form.FormsId)
                                    .map((f) => f.Title)}
                                </Typography> */}
                                {form.Forms.map((f) => (
                                  <Box>
                                    <Typography variant="body1" color="initial">
                                      Question: {f.formsQuestion}
                                    </Typography>
                                    <Typography variant="body1" color="initial">
                                      Answer: {f.formsAnswer}
                                    </Typography>
                                  </Box>
                                ))}
                              </Box>
                          </AccordionDetails>
                       
                        </Accordion>
    ))}
                      </TabPanel>
                      <TabPanel value={1}>
                      {user.appointments
                            .filter((form) => form.CreatedUser === urlId)
                            .map((form) => (
                        <Accordion>
                   
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>   {form.Title}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Box>
                                {/* <Typography variant="body1" color="initial">
                                  {user.forms
                                    .filter((f) => f.id === form.FormsId)
                                    .map((f) => f.Title)}
                                </Typography> */}
                               
                                    <Typography variant="body1" color="initial">
                                      Title: {form.Title}
                                    </Typography>
                                    <Typography variant="body1" color="initial">
                                      Type: {form.Type}
                                    </Typography>
                                    <Box sx={{display:"flex"}}>
                                    <Typography variant="body1" color="initial">
                                      Status: 
                                    </Typography>
                                    <Typography variant="body1" color="primary" sx={{ml:1}}>
                                      {form.Status}
                                    </Typography>
                                    </Box>
                                    <Typography variant="body1" color="initial">
                                      Date: {format(new Date((form.Date.seconds*1000)), 'PPpp')}
                                    </Typography>
                                  
                            
                              </Box>
                          </AccordionDetails>
                       
                        </Accordion>
    ))}
                      </TabPanel>
                      <TabPanel value={2}>
                      {user.history
                            .filter((form) => form.StudentUser === urlId)
                            .map((form) => (
                              <Box sx={{display:"flex"}}>
                        <Typography variant="body1" color="textSecondary">{form.Title}</Typography>
                       <Box sx={{flexGrow:1}} />
                        <Typography variant="body1" color="textSecondary">{format(new Date((form.Created.seconds*1000)), 'PPpp')}</Typography>
                        </Box>
                            ))}
                            
                      </TabPanel>
                    </TabContext>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </Box>
      </Container>
    </Container>
  );
}
