import React, { useState } from "react"
import { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
// import { useRouter } from "next/router"
import fetch from "isomorphic-unfetch"
import { ILoginForm } from '../../interfaces'

type HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => void
type SubmitForm = (body: ILoginForm) => Promise<void>


const LoginPage: NextPage = () => {
  // const router = useRouter()
  const [errorMsg, setErrorMsg] = useState<string>("")

  // Transforms submitted data into a useable object
  // TODO: add state values for all inputs so they clear on submit
  const handleSubmit: HandleSubmit = (e) => {
    e.preventDefault()

    // Body object that will be sent to submitForm
    const form: ILoginForm = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value
    }

    submitForm(form)
  }


  // Makes contact with the server & database by submitting a POST req
  const submitForm: SubmitForm = async(body) => {
    // Response object after making a request
    const res = await fetch(`${process.env.BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })

    // TODO: Add some error handling
    if (res.status === 500) {
      setErrorMsg(res.statusText)
      return
    }

    console.log('sucessfuly loged in')
    console.log(res)
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
                    required
                  />
                </label>
              </div>
              <button type="submit">Login</button>
            </div>
          </form>
          <div className="register">
            <h3>
              Register for an account <Link href="/register">here</Link>
            </h3>
          </div>
        </div>
      </main>

      <footer></footer>
    </>
  );
};

export default LoginPage;
