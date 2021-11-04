const fs = require("fs");
const parseCsv = require("./importer");
var expect = require("chai").expect;
const InputFile = "./data/peopleN.csv";

const data = fs.readFileSync(InputFile, { encoding: "utf8" }).toString();
var assert = require("assert");

const csv = require("csv-parser");
const client = require("./src/utils/trpc");
const results = [];

describe("Import", function () {
  it("should load csv as json object", function () {
    let obj = parseCsv(data);
    //     console.log(data);
    //     console.log(obj.map(JSON.parse));
    expect(obj).to.not.be.empty;
    const o = obj[0];
    console.log(o);
    //     Object.keys(obj[0]).forEach((prop) => console.log(prop));
    //     expect(obj[0]).to.have.property("Name").that.is.not.empty;
  });
});

describe("Send object to deta db", async () => {
  it("take obj and sent", async () => {
    let obj = { Name: "Doe", Place: "Barcelona", Food: "vegan", Tag: ["VIP"] };
    await client.mutation("savePerson", obj);
    const allContacts = await client.query("allPeople");
    expect(allContacts).to.contain(obj);
  });
});
