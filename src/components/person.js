import React from "react";
import "../index.css";
import { Typography } from "@material-ui/core";

export class Person extends React.Component {
  renderPersonDetails() {
    return (
      <>
        <Typography variant="h6">{this.props.name}</Typography>
        <Typography variant="h6">{this.props.surname}</Typography>
        <Typography variant="subtitle1">{this.props.phone_number}</Typography>
        <Typography variant="subtitle1">{this.props.locality}</Typography>
      </>
    );
  }

  //render person details
  render() {
    return this.renderPersonDetails();
  }
}

export default Person;
