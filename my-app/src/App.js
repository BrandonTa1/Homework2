import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

//import DeleteStudent from './components/DeleteStudent';
import EditStudent from "./components/EditStudent";
import AddStudent from "./components/AddStudent";
import axios from "axios";

function App() {

  const [students, setStudents] = useState([{}])

  useEffect(() => {
    fetch("/list").then(
      res=>res.json()
    ).then(
      data=> {
        setStudents(data)
        console.log(students)
      }
    )
  }, [])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('/sendUpdate');
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
        
  //       const result = await response.json();
  //       console.log("data being fetched")

  //       console.log(result)
  //       setStudents(result);

  //     } catch (error) {
  //       console.error('Error fetching data');
  //     }
  //   };

  //   fetchData();
  // }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get('/sendUpdate');
      const result = response.data;
      //setData(result);
      console.log('Data received:', result);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };


  const handleRefreshStudents = async (e) => {
    e.preventDefault();
    axios.get('/list')
      .then(response => {
        // Handle successful response
        setStudents(response.data)
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching data:', error);
      });
  };

  const handleDeleteStudent = async (id) => {
    //e.preventDefault();
    console.log(id)
    try {
      await axios.post("/delete", {ID:id});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Router>

    <div className="App">
      <Routes>
        <Route path='/edit' element={<EditStudent/>} />
      </Routes>
      <AddStudent handleRefreshStudents={handleRefreshStudents} />
      <EditStudent handleRefreshStudents={handleRefreshStudents} />
      {/* <DeleteStudent handleRefreshStudents={handleRefreshStudents} /> */}
      <h1>Students</h1>
      <button onClick={handleRefreshStudents}>
        Refresh
      </button>
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
                  <button onClick={()=>handleDeleteStudent(val.id)}>
                    Delete
                  </button>
              </tr>
              
            )
        })}
      </table>

    </div>
    </Router>

  );
}

export default App;
