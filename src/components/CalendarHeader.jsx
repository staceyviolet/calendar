import * as React from 'react'

export default function CalendarHeader(props) {
    const {month, year} = props

    return (
        <div className="ui-datepicker-header">
            <div className="ui-datepicker-title">
                <span className="ui-datepicker-month">{month}</span>&nbsp;<span
                className="ui-datepicker-year">{year}</span>
            </div>
        </div>
    )
}
