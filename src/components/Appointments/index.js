import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    isFilterActive: false,
  }

  onClickFilter = () => {
    const {isFilterActive} = this.state

    this.setState({isFilterActive: !isFilterActive})
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  renderAppointmentsList = () => {
    const filteredAppointmentList = this.getFilteredAppointmentList()

    return filteredAppointmentList.map(eachAppointment => (
      <AppointmentItem
        key={eachAppointment.id}
        appointmentDetails={eachAppointment}
        toggleIsStarred={this.toggleIsStarred}
      />
    ))
  }

  getFilteredAppointmentList = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(
        eachFilterAppointment => eachFilterAppointment.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterActiveClassName = isFilterActive ? 'filter-active' : ''

    return (
      <div className="app-container">
        <div className="appointments-responsive-container">
          <div className="appointments-content-container">
            <div className="appointments-container">
              <div className="appointments-inputs-container">
                <h1 className="heading">Add Appointment</h1>
                <form
                  className="form-container"
                  onSubmit={this.onAddAppointment}
                >
                  <div className="form-input-containers">
                    <label htmlFor="titleInput" className="label-text">
                      TITLE
                    </label>
                    <input
                      id="titleInput"
                      type="text"
                      className="input"
                      placeholder="Title"
                      onChange={this.onChangeTitleInput}
                      value={titleInput}
                    />
                  </div>
                  <div className="form-input-containers">
                    <label htmlFor="dateInput" className="label-text">
                      DATE
                    </label>
                    <input
                      id="dateInput"
                      type="date"
                      className="input"
                      placeholder="dd/mm/yyyy"
                      onChange={this.onChangeDateInput}
                      value={dateInput}
                    />
                  </div>
                  <button type="submit" className="add-button">
                    Add
                  </button>
                </form>
              </div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-image"
              />
            </div>
            <hr className="horizontal-line" />
            <div className="appointments-page-container">
              <h1 className="appointments-page-header">Appointments</h1>
              <button
                type="button"
                className={`starred-button ${filterActiveClassName}`}
                onClick={this.onClickFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list-container">
              {this.renderAppointmentsList()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
