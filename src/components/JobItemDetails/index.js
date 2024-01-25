import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import EachJob from '../EachJob'
import Header from '../Header'
import ApiFailure from '../ApiFailure'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    eachJobDetails: {},
    skills: [],
    lifeAtCompany: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const jobItemUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobItemUrl, options)
    console.log(response)

    if (response.ok === true) {
      const data = await response.json()
      const eachJobDetails = {
        id: data.job_details.id,
        title: data.job_details.title,
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        rating: data.job_details.rating,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        jobDescription: data.job_details.job_description,
        employmentType: data.job_details.employment_type,
      }

      const similarJobs = data.similar_jobs.map(job => ({
        id: job.id,
        title: job.title,
        companyLogoUrl: job.company_logo_url,
        rating: job.rating,
        location: job.location,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
      }))
      const lifeAtCompany = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }
      const skills = data.job_details.skills.map(skill => ({
        name: skill.name,
        imageUrl: skill.image_url,
      }))
      this.setState({
        skills,
        lifeAtCompany,
        eachJobDetails,
        similarJobs,
        apiStatus: apiStatusConstants.success,
      })
      //   console.log(similarJobs)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {eachJobDetails, skills, lifeAtCompany, similarJobs} = this.state
    return (
      <EachJob
        eachJobDetails={eachJobDetails}
        skills={skills}
        lifeAtCompany={lifeAtCompany}
        similarJobs={similarJobs}
      />
    )
  }

  renderLoaderView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <Header />
      <ApiFailure />
    </div>
  )

  renderJobIemDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.progress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderJobIemDetails()}</div>
  }
}

export default JobItemDetails
