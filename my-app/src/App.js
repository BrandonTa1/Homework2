import { useState, useEffect } from "react";
import DeleteStudent from './components/DeleteStudent';
import EditStudent from "./components/EditStudent";
import AddStudent from "./components/AddStudent";


function App() {

  const [students, setStudents] = useState([{"name":"brandon", "id":"5", "points":"10"}])

  useEffect(() => {
    fetch("/students").then(
      res=>res.json()
    ).then(
      data=> {
        setStudents(data)
        console.log(students)
      }
    )
  }, [])

  return (
    
    <div className="App">
      <AddStudent />
      <EditStudent/>
      <DeleteStudent />
      <h1>Students</h1>
      <table>
        <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Points</th>
        </tr>
        {students.map((val, key) => {
            return (
              <tr key={key}>
                  <td>{val.name}</td>
                  <td>{val.id}</td>
                  <td>{val.points}</td>
              </tr>
            )
        })}
      </table>

    </div>
  );
}

export default App;
