import { useState } from "react";
import { useDispatch } from "react-redux";
import "./Searchbar.css";
import { searchDriver } from "../../Redux/Actions/Actions";

const Searchbar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (e) => {
    const searchValue = e.target.value;
    setName(searchValue);
    dispatch(searchDriver(searchValue));
  };

  return (
    <div className="search-container">
      <form action="">
        <input
          className="search-container"
          onChange={handleChange}
          placeholder="Search Driver..."
          type="search"
          value={name}
        />
      </form>
    </div>
  );
};

export default Searchbar;