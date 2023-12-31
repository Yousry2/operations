# Fedex / SignUp App #


<a alt="Fedex logo" href="https://yousry2.github.io/operations" target="_blank" rel="noreferrer"><img src="https://yousry2.github.io/operations/static/screenshot.jpg" width="800"></a>




## ✨ ** [Check Live Demo](https://yousry2.github.io/operations/).✨ **
<br>

> [!CAUTION]
> Please note this demo is published on static github pages so in order to refresh the app please **Always** navigate back to the root page https://yousry2.github.io/operations and **DON'T** use the signup url https://yousry2.github.io/operations/auth/signup/ **OR** the refresh button

<br>

## Tasks to be completed ## 
1- [Done] ~~E2E tests using playwright using several device sizes~~

2- Add more validation rules like min,max length and whitespace validators to all input fields

3-  [Done] ~~Add responsive design for mobile and tablet screens~~

4-  [Done]  ~~Add Support for View Transition API~~

5-  [Done]  ~~Use new angular 17 features : Control Flow and Signal~~ 

<br>

## Run Application locally

1- Make sure you have the latest npm installed in your machine  [Download NPM ](https://nodejs.org/en/download).

2- Clone the application repository in your machine and using your operating system termminal navigate to the repository root file path 

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

<img src="https://yousry2.github.io/operations/static/graph.jpg" width="800">


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

## Tests

### 1- E2E Testing (Playwright) : 

Check the latest e2e report on this link https://yousry2.github.io/operations/static/playwright-report.html

In e2e testing We check the following :

1- Basic page workflow 

2- Happy scenario with successful submission

3- Accessiblity using keyboard

4- Responsivness on several screens

### 2- Unit Testing (Jest) :  

In Unit Testing we fouces more on sign up validation cases and the submission scenario with the api calls

```
npm run test-fedex
```
<br>

## Dependencies :


1- nx monorepo 17

2- angular 17

3- tailwindcss

4- tailwindcss/form plugin

5- jest

6- playwright
