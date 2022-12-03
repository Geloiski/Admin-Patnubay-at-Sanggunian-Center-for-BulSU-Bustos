import React, { useState } from "react";
import style from "../styles/AddProduct";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import UploadImage from "../assets/images/upload.png";
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
  Snackbar,
  OutlinedInput,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import DatePicker from "@mui/lab/DatePicker";
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
// icon
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

// dropzone
import { useDropzone } from "react-dropzone";

// import { useSelector } from "react-redux";

//backend
import { db, storage, auth } from "../utils/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  arrayUnion,
  deleteField,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL,deleteObject } from "firebase/storage";

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

const thumbPreview = {
  
  display: "inline-flex",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  position: "relative",
  overflow: "hidden",
  borderRadius: 10,
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

export default function ClientHomepage() {
  const user = useSelector((state) => state.user);
  const const_term = 1024;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  //dropzone
  // const types = ["image/png", "image/jpeg", "image/jpg"];
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, fileRejections } =
    useDropzone({
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
    // acceptedFiles.splice(acceptedFiles.indexOf(file), 1)
    setFiles([...files.filter((f) => f.name !== file.name).splice(file)]);
    console.log(file);
  };

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

  const thumbs = files.map((file) => (
    <Box style={style.thumbPreview} key={file.name}>
      <Box style={style.thumbInner}>
        <img src={file.preview} style={style.img} alt="hahah" />
        <Box>
          <ClearRoundedIcon onClick={remove(file)} style={style.removeButton} />
        </Box>
      </Box>
    </Box>
  ));

  const thumbsDefault =  user.themes.map((news,i) => ( 
    <Box style={thumbPreview} key={i}>
      <Box style={thumbInner}>
        <img src={news.Image} style={img} alt="hahah" />
        <Box>
          
          {/* <ClearRoundedIcon onClick={remove(product.Image[i])} style={style.removeButton} /> */}
        </Box>
      </Box>
      
    </Box> ));

  const thumbsEmpty = (
    <Box>
        <img src={UploadImage} alt="upload" style={style.imgEmpty} />
        {/* <Typography fontSize={10} color="textPrimary">Upload photo</Typography> */}
   <Typography fontSize={18} color="textPrimary" fontWeight={700} > Drop or  Select file</Typography>
    </Box>
  );


  //yup and formik


  const LoginSchema = Yup.object().shape({
    quote: Yup.string()
      .min(5, "Quote is invalid")
      .required("Quote is required"),
      announcement: Yup.string()
      .min(5, "Announcement is invalid")
      .required("Announcement  is required"),
    // date: Yup.string().required("Date  is required"),
  });

  const formik = useFormik ({
    initialValues: {
      quote: user.themes[0].Quote,
      announcement: user.themes[0].Announcement,
      date: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async() => {

      if (files.length > 0) {
        setAvatarError(false);
    
        const docRef = await updateDoc(doc(db, "Theme", user.themes[0].id), {
          Quote: formik.values.quote,
          Announcement: formik.values.announcement,
          Created: serverTimestamp()
        });
        await Promise.all(
          files.map((image) => {
           const imageRef = ref(storage, `Theme/${user.themes[0].id}/${image.path}`);
            uploadBytes(imageRef, image, "data_url").then(async () => {
              // const downloadURL = await getDownloadURL(imageRef);
              // await updateDoc(doc(db, "Theme", docRef.id), {
              //   Image: arrayUnion(downloadURL),
              //   ImageName: image.path,
              // });

              const downloadURL = await getDownloadURL(imageRef);
              await updateDoc(doc(db, "Theme", user.themes[0].id), {
                Image: deleteField(),
                ImageName: image.path,
            })
            await deleteObject(ref (storage, `Theme/${user.themes[0].id}/${ user.themes[0].ImageName}`));
              await updateDoc(doc(db, "Theme", user.themes[0].id), {
                Image: arrayUnion(downloadURL),
              });
            }); 
            return true;
          })
        );

        await addDoc(collection(db, "History"), {
          Title: `Update Theme`,
          CreatedUser: auth.currentUser.uid,
          Created: serverTimestamp(),
        });

          resetForm({
            values: {
              quote: "",
              announcement: "",
            }
          })
          // setFieldValue("date", "");
        setSnackbarOpen(true);
        setFiles([]);
          
      } else if (files.length === 0) {
        const docRef = await updateDoc(doc(db, "Theme", user.themes[0].id), {
          Quote: formik.values.quote,
          Announcement: formik.values.announcement,
          Created: serverTimestamp()
        });
      } else {

        setAvatarError(true);
        setSubmitting(false);
      }

      console.log("formik",formik.values.stock);
    },
  });
  // console.log("files", files);

  const {
    errors,
    touched,
    // values,
    isSubmitting,
    handleSubmit,
    getFieldProps,
     setFieldValue,
    setSubmitting,
    // getFieldMeta,
    resetForm,
  } = formik;

  return (
    <Container sx={{ mt: 12, mb: 10 }}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Crete News {"&"} Successfully
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
              Client Home Page
            </Typography>
            {/* <Breadcrumbs
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
                to="/allnewsblogs"
              >
                <Typography color="text.primary" variant="body2">
                Theme
                </Typography>
              </Link>
              <Typography color="gray" variant="body2">
                Create
              </Typography>
            </Breadcrumbs> */}
          </Box>
        </Stack>

        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Item>
                  
                <Typography
                    variant="body2"
                    sx={{ mb: 1, mt: 2, textAlign: "left", fontWeight: 700 }}
                  >
                   Quote of the day
                  </Typography>
                <OutlinedInput
                    fullWidth
                    placeholder="Say something"
                    rows={8}
                    multiline
                    {...getFieldProps("quote")}
                    error={Boolean(touched.quote && errors.quote)}
                    helperText={touched.quote && errors.quote}
                  />

                  <Typography
                    variant="body2"
                    sx={{ mb: 1, mt: 2, textAlign: "left", fontWeight: 700 }}
                  >
                    Announcement
                  </Typography>

                  <OutlinedInput
                    fullWidth
                    placeholder="Say something"
                    rows={8}
                    multiline
                    {...getFieldProps("announcement")}
                    error={Boolean(touched.announcement && errors.announcement)}
                    helperText={touched.announcement && errors.announcement}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 1,
                      mt: 2,
                      textAlign: "left",
                      fontWeight: 700,
                    }}
                  >
                    Images
                  </Typography>

                  <Box sx={style.uploadBg}>
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
                        {thumbsEmpty}
                      </Box>
                      <Typography sx={style.imageTypography}>
                        Allowed *.jpeg, *.jpg, *.png, max 1 file and size of
                        3.1 MB
                      </Typography>
                     

                     
                    </Box>
                  </Box>
                  {fileRejectionItems}
                  <Box style={style.thumbsContainer}>
                    <Box sx={{ m: 1, position: "relative" }}>{files.length === 0 ? thumbsDefault : thumbs }</Box>
                  </Box>
                </Item>
              </Grid>

              <Grid item xs={12} md={12}>
              

               

              

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
                    Update Theme
                  </LoadingButton>
                </Box>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Container>
    </Container>
  );
}
