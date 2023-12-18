import logo from "./logo.svg";
import "./App.css";
import ClientForm from "./components/ClientForm";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "./config";
 
function App() {
  const [clientsData, setClientsData] = useState([]);
  
  const [editableData, setEditableData] = useState({ email: "" });
  const [newData, setNewData] = useState({});

  const formHandler = (event) => {
    setNewData({
      ...newData,
      [event.target.name]: event.target.value,
    });
    console.log(newData);
  };

  const getClients = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/clients`);

      setClientsData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeClient = async (emailid) => {
    try {       
      await axios.delete(`${BASE_URL}/clients/${emailid}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const updateClient = async (emailid, data) => {
    try {
      const client = clientsData.filter(({ email }) => email === emailid);
      const clientEmailId = client[0].email;

      await axios.put(`${BASE_URL}/clients/${clientEmailId}`, data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = (data) => {
    setEditableData(data);
    setNewData(data);
    console.log(data);
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <>
      <header className="header">
        <h2>Clients Panel</h2>
      </header>

      <div className="container">
        <div className="userlist">
          <table>
            <thead>
              <tr>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Project</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {clientsData.length === 0 ? (
                <></>
              ) : (
                clientsData.map((data) => {
                  const { firstname, lastname, email, mobno, project } = data;
                  return (
                    <tr className="row" key={email}>
                      <td>
                        {editableData.email === email ? (
                          <input
                            type="text"
                            name="firstname"
                            value={newData.firstname}
                            onChange={formHandler}
                            placeholder="Firstname"
                          />
                        ) : (
                          firstname
                        )}
                      </td>
                      <td>
                        {editableData.email === email ? (
                          <input
                            type="text"
                            name="lastname"
                            value={newData.lastname}
                            onChange={formHandler}
                            placeholder="Lastname"
                          />
                        ) : (
                          lastname
                        )}
                      </td>
                      <td>
                        {editableData.email === email ? (
                          <input
                            type="text"
                            name="email"
                            value={newData.email}
                            onChange={formHandler}
                            placeholder="Email"
                          />
                        ) : (
                          email
                        )}
                      </td>
                      <td>
                        {editableData.email === email ? (
                          <input
                            type="text"
                            name="mobno"
                            value={newData.mobno}
                            onChange={formHandler}
                            placeholder="Mobile Number"
                          />
                        ) : (
                          mobno
                        )}
                      </td>

                      <td>
                        {editableData.email === email ? (
                          <input
                            type="text"
                            name="project"
                            value={newData.project}
                            onChange={formHandler}
                            placeholder="Project Name"
                          />
                        ) : (
                          project
                        )}
                      </td>

                      <td className="action">
                        {editableData.email === email ? (
                          <>
                            <button
                              onClick={() => {
                                setEditableData({});
                              }}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => {
                                updateClient(email, newData);
                              }}
                            >
                              Update
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                editHandler(data);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                removeClient(email);
                              }}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <ClientForm />
      </div>
    </>
  );
}

export default App;
