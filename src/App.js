import axios from "axios";
import React from "react";
import Collection from "./components/Collection";
import "./index.scss";

function App() {
  const [collections, setCollections] = React.useState([]);
  const [activeCategory, setActiveCategory] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  React.useEffect(() => {
    axios.get("/data.json").then((res) => {
      setCollections(res.data.collections);
    });
  }, []);
  React.useEffect(() => {
    axios.get("/data.json").then((res) => {
      setCategories(res.data.categories);
    });
  }, []);
  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };
  const onChangeActiveCategory = (idx) => {
    setActiveCategory(idx);
  };
  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((item, index) => (
            <li
              onClick={() => onChangeActiveCategory(index)}
              className={activeCategory === index ? "active" : ""}
              key={item.name}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          className="search-input"
          placeholder="Поиск по названию"
          onChange={onChangeSearchValue}
        />
      </div>
      <div className="content">
        {collections
          .filter(
            (item) => activeCategory === 0 || activeCategory === item.category
          )
          .filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((item, index) => (
            <Collection key={index} name={item.name} images={item.photos} />
          ))}
      </div>
      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

export default App;
