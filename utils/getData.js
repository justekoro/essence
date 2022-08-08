const Jszip = require('jszip');
const parser = require('xml2json');
const zip = new Jszip();

const getData = async () => {
  const axios = require('axios').default;
  const response = await axios({
    method: 'get',
    url: 'https://donnees.roulez-eco.fr/opendata/instantane',
    responseType: 'arraybuffer',
  });
  // dezip data and take PrixCarburants_instantane.xml
  const data = await zip.loadAsync(response.data);
  const file = data.files['PrixCarburants_instantane.xml'];
  let text = await file.async('nodebuffer');
  text = text.toString('latin1');
  // convert it to json
  const json = JSON.parse(parser.toJson(text));
  return json;
};

module.exports = getData;
