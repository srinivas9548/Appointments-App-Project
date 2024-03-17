import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, title, date, isStarred} = appointmentDetails

  const startImageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStarBtn = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="list-container">
      <div className="appointment-list-item">
        <p className="title">{title}</p>
        <button
          type="button"
          className="button"
          data-testid="star"
          onClick={onClickStarBtn}
        >
          <img src={startImageUrl} alt="star" className="star-icon" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
