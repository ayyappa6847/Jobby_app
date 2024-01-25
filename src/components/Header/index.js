import {Link, withRouter} from 'react-router-dom'

import {IoMdHome} from 'react-icons/io'
import {FiLogOut} from 'react-icons/fi'
import {FaBriefcase} from 'react-icons/fa'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navContainer">
      <div className="navCard">
        <div>
          <img
            className="navLogoImage"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </div>
        <div className="linkItems">
          <Link to="/">
            <p className="linkItem"> Home </p>
          </Link>
          <Link to="/jobs">
            <p className="linkItem"> Jobs </p>
          </Link>
        </div>
        <button type="button" className="logoutButton" onClick={onClickLogout}>
          Logout
        </button>
      </div>

      <div className="smallNavCard">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="smallImageLogo"
          />
        </div>
        <div className="smallNavIcons">
          <Link to="/">
            <button type="button" className="navButton" aria-label="home">
              <IoMdHome />
            </button>
          </Link>
          <Link to="/jobs">
            <button type="button" className="navButton" aria-label="case">
              <FaBriefcase />
            </button>
          </Link>

          <button
            type="button"
            className="navButton"
            aria-label="logout"
            onClick={onClickLogout}
          >
            <FiLogOut />
          </button>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(Header)
