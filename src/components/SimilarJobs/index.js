import {FaBriefcase, FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'

import './index.css'

const SimilarProducts = props => {
  const {job} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = job
  console.log(job)
  return (
    <li className="jobItemCont">
      <div className="flexDiv">
        <div className="imgCont">
          <img
            className="companyLogoImg"
            src={companyLogoUrl}
            alt="similar job company logo"
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
      <div>
        <h1>Description</h1>
        <p>{jobDescription}</p>
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
      </div>
    </li>
  )
}
export default SimilarProducts
