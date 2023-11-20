 Fedex / SignUp App


<a alt="Fedex logo" href="https://yousry2.github.io/operations" target="_blank" rel="noreferrer"><img src="https://yousry2.github.io/operations/screenshot.jpg" width="800"></a>




## ✨ ** [Check Live Demo](https://yousry2.github.io/operations/).✨ **
<br>

> [!CAUTION]
> Please notice this demo is published on static github pages so in order to refresh the app please **Always** navigate the root page https://yousry2.github.io/operations and **DON'T** use the signup url https://yousry2.github.io/operations/auth/signup/

<br>

<br>

## Run Application locally

1- Make sure you have the latest npm installed in your machine  [Download NPM ](https://nodejs.org/en/download).

2- Clone the application repository in your machine and navigate to the repository root file path 

3- Install app libraries using npm

```
npm i 
```

4- Run Fedex App

```
npm run start-fedex
```
<br>

## App Architecture

<img src="https://yousry2.github.io/operations/graph.jpg" width="800">


Run the following command in repository root path and then navigate open your browser to http://127.0.0.1:4211/projects/all to check application dependencies and architecture
```
nx graph
```

The application consists of the following applications/libraries :

**1- Fedex**               : Scaffold application which will import all libraries features along with their dependencies and integrate them 

**2- Fedex-Auth**          : Feature library that contains all pages/components related to the authorization module

**3- Fedex-Data-Acccess**  : Services Library will handle all domain models, api services

**4- Util-Common**         : Utility library to handle all common services : Form Validations/Controls handling component cycle(onDestroy) etc

**5- Tailwind-Presets**    : Contains all tailwild configurations, presets, themes and fonts

**6- Util-environments**   : Utility library to contain environment configuration files for all projects

<br>

## Running Tests


```
npm run test
```
<br>

## Dependencies :


1- nx.dev

2- angular 17

3- tailwindcss

4- tailwindcss/form plugin

5- jest