import React from "react";
import "../../index.css";
import { Button } from "@material-ui/core";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { sortContactsList } from "../../redux/actions/contactActions";
import { store } from "../../redux/store/store";

export const topMenu = (sort_order, sorting_property) => {
  const sortIcon = (type) => {
    if (type !== sorting_property) {
      return null;
    }

    if (sort_order === false) {
      return <ArrowDropUpIcon />;
    } else if (sort_order === true) {
      return <ArrowDropDownIcon />;
    }
  };
  const FilterButton = (props) => {
    return (
      <Button
        style={{ height: "40px", width: "90px" }}
        variant="contained"
        endIcon={sortIcon(props.type)}
        onClick={() => {
          store.dispatch(
            sortContactsList({
              sorting_property: props.type,
            })
          );
        }}
      >
        {props.type}
      </Button>
    );
  };

  return (
    <div>
      <FilterButton type="name">Name</FilterButton>
      <FilterButton type="surname">Surname</FilterButton>
      <FilterButton type="locality">Surname</FilterButton>
    </div>
  );
};

export default topMenu;
