import {Link} from 'react-router-dom'
import {FaBriefcase, FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    title,
    id,
    rating,
    location,
    employmentType,
    jobDescription,
    packagePerAnnum,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`}>
      <li className="jobItemCont">
        <div className="flexDiv">
          <div className="imgCont">
            <img className="companyLogoImg" src={companyLogoUrl} alt={id} />
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
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobItem
