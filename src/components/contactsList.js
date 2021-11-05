import React, { Component } from "react";
import "../index.css";
import { connect } from "react-redux";
import personCard from "./general/personCard";

class ContactsList extends Component {
  generatePersonList(list_of_persons) {
    //try so it reads from a config.ini file
    var persons = [];

    for (let i = 0; i < list_of_persons.length; i++) {
      persons.push(
        <>
          {personCard(
            list_of_persons[i],
            this.props.contact_option_pane_open_id,
            this.props.contact_edit_form_id,
            this.props.person_in_focus
          )}
        </>
      );
    }

    return persons;
  }

  render() {
    return (
      <div>
        {this.props.list_of_persons ? (
          <ol>{this.generatePersonList(this.props.list_of_persons)}</ol>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list_of_persons: state.list_of_persons,
    contact_option_pane_open_id: state.contact_option_pane_open_id,
    contact_edit_form_id: state.contact_edit_form_id,
    person_in_focus: state.person_in_focus,
  };
};

export default connect(mapStateToProps)(ContactsList);
