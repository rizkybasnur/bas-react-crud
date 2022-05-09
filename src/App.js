import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [emailVal, setEmailVal] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [lists, setLists] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [edit, setEdit] = useState("");
  // const [isAllowSubmit, setIsAllowSubmit] = useState(false);

  useEffect(() => {
    console.log(lists, "useef");
  }, [lists]);

  // const emailValidation = () => {
  //   let x = email;
  //   let text;
  //   if (!x) {
  //     text = "Email harus diisi";
  //     setIsAllowSubmit(false);
  //   } else {
  //     setIsAllowSubmit(true);
  //   }
  //   setEmailVal(text);
  // };

  const submitForm = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || phone === "" || gender === "") {
      window.alert("Please fill all the form");
    } else {
      // if (!isAllowSubmit) {
      //           emailValidation();
      // } else {
      if (isEdit) {
        const newArr = lists.map((obj) => {
          if (obj.id === edit) {
            return {
              ...obj,
              name: name,
              email: email,
              phone: phone,
              gender: gender,
            };
          }
          return obj;
        });
        setLists(newArr);
      } else {
        setLists([
          ...lists,
          {
            id: Math.floor(Math.random() * 1000),
            name: name,
            email: email,
            phone: phone,
            gender: gender,
          },
        ]);
      }
      resetForm();
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setGender("");
    setIsEdit(false);
  };

  const onDelete = (id) => {
    setLists(lists.filter((e) => id !== e.id));
    if (lists.some((e) => e.id === 1) === false) {
      setIsEdit(false);
    }
  };

  const onEdit = (id) => {
    setIsEdit(true);
    setEdit(id);

    lists.map((e) => {
      if (e.id === id) {
        setName(e.name);
        setEmail(e.email);
        setPhone(e.phone);
        setGender(e.gender);
      }
      return e;
    });
  };

  return (
    <div className="App">
      <div className="container">
        <div>REACT CRUD</div>
        <form onSubmit={submitForm} onReset={resetForm}>
          <input
            value={name}
            type="text"
            placeholder="Insert Name"
            className=" pa-8"
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            value={email}
            type="email"
            placeholder="Insert Email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            className="mt-8 pa-8"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {/* <span>{emailVal ?? ""}</span> */}
          <input
            value={phone}
            type="tel"
            placeholder="Insert Phone Number"
            pattern="^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$"
            className="mt-8 pa-8"
            required
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <select
            value={gender}
            name=""
            id=""
            className="mt-8 pa-8"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <div className="mt-8">
            <button type="submit">{isEdit ? "Save" : "Submit"}</button>
            <button type="reset">Reset</button>
          </div>
        </form>

        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {lists.map((list, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{list.name}</td>
                  <td>{list.email}</td>
                  <td>{list.phone}</td>
                  <td>{list.gender}</td>
                  <td>
                    <button
                      onClick={() => {
                        onEdit(list.id);
                      }}
                    >
                      edit
                    </button>
                    <button
                      onClick={() => {
                        onDelete(list.id);
                      }}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
