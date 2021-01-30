import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  let [input, setInput] = useState("");
  let [students, setStudents] = useState([]);
  // let [firstname, setFirstname] = useState("");
  // let [lastname, setLastname] = useState("");

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = () => {
    fetch("/students")
      .then(response => response.json())
      .then(students => {
        setStudents(students);
      })
      .catch(error => {
        console.log("ERROR", error.message);
      });
  };

  function handleChange(event) {
    setInput(event.target.value);
    console.log(event.target.value);
    // let {firstname, value} = event.target.value
    //   switch (firstname) {
    //     case 'firstname' :
    //       setInput(value);
    //       break;
    //     case 'lastname' :
    //       setInput(value);
    //       break;
    //     default:
    //       break;
    //   }
  }

  const handleSubmit = e => {
    e.preventDefault();
    addStudent(input);
    console.log(input);
    setInput("");
  };

  //function add student
  function addStudent(input) {
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, lastname: "CodeOp" })
    };
    fetch("/students", options)
      .then(response => response.json())
      .then(students => {
        setStudents(students);
      })
      .catch(err => {
        console.log("ERROR:", err.message);
      });
  }
  //function delete student
  function deleteStudent(id) {
    let options = {
      method: "DELETE"
    };
    fetch(`/students/${id}`, options)
      .then(response => response.json())
      .then(students => {
        setStudents(students);
      })
      .catch(err => {
        console.log("ERROR:", err.message);
      });
  }

  return (
    <div className="App">
      <h1>CodeOp's Facebook</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <label>
          <h3>Add a new student: </h3>
          <br />
        </label>
        <label>
          First Name:
          <input type="text" name="firstname" onChange={e => handleChange(e)} />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            name="lastname"
            onChange={e => handleChange(e)}
            placeholder="CodeOp"
          />
        </label>

        <button type="submit">Submit</button>

        <h3>CURRENT STUDENTS</h3>
      </form>
      <ul>
        {students &&
          students.map(s => (
            <li id="li" key={s.firstname}>
              {s.firstname} {s.lastname}
              <button onClick={e => deleteStudent(s.id)} type="button">
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
