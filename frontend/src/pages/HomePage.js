import UserSelection from "../santa/UserSelection";
import React from "react";

export const HomePage = ({
  isAuthenticated,
  onSecretSantaResult,
  clearSecretSantaResult,
}) => {
  return isAuthenticated ? (
    <UserSelection
      onSecretSantaResult={onSecretSantaResult}
      clearSecretSantaResult={clearSecretSantaResult}
    />
  ) : (
    <div>Please sign in to select users.</div>
  );
};
