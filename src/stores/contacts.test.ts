import { endpoints } from "./apiQuery";
import { setUpStore } from "../store";
import { actions } from "./contacts";
import mockAxios from "jest-mock-axios";
// When loading contacts try to fetch from server, if failed, load cache.s
// Only show cache when failed to fetch from server
var data = [
  {
    key: "b60d8d20-6497-429a-a6bd-47120028341d",
    name: "Jeff",
    tag: ["VIP", "Singapore"],
  },
  {
    name: "Adrian",
    key: "b60d8d20-6497-429a-a6bd-47120028341o",
    tag: ["Berlin", "TUB"],
  },
];

describe("contacts", () => {
  beforeEach(() => {
    // fetchMock.doMock();
    // fetchMock.mockResponse(JSON.stringify({ items: data }));
  });
  it("gets all", async () => {
    const store = setUpStore(true);
    await store.dispatch(actions.setContacts(data));
    const contacts = store.getState().contacts.value;
    expect(contacts.length).toBeGreaterThan(1);
  });
  it("saves changes", async () => {
    // persist to db
    // add to redux state
    // not local anymore
  });
  it("extract all tags", async () => {
    const store = setUpStore(true);
    await store.dispatch(actions.setContacts(data));
    const tags = store.getState().contacts.tags;
    expect(tags).toContain("Berlin");
    expect(tags).toContain("Singapore");
    expect(tags).toContain("VIP");
    expect(tags).toContain("TUB");
  });
});
