import React, { useState, useEffect } from "react";
import style from "../styles/CreateUser";
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
  FormControlLabel,
  MenuItem,
  InputLabel,
  FormHelperText,
  CircularProgress,
  Snackbar,
  Switch,
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
import { useSelector } from "react-redux";
//backend
import { db, storage } from "../utils/firebase";
import {
  setDoc,
  serverTimestamp,
  updateDoc,
  doc,
  arrayUnion,
  addDoc,
  collection,
  deleteField,
  
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";
import { getAuth, updatePassword  } from "firebase/auth";

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

const thumbPreview = {
  
  display: "inline-flex",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
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
  // const date = new Date();
const [editPassword, setEditPassword] = useState(false);
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
  const thumbsDefault =  
    <Box style={thumbPreview}>
      <Box style={thumbInner}>
        <img src={user.currentUserData[0].Image} style={img} alt="hahah" />
        <Box>
          
          {/* <ClearRoundedIcon onClick={remove(product.Image[i])} style={style.removeButton} /> */}
        </Box>
      </Box>
    </Box>;

  const thumbsEmpty = (
    <div style={thumb}>
      <div style={thumbInnerEmpty}>
        {user.currentUserData[0].ImageName === "" || user.currentUserData[0].Image === "" ? (        <AddAPhotoRoundedIcon style={imgEmpty} />)
        : (      <img src={user.currentUserData[0].Image} style={img} alt="dsfsd" />) }


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

  const LoginSchema = Yup.object().shape({
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
    // fullName: Yup.string()
    //   .min(10, "Full Name is invalid")
    //   .required("Full Name is required"),
    // phoneNumber: Yup.string()
    //   .matches(phoneFormat, "Phone number is invalid")
    //   .min(10, "Phone number is invalid")
    //   .max(10, "Phone number is invalid")
    //   .required("Phone number is required"),


  });

  const PasswordSchema = Yup.object().shape({
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
    // fullName: Yup.string()
    //   .min(10, "Full Name is invalid")
    //   .required("Full Name is required"),
    // phoneNumber: Yup.string()
    //   .matches(phoneFormat, "Phone number is invalid")
    //   .min(10, "Phone number is invalid")
    //   .max(10, "Phone number is invalid")
    //   .required("Phone number is required"),


  });

  const [filterSchema, setFilterSchema] = useState(LoginSchema);

  useEffect(() => {
  
    if (editPassword === true) {
      setFilterSchema(PasswordSchema);
    }
    else {
      setFilterSchema(LoginSchema);
    }
  }, [editPassword])
  

  const formik = useFormik({
    initialValues: {
      fullName: user.currentUserData[0].UserName,
      phoneNumber: user.currentUserData[0].ContactNumber,
      password: "",
      confirmPassword: "",

    },
    validationSchema: filterSchema,
    onSubmit: async() => {
      const auth = getAuth();
      const urlId = auth.currentUser.uid;
      if (files.length > 0) {
        setLoading(true);
        setAvatarError(false);

        await updateDoc(doc(db, "Users", urlId), {
          UserName: formik.values.fullName,
          ContactNumber: Number(formik.values.phoneNumber),
        });
        await Promise.all(
          files.map((image) => {
            const imageRef = ref(storage, `Users/${urlId}/${image.path}`);
            uploadBytes(imageRef, image, "data_url").then(async () => {
              const downloadURL = await getDownloadURL(imageRef);

              await updateDoc(doc(db, "Users", urlId), {
                Image: deleteField(),
                ImageName: image.path,
              });


              if(user.currentUserData[0].ImageName !== ""){
              await deleteObject(
                ref(
                  storage,
                  `Users/${urlId}/${user.currentUserData[0].ImageName}`
                )
              );
            }

              await updateDoc(doc(db, "Users", urlId), {
                Image: arrayUnion(downloadURL),
              });
            });
            return true;
          })
        );
        setSnackbarOpen(true);
        setLoading(false);
      }
      else if (files.length > 0 && editPassword === true) {
        setLoading(true);
        setAvatarError(false);

        await updateDoc(doc(db, "Users", urlId), {
          UserName: formik.values.fullName,
          ContactNumber: Number(formik.values.phoneNumber),
        });
        await Promise.all(
          files.map((image) => {
            const imageRef = ref(storage, `Users/${urlId}/${image.path}`);
            uploadBytes(imageRef, image, "data_url").then(async () => {
              const downloadURL = await getDownloadURL(imageRef);

              await updateDoc(doc(db, "Users", urlId), {
                Image: deleteField(),
                ImageName: image.path,
              });


              if(user.currentUserData[0].ImageName !== ""){
              await deleteObject(
                ref(
                  storage,
                  `Users/${urlId}/${user.currentUserData[0].ImageName}`
                )
              );
            }

              await updateDoc(doc(db, "Users", urlId), {
                Image: arrayUnion(downloadURL),
              });
            });
            return true;
          })
        );

        await updatePassword(auth.currentUser, formik.values.confirmPassword).then(() => {
          // Update successful.
        }).catch((error) => {
          console.log(error);
          // ...
        });
        setSnackbarOpen(true);
        setLoading(false);
      } 

     

      else if (editPassword === true) {
        await updateDoc(doc(db, "Users", urlId), {
          UserName: formik.values.fullName,
          ContactNumber: Number(formik.values.phoneNumber),
        });

       await updatePassword(auth.currentUser, formik.values.confirmPassword).then(() => {
          // Update successful.
          console.log("Password Updated");
          resetForm();
        }).catch((error) => {
          console.log(error);
          // ...
        });
        setSnackbarOpen(true);
        setLoading(false);

      } else if (files.length === 0) {
        setSnackbarOpen(true);
        await updateDoc(doc(db, "Users", urlId), {
          UserName: formik.values.fullName,
          ContactNumber: Number(formik.values.phoneNumber),
        });
        setSnackbarOpen(true);
        setLoading(false);
      } else {
        setAvatarError(true);
        setSubmitting(false);
      }
    },
  });
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
              My Account
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
                to="/account"
              >
                <Typography color="text.primary" variant="body2">
                  Account
                </Typography>
              </Link>
              <Typography color="gray" variant="body2">
                Profile
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
                        <Box gridColumn="span 12"
                        sx={{ display: "flex" }}
                        >
                      <FormControlLabel
                control={
                  <Switch
                    value={editPassword}
                    onChange={() => setEditPassword(!editPassword)}
                  />
                }
                label="Edit Password"
                sx={{ mb: 1 }}
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
                        <TextField
                        disabled={editPassword === false ? true : false}
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
                          disabled={editPassword === false ? true : false}
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
                      disabled={editPassword === true || files.length > 0 || formik.values.fullName !== user.currentUserData[0].UserName ||  formik.values.phoneNumber !== user.currentUserData[0].ContactNumber ? false : true}
                        style={{ textTransform: "Capitalize", borderRadius: 8 }}
                        size="small"
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                      >
                        Update Profile
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