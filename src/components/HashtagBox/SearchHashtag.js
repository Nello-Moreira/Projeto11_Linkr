import { useState } from "react";
import { CustomInput } from "../_shared/Inputs";
import { useHistory } from "react-router-dom";
import routes from "../../routes/routes";

export default function SearchHashtag({ setIsSearching, inputRef }) {
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const history = useHistory();

  function handleKeys(e) {
    if (e.key === "Enter" && !loading) {
      history.push(routes.trending.replace(":HASHTAG", searchValue));
      setLoading(true);
      setIsSearching(false);
      return;
    }
    if (e.key === "Escape") {
      setIsSearching(false);
      return;
    }
  }

  return (
    <CustomInput
      type="search"
      customStyle={{ loading: loading, width: "85%" }}
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      onKeyDown={(e) => handleKeys(e)}
      data-placeholder="#"
      ref={inputRef}
    />
  );
}
