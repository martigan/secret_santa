import React, { useState, useEffect } from "react";
import { Container, ListGroup, Button, Form, Modal } from "react-bootstrap";
import settings from "../settings";
import { useUser } from "../context/UserContext";

const UserSelection = ({ onSecretSantaResult, clearSecretSantaResult }) => {
  const { isAuthenticated, token } = useUser();
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const fetchUsers = async () => {
      try {
        const response = await fetch(`${settings.baseUrl}/users/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, [isAuthenticated, token]);

  const handleUserSelect = (userId) => {
    setSelectedUserIds((prevSelectedUserIds) => {
      if (prevSelectedUserIds.includes(userId)) {
        return prevSelectedUserIds.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUserIds, userId];
      }
    });
  };

  const handleSecretSanta = async () => {
    if (!token) return;
    try {
      const response = await fetch(`${settings.baseUrl}/secret_santa/assign/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_ids: selectedUserIds }),
      });
      const data = await response.json();
      onSecretSantaResult(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddUser = async () => {
    if (!token) return;
    try {
      const response = await fetch(`${settings.baseUrl}/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: newUser.username,
          email: newUser.email,
          first_name: newUser.firstName,
          last_name: newUser.lastName,
        }),
      });
      if (response.ok) {
        const newUserResponse = await response.json();
        setUsers((prevUsers) => [...prevUsers, newUserResponse]);
        setShowModal(false);
        setNewUser({ username: "", email: "", firstName: "", lastName: "" });
      } else {
        alert("Failed to add user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClearSelection = () => {
    setSelectedUserIds([]);
    clearSecretSantaResult();
  };

  return (
    <Container>
      <h2>Select Users for Secret Santa</h2>
      <ListGroup>
        {users.map((user) => (
          <ListGroup.Item
            key={user.id}
            active={selectedUserIds.includes(user.id)}
            onClick={() => handleUserSelect(user.id)}
            style={{
              cursor: "pointer",
              backgroundColor: selectedUserIds.includes(user.id)
                ? "#007bff"
                : "white",
              color: selectedUserIds.includes(user.id) ? "white" : "black",
            }}
          >
            {user.username || `${user.first_name} ${user.last_name}`} (
            {user.email})
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button variant="primary" onClick={handleSecretSanta} className="mt-3">
        Generate Secret Santa
      </Button>
      <Button
        variant="secondary"
        onClick={() => setShowModal(true)}
        className="mt-3 ml-2"
      >
        Add User
      </Button>
      <Button
        variant="warning"
        onClick={handleClearSelection}
        className="mt-3 ml-2"
      >
        Clear Selection
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={newUser.firstName}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={newUser.lastName}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastName: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserSelection;
