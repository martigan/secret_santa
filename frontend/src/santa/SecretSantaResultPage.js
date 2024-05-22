import React, { useState, useEffect } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import settings from "../settings";
import { useUser } from "../context/UserContext";

const SecretSantaResultPage = () => {
  const { id } = useParams();
  const { isAuthenticated, token } = useUser();
  const [runResults, setRunResults] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !token || !id) return;

    const fetchRunResults = async () => {
      try {
        const response = await fetch(
          `${settings.baseUrl}/secret_santa/${id}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        setRunResults(data);
      } catch (error) {
        console.error("Error fetching run results:", error);
        setRunResults(null);
      }
    };

    fetchRunResults();
  }, [isAuthenticated, token, id]);

  return (
    <Container>
      <h2>Secret Santa Run Results</h2>
      {runResults ? (
        <>
          <ListGroup>
            {runResults.pairs.map((pair, index) => (
              <ListGroup.Item key={index}>
                {pair.santa.first_name} {pair.santa.last_name} (
                {pair.santa.email}) → {pair.recipient.first_name}{" "}
                {pair.recipient.last_name} ({pair.recipient.email})
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button
            variant="secondary"
            onClick={() => navigate("/results")}
            className="mt-3"
          >
            Back to Runs
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate("/")}
            className="mt-3 ml-2"
          >
            Generate New Secret Santa
          </Button>
        </>
      ) : (
        <div>Loading results...</div>
      )}
    </Container>
  );
};

export default SecretSantaResultPage;
