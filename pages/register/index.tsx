import React, { useState } from "react"
import { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { IRegisterForm } from '../../interfaces'

type HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => void
type SubmitForm = (body: IRegisterForm) => Promise<void>



const RegisterPage: NextPage = () => {
    const [errorMsg, setErrorMsg] = useState<string>("")
    const router = useRouter()

    // Transforms submitted data into a useable object
    // TODO: add state values for all inputs so they clear on submit
    const handleSubmit: HandleSubmit = (e) => {
        e.preventDefault()

        // Body object that will be sent to submitForm
        const formValues: IRegisterForm = {
            accountName: e.currentTarget.accountName.value,
            userName: e.currentTarget.userName.value,
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value
        }

        submitForm(formValues)
    }

    const submitForm: SubmitForm = async (body) => {
        // Response object after making a request
        const res = await fetch(`${process.env.BASE_URL}/api/register`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
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
                            <label htmlFor="accountName">
                                Name
                                <input 
                                    type="text"
                                    name="accountName"
                                    id="accountName"
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
                                    required
                                />
                            </label>
                        </div>
                        <div className="register-input-label">
                            <label htmlFor="email">
                                Email Adress
                                <input type="email" name="email" id="email" required/>
                            </label>
                        </div>
                        <div className="register-input-label">
                            <label htmlFor="password">
                                Password
                                <input type="password" name="password" id="password" required/>
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