var React = require('react');

function Head(props) {
  return (

    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="stylesheet" href="./bt/bootstrap.min.css"/>
        <script src="./bt/jquery-3.4.1.min.js"></script>
        <script src="./bt/bootstrap.min.js"></script>

        <script src="https://unpkg.com/react/umd/react.production.min.js" defer crossorigin />
        <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" defer crossorigin/>
        <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" defer crossorigin/>
        

        <link rel="stylesheet" href="mdb.css"/> 
        <link rel="stylesheet" href="all.min.css"/>     
        <link rel="stylesheet" href="css.css"/>
        
        <script defer src="js.js"></script>
        <title>{props.title}</title>
    </head>

        )
    }

module.exports = Head