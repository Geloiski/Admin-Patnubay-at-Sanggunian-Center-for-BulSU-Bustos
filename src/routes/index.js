import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { Switch, Route, Redirect } from "react-router-dom";
import { Box, Snackbar, Alert } from "@mui/material";
import theme from "../utils/theme";
import Loading from "../components/Loading";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";

//user
import ListUser from "../pages/users/List";
import CreateUser from "../pages/users/Create";
import EditUser from "../pages/users/Edit";
import ViewUser from "../pages/users/View";

// forms
import ListPatient from "../pages/forms/List";
import CreatePatient from "../pages/forms/Create";
import EditPatient from "../pages/forms/Edit";
import ViewPatient from "../pages/forms/View";
// appointment
import ListAppointment from "../pages/appointments/List";
import CreateAppointment from "../pages/appointments/Create";
import EditAppointment from "../pages/appointments/Edit";

//news and blogs
import ListNews from "../pages/newsBlogs/AllNews";
import CreateNews from "../pages/newsBlogs/AddNews";
import EditNews from "../pages/newsBlogs/EditNews";

import ClientHomepage from "../pages/ClientHomepage";
import History from "../pages/History";
import Chats from "../pages/chats/index";
import Login from "../pages/Login";
import Sidebar from "../components/Sidebar";
import Dashboard from "../pages/Dashboard";
import Account from "../pages/Account";
import NotFound from "../pages/404";

import ForgotPassword from "../pages/ForgotPassword";

