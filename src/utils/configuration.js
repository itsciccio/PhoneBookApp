var ini = require("ini");
const axios = require("axios");

function fetchData(url) {
  return axios.get(url);
}

// export async function LoadConfig() {
async function LoadConfig() {
  const response = await fetchData("/get_config");
  // let json_format = JSON.parse(JSON.stringify(resp.data));
  let ini_form = ini.parse(response.data);

  var list_of_persons = [];

  for (const [key, items] of Object.entries(ini_form)) {
    list_of_persons.push({
      uuid: key,
      name: items.name,
      surname: items.surname,
      phone_number: items.phone_number,
      locality: items.locality,
    });
  }

  list_of_persons.sort(function (a, b) {
    var nameA = a.name.toLowerCase(),
      nameB = b.name.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  return list_of_persons;
}

export default LoadConfig;
