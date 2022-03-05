import { Guid } from "guid-ts";
import type { Contact } from "../../models/Contact";
import { filterForTerm } from "../utils/search";
import { todayISO } from "../utils/today";
import { contactsSort } from "../utils/sort";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import api from "./api";

interface ContactState {
  value: Contact[];
  filtered: Contact[];
  query: string;
  tags: Set<string>;
}

const initialState = {
  value: [],
  filtered: [],
  tags: new Set<string>(),
  query: "?",
} as ContactState;

export const contactSlice = createSlice({
  name: "contacts",
  initialState: initialState,
  reducers: {
    createNewContact: (state) => {
      const baseContact = newContact(state.query);
      state.value.unshift(baseContact);
      state.filtered.unshift(baseContact);
    },
    deleteContact: {
      reducer: (state, action: PayloadAction<Contact>) => {
        const contact = action.payload;
        if (
          contact.name !== "?" &&
          !window.confirm(`Delete ${contact.name}?`)
        ) {
          return;
        }
        state.value = state.value.filter((c) => c.key !== action.payload.key);
        state.filtered = state.filtered.filter(
          (c) => c.key !== action.payload.key
        );
      },
      prepare: (contact: Contact) => ({
        payload: contact,
        meta: {
          offline: {
            effect: api.getDeleteEffect(contact.key),
          },
        },
      }),
    },
    saveContact: {
      reducer: (state, action: PayloadAction<Contact>) => {
        replaceInArr(state.value, action.payload);
        replaceInArr(state.filtered, action.payload);
        state.value.sort(contactsSort);
        state.filtered.sort(contactsSort);
      },
      prepare: (contact: Contact) => {
        contact = setContactAsSaved(contact);
        return {
          payload: contact,
          meta: {
            offline: {
              effect: api.getSaveEffect(contact),
            },
          },
        };
      },
    },
    setContacts: (state, action) => {
      state.value = action.payload;
      state.tags = extractTags(state.value);
      state.filtered = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.filtered = state.value.filter(filterForTerm(action.payload));
    },
  },
});

function setContactAsSaved(c: Contact) {
  const newContact = { ...c };
  if (newContact.__local) {
    delete newContact.__local;
  }
  return newContact;
}

function newContact(name: string) {
  return {
    key: Guid.newGuid().toString(),
    name: name,
    last: todayISO(),
    __local: "true",
  };
}

function replaceInArr(arr: Array<Contact>, newContact: Contact) {
  const idx = arr.findIndex((c) => c.key === newContact.key);
  if (idx >= 0) {
    arr[idx] = newContact;
  }
}
function extractTags(contacts: Contact[]): Set<string> {
  const tags = new Set<string>();
  contacts.forEach((contact) => {
    if (Array.isArray(contact["tag"])) {
      contact["tag"].forEach((tag) => tags.add(tag.trim()));
    } else if (typeof contact["tag"] === "string") {
      tags.add(contact["tag"].trim());
    }
  });
  return tags;
}

export const { actions } = contactSlice;
export default contactSlice.reducer;
