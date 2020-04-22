import React, { useState, useEffect } from "react"
import { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import fetch from "isomorphic-unfetch"
import { IHandleSubmit, IHandleInput, LoginForm } from '../../interfaces/forms'
import { saveToken } from '../../utils/withAuth'
import BaseUrl from '../../utils/baseUrl'

const LoginFormInitalState = {
  email: '',
  password: ''
}

const LoginPage: NextPage = () => {
  const router = useRouter()
  const [userName, setUserName] = useState('')
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [userInfo, setUserInfo] = useState<LoginForm>(LoginFormInitalState)
  const [redirect, setRedirect] = useState(false)

  // Transforms submitted data into a useable object
  const handleEmailInput: IHandleInput = (e) => {
    e.preventDefault()
    setUserInfo({ ...userInfo, email: e.target.value })
  }
  const handlePasswordInput: IHandleInput = (e) => {
    e.preventDefault()
    setUserInfo({ ...userInfo, password: e.target.value })
  }

  // Makes contact with the server & database by submitting a POST req
  const handleSubmit: IHandleSubmit = async(e) => {
    e.preventDefault()

    const res = await fetch(`${BaseUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })

    // TODO: Add some error handling
    if (res.status >= 400) {
      setErrorMsg('There was an error')
      return
    }

    const { user, refreshToken, accessToken } = await res.json()

    saveToken(null, refreshToken, 'refresh')
    saveToken(null, accessToken, 'access')
  
    setUserName(user.userName)
    setRedirect(true)
  }

  // If redirect is true, redirect to users homepage
  useEffect(() => {
    if (redirect === true) router.push('/[userName]', `/${userName}`)
  }, [redirect])

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <main>
        <div className="login-form-container">
          <form className="login-form form" onSubmit={handleSubmit}>
            {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : null}
            <div className="inputs-container">
              <div className="email-input">
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    name="required"
                    id="email"
                    placeholder="eg example@gmail.com"
                    value={userInfo.email}
                    onChange={handleEmailInput}
                    required
                  />
                </label>
              </div>
              <div className="password-input">
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={userInfo.password}
                    onChange={handlePasswordInput}
                    required
                  />
                </label>
              </div>
              <button type="submit">Login</button>
            </div>
          </form>
          <div className="register">
            <h3>
              Register for an account <Link href="/register"><a>here</a></Link>
            </h3>
          </div>
        </div>
      </main>

      <footer></footer>
    </>
  );
};

export default LoginPage;
