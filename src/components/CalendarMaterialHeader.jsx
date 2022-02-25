import * as React from 'react'

export default function CalendarMaterialHeader(props) {
    const {weekDay, day, currentDateMonth, year} = props

    return (
        <div className="ui-datepicker-material-header">
            <div className="ui-datepicker-material-day">{weekDay}</div>
            <div className="ui-datepicker-material-date">
                <div className="ui-datepicker-material-day-num">{day}</div>
                <div className="ui-datepicker-material-month">{currentDateMonth}</div>
                <div className="ui-datepicker-material-year">{year}</div>
            </div>
        </div>
    )
}
