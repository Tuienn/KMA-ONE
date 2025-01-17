import { DateType } from "../pages/user/schedule/MySchedule"
import { getCurrentDate } from "./common"

export const formatSemesterToObj = (semester: number) => {
  const [year, phase, round] = semester.toString().split("").map(Number)

  return {
    year: year,
    phase: phase,
    round: round,
  }
}

export const formatSemsterOptionValue = (semesterValue: number[]) => {
  return semesterValue.join("")
}

export const createSemesterOptions = (
  lng: string,
  years: number,
  phases: number,
  rounds: number,
) => {
  const yearText = lng === "vi" ? "Năm" : "Year"
  const phaseText = lng === "vi" ? "Kỳ" : "Phase"
  const roundText = lng === "vi" ? "Đợt" : "Round"
  return Array.from({ length: years }, (_, yearIndex: number) => ({
    value: yearIndex + 1,
    label: yearText + ` ${yearIndex + 1}`,
    children: Array.from({ length: phases }, (_, phaseIndex) => ({
      value: phaseIndex + 1,
      label: phaseText + ` ${phaseIndex + 1}`,
      children: Array.from({ length: rounds }, (_, roundIndex) => ({
        value: roundIndex + 1,
        label: roundText + ` ${roundIndex + 1}`,
      })),
    })),
  }))
}

export const getCurrenBatch = () => {
  const date = new Date()
  const currentYear = date.getFullYear()
  const currentMonth = date.getMonth() + 1

  return {
    AT: currentMonth >= 6 ? currentYear - 2003 : currentYear - 2004, //AT bắt đầu AT1 từ 2003
    CT: currentMonth >= 6 ? currentYear - 2015 : currentYear - 2016, //CT bắt đầu CT1 từ 2015
    DT: currentMonth >= 6 ? currentYear - 2016 : currentYear - 2017, //DT bắt đầu DT1 từ 2018
  }
}

const getDay = (day: number, month: number, year: number) => {
  const date = new Date(`${year}/${month}/${day}`)
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

export const getScheduleByMonth = (
  arraySchedule: any[],
  month: number,
  year: number,
) => {
  // Trả về nếu không có lịch hoặc lịch trống
  if (!Array.isArray(arraySchedule) || arraySchedule.length === 0) {
    return []
  }

  // Tìm năm và tháng tương ứng trong một bước
  const getMonth = arraySchedule
    .find((yearSchedule) => yearSchedule.year === year)
    ?.months.find((monthSchedule: any) => monthSchedule.month === month)

  // Trả về các ngày nếu tìm thấy, nếu không trả về mảng rỗng
  return getMonth?.dates || []
}

export const getStartEndSchedule = (arraySchedule: any[]) => {
  const arrayScheduleLength = arraySchedule.length
  const { year, month } = getCurrentDate()

  if (arrayScheduleLength === 0) {
    return {
      start: {
        month,
        year,
      },
      end: { month, year },
    }
  }

  const endMonth =
    arraySchedule[arrayScheduleLength - 1].months[
      arraySchedule[arrayScheduleLength - 1].months.length - 1
    ].month
  return {
    start: {
      year: arraySchedule[0].year > year ? year : arraySchedule[0].year,
      month:
        arraySchedule[0].months[0].month > month
          ? month
          : arraySchedule[0].months[0].month,
    },
    end: {
      year:
        arraySchedule[arrayScheduleLength - 1].year < year
          ? year
          : arraySchedule[arrayScheduleLength - 1].year,
      month: endMonth < month ? month : endMonth,
    },
  }
}

export const getScheduleDayDetail = (scheduleByMonth: any[], date: number) => {
  const dayDetail = scheduleByMonth.find(
    (daySchedule: any) => daySchedule.date === date,
  )
  return dayDetail ? dayDetail.schedules : undefined
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

export const formatStudentData = (data: any, isGet: boolean = true) => {
  if (!isGet) {
    return {
      id: data.id,
      name: data.name,
      studentCode: data.code,
      dob: data.birth,
      gender: data.gender,
      address: data.address,
      phoneNumber: data.phone,
      isActive: data.status,
      account: data.code,
      password: data.code,
    }
  }
  return {
    id: data.id,
    name: data.name,
    code: data.studentCode,
    birth: data.dob,
    gender: data.gender,
    address: data.address,
    phone: data.phoneNumber,
    status: data.isActive,
    gpa: data.gpa ? parseFloat(data.gpa.toFixed(2)) : null,
  }
}

export const formatStudentsForExcel = (lng: "en" | "vi", data: any) => {
  return {
    code: data.studentCode,
    name: data.name,
    dob: data.dob,
    gender:
      data.gender === 0
        ? lng === "vi"
          ? "Nam"
          : "Male"
        : lng === "vi"
          ? "Nữ"
          : "Female",
    phone: data.phoneNumber,
    address: data.address,
    gpa: data.gpa ? parseFloat(data.gpa.toFixed(2)) : "null",
    status: data.isActive
      ? lng === "vi"
        ? "Hoạt động"
        : "Active"
      : lng === "vi"
        ? "Không hoạt động"
        : "Inactive",
  }
}

export const formatScoreByStudentData = (data: any, isGet: boolean = true) => {
  if (!isGet) {
    return {
      course: data.courseName,
      credit: data.credit,
      score1: data.firstScore,
      score2: data.secondScore,
      score3: data.examScore,
      average: data.finalScore,
      letterGrade: data.letterGrade,
      studentName: data.studentName,
      studentCode: data.studentCode,
    }
  }
  return {
    courseName: data.course,
    credit: data.credit,
    firstScore: parseFloat(data.score1.toFixed(2)),
    secondScore: parseFloat(data.score2.toFixed(2)),
    examScore: parseFloat(data.score3.toFixed(2)),
    finalScore: parseFloat(data.average.toFixed(2)),
    letterGrade: data.letterGrade,
    studentName: data.studentName,
    studentCode: data.studentCode,
  }
}

export const formatCoursesForExcel = (data: any) => {
  const { year, phase, round } = formatSemesterToObj(data.semester)
  return {
    courseName: data.courseName,
    credit: data.credit,
    batch: data.batch,
    semester: `${year}-${phase}-${round}`,
    classes: data.classes.join(", "),
  }
}
