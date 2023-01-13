// Write your code here
import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointmentsList: [], isStared: false}

  onSubmitClick = event => {
    event.preventDefault()

    const {title, date} = this.state

    const newAppointment = {
      id: v4(),
      title,
      date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      isFavorite: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  addFavorite = uniqId => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (uniqId === eachAppointment.id) {
          return {...eachAppointment, isFavorite: !eachAppointment.isFavorite}
        }
        return eachAppointment
      }),
    }))
  }

  getFavoriteList = () => {
    this.setState(prevState => ({isStared: !prevState.isStared}))
  }

  onChangetitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  render() {
    const {title, date, appointmentsList, isStared} = this.state
    const starButton = isStared ? 'filled-button' : 'unfilled-button'
    const staredList = appointmentsList.filter(
      eachAppointment => eachAppointment.isFavorite === true,
    )
    const finalAppointmentsList = isStared ? staredList : appointmentsList
    return (
      <div className="bg">
        <div className="card">
          <div className="upper">
            <div>
              <h1>Add Appointment</h1>
              <form onSubmit={this.onSubmitClick}>
                <label htmlFor="title">TITLE</label>
                <br />
                <input
                  value={title}
                  onChange={this.onChangetitle}
                  id="title"
                  type="text"
                />
                <br />
                <label htmlFor="date">DATE</label>
                <br />
                <input
                  value={date}
                  onChange={this.onChangeDate}
                  id="date"
                  type="date"
                />
                <button type="submit">Add</button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr />
          <div className="title-and-stared-button">
            <h1>Appointments</h1>
            <button
              className={starButton}
              onClick={this.getFavoriteList}
              type="button"
            >
              Starred
            </button>
          </div>
          <ul className="ul">
            {finalAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                appointment={eachAppointment}
                key={eachAppointment.id}
                addFavorite={this.addFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
