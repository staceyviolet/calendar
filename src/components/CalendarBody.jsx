import * as React from 'react'

const weekDayNames = [
    {title: 'Понедельник', label: 'Пн'},
    {title: 'Вторник', label: 'Вт'},
    {title: 'Среда', label: 'Ср'},
    {title: 'Четверг', label: 'Чт'},
    {title: 'Пятница', label: 'Пт'},
    {title: 'Суббота', label: 'Сб'},
    {title: 'Воскресенье', label: 'Вс'}]

export default function CalendarBody(props) {
    const {weeksInMonth, day} = props

    return (
        <table className="ui-datepicker-calendar">
            <colgroup>
                <col/>
                <col/>
                <col/>
                <col/>
                <col/>
                <col className="ui-datepicker-week-end"/>
                <col className="ui-datepicker-week-end"/>
            </colgroup>

            <thead>
            <tr>
                {weekDayNames.map((day, i) => {
                    return <th key={i} scope="col" title={day.title}>{day.label}</th>
                })}
            </tr>
            </thead>

            <tbody>
            {weeksInMonth.map((week, i) => {
                return <tr key={i}>
                    {week.map((weekDay, i) => {
                        if (weekDay.date === day && weekDay.isCurrentMonth) {
                            return <td key={i} className="ui-datepicker-today">{weekDay.date}</td>
                        } else if (!weekDay.isCurrentMonth) {
                            return <td key={i} className="ui-datepicker-other-month">{weekDay.date}</td>
                        } else {
                            return <td key={i}>{weekDay.date}</td>
                        }
                    })}
                </tr>
            })}
            </tbody>
        </table>
    )
}
