import React, { useState, useEffect } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import settings from "../settings";
import { useUser } from "../context/UserContext";

const SecretSantaResultsPage = () => {
  const { isAuthenticated, token } = useUser();
  const [runs, setRuns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const fetchRuns = async () => {
      try {
        const response = await fetch(`${settings.baseUrl}/secret_santa/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setRuns(data);
        } else {
          setRuns([]);
        }
      } catch (error) {
        console.error("Error fetching Secret Santa runs:", error);
        setRuns([]);
      }
    };

    fetchRuns();
  }, [isAuthenticated, token]);

  const handleRunClick = (runId) => {
    navigate(`/results/${runId}`);
  };

  return (
    <Container>
      <h2>Secret Santa Runs</h2>
      <ListGroup>
        {runs.map((run) => (
          <ListGroup.Item
            key={run.id}
            onClick={() => handleRunClick(run.id)}
            style={{ cursor: "pointer" }}
          >
            Run ID: {run.id}, Created At:{" "}
            {new Date(run.created_at).toLocaleString()}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button variant="primary" onClick={() => navigate("/")} className="mt-3">
        Generate New Secret Santa
      </Button>
    </Container>
  );
};

export default SecretSantaResultsPage;
