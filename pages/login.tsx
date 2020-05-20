import React, { useState, useEffect } from "react"
import { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { Login } from "../src/utils/apiHelpers"
import { HandleSubmit, HandleInput, DefaultUser } from '../src/interfaces/forms'
import { saveToken } from '../src/utils/auth'

const defaultUser: DefaultUser = {
  email: '',
  password: ''
}

const LoginPage: NextPage = () => {
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [user, setUser] = useState<DefaultUser>(defaultUser)
  const [redirect, setRedirect] = useState(false)
  const router = useRouter()

  let slug = ''

  useEffect(() => {
    if (redirect === true) router.push('/[userName]', `/${slug}`)
  }, [redirect])

  const handleInput: HandleInput = (prop, value) => {
    setUser({ ...user, [prop]: value });
  }

  const handleSubmit: HandleSubmit = async(e) => {
    e.preventDefault()

    const response = await Login(user)
    if (response.status !== 200) {
      setErrorMsg('There was an error')
      return
    }

    const { userdata, refreshToken, accessToken } = await response.json()
    slug = userdata.username

    saveToken(null, refreshToken, 'refresh')
    saveToken(null, accessToken, 'access')
    setRedirect(true)
  }

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
                    value={user.email || ""}
                    onChange={e => {
                      e.preventDefault();
                      const value = e.currentTarget.value;
                      handleInput("email", value);
                    }}
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
                    value={user.password || ""}
                    onChange={e => {
                      e.preventDefault();
                      const value = e.currentTarget.value;
                      handleInput("password", value);
                    }}
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
