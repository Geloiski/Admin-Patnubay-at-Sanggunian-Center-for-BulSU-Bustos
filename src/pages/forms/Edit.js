import React, { useState, useEffect } from "react";
import style from "../../styles/CreateUser";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider, FieldArray,
  Field,
  Formik, } from "formik";

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
  Button,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import LoadingButton from "@mui/lab/LoadingButton";

import { Link as RouterLink, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
// icon
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

// dropzone
import { useDropzone } from "react-dropzone";

//backend
import { db, storage, auth } from "../../utils/firebase";
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
import { getAuth } from "firebase/auth";
import { async } from "@firebase/util";
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

export default function Edit() {
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
  let urlId = queryy.get("id");
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
        
        {user.forms?.filter((form) => form.id === urlId)[0]?.Image === undefined ? ( <AddAPhotoRoundedIcon style={imgEmpty} />)
      : (  <img src={user.forms.filter((form) => form.id === urlId)[0].Image} style={img} alt="hahah" />)  
      }
       
        {/* <Typography fontSize={10} color="textPrimary">Upload photo</Typography> */}
      </div>
    </div>
  );

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <Box sx={{ my:2, border: 1, borderRadius: 2, p: 2, color: "red" }}>
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
  const FormsGroup = { formsQuestion: "", formsOptionA: "", formsOptionB: "", formsOptionC: "", formsOptionD:"" };


  const LoginSchema = Yup.object().shape({


    // avatar: Yup.string().required("Avatar is required"),
    title: Yup.string()
      .min(5, "Title is invalid")
      .required("Title is required"),

      description: Yup.string()
      .min(5, "Title is invalid")
      .required("Title is required"),
    status: Yup.string().required("Status is required"),
    forms: Yup.array().of(
      Yup.object().shape({
        formsQuestion: Yup.string().required("Question is required"),
        formsOptionA: Yup.string().required("Option A is required"),
        formsOptionB: Yup.string().required("Option B is required"),
        formsOptionC: Yup.string().required("Option C is required"),
        formsOptionD: Yup.string().required("Option D is required"),
      })
    ),

  });

  const [_forms, set_Forms] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: user.forms
      .filter((form) => form.id === urlId)
      .map((user) => user.Title)
      .toString(), 
      
      description: 
      user.forms
      .filter((form) => form.id === urlId)
      .map((user) => user.Description)
      .toString(),
      forms: [FormsGroup],
      status: user.forms
      .filter((form) => form.id === urlId)
      .map((user) => user.Status)
      .toString(),
     
    },
    validationSchema: LoginSchema,
    onSubmit: async() => {

      if (files.length > 0) {
        setAvatarError(false);
         await updateDoc(doc(db, "Forms",urlId), {
          Title: formik.values.title,
          Description: formik.values.description,
          Status: formik.values.status,
          Forms: formik.values.forms,
        });
      
        await Promise.all(
          files.map(async(image) => {
           
           const imageRef = ref(storage, `Forms/${urlId}/${image.path}`);
            uploadBytes(imageRef, image, "data_url").then(async () => {
        
              const downloadURL = await getDownloadURL(imageRef);
              await updateDoc(doc(db, "Forms", urlId), {
                Image: deleteField(),
                ImageName: image.path,
            })
            await deleteObject(ref (storage, `Forms/${urlId}/${ user.forms.filter((news) => (news.id === urlId)).map((news,i) => (news.ImageName))}`));
              await updateDoc(doc(db, "Forms", urlId), {
                Image: arrayUnion(downloadURL),
              });
              
            }); 
           
            return true; 
           
          })
        );
        await addDoc(collection(db, "History"), {
          Title: `Edit Assesment`,
          CreatedUser: auth.currentUser.uid,
          Created: serverTimestamp(),
        });
   
        setSnackbarOpen(true);
      
          
      } else if (files.length === 0) {
        setSnackbarOpen(true);
         await updateDoc(doc(db, "Forms",urlId), {
          Title: formik.values.title,
          Description: formik.values.description,
          Forms: formik.values.forms,
          Status: formik.values.status,
        });
       }else { 
        setAvatarError(true);
        setSubmitting(false);
      }
     

     
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


  useEffect(() => {

    // Forms
    user.forms
    .filter((form) => form.id === urlId)
    .map((user) => set_Forms(user.Forms))

    setFieldValue("forms",_forms);

   
        


  }, [user, urlId,_forms, ]);

  return (
    <Container sx={{ mt: 12, mb: 5 }}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Update  Assesment Successfully
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
              Edit  Assesment
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
                to="/listforms"
              >
                <Typography color="text.primary" variant="body2">
                Assesment
                </Typography>
              </Link>
              <Typography color="gray" variant="body2">
                Edit
              </Typography>
            </Breadcrumbs>
          </Box>
        </Stack>

        <Box >
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
             
                <Grid item xs={12} md={8}>
                  <Item>
                    <Box
                      display="grid"
                      // gridTemplateColumns="repeat(12, 1fr)"
                      sx={style.boxGrid}
                      gap={2}
                    >
                      <Box gridColumn="span 12" sx={{my:1.3}}>
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
                      <Box gridColumn="span 12">
                        <FormControl
                          fullWidth
                          error={Boolean(touched.status && errors.status)}
                        >
                          <InputLabel id="demo-simple-select-label">
                            Status
                          </InputLabel>
                          <Select {...getFieldProps("status")} label="status">
                          <MenuItem value={"Open"}>Open</MenuItem>
                            <MenuItem value={"Close"}>Close</MenuItem>
                          </Select>
                          <FormHelperText sx={{ color: "red" }}>
                            {touched.status && errors.status}
                          </FormHelperText>
                        </FormControl>
                      </Box>

                   
                    </Box>

               
                  </Item>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Item>
                    <Box >
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
                            <Box sx={{  position: "relative" }}>
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


                <Grid item xs={12} md={12}>
                <Item>
                <Box
                      display="grid"
                      // gridTemplateColumns="repeat(12, 1fr)"
                      sx={style.boxGrid}
                      gap={2}
                    >
                       {/* Forms */}
                       <FieldArray name="forms">
                        {({ push, remove }) => (
                          <>
                            <Box
                              gridColumn="span 12"
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                my: 2,
                              }}
                            >
                            <Typography variant="h5" color="primary">Forms</Typography>
                              <Box sx={{flexGrow:1}}/>
                              <Button
                                variant="outlined"
                                onClick={() => push(FormsGroup)}
                                sx={{textTransform:"none"}}
                              >
                                Add Question
                              </Button>
                            </Box>
                          
                            {formik.values.forms.map((_, index) => (
                              <>
                                <Box gridColumn="span 12">
                                  <TextField
                                    fullWidth
                                    type="name"
                                    label={`Forms Question ${index+1}`}
                                    {...getFieldProps(
                                      `forms.${index}.formsQuestion`
                                    )}
                                    error={Boolean(
                                      touched.forms && errors.forms
                                    )}
                                  />
                                </Box>
                                <Box gridColumn="span 6">
                                  <TextField
                                    fullWidth
                                    type="name"
                                    label="Option A"
                                    {...getFieldProps(
                                      `forms.${index}.formsOptionA`
                                    )}
                                    error={Boolean(
                                      touched.forms && errors.forms
                                    )}
                                  />
                                </Box>
                                <Box gridColumn="span 6">
                                  <TextField
                                    fullWidth
                                    type="name"
                                    label="Option B"
                                    {...getFieldProps(
                                      `forms.${index}.formsOptionB`
                                    )}
                                    error={Boolean(
                                      touched.forms && errors.forms
                                    )}
                                  />
                                </Box>
                                <Box gridColumn="span 6">
                                  <TextField
                                    fullWidth
                                    type="name"
                                    label="Option C"
                                    {...getFieldProps(
                                      `forms.${index}.formsOptionC`
                                    )}
                                    error={Boolean(
                                      touched.forms && errors.forms
                                    )}
                                  />
                                </Box>
                                <Box gridColumn="span 6">
                                  <TextField
                                    fullWidth
                                    type="name"
                                    label="Option D"
                                    {...getFieldProps(
                                      `forms.${index}.formsOptionD`
                                    )}
                                    error={Boolean(
                                      touched.forms && errors.forms
                                    )}
                                  />
                                </Box>

                                {index > 0 && (
                                  <Box gridColumn="span 12">
                                    <Button
                                      // fullWidth
                                      sx={{textTransform:"none"}}
                                      variant="outlined"
                                      color="error"
                                      onClick={() => remove(index)}
                                    >
                                     {` Delete Question ${index+1}`}
                                    </Button>
                                  </Box>
                                )}
                              </>
                            ))}
                           
                          </>
                        )}
                      </FieldArray>
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
                      disabled={urlId ? false : true}
                        style={{ textTransform: "Capitalize", borderRadius: 8 }}
                        size="small"
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                       
                      >
                        Update Assesment
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
