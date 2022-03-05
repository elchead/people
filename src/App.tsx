import "./fonts/fonts.css";
import "./App.css";
import { Header } from "./Header";
import { ContactList } from "./ContactList";
import { useAppDispatch, useAppSelector } from "./hooks";
import { actions } from "./stores/contacts";
import { useEffect } from "react";
import { useGetContactsQuery } from "./stores/apiQuery";

function App() {
  const { data, isFetching } = useGetContactsQuery("");
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((store) => store.contacts.filtered);
  useEffect(() => {
    data && data.length > 0 && dispatch(actions.setContacts(data));
  }, [data, dispatch, isFetching]);

  return (
    <div>
      <Header />
      <ContactList contacts={contacts} />
      <footer>
        <a href="https://github.com/elchead/people">src</a> :: &#169; 2022
      </footer>
      {isFetching && <div className="loader" />}
    </div>
  );
}

export default App;
