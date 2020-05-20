import React, { useState } from "react"
import { useRouter } from "next/router"
import { NextPage } from "next"
import Head from "next/head"
import { HandleSubmit, HandleInput, DefaultUser, } from "../src/interfaces/forms"
import { Register } from '../src/utils/apiHelpers'

const defaultUser: DefaultUser = {
  email: "",
  password: "",
  username: "",
  name: "",
}

const RegisterPage: NextPage = () => {
  const router = useRouter()
  const [errorMsg, setErrorMsg] = useState<string>("")
  const [user, setUser] = useState<DefaultUser>(defaultUser)

  const handleInput: HandleInput = (prop, value) => {
    setUser({ ...user, [prop]: value })
  }

  const handleSubmit: HandleSubmit = async (e) => {
    e.preventDefault()

    const res = await Register(user)

    if (res.status !== 200) {
      setErrorMsg(res.statusText)
    }

    router.push(`/login`)
    return
  }

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>

      <main>
        <div className="register-page">
          <form className="register-form form" onSubmit={handleSubmit}>
            {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : null}
            <div className="register-input-label">
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={user.name || ""}
                  onChange={(e) => {
                    e.preventDefault()
                    const value = e.currentTarget.value
                    handleInput("name", value)
                  }}
                  required
                />
              </label>
            </div>
            <div className="register-input-label">
              <label htmlFor="userName">
                User Name
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={user.username || ""}
                  onChange={(e) => {
                    e.preventDefault()
                    const value = e.currentTarget.value
                    handleInput("username", value)
                  }}
                  required
                />
              </label>
            </div>
            <div className="register-input-label">
              <label htmlFor="email">
                Email Adress
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={user.email || ""}
                  onChange={(e) => {
                    e.preventDefault()
                    const value = e.currentTarget.value
                    handleInput("email", value)
                  }}
                  required
                />
              </label>
            </div>
            <div className="register-input-label">
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={user.password || ""}
                  onChange={(e) => {
                    e.preventDefault()
                    const value = e.currentTarget.value
                    handleInput("name", value)
                  }}
                  required
                />
              </label>
            </div>
            <button type="submit">Create Account</button>
          </form>
        </div>
      </main>

      <footer></footer>
    </>
  )
}

export default RegisterPage
