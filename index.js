const axios = require('axios');
const jszip = require('jszip');
const url = "https://donnees.roulez-eco.fr/opendata/instantane";
const parser = require('xml2json');
const zip = new jszip();
const express = require('express');
const app = express();
app.use(express.static('public'));

let smallest = {};
let villes = {}
let knownTypes = [];
const getData = async () => {
    const response = await axios({
        method: 'get',
        url,
        responseType: 'arraybuffer'
    });
    require('fs').writeFileSync('data.zip', response.data);
    const data = await zip.loadAsync(response.data);
    const file = data.files["PrixCarburants_instantane.xml"];
    let text = await file.async("nodebuffer");
    text = text.toString("latin1");
    const json = JSON.parse(parser.toJson(text));
    villes = {};
    for (let obj of json.pdv_liste.pdv) {
        if(!villes[obj.ville.toLowerCase()]) {
            console.log(`discovered ${obj.ville}`);
            villes[obj.ville.toLowerCase()] = {};
        }
        if (!obj.prix) continue;
        let prices = obj.prix;
        if (!prices.length) {
            prices = [prices];
        }
        for (let price of prices) {
            if (!price.nom) continue;
            if (!smallest[price.nom]) {
                smallest[price.nom] = {
                    price: price.valeur,
                    date: price.maj,
                    ville: obj.ville
                };
            }
            if (price.valeur < smallest[price.nom].price) {
                smallest[price.nom].price = price.valeur;
                smallest[price.nom].date = price.maj;
                smallest[price.nom].ville = obj.ville;
            }
            if (!knownTypes.includes(price.nom)) {
                knownTypes.push(price.nom);
            }
            if (!villes[obj.ville.toLowerCase()][price.nom]) villes[obj.ville.toLowerCase()][price.nom] = [];
            villes[obj.ville.toLowerCase()][price.nom].push({
                price: Number(price.valeur),
                addr: obj.adresse.replace(/�/g, ""),
            })
        }
    }
    for (let ville in villes) {
        console.log(`sorting prices for ${ville}`);
        for (let key in villes[ville]) {
            console.log(`sorting prices for ${ville}/${key}`);
            villes[ville][key].sort((a, b) => a.price - b.price);
        }
    }
};

app.get("/types", (req, res) => {
    res.json(knownTypes);
}) // Route non utilisée pour le moment, peut-être utilisée pour le futur

app.get("/prix/:ville", (req, res) => {
    if (!villes[req.params.ville.toLowerCase()]) {
        res.status(404).json({status: 404, message: "Ville inconnue"});
        return;
    }
    res.json(villes[req.params.ville.toLowerCase()]);
});

app.get("/ville/search/:query", (req, res) => {
    const query = req.params.query.toLowerCase();
    let r = Object.keys(villes).filter(v => v.toLowerCase().includes(query));
    res.json(r.slice(0, 10));
});

setInterval(getData, 10 * 60 * 1000);
getData();
app.listen(3037);
