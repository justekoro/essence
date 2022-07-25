/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable default-case */
const express = require("express");
const route = express.Router();

const fs = require("fs");
// utils
const getData = require("../utils/getData");

route.get("/", async (req, res) => {
  if(!fs.readFileSync("./bump/data.json")) {
    await getData();
  }
  const file = fs.readFileSync("./bump/data.json");
  const json = JSON.parse(file);
  // results variables
  let result = [];
  let listCityName = [];

  for (let element of json["pdv_liste"]["pdv"]) {
    if (listCityName.includes(element["ville"].toLowerCase())) {
      continue;
    } else {
      listCityName.push(element["ville"].toLowerCase());
    }
  }

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

  // send results
  return res.status(200).json({ result, listCityName });
});

module.exports = route;
