## Introduction
  Next.Js is an excellent framework to build react projects with, and as a react developer my self I highly recommend other developers that are looking to expand their skill sets to give NextJs a shot.

  It has made development extremely more enjoyable again with how closely it feels to developing in a cra environment. There’s no boiler-plates to navigate around at the start, what Next.js offers is a very well designed structure for developers to build server-side rendered applications. By using JavaScript to communicate isomorphically  (through client & server) i can skip including express as a framework, and free up even more space in my projects.  
Next.Js 9 API routes has also allowed me to build a bare bones template, capable of login and registration functionality, that I intend to re-use in my work flow to get full stack projects up and running quicker. It's an excellent choice for JamStack developer as well.
Next supports a server less environment, which doesn’t necessarily mean you aren’t using a server, just that you your self do not have to worry about having to maintain a server.  For developers what this means is that our main priorities regarding server communication is to create the routes and methods for the app to communicate through & fetch data.
This is why i plan to continue using Next.js in my projects, it feels freeing in a sense.
As freeing as it is, all of this comes with a learning curve that was difficult but extremely worth it. I want to help other developers who are looking to include NextJs into their workflow and open to a new way to build web apps. To do that, Im going to explain how I was able to build a login-registration form in a server less environment using Next.js 9 with Typescript & MongoDb in a 5 part series. Here’s what i'll will be covering:
Post Materials
Part 1 - Initial Setup
Part 2 - Creating the form components 
Part 3 - Connecting to MongoDb
Part 4 - Building the Api routes
Part 5 - Authenticating with Access and Refresh Tokens


## Setting Up Our Project 🛠

First let's start off with installing NextJs. You’ll need prior ReactJs knowledge and a willingness to understand how to build projects using server side rendering.


Server-Sider Rendering (SSR): HTML pages are generated as a response to a request made by the browser


Understanding this key concept will help you a lot along the way and enable you to be able to take advantage of all that NextJs has to offer. Vercel has some very informative documentation at https://nextjs.org/docs that will help you with installing NextJs onto your computer.

## Installing TypeScript

TypeScript is a super set of javascript and is extremely useful for large and complex projects. I like to think of it as an insurance plan for our code that we create and sign the contract ourselves.
 It helps us by getting rid of potentially buggy code during development & ensuring that our code executes exactly as we planned before runtime. Another utility is for some code editors like vs code, TypeScript will provide you the type definition for functions you're using instead of having to go look it up repeatedly. It's nice to have it right there in front of you, but you can still look it up if you want to. 🙂

Installing typescript is extremely simple. Open command prompt in the home directory of your project and type:

touch tsconfig.json

Run npm run dev in the console and NextJs will recognize the tsconfig.json file. You'll be met with some instructions on how to install the needed dependencies and asked to run npm run dev again. You are now be able to include .ts & .tsx files & replace your .js & .jsx files in NextJs.
We need to configuring the tsconfig to play nice like with react and next, I like to use this tsconfig setup in my react projects:
{
  "compilerOptions": {
    "allowJs": true,
    "alwaysStrict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "lib": [
      "dom",
      "es2017"
    ],
    "module": "esnext",
    "moduleResolution": "node",
    "noEmit": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "strict": true,
    "target": "esnext"  },
    "exclude": [
      "node_modules"
    ],
    "include": [
      "**/*.ts",
      "**/*.tsx"
    ]
}



## Installing NPM Packages

Lastly before moving on to the next post, we're going to install the packages we'll need to start off with.
/* throw in console picture*/
We need to install isomorphic-unfetch. Open a console window at the root of your project folder and run npm install isomorphic-unfetch. This will help Next.Js to fetch data for our application and communicate isomorphically. To learn more about how it works check out the documentation in the GitHub repo.

With that all installed we can move onto part two & create our form components 👍🏾
