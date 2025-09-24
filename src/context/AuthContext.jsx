import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:3000/auth/verify", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const login = async (email, password) => {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password })
    })

    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.message || "Erro ao fazer login")
    }

    const verifyRes = await fetch("http://localhost:3000/auth/verify", {
      credentials: "include"
    })
    const data = await verifyRes.json()
    setUser(data.user)
  }

  const logout = async () => {
    await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include"
    })
    setUser(null)
  }

  const value = { user, login, logout, loading }

  if (loading) return <p>Carregando...</p>

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
