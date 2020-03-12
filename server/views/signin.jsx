const React = require('react');
const Footer = require('./layouts/footer')
const Header = require('./layouts/header')
const Head = require('./layouts/head')
import FormLogin from './components/formlogin'
import FormReg from './components/formreg'
    
function Sign(params){
    return (
        <html>
        <Head title='title'/>
        <link rel="stylesheet" href="./pages/sign.css"/>
          <body>
            <Header/>
              <div className="container">
                <div class="flexContSign">
                  <FormLogin/>
                  <FormReg/>
                </div>
              </div>
            <Footer/>
          </body>
        </html>
    )
}
module.exports = Sign