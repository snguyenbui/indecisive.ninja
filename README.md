<div align="center"> 

# ![image](./public/images/favicon.png)Indecisive Ninja 

Indecisive Ninja is a Full-Stack, RESTful Poll Creation Application.

**Created by [Kapil](https://github.com/kapildoppiogroup), [Sunny](https://github.com/snguyenbui) and [Devin](https://github.com/devhmac)**

## Check it out here -  [indecisive.ninja](http://www.indecisive.ninja/)
*Hosted on Heroku*
_____

</div>

### This project was built on NodeJS Express, using EJS Templating engine, SCSS & CSS

* Utilizing API's from Chart JS, Pusher, SendGrid and IP Trace




## <ins> Features </ins>
* Create New Polls

* Seamless real time result updates and voter log, no refreshing required

* Emailed admin link displaying voter breakdown.

* Borda Count choice ranking method

* Optional IP address based voter fraud detection.

## <ins> View Demo Below </ins>

### <ins> Home Page </ins>
<img src='./resources/gifs/createpolldemo.gif' width="500">

### <ins> Vote on polls </ins>
<img src='./resources/gifs/votepage.gif' width="500">

### <ins> View your results</ins>
<img src='./resources/gifs/votes.gif' width="500">

_________

## <ins> Local Installation </ins>

1. Fork and Clone or download this repository
```
git clone git@github.com:snguyenbui/midterm-decision-maker.git
```
2. Navigate to project directory and install NPM dependancies 
```
cd indecisive.ninja
npm install
```
3. Set up a local PostgreSQL Database and add credentials to a .env, following the framework of example.env
    * Sign up for a free [Pusher](https://pusher.com/docs/channels/getting_started/javascript) API key
    * Sign up for a free [sendGrid](https://sendgrid.com/) API key
```
npm run db:reset
```
4. Launch the local server and navigate to localhost:8080
```
npm run local
```

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- dotenv
- @sendgrid/mail
- pusher
- chart.js



Icons from Artists: 
- mynamepong 
- Icongeek26
- Freepik
@flaticon.com

