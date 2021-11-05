import { Formik, Form, useField } from "formik";
import { TextField, Button, Select, MenuItem } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import * as yup from "yup";
import GetLocalities from "../../utils/utils";
import { store } from "../../redux/store/store";
import {
  refreshContactList,
  updateContact,
} from "../../redux/actions/contactActions";

export const updateContactForm = (person_in_focus) => {
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
          firstName: person_in_focus.name,
          lastName: person_in_focus.surname,
          phone_number: person_in_focus.phone_number,
          locality: person_in_focus.locality,
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { resetForm }) => {
          store.dispatch(
            updateContact({
              id: person_in_focus.uuid,
              name: data.firstName,
              surname: data.lastName,
              phone_number: data.phone_number,
              locality: data.locality,
            })
          );
          store.dispatch(refreshContactList());
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
};

export default updateContactForm;
