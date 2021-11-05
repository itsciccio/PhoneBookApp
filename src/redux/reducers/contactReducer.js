import {
  ADD_CONTACT,
  REMOVE_CONTACT,
  SORT_CONTACT_LIST,
  REFRESH_CONTACT_LIST,
  UPDATE_CONTACT,
  TOGGLE_CONTACT_OPTION_PANE,
  TOGGLE_CONTACT_EDIT_FORM,
} from "../actions/types";
import LoadPersonsFromConfig from "../../utils/configuration";
import { v4 as uuidv4 } from "uuid";

function initContactList() {
  var loaded_contacts = [];
  LoadPersonsFromConfig().then((value) => {
    for (let i = 0; i < value.length; i++) {
      console.log(value[i].uuid);
      console.log(value[i].name);
      loaded_contacts.push({
        uuid: value[i].uuid,
        name: value[i].name,
        surname: value[i].surname,
        phone_number: value[i].phone_number,
        locality: value[i].locality,
      });
    }
  });
  return loaded_contacts;
}
const contactsState = {
  list_of_persons: initContactList(),
  sort_order: true,
  sorting_property: "name",
  contact_option_pane_open_id: null,
  contact_edit_form_id: null,
  person_in_focus: null,
};

function contactReducer(state = contactsState, action) {
  switch (action.type) {
    case ADD_CONTACT: {
      let uuid = uuidv4();
      return {
        ...state,
        list_of_persons: state.list_of_persons.concat({
          uuid,
          ...action.payload,
        }),
      };
    }

    case UPDATE_CONTACT: {
      var list_of_persons_to_update = [...state.list_of_persons];

      for (let i = 0; i < list_of_persons_to_update.length; i++) {
        if (list_of_persons_to_update[i].uuid === action.id) {
          list_of_persons_to_update[i].name = action.payload.name;
          list_of_persons_to_update[i].surname = action.payload.surname;
          list_of_persons_to_update[i].phone_number =
            action.payload.phone_number;
          list_of_persons_to_update[i].locality = action.payload.locality;

          return {
            ...state,
            list_of_persons: list_of_persons_to_update,
          };
        }
      }
      break;
    }

    case REMOVE_CONTACT: {
      var list_of_persons_to_update2 = [...state.list_of_persons];

      for (let i = 0; i < list_of_persons_to_update2.length; i++) {
        if (list_of_persons_to_update2[i].uuid === action.id) {
          list_of_persons_to_update2.splice(i, 1);
          return {
            ...state,
            list_of_persons: list_of_persons_to_update2,
          };
        }
      }
      break;
    }

    case SORT_CONTACT_LIST: {
      if (!state.list_of_persons) {
        return state;
      }

      var persons_to_sort = [...state.list_of_persons];

      var sort_order = state.sort_order;
      if (state.sorting_property !== action.payload.sorting_property) {
        sort_order = true;
      } else {
        sort_order = !state.sort_order;
      }

      var sort_value = -1;
      if (sort_order) {
        sort_value = 1;
      }

      persons_to_sort.sort(function (a, b) {
        let itemA, itemB;
        switch (action.payload.sorting_property) {
          case "name":
            itemA = a.name.toLowerCase();
            itemB = b.name.toLowerCase();
            break;
          case "surname":
            itemA = a.surname.toLowerCase();
            itemB = b.surname.toLowerCase();
            break;
          case "locality":
            itemA = a.locality.toLowerCase();
            itemB = b.locality.toLowerCase();
            break;
          default:
            console.log("Invalid filter.");
        }
        if (itemA < itemB) return -sort_value;
        if (itemA > itemB) return sort_value;
        return 0;
      });

      return {
        ...state,
        list_of_persons: persons_to_sort,
        sorting_property: action.payload.sorting_property,
        sort_order: sort_order,
        contact_edit_form_id: null,
        contact_option_pane_open_id: null,
        person_in_focus: null,
      };
    }

    case REFRESH_CONTACT_LIST: {
      var persons_to_sort_temp = [...state.list_of_persons];

      var sort_value_temp = -1;
      if (state.sort_order) {
        sort_value_temp = 1;
      }

      persons_to_sort_temp.sort(function (a, b) {
        let itemA, itemB;
        switch (state.sorting_property) {
          case "name":
            itemA = a.name.toLowerCase();
            itemB = b.name.toLowerCase();
            break;
          case "surname":
            itemA = a.surname.toLowerCase();
            itemB = b.surname.toLowerCase();
            break;
          case "locality":
            itemA = a.locality.toLowerCase();
            itemB = b.locality.toLowerCase();
            break;
          default:
            console.log("Invalid filter.");
        }
        if (itemA < itemB) return -sort_value_temp;
        if (itemA > itemB) return sort_value_temp;
        return 0;
      });
      return {
        ...state,
        list_of_persons: persons_to_sort_temp,
        contact_edit_form_id: null,
        contact_option_pane_open_id: null,
        person_in_focus: null,
      };
    }

    case TOGGLE_CONTACT_OPTION_PANE: {
      let id_pane_open;

      action.id !== state.contact_option_pane_open_id
        ? (id_pane_open = action.id)
        : (id_pane_open = null);

      var person_to_focus = null;
      var list_of_persons = [...state.list_of_persons];
      for (let i = 0; i < list_of_persons.length; i++) {
        if (list_of_persons[i].uuid === action.id) {
          person_to_focus = list_of_persons[i];
        }
      }

      return {
        ...state,
        contact_edit_form_id: null,
        contact_option_pane_open_id: id_pane_open,
        person_in_focus: person_to_focus,
      };
    }

    case TOGGLE_CONTACT_EDIT_FORM: {
      let id_edit_form_open;

      action.id !== state.contact_edit_form_id
        ? (id_edit_form_open = action.id)
        : (id_edit_form_open = null);

      return {
        ...state,
        contact_edit_form_id: id_edit_form_open,
      };

      // case LOAD_CONTACTS_CONFIG:
      //   const loaded_data = await LoadPersonsFromConfig();
      //   console.log(typeof state.list_of_persons);
      //   console.log(typeof loaded_data);
      //   return {
      //     ...state,
      //     list_of_persons: loaded_data,
      //   };
    }
    default: {
      return state;
    }
  }
}

export default contactReducer;
