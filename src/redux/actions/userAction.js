import * as actionTypes from "../types";

export const setMyData = (myUserData) => async (dispatch) => {
  try {
    
    dispatch({ type: actionTypes.SET_MY_DATA, payload: myUserData });
  } catch (err) {
    dispatch({ type: actionTypes.USER_ERROR, payload: err });
  }
};

export const setMedicines = (medicines) => async (dispatch) => {
  try {
    
    dispatch({ type: actionTypes.SET_MEDICINES, payload: medicines });
  } catch (err) {
    dispatch({ type: actionTypes.USER_ERROR, payload: err });
  }
};

export const setNews = (news) => async (dispatch) => {
  try {
    
    dispatch({ type: actionTypes.SET_NEWS, payload: news });
  } catch (err) {
    dispatch({ type: actionTypes.USER_ERROR, payload: err });
  }
};

export const setPatients = (patients) => async (dispatch) => {
  try {
    
    dispatch({ type: actionTypes.SET_PATIENT, payload: patients });
  } catch (err) {
    dispatch({ type: actionTypes.USER_ERROR, payload: err });
  }
};

export const setHistory = (history) => async (dispatch) => {
  try {
    
    dispatch({ type: actionTypes.SET_HISTORY, payload: history });
  } catch (err) {
    dispatch({ type: actionTypes.USER_ERROR, payload: err });
  }
};

export const setAppointment = (appointment) => async (dispatch) => {
  try {
    
    dispatch({ type: actionTypes.SET_APPOINTMENT, payload: appointment });
  } catch (err) {
    dispatch({ type: actionTypes.USER_ERROR, payload: err });
  }
};

export const setForms = (forms) => async (dispatch) => {
  try {
    
    dispatch({ type: actionTypes.SET_FORMS, payload: forms });
  } catch (err) {
    dispatch({ type: actionTypes.USER_ERROR, payload: err });
  }
};

export const setChats = (chats) => async (dispatch) => {
  try {
    
    dispatch({ type: actionTypes.SET_CHATS, payload: chats });
  } catch (err) {
    dispatch({ type: actionTypes.USER_ERROR, payload: err });
  }
};

export const setThemes = (themes) => async (dispatch) => {
  try {
    
    dispatch({ type: actionTypes.SET_THEME_DATA, payload: themes });
  } catch (err) {
    dispatch({ type: actionTypes.USER_ERROR, payload: err });
  }
};

export const setFormFeddback = (feedback) => async (dispatch) => {
  try {
    
    dispatch({ type: actionTypes.SET_FORMS_FEEDBACK, payload: feedback });
  } catch (err) {
    dispatch({ type: actionTypes.USER_ERROR, payload: err });
  }
};






export const setMotors = (motors) => async (dispatch) => {
  try {
    
    dispatch({ type: actionTypes.SET_MOTOR, payload: motors });
  } catch (err) {
    dispatch({ type: actionTypes.USER_ERROR, payload: err });
  }
};

export const setUsers = (users) => async (dispatch) => {
  try {
    
    dispatch({ type: actionTypes.SET_USER, payload: users });
  } catch (err) {
    dispatch({ type: actionTypes.USER_ERROR, payload: err });
  }
};

export const setProducts = (products) => async (dispatch) => {
  try {
    
    dispatch({ type: actionTypes.SET_PRODUCT, payload: products });
  } catch (err) {
    dispatch({ type: actionTypes.USER_ERROR, payload: err });
  }
};

export const setNewsBlogs = (news) => async (dispatch) => {
  try {
    
    dispatch({ type: actionTypes.SET_NEWS_BLOGS, payload: news });
  } catch (err) {
    dispatch({ type: actionTypes.USER_ERROR, payload: err });
  }
};

export const setOrders = (orders) => async (dispatch) => {
  try {
    
    dispatch({ type: actionTypes.SET_ORDERS, payload: orders });
  } catch (err) {
    dispatch({ type: actionTypes.USER_ERROR, payload: err });
  }
};

export const setFinance = (finance) => async (dispatch) => {
  try {
    
    dispatch({ type: actionTypes.SET_FINANCE, payload: finance });
  } catch (err) {
    dispatch({ type: actionTypes.USER_ERROR, payload: err });
  }
};



