import produce from "immer";
import { useRef, useState } from "react";
import { Contact } from "../models/Contact";
import { ScalarField, VectorField } from "./ContactFields";
import { todayISO } from "./utils/today";
import { SelectTag } from "./Select";
import { useAppDispatch, useAppSelector } from "./hooks";
import { actions } from "./stores/contacts";
function field(key: string, placeholder?: string, multiline = false) {
  return {
    key,
    placeholder: placeholder || key,
    multiline,
  };
}

const CONTACT_FIELDS = {
  scalar: [
    field("name"),
    // field("notes", "notes", true),
    field("place", "current location"),
    field("where", "where met"),
    field("work", "company / job"),
    field("link", "@username/url"),
    field("last", "last date"),
  ],
  advanced: [
    field("gift", "gift idea"),
    field("food", "food preference"),

    field("family", "family info", true),
  ],
  vector: [
    field("mtg", "meeting", true),
    field("likes", "interests / likings", true),
  ],
  select: [field("tag")],
};

interface ContactProps {
  contact: Contact;
}

function ContactItem({ contact }: ContactProps) {
  const dispatch = useAppDispatch();
  const tags = useAppSelector((store) => store.contacts.tags);
  const [editing, setEditing] = useState<Contact | null>(
    contact.__local ? contact : null
  );
  const ref = useRef<HTMLLIElement>(null);

  const displayContact = editing || contact;
  const [showAdvanced, setAdvanced] = useState(false);
  const toggleAdvanced = () => {
    setAdvanced(!showAdvanced);
  };
  const deleteContact = (contact: Contact) =>
    dispatch(actions.deleteContact(contact));
  const saveContact = (contact: Contact) =>
    dispatch(actions.saveContact(contact));
  const deleteMe = () => deleteContact(displayContact);
  const toggleEditing = () => setEditing((prev) => (prev ? null : contact));
  const saveChanges = () => {
    if (editing) {
      saveContact(editing);
      toggleEditing();
    }
  };
  const fillToday = () => {
    setEditing(
      produce(displayContact, (c) => {
        c.last = todayISO();
      })
    );
  };

  return (
    <li
      ref={ref}
      className={`contact-item card paper block split-v ${
        editing ? "isEditing" : "notEditing"
      }`}
      onClick={editing ? undefined : toggleEditing}
      onKeyUp={(evt) => {
        if (!ref.current || evt.target !== ref.current) return;

        if (evt.key === "Return" && !editing) {
          saveChanges();
        } else if (evt.key === "Escape" && editing) {
          toggleEditing();
        }
      }}
      tabIndex={0}
    >
      <div className="editArea split-h">
        <div className="left contact-single-items">
          {CONTACT_FIELDS.scalar.map((args) => (
            <ScalarField
              key={args.key}
              contact={displayContact}
              editing={!!editing}
              label={args.key}
              multiline={args.multiline}
              placeholder={args.placeholder}
              value={(displayContact[args.key] as string) || ""}
              save={saveChanges}
              setPending={setEditing}
            />
          ))}
          {showAdvanced &&
            CONTACT_FIELDS.advanced.map((args) => (
              <ScalarField
                key={args.key}
                contact={displayContact}
                editing={!!editing}
                label={args.key}
                multiline={args.multiline}
                placeholder={args.placeholder}
                value={(displayContact[args.key] as string) || ""}
                save={saveChanges}
                setPending={setEditing}
              />
            ))}
        </div>
        <div className="right contact-multi-items">
          {showAdvanced &&
            CONTACT_FIELDS.select.map((args) => (
              <SelectTag
                key={args.key}
                contact={displayContact}
                label={args.key}
                editing={!!editing}
                setPending={setEditing}
                save={saveChanges}
                value={displayContact[args.key] as Array<string>}
                options={tags}
              />
            ))}
          {CONTACT_FIELDS.vector.map((args) => (
            <VectorField
              key={args.key}
              contact={displayContact}
              editing={!!editing}
              label={args.key}
              multiline={args.multiline}
              placeholder={args.placeholder}
              values={
                Array.isArray(displayContact[args.key])
                  ? (displayContact[args.key] as string[])
                  : []
              }
              save={saveChanges}
              setPending={setEditing}
            />
          ))}
        </div>
      </div>
      {editing ? (
        <div className="buttonFooter split-h frost">
          <div className="left buttonArea">
            {!editing.__local && (
              <button className="contact-button" onClick={deleteMe}>
                delete
              </button>
            )}
          </div>
          <div className="left buttonArea">
            {
              <button className="contact-button" onClick={toggleAdvanced}>
                {!showAdvanced ? "more" : "less"}
              </button>
            }
          </div>
          <div className="right buttonArea">
            <button className="contact-button" onClick={fillToday}>
              today!
            </button>
            <button
              className="contact-button"
              onClick={editing.__local ? deleteMe : toggleEditing}
            >
              cancel
            </button>
            <button className="contact-button" onClick={saveChanges}>
              save
            </button>
          </div>
        </div>
      ) : null}
    </li>
  );
}

export function ContactList({ contacts }: { contacts: Contact[] }) {
  return (
    <ul className="contact-list">
      {contacts.map((c, i) => (
        <ContactItem contact={c} key={c.key || i} />
      ))}
    </ul>
  );
}
