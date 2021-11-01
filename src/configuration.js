import configData from "./config.ini";

var ini = require("ini");
const axios = require("axios");

function fetchData(url) {
  return axios.get(url);
}

function sendData(url, body) {
  axios
    .put(configData, body)
    .then((resp) => {
      console.log(resp);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function LoadPersonsFromConfig() {
  var list_of_persons = [];

  let res = await fetchData(configData);
  let config = ini.parse(res.data, "utf-8");
  let json_format = JSON.parse(JSON.stringify(config));

  for (const [key, items] of Object.entries(json_format)) {
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

export async function SaveUpdatedConfig(full_data) {
  full_data.forEach((person) => {
    sendData(configData, {
      uuid: person.uuid,
      name: person.name,
      surname: person.surname,
      phone_number: person.phone_number,
      locality: person.locality,
    });
  });
}

// LoadPersonsFromConfig();
// SavePersonsToConfig();