//backend
import { onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { auth, db } from "../utils/firebase";
import { getTheme, getLang } from "../redux/actions/uiAction";
import {
  setDoc,
  serverTimestamp,
  updateDoc,
  doc,
  arrayUnion,
  addDoc,
  collection,
  where,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

import {
  setMyData,
  setMotors,
  setUsers,
  setProducts,
  setNewsBlogs,
  setOrders,
  setFinance,
  setHistory,
  setForms,
  setAppointment,
  setNews,
  setChats,
  setThemes,
  setFormFeddback,
} from "../redux/actions/userAction";

export default function Index() {
  // const [snackbarOpen, setSnackbarOpen] = useState(false);

  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const user = useSelector((state) => state.user);
  const THEME = createTheme(theme(ui.isDarkMode));
  // const location = useLocation();

  const [state, setstate] = useState({
    isAuth: false,
    isLoading: true,
  });

  //snackbar
  const [stateSnap, setStateSnap] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setStateSnap({ ...stateSnap, open: false });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log(user.uid);

      if (user && user.emailVerified) {
        const collectionRefMyData = collection(db, "Users");
        const MyData = query(
          collectionRefMyData,
          where("UserUid", "==", user.uid)
        );

        dispatch(setMyData([{ UserType: "" }]));
        onSnapshot(MyData, async (snapshot) => {
          if (
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
              .UserType === "Counselor"
          ) {
            // await addDoc(collection(db, "History"), {
            //   Title: `Login User Counselor`,
            //   CreatedUser: auth.currentUser.uid,
            //   Created: serverTimestamp(),
            // });

            dispatch(
              setMyData(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
              )
            );

            setstate({ isAuth: true, isLoading: false });
          } else if (
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
              .UserType === "Facilitator"
          ) {
            // await addDoc(collection(db, "History"), {
            //   Title: `Login User Facilitator`,
            //   CreatedUser: auth.currentUser.uid,
            //   Created: serverTimestamp(),
            // });

            dispatch(
              setMyData(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
              )
            );

            setstate({ isAuth: true, isLoading: false });
          } else {
            setstate({ isAuth: false, isLoading: false });
            auth.signOut();
            // alert("Your Account is not Admin");
            console.log("Your Account is not Counselor or Facilitator");
            setStateSnap({ open: true });
          }
        });

        // //motors
        // const collectionRefMotors = collection(db, "Motors");
        // const qMotors = query(collectionRefMotors, orderBy("Created"));
        // onSnapshot(qMotors, (snapshot) =>
        //   dispatch(
        //     setMotors(
        //       snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        //     )
        //   )
        // );

        // users
        const collectionRefUsers = collection(db, "Users");
        const qUsers = query(collectionRefUsers, orderBy("Created"));
        onSnapshot(qUsers, (snapshot) =>
          dispatch(
            setUsers(
              snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            )
          )
        );

        // users
        const collectionRefForms = collection(db, "Forms");
        const qForms = query(collectionRefForms, orderBy("Created"),);
        onSnapshot(qForms, (snapshot) =>
          dispatch(
            setForms(
              snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            )
          )
        );

        // // medicines
        // const collectionRefProducts = collection(db, "Medicines");
        // const qProducts = query(collectionRefProducts, orderBy("Created"));
        // onSnapshot(qProducts, (snapshot) =>
        //   dispatch(
        //     setMedicines(
        //       snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        //     )
        //   )
        // );

        // news and blogs
        const collectionRefNewsBlogs = collection(db, "NewsBlogs");
        const qNewsBlogs = query(collectionRefNewsBlogs, orderBy("Created"));
        onSnapshot(qNewsBlogs, (snapshot) =>
          dispatch(
            setNews(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          )
        );

        // // Patients
        // const collectionRefPatients = collection(db, "Patients");
        // const qPatients = query(collectionRefPatients, orderBy("Created"));
        // onSnapshot(qPatients, (snapshot) =>
        //   dispatch(
        //     setPatients(
        //       snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        //     )
        //   )
        // );

        // History
        const collectionRefHistory = collection(db, "History");
        const qHistory = query(collectionRefHistory, orderBy("Created"));
        onSnapshot(qHistory, (snapshot) =>
          dispatch(
            setHistory(
              snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            )
          )
        );

        // Appointment
        const collectionRefAppointment = collection(db, "Appointment");
        const qAppointment = query(
          collectionRefAppointment,
          orderBy("Created")
        );
        onSnapshot(qAppointment, (snapshot) =>
          dispatch(
            setAppointment(
              snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            )
          )
        );

          // Chats
          const collectionRefChat = collection(db, "Chats");
          const qChat = query(
            collectionRefChat
          );
          onSnapshot(qChat, (snapshot) =>
            dispatch(
              setChats(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
              )
            )
          );

             // Theme Data
             const collectionRefTheme = collection(db, "Theme");
             const qTheme = query(
              collectionRefTheme
             );
             onSnapshot(qTheme, (snapshot) =>
               dispatch(
                setThemes(
                   snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                 )
               )
             );

              // Forms Feedback
              const collectionRefFeedback = collection(db, "FormsFeedback");
              const qFeedback = query(
                collectionRefFeedback
              );
              onSnapshot(qFeedback, (snapshot) =>
                dispatch(
                 setFormFeddback(
                    snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                  )
                )
              );

        // //Orders
        // const collectionRefOrders = collection(db, "Orders");
        // const qOrders = query(collectionRefOrders, orderBy("CreatedAt"));
        // onSnapshot(qOrders, (snapshot) =>
        //   dispatch(
        //     setOrders(
        //       snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        //     )
        //   )
        // );

        //  //Finance
        //  const collectionRefFinance = collection(db, "Finance");
        //  const qFinance = query(collectionRefFinance, orderBy("Created"));
        //  onSnapshot(qFinance, (snapshot) =>
        //    dispatch(
        //      setFinance(
        //        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        //      )
        //    )
        //  );

        // setstate({ isAuth: true, isLoading: false });
      } else {
        setstate({ isAuth: false, isLoading: false });
      }
    });

    dispatch(getLang(), getTheme());
  }, [dispatch]);

  if (state.isLoading) {
    return <Loading />;
  }
  // console.log("gago", user.currentUserData[0].UserType );
  return (
    <ThemeProvider theme={THEME}>
      <Snackbar
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={stateSnap.open}
        key={stateSnap.vertical + stateSnap.horizontal}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Your Account is not Counselor or Facilitator
        </Alert>
      </Snackbar>

      <Box sx={{ display: "flex" }}>
        {state.isAuth === true ? <Sidebar /> : null}

        <Switch>
          <Route path="/" exact>
            <Redirect to="/login" />
          </Route>

          <Route path="/" exact>
            <Redirect to="/login" />
          </Route>

          <PublicRoute
            restricted={true}
            component={Login}
            isAuth={state.isAuth}
            path="/login"
            exact
          />

          <PublicRoute
            restricted={true}
            component={ForgotPassword}
            isAuth={state.isAuth}
            path="/forgot-password"
            exact
          />

          <PrivateRoute
            component={Dashboard}
            isAuth={state.isAuth}
            path="/dashboard"
            exact
          />

          <PrivateRoute
            component={CreatePatient}
            isAuth={state.isAuth}
            path="/createforms"
            exact
          />

          <PrivateRoute
            component={ListPatient}
            isAuth={state.isAuth}
            path="/listforms"
            exact
          />

          <PrivateRoute
            component={EditPatient}
            isAuth={state.isAuth}
            path="/editforms"
            exact
          />

        <PrivateRoute
            component={ViewPatient}
            isAuth={state.isAuth}
            path="/viewforms"
            exact
          />

          <PrivateRoute
            component={ListAppointment}
            isAuth={state.isAuth}
            path="/listappointment"
            exact
          />
          <PrivateRoute
            component={CreateAppointment}
            isAuth={state.isAuth}
            path="/createappointment"
            exact
          />
          <PrivateRoute
            component={EditAppointment}
            isAuth={state.isAuth}
            path="/editappointment"
            exact
          />
          <PrivateRoute
            component={CreateNews}
            isAuth={state.isAuth}
            path="/createnewsblogs"
            exact
          />
          <PrivateRoute
            component={EditNews}
            isAuth={state.isAuth}
            path="/editnewsblogs"
            exact
          />

          <PrivateRoute
            component={ListNews}
            isAuth={state.isAuth}
            path="/listnewsblogs"
            exact
          />
          <PrivateRoute
            component={History}
            isAuth={state.isAuth}
            path="/history"
            exact
          />

        <PrivateRoute
                component={Account}
                isAuth={state.isAuth}
                path="/settings"
                exact
              />

        <PrivateRoute
                component={ClientHomepage}
                isAuth={state.isAuth}
                path="/theme"
                exact
              />

          {user.currentUserData[0].UserType === "Counselor" && (
            <>
              <PrivateRoute
                component={ListUser}
                isAuth={state.isAuth}
                path="/listuser"
                exact
              />

              <PrivateRoute
                component={CreateUser}
                isAuth={state.isAuth}
                path="/createuser"
                exact
              />

              <PrivateRoute
                component={EditUser}
                isAuth={state.isAuth}
                path="/edituser"
                exact
              />

              <PrivateRoute
                component={ViewUser}
                isAuth={state.isAuth}
                path="/viewuser"
                exact
              />

              <PrivateRoute
                component={Chats}
                isAuth={state.isAuth}
                path="/chat"
                exact
              />


            </>
          )}

          <Route component={NotFound} />
        </Switch>
      </Box>
    </ThemeProvider>
  );
}
