import React from "react";
import "../index.css";
import { Typography } from "@material-ui/core";
import ContactsList from "./contactsList";
import { connect } from "react-redux";
import addContactForm from "./forms/addContactForm";
import topMenu from "./general/topMenu";

class Contacts extends React.Component {
  render() {
    return (
      <div>
        <Typography variant="h3" style={{ color: "white" }}>
          My Phone Book :)
        </Typography>
        {topMenu(this.props.sort_order, this.props.sorting_property)}
        <div>
          <ContactsList />
        </div>
        {addContactForm()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list_of_persons: state.list_of_persons,
    sort_order: state.sort_order,
    sorting_property: state.sorting_property,
  };
};

export default connect(mapStateToProps)(Contacts);
