import React, { useState } from "react"
import { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { IHandleSubmit, IHandleInput, RegisterForm } from '../../interfaces/forms'
import BaseUrl from '../../utils/baseUrl'

const initalState = {
    email: '',
    password: '',
    userName: '',
    name: ''
}

const RegisterPage: NextPage = () => {
    const [errorMsg, setErrorMsg] = useState<string>("")
    const [userInfo, setUserInfo] = useState<RegisterForm>(initalState)

    const router = useRouter()

    // Updates userInfo properties on input change evennt
    const handleEmailInput: IHandleInput = (e) => {
        e.preventDefault()
        setUserInfo({ ...userInfo, email: e.target.value })
    }
    const handlePasswordInput: IHandleInput = (e) => {
        e.preventDefault()
        setUserInfo({ ...userInfo, password: e.target.value })
    }
    const handleUserNameInput: IHandleInput = (e) => {
        e.preventDefault()
        setUserInfo({ ...userInfo, userName: e.target.value })
    }
    const handleNameInput: IHandleInput = (e) => {
        e.preventDefault()
        setUserInfo({ ...userInfo, name: e.target.value })
    }

    // Handles form submit ever
    const handleSubmit: IHandleSubmit = async (e) => {
        e.preventDefault()

        const res = await fetch(`${BaseUrl}/api/register`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
    
        // TODO: Add some better error handling
        if(res.status === 500) {
            setErrorMsg(res.statusText)
            return
        }

        router.push(`/login`)
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
                                    value={userInfo.name}
                                    onChange={handleNameInput}
                                    required
                                />
                            </label>
                        </div>
                        <div className="register-input-label">
                            <label htmlFor="userName">
                                User Name
                                <input 
                                    type="text"
                                    name="userName"
                                    id="userName"
                                    value={userInfo.userName}
                                    onChange={handleUserNameInput}
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
                                    value={userInfo.email}
                                    onChange={handleEmailInput}
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
                                    value={userInfo.password}
                                    onChange={handlePasswordInput}
                                    required
                                />
                            </label>
                        </div>
                        <button type="submit">Create Account</button>
                    </form>
                </div>
            </main>

            <footer>

            </footer>
        </>
    )
}

export default RegisterPage