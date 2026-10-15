
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:8080/api/employees";
const PAGE_SIZE = 5;

const api = axios.create({
  baseURL: API,
  auth: {
    username: "admin",
    password: "ChooseYourOwnStrongPassword123!",
  },
});

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  department: "",
  designation: "",
  salary: "",
  joiningDate: "",
  status: "ACTIVE",
};

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadEmployees() {
    setLoading(true);

    try {
      const response = await api.get("");
      setEmployees(response.data);
      setError("");
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Authentication failed. Check the API credentials.");
      } else {
        setError(
          err.response?.data?.message ||
            "Could not load employees. Check the backend and database."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  function openAddForm() {
    setForm({ ...EMPTY_FORM });
    setEditingId(null);
    setSelectedEmployee(null);
    setError("");
    setSuccess("");
    setShowForm(true);
  }

  function handleEdit(employee) {
    setForm({
      firstName: employee.firstName ?? "",
      lastName: employee.lastName ?? "",
      email: employee.email ?? "",
      phoneNumber: employee.phoneNumber ?? "",
      department: employee.department ?? "",
      designation: employee.designation ?? "",
      salary: String(employee.salary ?? ""),
      joiningDate: employee.joiningDate ?? "",
      status: employee.status ?? "ACTIVE",
    });

    setEditingId(employee.id);
    setSelectedEmployee(null);
    setError("");
    setSuccess("");
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const payload = {
        ...form,
        salary: Number(form.salary),
      };

      if (editingId !== null) {
        // Use the configured Axios instance so authentication is included.
        await api.put(`/${editingId}`, payload);
        setSuccess("Employee updated successfully.");
      } else {
        await api.post("", payload);
        setSuccess("Employee created successfully.");
      }

      setForm({ ...EMPTY_FORM });
      setEditingId(null);
      setShowForm(false);
      setSelectedEmployee(null);
      setCurrentPage(0);

      await loadEmployees();
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Authentication failed. Check the API credentials.");
      } else {
        setError(
          err.response?.data?.message ||
            "Could not save employee. Check the form and try again."
        );
      }
    }
  }

  async function deleteEmployee(id) {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      // Use the configured Axios instance so authentication is included.
      await api.delete(`/${id}`);
      setSuccess("Employee deleted successfully.");
      setSelectedEmployee(null);
      await loadEmployees();
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Authentication failed. Check the API credentials.");
      } else {
        setError(
          err.response?.data?.message ||
            "Could not delete the employee."
        );
      }
    }
  }

  function updateField(event) {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  const filteredEmployees = employees.filter((employee) => {
    const term = search.trim().toLowerCase();

    const fullName =
      `${employee.firstName ?? ""} ${employee.lastName ?? ""}`.toLowerCase();

    return (
      (fullName.includes(term) ||
        (employee.email ?? "").toLowerCase().includes(term)) &&
      (!department ||
        employee.department?.toLowerCase() === department.toLowerCase()) &&
      (!status ||
        employee.status?.toLowerCase() === status.toLowerCase())
    );
  });

  const departments = [
    ...new Set(
      employees.map((employee) => employee.department).filter(Boolean)
    ),
  ];

  const totalPages = Math.ceil(filteredEmployees.length / PAGE_SIZE);
  const safePage = Math.min(currentPage, Math.max(totalPages - 1, 0));

  const paginatedEmployees = filteredEmployees.slice(
    safePage * PAGE_SIZE,
    (safePage + 1) * PAGE_SIZE
  );

  return (
    <main className="container">
      <header className="page-header">
        <div>
          <p className="eyebrow">EMPLOYEE DIRECTORY</p>
          <h1>Employee Management</h1>
          <p className="subtitle">
            Manage employee records, roles, and departments.
          </p>
        </div>

        <div className="header-actions">
          <button className="primary-button" onClick={openAddForm}>
            + Add Employee
          </button>
          <button className="secondary-button" onClick={loadEmployees}>
            Refresh
          </button>
        </div>
      </header>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      {selectedEmployee && (
        <section className="panel details-panel">
          <div className="details-heading">
            <div>
              <p className="eyebrow">EMPLOYEE PROFILE</p>
              <h2>
                {selectedEmployee.firstName} {selectedEmployee.lastName}
              </h2>
            </div>

            <button
              className="secondary-button"
              onClick={() => setSelectedEmployee(null)}
            >
              Close Details
            </button>
          </div>

          <div className="details-grid">
            <div>
              <span>Employee ID</span>
              <strong>#{selectedEmployee.id}</strong>
            </div>
            <div>
              <span>Email Address</span>
              <strong>{selectedEmployee.email}</strong>
            </div>
            <div>
              <span>Phone Number</span>
              <strong>{selectedEmployee.phoneNumber}</strong>
            </div>
            <div>
              <span>Department</span>
              <strong>{selectedEmployee.department}</strong>
            </div>
            <div>
              <span>Designation</span>
              <strong>{selectedEmployee.designation}</strong>
            </div>
            <div>
              <span>Salary</span>
              <strong>
                {Number(selectedEmployee.salary).toLocaleString("en-IN")}
              </strong>
            </div>
            <div>
              <span>Date of Joining</span>
              <strong>{selectedEmployee.joiningDate}</strong>
            </div>
            <div>
              <span>Employment Status</span>
              <strong>{selectedEmployee.status}</strong>
            </div>
          </div>

          <button
            className="primary-button"
            onClick={() => handleEdit(selectedEmployee)}
          >
            Edit Employee
          </button>
        </section>
      )}

      {showForm && (
        <section className="panel employee-form-panel">
          <h2>
            {editingId !== null ? "Edit Employee" : "Add New Employee"}
          </h2>

          <form onSubmit={handleSubmit} className="employee-form">
            <input
              name="firstName"
              placeholder="First name"
              value={form.firstName}
              onChange={updateField}
              maxLength={50}
              required
            />

            <input
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={updateField}
              maxLength={50}
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={updateField}
              maxLength={150}
              required
            />

            <input
              name="phoneNumber"
              type="tel"
              placeholder="Phone number"
              value={form.phoneNumber}
              onChange={updateField}
              pattern="[+0-9() -]{7,20}"
              required
            />

            <input
              name="department"
              placeholder="Department"
              value={form.department}
              onChange={updateField}
              maxLength={100}
              required
            />

            <input
              name="designation"
              placeholder="Designation"
              value={form.designation}
              onChange={updateField}
              maxLength={100}
              required
            />

            <input
              name="salary"
              type="number"
              min="0"
              step="0.01"
              placeholder="Salary"
              value={form.salary}
              onChange={updateField}
              required
            />

            <label>
              Date of joining
              <input
                name="joiningDate"
                type="date"
                value={form.joiningDate}
                onChange={updateField}
                required
              />
            </label>

            <select
              name="status"
              value={form.status}
              onChange={updateField}
              required
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>

            <div className="header-actions">
              <button className="primary-button" type="submit">
                {editingId !== null ? "Update Employee" : "Save Employee"}
              </button>

              <button
                className="secondary-button"
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setForm({ ...EMPTY_FORM });
                  setError("");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="stats-card">
        <span>Total employees</span>
        <strong>{employees.length}</strong>
      </section>

      <section className="panel">
        <div className="toolbar">
          <input
            type="search"
            placeholder="Search by name or email..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setCurrentPage(0);
            }}
          />

          <select
            value={department}
            onChange={(event) => {
              setDepartment(event.target.value);
              setCurrentPage(0);
            }}
          >
            <option value="">All departments</option>
            {departments.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setCurrentPage(0);
            }}
          >
            <option value="">All statuses</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>

        {loading ? (
          <p className="message">Loading employees...</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Employee</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Salary</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>#{employee.id}</td>
                    <td>
                      <strong>
                        {employee.firstName} {employee.lastName}
                      </strong>
                    </td>
                    <td>{employee.email}</td>
                    <td>{employee.phoneNumber}</td>
                    <td>{employee.department}</td>
                    <td>{employee.designation}</td>
                    <td>
                      {Number(employee.salary).toLocaleString("en-IN")}
                    </td>
                    <td>
                      <span
                        className={`status ${(employee.status ?? "").toLowerCase()}`}
                      >
                        {employee.status}
                      </span>
                    </td>
                    <td>
                      <div className="header-actions">
                        <button
                          className="secondary-button"
                          onClick={() => {
                            setSelectedEmployee(employee);
                            setShowForm(false);
                            setEditingId(null);
                          }}
                        >
                          Details
                        </button>

                        <button
                          className="secondary-button"
                          onClick={() => handleEdit(employee)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-button"
                          onClick={() => deleteEmployee(employee.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {paginatedEmployees.length === 0 && (
                  <tr>
                    <td colSpan="9" className="message">
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <footer className="table-footer pagination">
          <span>
            Showing{" "}
            {filteredEmployees.length === 0 ? 0 : safePage * PAGE_SIZE + 1}
            {" – "}
            {Math.min(
              (safePage + 1) * PAGE_SIZE,
              filteredEmployees.length
            )}
            {" of "}
            {filteredEmployees.length} employee(s)
          </span>

          <div className="header-actions">
            <button
              className="secondary-button"
              disabled={safePage === 0}
              onClick={() =>
                setCurrentPage((page) => Math.max(0, page - 1))
              }
            >
              Previous
            </button>

            <span>
              Page {totalPages === 0 ? 0 : safePage + 1} of {totalPages}
            </span>

            <button
              className="secondary-button"
              disabled={totalPages === 0 || safePage >= totalPages - 1}
              onClick={() => setCurrentPage((page) => page + 1)}
            >
              Next
            </button>
          </div>
        </footer>
      </section>
    </main>
  );
}

export default App;
