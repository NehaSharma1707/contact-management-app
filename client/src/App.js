import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = process.env.REACT_APP_API_URL || "https://inglou-api.onrender.com/api/contacts";

function App() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [editId, setEditId] = useState(null);

  const fetchContacts = async () => {
    try {
      const res = await axios.get(API_URL);
      setContacts(res.data);
    } catch (error) {
      console.log("Error fetching contacts", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, formData);
        setEditId(null);
      } else {
        await axios.post(API_URL, formData);
      }

      setFormData({ name: "", email: "", phone: "" });
      fetchContacts();
    } catch (error) {
      console.log("Error saving contact", error);
    }
  };

  const handleEdit = (contact) => {
    setFormData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
    setEditId(contact._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchContacts();
    } catch (error) {
      console.log("Error deleting contact", error);
    }
  };

  return (
    <div className="container">
      <h1>Contact Management App</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Enter phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <button type="submit">
          {editId ? "Update Contact" : "Add Contact"}
        </button>
      </form>

      <div className="contact-list">
        {contacts.length === 0 ? (
          <p>No contacts found</p>
        ) : (
          contacts.map((contact) => (
            <div className="contact-card" key={contact._id}>
              <h3>{contact.name}</h3>
              <p>Email: {contact.email}</p>
              <p>Phone: {contact.phone}</p>
              <div className="btn-group">
                <button onClick={() => handleEdit(contact)}>Edit</button>
                <button onClick={() => handleDelete(contact._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;