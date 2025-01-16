import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import COURSE_MANAGEMENT_EN from "../admin/en/courseManagement.json"
import LAYOUT_BASIC_EN_ADMIN from "../admin/en/layoutBasic.json"
import SCORE_MANAGEMENT_EN from "../admin/en/scoreManagement.json"
import STUDENT_MANAGEMENT_EN from "../admin/en/studentManagement.json"
import COURSE_MANAGEMENT_VI from "../admin/vi/courseManagement.json"
import LAYOUT_BASIC_VI_ADMIN from "../admin/vi/layoutBasic.json"
import SCORE_MANAGEMENT_VI from "../admin/vi/scoreManagement.json"
import STUDENT_MANAGEMENT_VI from "../admin/vi/studentManagement.json"
import CALENDAR_EN from "../common/en/calendar.json"
import MODAL_INFO_EN from "../common/en/modalInfo.json"
import NOTIFICATION_EN from "../common/en/notification.json"
import SCORES_EN from "../common/en/scores.json"
import CALENDAR_VI from "../common/vi/calendar.json"
import MODAL_INFO_VI from "../common/vi/modalInfo.json"
import NOTIFICATION_VI from "../common/vi/notification.json"
import SCORES_VI from "../common/vi/scores.json"
import CHAT_EN from "../user/en/chat.json"
import CLASS_LIST_EN from "../user/en/classList.json"
import LAYOUT_BASIC_EN_USER from "../user/en/layoutBasic.json"
import CHAT_VI from "../user/vi/chat.json"
import CLASS_LIST_VI from "../user/vi/classList.json"
import LAYOUT_BASIC_VI_USER from "../user/vi/layoutBasic.json"

let i18nLocal = localStorage.getItem("i18n")

if (!i18nLocal) {
  localStorage.setItem("i18n", "vi")
  i18nLocal = "vi"
}

export const locales = {
  en: "English",
  vi: "Tiếng Việt",
}
export const resources = {
  en: {
    layoutBasic_user: LAYOUT_BASIC_EN_USER,
    modalInfo: MODAL_INFO_EN,
    notification: NOTIFICATION_EN,
    calendar: CALENDAR_EN,
    scores: SCORES_EN,
    layoutBasic_admin: LAYOUT_BASIC_EN_ADMIN,
    studentManagement: STUDENT_MANAGEMENT_EN,
    classList: CLASS_LIST_EN,
    chat: CHAT_EN,
    courseManagement: COURSE_MANAGEMENT_EN,
    scoreManagement: SCORE_MANAGEMENT_EN,
  },
  vi: {
    layoutBasic_user: LAYOUT_BASIC_VI_USER,
    modalInfo: MODAL_INFO_VI,
    notification: NOTIFICATION_VI,
    calendar: CALENDAR_VI,
    scores: SCORES_VI,
    layoutBasic_admin: LAYOUT_BASIC_VI_ADMIN,
    studentManagement: STUDENT_MANAGEMENT_VI,
    classList: CLASS_LIST_VI,
    chat: CHAT_VI,
    courseManagement: COURSE_MANAGEMENT_VI,
    scoreManagement: SCORE_MANAGEMENT_VI,
  },
}
export const defaultNS = "LayoutBasic"

i18n.use(initReactI18next).init({
  resources,
  lng: i18nLocal,
  ns: [
    "layoutBasic_user",
    "modalInfo",
    "notification",
    "calendar",
    "scores",
    "layoutBasic_admin",
    "studentManagement",
    "classList",
    "chat",
    "courseManagement",
    "scoreManagement",
  ],
  fallbackLng: "vi",
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
})
