import { useEffect, useState } from "react";
import { FaUserEdit, FaTrash, FaPlus, FaSyncAlt, FaEraser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; 

function App() {
  const defaultData = [
    { id: 1, firstName: "yash", lastName: "patel", salary: 1000000, age: 20 },
    { id: 2, firstName: "joe", lastName: "root", salary: 20000, age: 20 },
    { id: 3, firstName: "harry", lastName: "brook", salary: 400000, age: 25 },
  ];

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("employeeData");
    try {
      const parsed = saved ? JSON.parse(saved) : null;
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {}
    return defaultData;
  });

  const [update, setUpdate] = useState(false);
  const [id, setId] = useState(null);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [salary, setSalary] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    localStorage.setItem("employeeData", JSON.stringify(data));
  }, [data]);

  const handleClear = () => {
    setFname("");
    setLname("");
    setSalary("");
    setAge("");
    setUpdate(false);
    setId(null);
  };

  const validateInputs = () => {
    if (!fname || !lname || !salary || !age) {
      alert("All fields are required!");
      return false;
    }
    if (isNaN(salary) || isNaN(age)) {
      alert("Salary and Age must be numeric values!");
      return false;
    }
    return true;
  };

  const handleAdd = () => {
    if (!validateInputs()) return;

    const newId = data.length > 0 ? Math.max(...data.map((i) => i.id)) + 1 : 1;

    const newObj = {
      id: newId,
      firstName: fname,
      lastName: lname,
      salary: Number(salary),
      age: Number(age),
    };

    setData([...data, newObj]);
    handleClear();
  };

  const handleEdit = (id) => {
    const selected = data.find((item) => item.id === id);
    if (!selected) return;

    setUpdate(true);
    setId(id);
    setFname(selected.firstName);
    setLname(selected.lastName);
    setSalary(selected.salary);
    setAge(selected.age);
  };

  const handleUpdate = () => {
    if (!validateInputs()) return;

    const updatedData = data.map((item) =>
      item.id === id
        ? { ...item, firstName: fname, lastName: lname, salary: Number(salary), age: Number(age) }
        : item
    );

    setData(updatedData);
    handleClear();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this data?")) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="app-bg d-flex flex-column align-items-center p-4">
      <div className="glass-card p-4 shadow-lg w-100" style={{ maxWidth: "1100px" }}>
        <h3 className="text-center mb-4 text-black fw-bold">Employee Manager</h3>

        {/* Form */}
        <div className="row g-3 align-items-end">
          <div className="col-md">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </div>
          <div className="col-md">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </div>
          <div className="col-md">
            <input
              type="number"
              className="form-control"
              placeholder="Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>
          <div className="col-md">
            <input
              type="number"
              className="form-control"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="col-auto">
            {update ? (
              <button className="btn btn-warning hover-effect" onClick={handleUpdate}>
                <FaSyncAlt /> Update
              </button>
            ) : (
              <button className="btn btn-success hover-effect" onClick={handleAdd}>
                <FaPlus /> Add
              </button>
            )}
          </div>
          <div className="col-auto">
            <button className="btn btn-secondary hover-effect" onClick={handleClear}>
              <FaEraser /> Clear
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 w-100" style={{ maxWidth: "1100px" }}>
        <table className="table table-striped table-bordered shadow-sm text-center bg-white glass-table">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Salary</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-muted">
                  No Employee Data
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.salary}</td>
                  <td>{item.age}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary btn-sm me-2 hover-icon"
                      onClick={() => handleEdit(item.id)}
                    >
                      <FaUserEdit />
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm hover-icon"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
