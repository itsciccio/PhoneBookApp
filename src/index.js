import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { v4 as uuidv4 } from "uuid";
import { Formik, Form, useField } from "formik";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import * as yup from "yup";
import { LoadPersonsFromConfig, SaveUpdatedConfig } from "./configuration";

class Person extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     uuid: props.uuid,
  //     name: props.name,
  //     surname: props.surname,
  //     phone_number: props.phone_number,
  //     locality: props.locality,
  //   };
  // }

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

class ContactsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit_user_uuid: null,
      option_panes_open: [],
    };
  }

  //renderPersonCard(uuid, name, surname, phone_number, locality) {
  renderPersonCard(person) {
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
              var option_panes_open = this.state.option_panes_open.slice();
              if (
                option_panes_open &&
                option_panes_open.includes(person.uuid)
              ) {
                const index = option_panes_open.indexOf(person.uuid);
                option_panes_open.splice(index, 1);
              } else {
                option_panes_open = option_panes_open.concat([person.uuid]);
              }
              this.setState({
                option_panes_open: option_panes_open,
              });
            }}
          >
            Options...
          </Button>
          {this.state.option_panes_open.includes(person.uuid)
            ? this.renderPersonOptions(person.uuid)
            : null}
        </div>
        <div>
          {this.state.option_panes_open.includes(person.uuid)
            ? this.renderUpdateForm(person)
            : null}
        </div>
      </div>
    );
  }

  renderPersonOptions(uuid) {
    return (
      <>
        <div>
          <Button
            variant="outlined"
            style={{ width: "90px", height: "25px", align: "left" }}
            onClick={() => {
              this.props.remove_contact(uuid);
            }}
          >
            Remove
          </Button>
        </div>
        <div>
          <Button
            variant="outlined"
            className="option-buttons"
            //style={{ width: "90px", height: "25px" }}
            onClick={() => {
              if (uuid === this.state.edit_user_uuid) {
                this.setState({
                  edit_user_uuid: null,
                });
              } else {
                this.setState({
                  edit_user_uuid: uuid,
                });
              }
            }}
          >
            Update
          </Button>
        </div>
      </>
    );
  }

  renderUpdateForm(person) {
    if (this.state.edit_user_uuid === person.uuid) {
      const CustomTextField = (props) => {
        const [field, meta] = useField(props);
        const errorText = meta.error && meta.touched ? meta.error : "";
        return (
          <TextField
            {...field}
            helperText={errorText}
            placeholder={props.placeholder}
            error={!!errorText}
          />
        );
      };

      const validationSchema = yup.object({
        firstName: yup.string().max(18).required(),
        lastName: yup.string().max(35).required(),
        phone_number: yup.number().required(),
        locality: yup.string().required(),
      });

      return (
        <div className="form">
          <Formik
            initialValues={{
              firstName: person.name,
              lastName: person.surname,
              phone_number: person.phone_number,
              locality: person.locality,
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { resetForm }) => {
              this.props.update_contact(
                person.uuid,
                data.firstName,
                data.lastName,
                data.phone_number,
                data.locality
              );
              this.setState({
                edit_user_uuid: null,
              });
            }}
          >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
              <Form>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 0fr)",
                    gridGap: 0,
                  }}
                >
                  <div style={{ width: "220px" }}>
                    <div>
                      <CustomTextField
                        name="firstName"
                        placeholder="First Name"
                        type="input"
                        as={TextField}
                      />
                    </div>
                    <div>
                      <CustomTextField
                        name="lastName"
                        placeholder="Second Name"
                        type="input"
                        as={TextField}
                      />
                    </div>
                    <div>
                      <CustomTextField
                        name="phone_number"
                        placeholder="Phone Number"
                        type="input"
                        as={TextField}
                      />
                    </div>
                    <div>
                      <Select
                        name="locality"
                        //value={values.locality ? values.locality : ""}
                        defaultValue="Locality"
                        //value={person.locality}
                        onChange={handleChange}
                        as={Select}
                      >
                        <MenuItem value="none" disabled>
                          Locality
                        </MenuItem>
                        {GetLocalities()}
                      </Select>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      //height: "100vh",
                    }}
                  >
                    <Button type="submit" endIcon={<SendIcon />} />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      );
    }

    //send information up using prop up
  }

  generatePersonList() {
    //try so it reads from a config.ini file
    var persons = [];
    const current_list_of_persons = this.props.contacts;

    for (let i = 0; i < current_list_of_persons.length; i++) {
      persons.push(<>{this.renderPersonCard(current_list_of_persons[i])}</>);
    }

    return persons;
  }

  render() {
    return (
      <div>
        <ol>{this.generatePersonList()}</ol>
      </div>
    );
  }
}

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort_order: false,
      current_sort: "name",
      list_of_persons: [],
    };
    this.initData();
  }

  async initData() {
    const retrieved_data = await LoadPersonsFromConfig();
    this.setState({
      list_of_persons: retrieved_data,
    });
  }

  addNewPerson(name, surname, phone_number, locality) {
    const list_of_persons_current = this.state.list_of_persons.slice();

    this.setState({
      list_of_persons: list_of_persons_current.concat([
        {
          uuid: uuidv4(),
          name: name,
          surname: surname,
          phone_number: phone_number,
          locality: locality,
        },
      ]),
    });
  }

  removePerson(uuid) {
    var current_list_of_persons = this.state.list_of_persons.slice();

    for (let i = 0; i < current_list_of_persons.length; i++) {
      if (current_list_of_persons[i].uuid === uuid) {
        current_list_of_persons.splice(i, 1);
        this.setState({
          list_of_persons: current_list_of_persons,
        });
        return;
      }
    }
  }

  updatePerson(uuid, firstName, lastName, phone_number, locality) {
    let updated_list_of_persons = [...this.state.list_of_persons];

    for (let i = 0; i < updated_list_of_persons.length; i++) {
      if (updated_list_of_persons[i].uuid === uuid) {
        let editedPerson = {
          ...updated_list_of_persons[i],
          name: firstName,
          surname: lastName,
          phone_number: phone_number,
          locality: locality,
        };
        updated_list_of_persons[i] = editedPerson;
        this.setState({ list_of_persons: updated_list_of_persons });
        return;
      }
    }
  }

  personForm() {
    const CustomTextField = (props) => {
      const [field, meta] = useField(props);
      const errorText = meta.error && meta.touched ? meta.error : "";
      return (
        <TextField
          {...field}
          helperText={errorText}
          placeholder={props.placeholder}
          error={!!errorText}
        />
      );
    };

    const validationSchema = yup.object({
      firstName: yup.string().required().max(18),
      lastName: yup.string().required().max(35),
      phone_number: yup.number().required(),
      locality: yup.string().required(),
    });

    return (
      <div className="form">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            phone_number: "",
            locality: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(data, { resetForm }) => {
            resetForm();
            this.addNewPerson(
              data.firstName,
              data.lastName,
              data.phone_number,
              data.locality
            );
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <Form>
              <div>
                <CustomTextField
                  name="firstName"
                  placeholder="First Name"
                  type="input"
                  as={TextField}
                />
              </div>
              <div>
                <CustomTextField
                  name="lastName"
                  placeholder="Last Name"
                  type="input"
                  as={TextField}
                />
              </div>
              <div>
                <CustomTextField
                  name="phone_number"
                  placeholder="Phone Number"
                  type="input"
                  as={TextField}
                />
              </div>
              <div>
                <Select
                  name="locality"
                  value={values.locality ? values.locality : ""}
                  onChange={handleChange}
                  as={Select}
                >
                  <MenuItem value="none" disabled>
                    Locality
                  </MenuItem>
                  {GetLocalities()}
                </Select>
              </div>
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <Button type="submit">Submit</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }

  sortPersons(type) {
    var persons_sorted = [...this.state.list_of_persons];

    var sort_value = -1;
    if (this.state.sort_order) {
      sort_value = 1;
    }

    switch (type) {
      case "name":
        persons_sorted.sort(function (a, b) {
          var nameA = a.name.toLowerCase(),
            nameB = b.name.toLowerCase();
          if (nameA < nameB) return -sort_value;
          if (nameA > nameB) return sort_value;
          return 0;
        });
        break;

      case "surname":
        persons_sorted.sort(function (a, b) {
          var nameA = a.surname.toLowerCase(),
            nameB = b.surname.toLowerCase();
          if (nameA < nameB) return -sort_value;
          if (nameA > nameB) return sort_value;
          return 0;
        });
        break;

      case "locality":
        persons_sorted.sort(function (a, b) {
          var nameA = a.locality.toLowerCase(),
            nameB = b.locality.toLowerCase();
          if (nameA < nameB) return -sort_value;
          if (nameA > nameB) return sort_value;
          return 0;
        });
        break;

      default:
        console.log("Invalid filter");
    }

    this.setState({
      current_sort: type,
      list_of_persons: persons_sorted,
    });
  }

  sortIcon(type) {
    if (type !== this.state.current_sort) {
      return null;
    }

    if (this.state.sort_order === false) {
      return <ArrowDropUpIcon />;
    } else if (this.state.sort_order === true) {
      return <ArrowDropDownIcon />;
    }
  }

  topMenu() {
    const FilterButton = (props) => {
      return (
        <Button
          style={{ height: "40px", width: "90px" }}
          variant="contained"
          endIcon={this.sortIcon(props.type)}
          onClick={() => {
            this.setState({ sort_order: !this.state.sort_order });
            this.sortPersons(props.type);
          }}
        >
          {props.type}
        </Button>
      );
    };

    return (
      <>
        <FilterButton type="name">Name</FilterButton>
        <FilterButton type="surname">Surname</FilterButton>
        <FilterButton type="locality">Surname</FilterButton>
      </>
    );
  }

  render() {
    return (
      <div>
        <Typography variant="h3">My Phone Book :)</Typography>
        <div>{this.topMenu()}</div>
        <div>
          <ContactsList
            contacts={this.state.list_of_persons}
            remove_contact={(uuid) => this.removePerson(uuid)}
            update_contact={(
              uuid,
              firstName,
              lastName,
              phone_number,
              locality
            ) =>
              this.updatePerson(
                uuid,
                firstName,
                lastName,
                phone_number,
                locality
              )
            }
          />
          {/* <button onClick={() => this.addNewPerson()}>
                    Add Person
                </button> */}
        </div>
        <Button onClick={() => SaveUpdatedConfig(this.state.list_of_persons)}>
          SAVE
        </Button>
        {this.personForm()}
      </div>
    );
  }
}

class PhoneBook extends React.Component {
  render() {
    return (
      <div>
        <Contacts />
      </div>
    );
  }
}

function GetLocalities() {
  const localities = ["Sliema", "St. Julian's", "Valletta"];

  return localities.map((locality, index) => (
    <MenuItem key={index} value={locality}>
      {locality}
    </MenuItem>
  ));
}

ReactDOM.render(<PhoneBook />, document.getElementById("root"));
