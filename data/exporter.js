const fs = require("fs");
const ExportFile = "/Users/adria/Programming/misou/data/people.json";
const backupFolder = "/Users/adria/Google Drive/04_Archives/Backup/people";
// deta prep
const { Deta } = require("deta");
require("dotenv").config({
  path: "./.env.local",
});
const deta = Deta(process.env.REACT_APP_KEY);
const db = deta.Base("people");

const backupData = async () => {
  const contacts = await db.fetch();
  storeData(contacts, `${backupFolder}/backup-${getDateString()}.json`);
  storeData(contacts, ExportFile);
};

backupData();

function storeData(data, path) {
  try {
    fs.writeFileSync(path, JSON.stringify(data.items));
  } catch (err) {
    console.error(err);
  }
}

function getDateString() {
  return new Date().toISOString().split("T")[0];
}
