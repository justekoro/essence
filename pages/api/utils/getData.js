import Jszip from 'jszip';
import parser from 'xml2json';
import axios from "axios";
const zip = new Jszip();

const getData = async () => {
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

export default getData;