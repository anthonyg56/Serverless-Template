// Type inferance of different types of forms
export type LoginForm = {
    email?: string;
    password?: string;
}

export type RegisterForm = {
    name?: string,
    userName?: string,
    email?: string,
    password?: string
}

// Interface for submitting & handling forms
export type IHandleSubmit = (body: React.FormEvent<HTMLFormElement>) => Promise<void>
export type IHandleInput = (e: React.ChangeEvent<HTMLInputElement>) => void
