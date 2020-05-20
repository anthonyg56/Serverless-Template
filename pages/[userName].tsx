import Head from "next/head"
import { NextPage, GetServerSideProps } from "next"
import fetch from "isomorphic-unfetch"
import { getAccessToken } from "../src/utils/auth"
import Router from "next/router"
import BaseUrl from "../src/utils/baseUrl"
import { UserModel } from "../src/interfaces/models"

interface Props {
  user: UserModel
  token: string
}

const UserHomePage: NextPage<Props | null> = (props) => {
  if (!props) Router.push("/login")

  const { user } = props
  const { userName } = user
  return (
    <div>
      <Head>
        <title>{userName}'s | Home </title>
      </Head>

      <main>
        <h1>Hello {userName}</h1>
      </main>
    </div>
  )
}

/* Grabs Users data & returns it along with a new access token as props for the homepage */
export const getServerSideProps: GetServerSideProps = async (context) => {

  /* 
   *
   * Checks if refreshToken in context is valid,
   * returns a new access token if so 
   * otherwise returns null 
   * 
   * */

  const accessToken = await getAccessToken(context)
  if (!accessToken) return { props: {} }

  const response = await fetch(`${BaseUrl}/api/account`, {
    method: "GET",
    headers: {
      authorization: accessToken as string,
    },
  })
  const { user } = await response.json()

  return {
    props: {
      user,
      accessToken
    }
  }
}

export default UserHomePage
