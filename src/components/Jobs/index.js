import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import JobItem from '../JobItem'
import FiltersGroup from '../FiltersGroup'
import ApiFailure from '../ApiFailure'
import Header from '../Header'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    employList: [],
    radioSalary: 0,
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const jwtToken = Cookies.get('jwt_token')
    const {employList, radioSalary, searchInput} = this.state
    console.log(employList)
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${employList}&minimum_package=${radioSalary}&search=${searchInput}`
    const optionsJobs = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsUrl, optionsJobs)

    if (response.ok === true) {
      const data = await response.json()
      const jobsList = data.jobs.map(eachJob => ({
        id: eachJob.id,
        title: eachJob.title,
        rating: eachJob.rating,
        companyLogoUrl: eachJob.company_logo_url,
        location: eachJob.location,
        jobDescription: eachJob.job_description,
        employmentType: eachJob.employment_type,
        packagePerAnnum: eachJob.package_per_annum,
      }))
      this.setState({jobsList, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  //   this.setState(
  //         prev => ({employList: [...prev.employList, employ]}),
  //         this.getJobsList,
  //       )

  changeEmployment = employ => {
    console.log(employ)
    const {employList} = this.state
    const isIncludes = employList.includes(employ)
    console.log(isIncludes)
    let newEmploymentList = null
    if (isIncludes) {
      newEmploymentList = employList.filter(each => each !== employ)
    } else {
      newEmploymentList = [...employList, employ]
    }
    this.setState({employList: [...newEmploymentList]}, this.getJobsList)
  }

  handleSalaryRange = value => {
    this.setState({radioSalary: value}, this.getJobsList)
  }

  renderFiltersGroup = () => {
    const {radioSalary} = this.state
    return (
      <FiltersGroup
        employmentTypesList={employmentTypesList}
        salaryRangesList={salaryRangesList}
        changeSearchInput={this.changeSearchInput}
        renderSearchJobs={this.renderSearchJobs}
        onKeyPressSearch={this.onKeyPressSearch}
        handleSalaryRange={this.handleSalaryRange}
        radioSalary={radioSalary}
        changeEmployment={this.changeEmployment}
      />
    )
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderSearchJobs = () => {
    this.getJobsList()
  }

  onKeyPressSearch = event => {
    if (event.key === 'Enter') {
      this.renderSearchJobs()
    }
  }

  //   enterSearchInput = ()=>{
  //       this.getJobsList()
  //   }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-container">
        <input
          type="search"
          value={searchInput}
          className="search-input"
          placeholder="search"
          onChange={this.changeSearchInput}
          onKeyDown={this.onKeyPressSearch}
        />
        <button
          className="search-button"
          type="button"
          onClick={this.renderSearchJobs}
          aria-label="search"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderSuccessView = () => {
    const {jobsList} = this.state
    const jobsLengthActive = jobsList.length > 0
    return jobsLengthActive ? (
      <div>
        <div>
          <ul className="jobsListContainer">
            {jobsList.map(jobDetails => (
              <JobItem key={jobDetails.id} jobDetails={jobDetails} />
            ))}
          </ul>
        </div>
      </div>
    ) : (
      <div className="no-jobs-cont">
        <div>
          <img
            className="no-jobs-image"
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters.</p>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderJobView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return <ApiFailure />
      case apiStatusConstants.progress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="jobsContainer">
          <div className="filtersCardCont">{this.renderFiltersGroup()}</div>

          <div className="jobsCardCont">
            <div> {this.renderSearchInput()}</div>
            {this.renderJobView()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
