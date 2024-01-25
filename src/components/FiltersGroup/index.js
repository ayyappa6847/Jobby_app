import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class FiltersGroup extends Component {
  state = {profileData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const profileUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const profileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({profileData, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    const {changeSearchInput} = this.props
    changeSearchInput(event)
  }

  onClickSearchButton = () => {
    const {renderSearchJobs} = this.props
    renderSearchJobs()
  }

  onKeyPress = event => {
    const {onKeyPressSearch} = this.props
    onKeyPressSearch(event)
  }

  renderSearchInput = () => (
    <div className="searchCont">
      <input
        type="search"
        className="searchInput"
        placeholder="search"
        onChange={this.onChangeSearchInput}
        onKeyDown={this.onKeyPress}
      />
      <button
        className="search-button"
        type="button"
        aria-label="search"
        onClick={this.onClickSearchButton}
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {profileData} = this.state
    return (
      <div className="profileCont">
        <img src={profileData.profileImageUrl} alt="profile img" />
        <h1 className="profileHeading">{profileData.name}</h1>
        <p>{profileData.shortBio}</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <button type="button" className="retry-button">
      retry
    </button>
  )

  renderProfileView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.progress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onChangeRadioSalary = event => {
    const {handleSalaryRange} = this.props
    handleSalaryRange(event.target.value)
  }

  onChangeEmployment = event => {
    // console.log(event.target.value)
    const {changeEmployment} = this.props
    changeEmployment(event.target.value)
  }

  render() {
    const {employmentTypesList, salaryRangesList, radioSalary} = this.props
    return (
      <div className="filterCont">
        {this.renderSearchInput()}
        <div className="loaderCont">{this.renderProfileView()}</div>

        <hr className="horizontalLine" />

        <div>
          <h1>Type of Employment</h1>
          {employmentTypesList.map(eachType => (
            <div key={eachType.label}>
              <input
                type="checkbox"
                id={eachType.label}
                value={eachType.employmentTypeId}
                onChange={this.onChangeEmployment}
              />
              <label htmlFor={eachType.label}>{eachType.label}</label>
            </div>
          ))}
        </div>

        <hr className="horizontalLine" />

        <div>
          <h1>Salary Range</h1>
          {salaryRangesList.map(eachType => (
            <div key={eachType.label}>
              <input
                type="radio"
                id={eachType.label}
                value={eachType.salaryRangeId}
                checked={radioSalary === eachType.salaryRangeId}
                onChange={this.onChangeRadioSalary}
              />
              <label htmlFor={eachType.label}>{eachType.label}</label>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
export default FiltersGroup
