export type DefaultUser = {
  email: string | null,
  password: string | null,
  username?: string | null,
  name?:string | null
}

export type HandleSubmit = (body: React.FormEvent<HTMLFormElement>) => Promise<void>
export type HandleInput = <P extends keyof DefaultUser>(prop: P, value: DefaultUser[P]) => void
