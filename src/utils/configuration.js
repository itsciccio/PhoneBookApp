var ini = require("ini");
const axios = require("axios");

function fetchData(url) {
  return axios.get(url);
}

function sendData(url, data) {
  return axios.post(url, { text: data }, {});
}

export async function LoadConfig() {
  const response = await fetchData("/get_config");
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

export async function UpdateConfig(contact_list) {
  var text_to_save = "";

  for (let i = 0; i < contact_list.length; i++) {
    text_to_save =
      text_to_save +
      "[" +
      contact_list[i].uuid +
      "]" +
      "\nname=" +
      contact_list[i].name +
      "\nsurname=" +
      contact_list[i].surname +
      "\nphone_number=" +
      contact_list[i].phone_number +
      "\nlocality=" +
      contact_list[i].locality;
    text_to_save = text_to_save + "\n\n";
  }
  const resp = await sendData("/update_config", text_to_save);
  return;
}

const fnsToExport = {
  LoadConfig,
  UpdateConfig,
};

export default fnsToExport;
