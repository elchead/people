const { Deta } = require("deta");
const fs = require("fs");
const csvToObj = require("csv-to-js-parser").csvToObj;
const parseCsv = (data) => csvToObj(data, ",");
const { v4: uuidv4 } = require("uuid");
const InputFile = "./data/peopleN.csv";

const data = fs.readFileSync(InputFile, { encoding: "utf8" }).toString();

require("dotenv").config({
  path: "./.env.local",
});
const deta = Deta(process.env.REACT_APP_KEY);

function transformEntry(person) {
  // TODO get key
  const tags = person.Groups ? person.Groups.trim().split(",") : [];
  const name = person.Name ? person.Name : "?";
  return {
    key: uuidv4(),
    name: name,
    food: person.Food,
    place: person.Place,
    tag: tags,
    family: person.Family,
    mtg: person.LastUpdate ? [person.LastUpdate] : person.LastUpdate,
    link: person.Website,
    interests: person.Interests,
    likes: person.Likes,
  };
}
let people = parseCsv(data);
const db = deta.Base("people");
people.forEach((p) => db.put(transformEntry(p)));
