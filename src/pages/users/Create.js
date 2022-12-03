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
  setDoc,
  serverTimestamp,
  updateDoc,
  doc,
  arrayUnion,
  addDoc,
  collection,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";
import { getAuth } from "firebase/auth";

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
  const const_term = 1024;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  // const date = new Date();

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

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((show) => !show);
  };
  const phoneFormat =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const emailFormat =
    /^([\w.-]+)@(\[(\d{1,3}\.){3}|(?=bulsu.edu.ph)(([a-zA-Z\d-]+\.)+))([a-zA-Z]{2,4}|\d{1,3})(\]?)$/;
  const LoginSchema = Yup.object().shape({


    email: Yup.string().when("role", {
      is: "Student",
      then: Yup.string()
        .email("Email must be a valid email address")
        .required("Bulsu Email is required")
        .matches(emailFormat, "Bulsu Email is required")
    }),

      // email: Yup.string()
      // .matches(emailFormat, "Bulsu Email is required")
      // .email("Email must be a valid email address")
      // .required("Email is required"),
   

    password: Yup.string()
      .min(7, "Be at least 8 characters in length")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        ),
      })
      .required("Confirm Password is required"),

    // avatar: Yup.string().required("Avatar is required"),
    fullName: Yup.string()
      .min(10, "Full Name is invalid")
      .required("Full Name is required"),
    phoneNumber: Yup.string()
      .matches(phoneFormat, "Phone number is invalid")
      .min(10, "Phone number is invalid")
      .max(10, "Phone number is invalid")
      .required("Phone number is required"),

    role: Yup.string().required("Role is required"),
    studentNumber: Yup.string().min(9, "Student Number is invalid"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      // avatar: "",
      role: "",
      studentNumber: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async() => {
      console.log(formik.values.email);

      if (files.length > 0) {
        setLoading(true);
        setAvatarError(false);

        const auth = getAuth();
        await addDoc(collection(db, "History"), {
          Title: `Created User ${formik.values.fullName} ${formik.values.role}`,
          CreatedUser: auth.currentUser.uid,
          Created: serverTimestamp(),
        });

        createUserWithEmailAndPassword(
          auth,
          formik.values.email,
          formik.values.password
        )
          .then((userCredential) => {
            sendEmailVerification(auth.currentUser).then(async () => {
              // Email verification sent!
              // alert("Email sent");
              // auth.signOut();
              // setLoading(false);
              //add data firestore and image

              if (files.length > 0) {
                setAvatarError(false);

                //if student create chat generate
                if (formik.values.role === "Student") {
                await addDoc(collection(db, "Chats", userCredential.user.uid,"Chat"), {
                  from: "Admin",
                  message: "Welcome to Bulsu PaSan",
                  Created: serverTimestamp(),
                });
    
                await setDoc(doc(db, "Chats", userCredential.user.uid), {
                  id: userCredential.user.uid,
                });
              }
                
                await setDoc(doc(db, "Users", userCredential.user.uid), {
                  UserUid: userCredential.user.uid,
                  UserEmail: formik.values.email,
                  ImageName: files[0].name,
                  UserName: formik.values.fullName,
                  UserType: formik.values.role,
                  ContactNumber: Number(formik.values.phoneNumber),
                  StudentNumber: formik.values.studentNumber,
                  Created: serverTimestamp(),
                });
                await Promise.all(
                  files.map((image) => {
                    const imageRef = ref(
                      storage,
                      `Users/${userCredential.user.uid}/${image.path}`
                    );
                    uploadBytes(imageRef, image, "data_url").then(async () => {
                      const downloadURL = await getDownloadURL(imageRef);
                      await updateDoc(
                        doc(db, "Users", userCredential.user.uid),
                        {
                          Image: arrayUnion(downloadURL),
                        }
                      );
                    });
                    return true;
                  })
                );

                resetForm({
                  values: {
                    fullName: "",
                    phoneNumber: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    role: "",
                    studentNumber: "",
                  },
                });
                setSnackbarOpen(true);
                setFiles([]);
              } else {
                setAvatarError(true);
                setSubmitting(false);
              }
            });
          })
          .catch((error) => {
            // error
            setSubmitting(false);
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, errorMessage);
            setLoading(false);
          });
      } else {
        setAvatarError(true);
        setSubmitting(false);
      }

      console.log(avatarError);
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
    // setFieldValue,
    setSubmitting,
    // getFieldMeta,
  } = formik;

  return (
    <Container sx={{ mt: 12, mb: 5 }}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Crete Account Successfully
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
              Create a new user
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
                      <Box {...getRootProps({ className: "dropzone" })}>
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
                          <Typography sx={style.imageTypography}>
                            Allowed *.jpeg, *.jpg, *.png, max size of 3.1 MB
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
                      <Box
                        gridColumn="span 12"
                        sx={{
                          display:
                            formik.values.role === "Student" ? "flex" : "none",
                        }}
                      >
                        <TextField
                          fullWidth
                          type="number"
                          label="Student Number"
                          {...getFieldProps("studentNumber")}
                          error={Boolean(
                            touched.studentNumber && errors.studentNumber
                          )}
                          helperText={
                            touched.studentNumber && errors.studentNumber
                          }
                        />
                      </Box>

                      <Box gridColumn="span 6">
                        <TextField
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
                          fullWidth
                          error={Boolean(touched.role && errors.role)}
                        >
                          <InputLabel id="demo-simple-select-label">
                            Role
                          </InputLabel>
                          <Select {...getFieldProps("role")} label="Role">
                            <MenuItem value={"Counselor"}>Counselor</MenuItem>
                            <MenuItem value={"Facilitator"}>Facilitator</MenuItem>
                            <MenuItem value={"Student"}>Student</MenuItem>
                          </Select>
                          <FormHelperText sx={{ color: "red" }}>
                            {touched.role && errors.role}
                          </FormHelperText>
                        </FormControl>
                      </Box>

                      <Box gridColumn="span 6">
                        <TextField
                          fullWidth
                          autoComplete="username"
                          type="email"
                          label="Email address"
                          {...getFieldProps("email")}
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </Box>
                      <Box gridColumn="span 6">
                        <TextField
                          fullWidth
                          autoComplete="current-password"
                          type={showPassword ? "text" : "password"}
                          label="Password"
                          {...getFieldProps("password")}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleShowPassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityRoundedIcon />
                                  ) : (
                                    <VisibilityOffRoundedIcon />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          error={Boolean(touched.password && errors.password)}
                          helperText={touched.password && errors.password}
                        />
                      </Box>
                      <Box gridColumn="span 6">
                        <TextField
                          fullWidth
                          autoComplete="current-password"
                          type={showConfirmPassword ? "text" : "password"}
                          label="Confirm Password"
                          {...getFieldProps("confirmPassword")}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleShowConfirmPassword}
                                  edge="end"
                                >
                                  {showConfirmPassword ? (
                                    <VisibilityRoundedIcon />
                                  ) : (
                                    <VisibilityOffRoundedIcon />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          error={Boolean(
                            touched.confirmPassword && errors.confirmPassword
                          )}
                          helperText={
                            touched.confirmPassword && errors.confirmPassword
                          }
                        />
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
                        Create User
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
