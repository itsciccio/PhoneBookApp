import { Button } from "@material-ui/core";
import { Person } from "../person";
import { store } from "../../redux/store/store";
import {
  removeContact,
  openContactOptionPane,
  openContactEditForm,
} from "../../redux/actions/contactActions";
import updateContactForm from "../forms/updateContactForm";

export const personCard = (
  person,
  contact_option_pane_open_id,
  contact_edit_form_id,
  person_in_focus
) => {
  const renderPersonOptions = (uuid) => {
    return (
      <>
        <div>
          <Button
            variant="outlined"
            style={{
              width: "90px",
              height: "25px",
              align: "left",
              backgroundColor: "white",
            }}
            onClick={() => {
              store.dispatch(removeContact(uuid));
            }}
          >
            Remove
          </Button>
        </div>
        <div>
          <Button
            variant="outlined"
            className="option-buttons"
            style={{ width: "90px", height: "25px", backgroundColor: "white" }}
            onClick={() => {
              store.dispatch(openContactEditForm(uuid));
            }}
          >
            Update
          </Button>
        </div>
        {contact_edit_form_id === uuid
          ? updateContactForm(person_in_focus)
          : ""}
      </>
    );
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 0fr)",
        gridGap: 0,
      }}
    >
      <div className="person-card">
        <div>
          <li key={person.uuid}>
            <Person
              name={person.name}
              surname={person.surname}
              phone_number={person.phone_number}
              locality={person.locality}
            />
          </li>
        </div>
      </div>
      <div>
        <Button
          style={{ height: "40px", width: "90px" }}
          variant="contained"
          onClick={() => {
            store.dispatch(openContactOptionPane(person.uuid));
          }}
        >
          Options...
        </Button>
        {contact_option_pane_open_id === person.uuid
          ? renderPersonOptions(person.uuid)
          : ""}
      </div>
    </div>
  );
};

export default personCard;
