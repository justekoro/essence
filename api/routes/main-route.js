const express = require("express");
const route = express.Router();
const axios = require("axios").default;
const jszip = require("jszip");
const url = "https://donnees.roulez-eco.fr/opendata/instantane";
const parser = require("xml2json");
const zip = new jszip();
const colors = require("colors");
const date = new Date().toLocaleDateString("fr-FR", {
  weekday: "short",
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

route.get("/", async (req, res) => {
  console.log("check fetch data mode".gray);
  // check param mode
  const param = req.query.mode;
  console.log("finish check fetch data mode".green);
  console.log(`fetch data from ${url}`.grey);
  // fetch data
  const response = await axios({
    method: "get",
    url,
    responseType: "arraybuffer",
  });
  console.log("finish fetch data".green);
  console.log("parse data".grey);
  // dezip data and take PrixCarburants_instantane.xml
  const data = await zip.loadAsync(response.data);
  const file = data.files["PrixCarburants_instantane.xml"];
  let text = await file.async("nodebuffer");
  text = text.toString("latin1");
  // convert it to json
  const json = JSON.parse(parser.toJson(text));
  console.log("finish parse data".green);
  // results variables
  let result = [];
  let listCityName = [];

  console.log("start get city list".grey);
  for (let element of json["pdv_liste"]["pdv"]) {
    if (listCityName.includes(element["ville"].toLowerCase())) {
      continue;
    } else {
      listCityName.push(element["ville"].toLowerCase());
    }
  }
  console.log("finish get city list".green);

  console.log("start get data".grey);
  for (let element of json["pdv_liste"]["pdv"]) {
    let price = element["prix"];

    if (typeof price !== "object") {
      continue;
    } else {
      let gazole = null;
      let e10 = null;
      let e85 = null;
      let sp95 = null;
      let sp98 = null;
      let glpc = null;

      if (element["prix"].find) {
        gazole = element["prix"].find((items) => {
          return items.nom === "Gazole";
        });
        e10 = element["prix"].find((items) => {
          return items.nom === "E10";
        });
        e85 = element["prix"].find((items) => {
          return items.nom === "E85";
        });
        sp95 = element["prix"].find((items) => {
          return items.nom === "SP95";
        });
        sp98 = element["prix"].find((items) => {
          return items.nom === "SP98";
        });
        glpc = element["prix"].find((items) => {
          return items.nom === "GLPc";
        });
      } else {
        switch (element["prix"]["nom"]) {
          case "Gazole":
            gazole = element["prix"]["valeur"];
            break;
          case "E10":
            e10 = element["prix"]["valeur"];
            break;
          case "E85":
            e85 = element["prix"]["valeur"];
            break;
          case "SP95":
            sp95 = element["prix"]["valeur"];
            break;
          case "SP98":
            sp98 = element["prix"]["valeur"];
            break;
          case "GLPc":
            glpc = element["prix"]["valeur"];
            break;
        }
      }

      const Res = {
        id: element["id"],
        longitude: element["longitude"],
        latitude: element["latitude"],
        ville: element["ville"].toLowerCase(),
        cp: element["cp"],
        adresse: element["adresse"],
      };

      gazole ? (Res.Gazole = gazole) : null;
      e10 ? (Res.E10 = e10) : null;
      e85 ? (Res.E85 = e85) : null;
      sp95 ? (Res.SP95 = sp95) : null;
      sp98 ? (Res.SP98 = sp98) : null;
      glpc ? (Res.GPLc = glpc) : null;

      result.push(Res);
    }
  }
  console.log("finish get data".green);

  console.log(`[${date}] send response`.cyan);
  // send results
  return res.status(200).json({ result, listCityName });
});

module.exports = route;
