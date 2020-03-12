const React = require('react');
const Footer = require('./layouts/footer')
const Header = require('./layouts/header')
const Head = require('./layouts/head')
import Collections from './components/collections'

function Index(props) {
  return (
      <html>
      <Head title={props.title}/>
      <link rel="stylesheet" href="./pages/index.css"/>
        <body>
            <Header/>
              <Collections/>
            <Footer/>
        </body>
      </html>
      )
}

module.exports = Index;