import React, { useState } from 'react';

/**
 * creates a context which provides states being accessable between multiple pages.
 */
export const GlobalContext = React.createContext(null);

/**
 * Provides state hooks
 * @returns {object} states
 */
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
