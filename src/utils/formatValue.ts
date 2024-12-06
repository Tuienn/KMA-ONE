import { DateType } from "../pages/user/schedule/MySchedule"

export const formatOptionsSemester = (
  semester: number,
  language: "vi" | "en",
) => {
  const [year, sem] = semester.toString().split("").map(Number)
  // return (
  //   [
  //     {value: 10, label: `${language === 'vi' ? 'Năm học' : 'Academic year'} ${year} - ${language === 'vi' ? 'Học kỳ' : 'Semester'} ${sem}`},
  //   ]
  // )
}

const getDay = (day: number, month: number, year: number) => {
  const date = new Date(`${year}-${month}-${day}`)
  return date.getDay()
}
const countDayOfMonth = (month: number, year: number): number => {
  const nextMonth = new Date(year, month, 0)
  return nextMonth.getDate()
}

export const getArrayCalendar = (month: number, year: number) => {
  const monthCalendar: number[] = []
  const firstDay =
    getDay(1, month, year) - 1 < 0 ? 6 : getDay(1, month, year) - 1
  const countDateOfMonth = countDayOfMonth(month, year)

  for (let i = 0; i < firstDay; i++) {
    monthCalendar.push(0)
  }
  for (let i = 0; i < countDateOfMonth; i++) {
    monthCalendar.push(i + 1)
  }
  if (monthCalendar.length < 42) {
    const length = 42 - monthCalendar.length
    for (let i = 0; i < length; i++) {
      monthCalendar.push(0)
    }
  }

  return monthCalendar
}

export const convertStar_EndToArrayCalendar = (
  startMonth: number,
  startYear: number,
  endMonth: number,
  endYear: number,
) => {
  const arrayCalendar: DateType[] = []

  for (let y = startYear; y <= endYear; y++) {
    for (let m = 1; m <= 12; m++) {
      if (y === startYear && m < startMonth) {
        continue
      }
      if (y === endYear && m > endMonth) {
        break
      }

      arrayCalendar.push({
        month: m,
        year: y,
      })
    }
  }
  return arrayCalendar
}

// format data of session (int) to string in component CardSession
export const formatSessionCalendar_object = (
  session: number,
): {
  start: string
  end: string
  sessionCource: string
} => {
  // 1 -> ca 1, 2, 3 (7:00 -> 09:25)
  // 2 -> ca 4, 5, 6 (9:30 -> 12:00)
  // 3 -> ca 7, 8, 9 (12:30 -> 14:55)
  // 4 -> ca 10, 11, 12 (15:05 -> 17:30)
  // 5 -> ca 13, 14, 15, 16 (18:00 -> 20:25)
  if (session === 1) {
    return {
      start: "07:00",
      end: "09:25",
      sessionCource: "1, 2, 3",
    }
  } else if (session === 2) {
    return {
      start: "09:30",
      end: "12:00",
      sessionCource: "4, 5, 6",
    }
  } else if (session === 3) {
    return {
      start: "12:30",
      end: "14:55",
      sessionCource: "7, 8, 9",
    }
  } else if (session === 4) {
    return {
      start: "15:05",
      end: "17:30",
      sessionCource: "10, 11, 12",
    }
  } else {
    return {
      start: "18:00",
      end: "20:25",
      sessionCource: "13, 14, 15, 16",
    }
  }
}

export const formatOptionsAddress = (dataQuery: any) => {
  return dataQuery?.map((data: any) => ({
    label: data.name,
    value: data.id,
  }))
}
