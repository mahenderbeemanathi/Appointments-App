// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {appointment, addFavorite} = props
  const {id, title, date, isFavorite} = appointment

  const onClickStar = () => {
    addFavorite(id)
  }

  return (
    <li className="list-item">
      <div className="appointment-title">
        <p>{title}</p>
        <button
          type="button"
          data-testId="star"
          onClick={onClickStar}
          className="star-button"
        >
          {isFavorite ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
              alt="fiiled star"
            />
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
              alt="star"
            />
          )}
        </button>
      </div>
      <p>Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
