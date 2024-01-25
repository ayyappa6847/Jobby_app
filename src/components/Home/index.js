import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

const Home = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  const onClickFindJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <>
      <Header />
      <div className="bgContainer">
        <div className="card">
          <h1> Find the Job That Fits Your Life </h1>{' '}
          <p>
            Millions of people are searching for jobs, salary, information,
            company reviews.Find the job that fits your abilities and potential.{' '}
          </p>{' '}
          <button className="button" type="button" onClick={onClickFindJobs}>
            Find jobs
          </button>
        </div>
      </div>
    </>
  )
}
export default Home
