import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header";
import SignIn from "./login/SignIn";
import SignUp from "./login/SignUp";
import { useUser } from "./context/UserContext";
import SecretSantaResultsPage from "./santa/SecretSantaResultsPage";
import SecretSantaResultPage from "./santa/SecretSantaResultPage";
import { HomePage } from "./pages/HomePage";

const App = () => {
  const {
    user,
    isAuthenticated,
    handleSignIn,
    handleSignOut,
    setSecretSantaResult,
  } = useUser();
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const navigate = useNavigate();

  const handleSecretSantaResult = (result) => {
    setSecretSantaResult(result);
    navigate(`/results/${result.id}`);
  };

  const handleSignInWrapper = (data) => {
    handleSignIn(data);
    setShowSignInForm(false);
  };

  const clearSecretSantaResult = () => {
    setSecretSantaResult(null);
    navigate("/");
  };

  return (
    <Container>
      <Header
        isAuthenticated={isAuthenticated}
        user={user}
        onSignIn={() => setShowSignInForm(true)}
        onSignOut={handleSignOut}
        onSignUp={() => setShowSignUpForm(true)}
      />
      {showSignInForm && <SignIn onSignIn={handleSignInWrapper} />}
      {showSignUpForm && (
        <SignUp
          showModal={showSignUpForm}
          handleClose={() => setShowSignUpForm(false)}
        />
      )}
      <Routes>
        <Route path="/results" element={<SecretSantaResultsPage />} />
        <Route path="/results/:id" element={<SecretSantaResultPage />} />
        <Route
          path="/"
          element={
            <HomePage
              isAuthenticated={isAuthenticated}
              onSecretSantaResult={handleSecretSantaResult}
              clearSecretSantaResult={clearSecretSantaResult}
            />
          }
        />
      </Routes>
    </Container>
  );
};

export default App;
