import { DefaultUser } from "../interfaces/forms";
import BaseUrl from './baseUrl'
import fetch from "isomorphic-unfetch"

const Login = (user: DefaultUser) => fetch(`${BaseUrl}/api/login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(user)
})

const Register = (user: DefaultUser) => fetch(`${BaseUrl}/api/register`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(user),
});

export {
  Login,
  Register
}