import * as React from 'react'

export default function Calendar(props) {
    const {date} = props
    const day = date.getDate()
    const weekDay = date.toLocaleString('ru-ru', {weekday: 'long'})
    const month = date.toLocaleString('ru-ru', {month: 'long'})
    const monthToday = formatMonthName(month)
    const year = date.getFullYear()
    const weeksInMonth = getWeeksInMonth(date)

    function getWeeksInMonth(date) {
        const daysInMonth = getDaysInMonth(date)
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
        const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)

        const startOfMonthWeekDay = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1
        const endOfMonthWeekDay = lastDayOfMonth.getDay() === 0 ? 6 : lastDayOfMonth.getDay() - 1
        const numOfWeeks = getWeeksNumberInMonth(startOfMonthWeekDay, endOfMonthWeekDay, daysInMonth)

        let daysInPrevMonth = getDaysInMonth(new Date(date.getFullYear(), date.getMonth() - 1, 1))
        let weeks = []
        let startOfWeek = 1

        for (let i = 0; i < numOfWeeks; i++) {
            let week = []
            let prevMonthDate = daysInPrevMonth - startOfMonthWeekDay + 1
            let nextMonthDate = 1

            for (let j = startOfWeek; j < startOfWeek + 7; j++) {
                if (j <= startOfMonthWeekDay && i === 0) {
                    week.push({date: prevMonthDate, isCurrentMonth: false})
                    prevMonthDate++
                } else if (j <= daysInMonth + startOfMonthWeekDay) {
                    week.push({date: j - startOfMonthWeekDay, isCurrentMonth: true})
                } else {
                    week.push({date: nextMonthDate, isCurrentMonth: false})
                    nextMonthDate++
                }
            }
            startOfWeek = startOfWeek + 7

            weeks.push(week)
        }
        return weeks
    }

    function getWeeksNumberInMonth(firstDayOfMonthAsWeekday, lastDayOfMonthAsWeekday, totalDays) {
        console.log(firstDayOfMonthAsWeekday)
        console.log(totalDays)
        console.log(lastDayOfMonthAsWeekday)

        return Math.ceil((firstDayOfMonthAsWeekday + totalDays + (6 - lastDayOfMonthAsWeekday)) / 7)
    }

    function getDaysInMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }

    function formatMonthName(monthName) {
        if (monthName.endsWith('ь')) {
            return monthName.substring(0, monthName.length - 1) + 'я'
        } else if (monthName.endsWith('й')) {
            return monthName.substring(0, monthName.length - 1) + 'я'
        } else {
            return monthName + 'a'
        }
    }

    console.log(weeksInMonth)

    return (
        <div className="ui-datepicker">
            <div className="ui-datepicker-material-header">
                <div className="ui-datepicker-material-day">{weekDay}</div>
                <div className="ui-datepicker-material-date">
                    <div className="ui-datepicker-material-day-num">{day}</div>
                    <div className="ui-datepicker-material-month">{monthToday}</div>
                    <div className="ui-datepicker-material-year">{year}</div>
                </div>
            </div>
            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                    <span className="ui-datepicker-month">{month}</span>&nbsp;<span
                    className="ui-datepicker-year">{year}</span>
                </div>
            </div>
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
                    <th scope="col" title="Понедельник">Пн</th>
                    <th scope="col" title="Вторник">Вт</th>
                    <th scope="col" title="Среда">Ср</th>
                    <th scope="col" title="Четверг">Чт</th>
                    <th scope="col" title="Пятница">Пт</th>
                    <th scope="col" title="Суббота">Сб</th>
                    <th scope="col" title="Воскресенье">Вс</th>
                </tr>
                </thead>
                <tbody>
                {weeksInMonth.map(week => {
                    return <tr key={week}>
                        {week.map(weekDay => {
                            if (weekDay.date === date.getDate() && weekDay.isCurrentMonth) {
                                return <td className="ui-datepicker-today">{weekDay.date}</td>
                            } else if (!weekDay.isCurrentMonth) {
                                return <td className="ui-datepicker-other-month">{weekDay.date}</td>
                            } else {
                                return <td>{weekDay.date}</td>
                            }
                        })}
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    )
}
