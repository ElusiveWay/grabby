const React = require('react');
const Footer = require('./layouts/footer')
const Header = require('./layouts/header')
const Head = require('./layouts/head')

function UserPage(props) {
  return (
      <html>
      <Head title={props.title}/>
        <body>

        </body>
      </html>
      )
}

module.exports = UserPage;