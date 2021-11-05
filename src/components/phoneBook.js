import React from "react";
import "../index.css";
import Contacts from "./contacts";
import { connect } from "react-redux";

class PhoneBook extends React.Component {
  render() {
    return (
      <div>
        <Contacts />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    persons: state.list_of_persons,
    initialised: state.initialised,
  };
};

export default connect(mapStateToProps)(PhoneBook);
