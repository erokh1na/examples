import { CloseOutlined } from "@ant-design/icons"
import clsx from "clsx"
import { useState } from "react"
import styles from "./date-picker.module.scss"
import type { Direction, InputState, InputStateKeys, SelectedDates } from "./types"

function useDatePicker() {
  const TODAY: Date = new Date()
  const DEFAULT_SELECTED_DATES: SelectedDates = {
    first: null,
    last: null,
  }
  const DEFAULT_INPUT_STATE: InputState = {
    value: "",
    placeholder: "Выберите дату",
  }
  const WEEK_DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

  const [currentDate, setCurrentDate] = useState(TODAY)
  const [selectedDates, setSelectedDates] = useState(DEFAULT_SELECTED_DATES)
  const [input, setInput] = useState(DEFAULT_INPUT_STATE)

  const content = {
    header: currentDate.toLocaleString("ru-RU", { month: "long", year: "numeric" }),
    weekDays: WEEK_DAYS,
    dates: getCalendarPerMonth(currentDate),
    input: {
      value: input.value,
      placeholder: input.placeholder,
    },
  }

  function getCalendarPerMonth(date: Date) {
    const daysOnPage = 42
    const year = date.getFullYear()
    const month = date.getMonth()

    const firstDayOfMonth = new Date(year, month, 1)
    const dayOfWeek = firstDayOfMonth.getDay()
    const daysFromPrevMonth = dayOfWeek === 0 ? 6 : dayOfWeek - 1

    const startDate = new Date(year, month, 1 - daysFromPrevMonth)

    const visibleDates = []

    for (let i = 0; i < daysOnPage; i += 1) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i)

      visibleDates.push(currentDate)
    }

    return visibleDates
  }

  function turnCalendarPerMonth(direction: Direction) {
    setCurrentDate((prev) => {
      const copy = new Date(prev)

      if (direction === "prev") copy.setMonth(prev.getMonth() - 1)
      if (direction === "next") copy.setMonth(prev.getMonth() + 1)

      return copy
    })
  }

  function changeInputState(key: InputStateKeys, value: string) {
    return setInput((prev) => ({ ...prev, [key]: value }))
  }

  function selectDate(date: Date) {
    function updateSelectedDates() {
      let newSelectedDates

      if ((selectedDates.first && selectedDates.last) || !selectedDates.first) {
        newSelectedDates = { first: date, last: null }
      } else {
        const newFirst = selectedDates.first
        const newLast = date

        newSelectedDates = newFirst < newLast ? { first: newFirst, last: newLast } : { first: newLast, last: newFirst }
      }

      setSelectedDates(newSelectedDates)
      return newSelectedDates
    }

    function formatInputInterval({ first, last }) {
      if (!first) return

      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
      }

      const firstDate = first.toLocaleString("ru-RU", options)
      const lastDate = last?.toLocaleString("ru-RU", options) || ""

      return lastDate ? `${firstDate} — ${lastDate}` : firstDate
    }

    const newSelectedState = updateSelectedDates()
    const newInputInterval = formatInputInterval(newSelectedState)

    changeInputState("value", newInputInterval)
  }

  function resetDate() {
    setSelectedDates(DEFAULT_SELECTED_DATES)
    changeInputState("value", "")
  }

  function styleValidator() {
    function isSameDate(date: Date, compareDate: Date) {
      return date?.toDateString() === compareDate?.toDateString()
    }

    function isToday(date: Date) {
      return isSameDate(date, new Date())
    }

    function isCurrentMonth(date: Date) {
      return date.getMonth() === currentDate.getMonth()
    }

    function isDateInInterval(date: Date) {
      return date >= selectedDates?.first && date <= selectedDates?.last
    }

    function isActiveDate(date: Date) {
      return isSameDate(date, selectedDates?.first) || isSameDate(date, selectedDates?.last)
    }

    return {
      isToday,
      isCurrentMonth,
      isDateInInterval,
      isActiveDate,
    }
  }

  return {
    content,
    turnCalendarPerMonth,
    selectDate,
    resetDate,
    styleValidator,
  }
}

export const DatePicker = () => {
  const datePicker = useDatePicker()
  const styleValidator = datePicker.styleValidator()

  return (
    <div className={styles["date-picker"]}>
      <div className={styles["input-wrapper"]}>
        <input
          readOnly
          className={styles.input}
          placeholder={datePicker.content.input.placeholder}
          value={datePicker.content.input.value}
        />
        <CloseOutlined onClick={datePicker.resetDate} />
      </div>

      <div className={styles.panel}>
        <div className={styles.head}>
          <button onClick={() => datePicker.turnCalendarPerMonth("prev")}>←</button>
          {datePicker.content.header}
          <button onClick={() => datePicker.turnCalendarPerMonth("next")}>→</button>
        </div>

        <div className={styles.body}>
          <>
            {datePicker.content.weekDays.map((day) => (
              <div className={styles["week-day"]} key={day}>
                {day}
              </div>
            ))}
            {datePicker.content.dates.map((date: Date) => (
              <button
                className={clsx(styles.date, {
                  [styles["date-current-month"]]: styleValidator.isCurrentMonth(date),
                  [styles["date-active"]]: styleValidator.isActiveDate(date),
                  [styles["date-interval"]]: styleValidator.isDateInInterval(date),
                  [styles["date-today"]]: styleValidator.isToday(date),
                })}
                key={date.toISOString()}
                onClick={() => datePicker.selectDate(date)}
              >
                {date.getDate()}
              </button>
            ))}
          </>
        </div>
      </div>
    </div>
  )
}
