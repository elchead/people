csvToObj = require("csv-to-js-parser").csvToObj;

const DataInterface = {
  Name: { type: "string", group: 1 },
  //   Ask: { type: "string" },
  //   "Last Update": { type: "string" },
  //   "Last Contacted": { type: "string" },
  //   Work: { type: "string" },
  //   Family: { type: "string" },
  //   Website: { type: "string" },
  //   Interests: { type: "string" },
  //   Likes: { type: "string" },
};

const parseCsv = (data) => csvToObj(data, ",");

module.exports = parseCsv;
