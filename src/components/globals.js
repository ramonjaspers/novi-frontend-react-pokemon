import React, { useState } from 'react';

export const GlobalContext = React.createContext(null);

export function useGlobalState() {
  const [error, setError] = useState(null);
  const [loading, setLoader] = useState(null);

  return {
    error,
    setError,
    loading,
    setLoader,
  }
}
