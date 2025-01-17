import { Dayjs } from "dayjs"
import { DateType } from "../pages/user/schedule/MySchedule"

export const formatDateToString = (date: Dayjs) => {
  return date.format("YYYY/MM/DD")
}
export const getFirstLetterName = (name: string) => {
  const groupStr: string[] = name.split(" ")
  return groupStr[groupStr.length - 1][0]
}
export const compareIgnoreCaseAndDiacritics = (
  input: string,
  label: string,
) => {
  const removeDiacritics = (char: string) =>
    char
      .normalize("NFD") // Tách ký tự và dấu
      .replace(/[\u0300-\u036f]/g, "") // Xóa dấu
      .toLowerCase() // Chuyển về chữ thường
  return removeDiacritics(label).includes(removeDiacritics(input))
}
export const getCurrentDate = () => {
  const now = new Date()

  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const date = now.getDate()

  return {
    date,
    month,
    year,
  }
}
export const getNextMonthYear = (month: number, year: number) => {
  if (month === 12) {
    return { month: 1, year: year + 1 }
  }
  return { month: month + 1, year }
}
export const getPreviousMonthYear = (month: number, year: number) => {
  if (month === 1) {
    return { month: 12, year: year - 1 }
  }
  return { month: month - 1, year }
}

export const getSlideCalendar = (
  month: number,
  year: number,
  fullArrayCalendar: DateType[],
) => {
  return fullArrayCalendar.findIndex(
    (value) => value.month === month && value.year === year,
  )
}
