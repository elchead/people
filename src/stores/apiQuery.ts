import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { filterForTerm } from "../utils/search";
import type { Contact } from "../../models/Contact";
import { contactsSort } from "../utils/sort";
import { Guid } from "guid-ts";
import { todayISO } from "../utils/today";
import "dotenv/config";
import { baseUrl, apiKey } from "./api";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, api) => {
      headers.set("X-API-Key", apiKey);
      return headers;
    },
  }),
  // global configuration for the api
  keepUnusedDataFor: 3000000,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Contacts"],
  endpoints: (builder) => ({
    getContacts: builder.query<Contact[], string>({
      query: () => ({
        url: "query",
        method: "POST",
      }),
      providesTags: [{ type: "Contacts", id: "LIST" }],
      transformResponse: (response: any, meta, arg) => {
        const contacts = response.items;
        contacts?.sort(contactsSort);
        return filterQuery(arg, contacts);
      },
    }),
    createNewContact: builder.mutation<Contact, string>({
      query: (arg) => ({
        url: "items",
        method: "POST",
        body: { item: newContact(arg) },
      }),
      invalidatesTags: (result) =>
        result
          ? [
              { type: "Contacts", id: "LIST" },
              { type: "Contacts", id: result.name },
            ]
          : [],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        dispatch(
          api.util.updateQueryData("getContacts", "", (draft) => {
            Object.assign(draft, newContact(arg));
          })
        );
        dispatch(
          api.util.updateQueryData("getContacts", arg, (draft) => {
            Object.assign(draft, newContact(arg));
          })
        );
      },
    }),
  }),
});

function newContact(name: string) {
  return {
    key: Guid.newGuid().toString(),
    name: name,
    last: todayISO(),
    __local: "true",
  };
}

function filterQuery(queryTerm: string | null, contacts: Contact[]) {
  if (queryTerm) {
    const trimmedTerm = queryTerm.trim();
    return contacts.filter(filterForTerm(trimmedTerm));
  }
  return contacts;
}
export const { reducer } = api;
export const { endpoints } = api;
export const { useGetContactsQuery } = api;
