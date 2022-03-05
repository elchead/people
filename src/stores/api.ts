import { Contact } from "../../models/Contact";
import axios from "axios";
import "dotenv/config";

export interface API {
  getContacts(): Promise<any>;
  getDeleteEffect(key: string): any;
  getSaveEffect(contact: Contact): any;
}

export const baseUrl = `https://database.deta.sh/v1/${
  process.env.REACT_APP_PROJECT || "NOT_FOUND"
}/people`;
export const apiKey = process.env.REACT_APP_KEY || "NOT_FOUND";
const header = {
  "X-API-Key": apiKey,
  "Content-Type": "application/json",
};

const api = {
  // not used at the moment
  getContacts: () =>
    axios
      .post<{ items: Contact[] }>(
        `${baseUrl}/query`,
        {},
        {
          headers: header,
        }
      )
      .then((resp) => resp.data.items),
  getDeleteEffect: (key: string) => {
    return {
      url: `${baseUrl}/items/${key}`,
      method: "DELETE",
      headers: header,
    };
  },
  getSaveEffect: (contact: Contact) => {
    return {
      url: `${baseUrl}/items`,
      method: "PUT",
      body: JSON.stringify({ items: [contact] }),
      headers: header,
    };
  },
} as API;

export default api;
