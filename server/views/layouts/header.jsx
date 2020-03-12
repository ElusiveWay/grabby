var React = require('react');

function Header(props) {
  return (
    <header>
    <nav>
        <a href="/"><button className="btn btn-light">HOME</button></a>
        <a href="/signin"><button className="btn btn-light">SIGN IN\UP</button></a>
        <form className="header-form" method="post">
            <input type="hidden" name="action" value="logout"/>
            <button className='btn btn-light mybtne' type="submit">LOGOUT</button>
        </form>
    </nav>
    </header>

        )
    }

module.exports = Header