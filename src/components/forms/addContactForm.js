import React from "react";
import GetLocalities from "../../utils/utils";
import { Formik, Form, useField } from "formik";
import { TextField, Button, Select, MenuItem } from "@material-ui/core";
import * as yup from "yup";
import { store } from "../../redux/store/store";
import {
  addContact,
  refreshContactList,
} from "../../redux/actions/contactActions";

export const addContactForm = () => {
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
          const payload = {
            name: data.firstName,
            surname: data.lastName,
            phone_number: data.phone_number,
            locality: data.locality,
          };
          store.dispatch(addContact(payload));
          store.dispatch(refreshContactList());
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
};

export default addContactForm;
