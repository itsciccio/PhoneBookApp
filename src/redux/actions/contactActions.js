import {
  ADD_CONTACT,
  SORT_CONTACT_LIST,
  UPDATE_CONTACT,
  REMOVE_CONTACT,
  TOGGLE_CONTACT_OPTION_PANE,
  TOGGLE_CONTACT_EDIT_FORM,
  REFRESH_CONTACT_LIST,
  SAVE_ALL_CONTACTS,
} from "./types";

export const addContact = (payload) => {
  return {
    type: ADD_CONTACT,
    payload,
  };
};

export const removeContact = (id) => {
  return {
    type: REMOVE_CONTACT,
    id,
  };
};

export const updateContact = (payload) => {
  return {
    type: UPDATE_CONTACT,
    id: payload.id,
    payload,
  };
};

export const sortContactsList = (payload) => {
  return {
    type: SORT_CONTACT_LIST,
    payload: payload,
  };
};

export const openContactOptionPane = (id) => {
  return {
    type: TOGGLE_CONTACT_OPTION_PANE,
    id,
  };
};

export const openContactEditForm = (id) => {
  return {
    type: TOGGLE_CONTACT_EDIT_FORM,
    id,
  };
};

export const refreshContactList = () => {
  return {
    type: REFRESH_CONTACT_LIST,
  };
};

export const saveAllContactsToFile = () => {
  return {
    type: SAVE_ALL_CONTACTS,
  };
};
