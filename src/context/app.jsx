import React, { createContext, useReducer, useContext, useEffect } from 'react'

const initialState = {
  loading: false,
}

function reducer(state, action) {
  switch (action.type) {
    case 'toggleLoading':
      return { ...state, loading: action.payload.loading }
    default:
      return state
  }
}

export const AuthContext = createContext()

export default function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

// 3. Create a custom hook that returns the state and dispatch values
export function useAppState() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAppState must be used within a AppContextProvider')
  }
  return context
}
