import { MenuItem } from "@material-ui/core";

export const GetLocalities = () => {
  const localities = ["Sliema", "St. Julian's", "Valletta"];

  return localities.map((locality, index) => (
    <MenuItem key={index} value={locality}>
      {locality}
    </MenuItem>
  ));
};
export default GetLocalities;
