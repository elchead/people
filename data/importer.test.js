const fs = require("fs");
csvToObj = require("csv-to-js-parser").csvToObj;
const parseCsv = (data) => csvToObj(data, ",");
var expect = require("chai").expect;
const InputFile = "./data/peopleN.csv";

const data = fs.readFileSync(InputFile, { encoding: "utf8" }).toString();

const { Deta } = require("deta");

require("dotenv").config({
  path: "./.env.local",
});
const deta = Deta(process.env.REACT_APP_KEY);
const results = [];

require("dotenv").config({
  path: "./.env.local",
});

describe("Import", function () {
  it("should load csv as json object", function () {
    let obj = parseCsv(data);
    expect(obj).to.not.be.empty;
    const o = obj[0];
    expect(obj[0]).to.have.property("Name").that.is.not.empty;
  });
});

describe("Send object to deta db", async () => {
  it("take obj and sent", async () => {
    let obj = {
      name: "Max",
      Place: "Barcelona",
      Food: "vegan",
      Tag: ["VIP"],
      key: "1001",
    };
    const db = deta.Base("people");
    await db.put(obj);
    const res = await db.get(obj.key);
    expect(res).to.not.be.empty;
    await db.delete(obj.key);
  });
});
