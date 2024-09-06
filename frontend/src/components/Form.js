/*Imports: Import React and hooks (useState, useEffect) from the React library, and axios for making HTTP requests.
API_URL: Define the base URL for the API.*/
import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:7001/api";

/*Define a functional component called Form*/
export default function Form() {
  /*formValue: State to store form input values.
validationErrors: State to store validation error messages.
submittedData: State to store data fetched from the API.*/
  const [formValue, setFormValue] = useState({
    username: "",
    email: "",
    phone: "",
    password: ""
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [submittedData, setSubmittedData] = useState([]);

  /*useEffect: Fetch user data from the API when the component mounts.*/
  useEffect(() => {
    fetchUsers();
  }, []);

  /*fetchUsers: Function to fetch user data from the API and update the submittedData state.*/
  const fetchUsers = () => {
    axios.get(`${API_URL}/get`)
      .then((res) => {
        console.log("Response from API:", res.data);
        if (Array.isArray(res.data)) {
          setSubmittedData(res.data);
        } else {
          console.error("Unexpected response format:", res.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };
/*handleInput: Update the formValue state when the input values change.*/
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
/*handleValidation: Validate the form inputs and update validationErrors state if there are errors.*/
  const handleValidation = () => {
    let errors = {};
    let isValid = true;

    // Simple validation example (you can extend this)
    if (!formValue.username) {
      errors.username = "Username is required";
      isValid = false;
    }
    if (!formValue.email) {
      errors.email = "Email is required";
      isValid = false;
    }
    if (!formValue.phone) {
      errors.phone = "Phone is required";
      isValid = false;
    }
    if (!formValue.password) {
      errors.password = "Password is required";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };
/*Prevent Default Behavior: event.preventDefault() stops the form from submitting the traditional way.
Validate Form: if (handleValidation()) checks if the form is valid.
Submit Data: axios.post(${API_URL}, formValue) sends a POST request to the API with the form data.*/
  const handleSubmit = (event) => {
    event.preventDefault();
    if (handleValidation()) {
      axios.post(`${API_URL}`, formValue)
        .then(response => {
          console.log("Form submitted successfully", response.data);
          /*adds the new data to the existing list.*/
          setSubmittedData([...submittedData, response.data]);
          setFormValue({
            username: '',
            email: '',
            phone: '',
            password: ''
          });
          setValidationErrors({});
          //fetchUsers() refreshes the user data.
          fetchUsers();
        })
        .catch(error => {
          console.error("There was an error submitting the form!", error);
        });
    }
  };
/*Send Delete Request: axios.delete(${API_URL}/delete/${id}) sends a DELETE request to the API.*/
  const handleDelete = (id) => {
    console.log("Deleting data with ID:", id);
    axios.delete(`${API_URL}/delete/${id}`)
      .then(response => {
        console.log("Data deleted successfully", response.data);
        //fetchUsers() refreshes the user data.
        fetchUsers();
        console.log("Data deleted successfully");
      })
      .catch(error => {
        console.error("There was an error deleting the data!", error);
      });
  };

  /*Enable Editing: Sets the contentEditable property of an element to "true" to make it editable.
Focus on Element: Sets the focus on the editable element.*/
  const makeEditable = (element) => {
    element.contentEditable = "true";
    element.focus();
  };

  /*Get Elements: Retrieves the table cells by their IDs.
Make Cells Editable: Calls makeEditable() to make each cell editable.*/
  const editUserInCell = (index) => {
    const nameCell = document.getElementById(`name-${index}`);
    const emailCell = document.getElementById(`email-${index}`);
    const phoneCell = document.getElementById(`phone-${index}`);
    makeEditable(nameCell);
    makeEditable(emailCell);
    makeEditable(phoneCell);
  };


/*Retrieve ID: Gets the ID of the user to update.
Get Updated Data: Retrieves and trims the new content from the editable cells.
Send Update Request: Sends a PUT request to update the user data.
Handle Success: Logs the success message and refreshes the user data.
Handle Error: Logs the error if the request fails.
*/
  const saveChanges = async (index) => {
    try {
      const id = submittedData[index]._id;
      const updatedData = {
        username: document.getElementById(`name-${index}`).textContent.trim(),
        email: document.getElementById(`email-${index}`).textContent.trim(),
        phone: document.getElementById(`phone-${index}`).textContent.trim(),
      };
      await axios.put(`${API_URL}/update/${id}`, updatedData);
      console.log("User edited successfully", updatedData);
      fetchUsers();
      console.log("Data edited successfully");
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
    <>
      <div className="first">
        <button
          type="button"
          className="btn btn-primary   add "
          
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add
        </button>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title" id="exampleModalLabel">
                  User Form
                </h3>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="containers">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="username"
                      value={formValue.username}
                      onChange={handleInput}
                    />
                    {validationErrors.username && (
                      <small className="text-danger">{validationErrors.username}</small>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formValue.email}
                      onChange={handleInput}
                    />
                    {validationErrors.email && (
                      <small className="text-danger">{validationErrors.email}</small>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formValue.phone}
                      onChange={handleInput}
                    />
                    {validationErrors.phone && (
                      <small className="text-danger">{validationErrors.phone}</small>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password:
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formValue.password}
                      onChange={handleInput}
                    />
                    {validationErrors.password && (
                      <small className="text-danger">{validationErrors.password}</small>
                    )}
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        </div>
      

      <table className="table" id="myTable">
        <thead className="table-dark">
          <tr className="th">
            <th scope="col">S.NO</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody id="table-body" className="tbody">
        {/* {Array.isArray(submittedData) && ...}: This is a conditional rendering in JSX. It first
         checks if submittedData is an array using Array.isArray(). If true, it proceeds to render 
         the content inside the curly braces.
        submittedData.map((data, index) => ( ... )): If submittedData is an array, the map method is
         called on it. This method iterates over each element (data) in the submittedData array, 
         along with its index (index). */}
          {Array.isArray(submittedData) &&
            submittedData.map((data, index) => (
              // This tag defines a row in a table.
              <tr key={data._id}>
                <td>{index + 1}</td>
                {/* Each of these lines creates a table cell (<td>) and sets an ID for each cell using template literals
                 (e.g., id={name-${index}}). This ID is constructed dynamically based on the index of the row.
                  {data.username}, {data.email}, {data.phone}: These display the username, email, 
                  and phone properties of the data object, respectively. */}
                <td id={`name-${index}`}>{data.username}</td>
                <td id={`email-${index}`}>{data.email}</td>
                <td id={`phone-${index}`}>{data.phone}</td>
                <td>
                 {/*<button className="btn btn-danger">: A button with Bootstrap classes for styling
                  (btn and btn-danger).onClick={() => handleDelete(data._id)}: When this button is
                   clicked, the handleDelete function is called with the unique ID (data._id) of 
                   the current row's data.<i className="fas fa-trash" />: An icon element for a 
                   trash can, indicating a delete action, using Font Awesome classes 
                   (fas and fa-trash).*/}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(data._id)}
                  >
                    <i className="fas fa-trash" />
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => editUserInCell(index)}
                  >
                    <i className="fas fa-pencil-alt" />
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => saveChanges(index)}
                  >
                    <i className="far fa-check-square" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      
    </>
  );
}
