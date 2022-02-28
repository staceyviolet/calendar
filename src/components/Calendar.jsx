import * as React from 'react'
import CalendarHeader from "./CalendarHeader";
import CalendarMaterialHeader from "./CalendarMaterialHeader";
import CalendarBody from "./CalendarBody";

function Calendar(props) {
    const {date} = props

    const day = date.getDate()
    const weekDay = date.toLocaleString('ru-ru', {weekday: 'long'})
    const month = date.toLocaleString('ru-ru', {month: 'long'})
    const currentDateMonth = formatMonthName(month)
    const year = date.getFullYear()
    const weeksInMonth = getWeeksInMonth(date)

    return (
        <div className="ui-datepicker">
            <CalendarMaterialHeader weekDay={weekDay}
                                    day={day}
                                    currentDateMonth={currentDateMonth}
                                    year={year}/>
            <CalendarHeader month={month} year={year}/>
            <CalendarBody weeksInMonth={weeksInMonth} day={day}/>
        </div>
    )
}

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

export default Calendar
