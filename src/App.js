import React from "react";
import "./index.scss";
import { Success } from "./components/Success";
import { Users } from "./components/Users";
import axios from "axios";

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");
  const [invites, setInvites] = React.useState([]);
  const [success, setSuccess] = React.useState(false);
  React.useEffect(() => {
    axios
      .get("https://reqres.in/api/users")
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {
        alert("Ошибка при получении данных с сервера");
        console.warn(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  const onChangeSearchValue = function (event) {
    setSearchValue(event.target.value);
  };
  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };
  const onClickSuccess = () => {
    setSuccess(true);
  };
  return (
    <div className="App">
      {!success ? (
        <Users
          items={users}
          isLoading={isLoading}
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
          invites={invites}
          setInvites={setInvites}
          onClickInvite={onClickInvite}
          onClickSuccess={onClickSuccess}
        />
      ) : (
        <Success count={invites.length} />
      )}
    </div>
  );
}

export default App;
