import {FaBriefcase, FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBoxArrowUpRight} from 'react-icons/bs'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const EachJob = props => {
  const {eachJobDetails, skills, lifeAtCompany, similarJobs} = props
  const {description, imageUrl} = lifeAtCompany
  const {
    companyLogoUrl,
    title,
    rating,
    employmentType,
    packagePerAnnum,
    jobDescription,
    location,
    companyWebsiteUrl,
  } = eachJobDetails
  console.log(similarJobs)

  return (
    <div>
      <Header />
      <div className="eachJob">
        <div className="jobItemCont">
          <div className="flexDiv">
            <div className="imgCont">
              <img
                className="companyLogoImg"
                src={companyLogoUrl}
                alt="job details company logo"
              />
            </div>
            <div className="headingCont">
              <h1 className="heading">{title}</h1>
              <div className="flexDiv">
                <FaStar className="starIcon" />
                <p className="ratingPara">{rating}</p>
              </div>
            </div>
          </div>
          <div className="iconsCont">
            <div className="flexDiv">
              <div className="flexDiv locationCont">
                <IoLocationSharp className="imgCont" />
                <p>{location}</p>
              </div>
              <div className="flexDiv">
                <FaBriefcase className="imgCont" />
                <p>{employmentType}</p>
              </div>
            </div>
            <div>
              <p>{packagePerAnnum}</p>
            </div>
          </div>
          <hr />
          <div>
            <div className="desCont">
              <h1>Description</h1>
              <a className="websiteAnchor" href={companyWebsiteUrl}>
                Visit
                <BsBoxArrowUpRight />
              </a>
            </div>
            <p>{jobDescription}</p>
          </div>
          <h1>SKILLS</h1>
          <ul className="skillsCont">
            {skills.map(skill => (
              <li className="flexDiv" key={skill.name}>
                <img
                  className="skillImg"
                  src={skill.imageUrl}
                  alt={skill.name}
                />
                <h3>{skill.name}</h3>
              </li>
            ))}
          </ul>
          <h1>Life at Company</h1>
          <div className="lifeAtComp">
            <p>{description}</p>
            <img src={imageUrl} alt="life at company" />
          </div>
        </div>
        <h1>Similar Jobs</h1>
        <ul className="similarJobsContainer">
          {similarJobs.map(job => (
            <SimilarJobs key={job.id} job={job} />
          ))}
        </ul>
      </div>
    </div>
  )
}
export default EachJob
