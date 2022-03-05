import { useAppDispatch, useAppSelector } from "./hooks";
import { debounce } from "./utils/debounce";
import { useHotkeyFocus } from "./utils/hotkeyFocus";
import { actions } from "./stores/contacts";

export function Header() {
  const matchCount = useAppSelector((state) => state.contacts.filtered.length);
  const dispatch = useAppDispatch();
  const addContact = () => dispatch(actions.createNewContact());
  const applyFilter = (term: string) => {
    dispatch(actions.setQuery(term));
  };
  const debouncedFilter = debounce(applyFilter, 200);
  const hotkeyFocus = useHotkeyFocus("/?");

  return (
    <header>
      <div className="title">people</div>
      <div className="searchBar card">
        <input
          ref={hotkeyFocus}
          type="search"
          defaultValue={""}
          className="searchInput paper block"
          onChange={(e) => debouncedFilter(e.currentTarget.value)}
          placeholder="search people..."
          autoFocus
        />
        <div className="matchCount">{matchCount}</div>
      </div>
      <button className="addButton card frost block" onClick={addContact}>
        add
      </button>
    </header>
  );
}
