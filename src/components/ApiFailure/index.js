import './index.css'

const ApiFailure = () => (
  <div className="apiFailureCont">
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="retry-button">
        retry
      </button>
    </div>
  </div>
)
export default ApiFailure
