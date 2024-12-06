import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LAYOUT_BASIC_EN_ADMIN from "../admin/en/layoutBasic.json"
import STUDENT_MANAGEMENT_EN from "../admin/en/studentManagement.json"
import LAYOUT_BASIC_VIE_ADMIN from "../admin/vi/layoutBasic.json"
import STUDENT_MANAGEMENT_VIE from "../admin/vi/studentManagement.json"
import CALENDAR_EN from "../common/en/calendar.json"
import FORM_EN from "../common/en/form.json"
import MODAL_INFO_EN from "../common/en/modalInfo.json"
import NOTIFICATION_EN from "../common/en/notification.json"
import POINTS_EN from "../common/en/points.json"
import CALENDAR_VIE from "../common/vi/calendar.json"
import FORM_VIE from "../common/vi/form.json"
import MODAL_INFO_VIE from "../common/vi/modalInfo.json"
import NOTIFICATION_VIE from "../common/vi/notification.json"
import POINTS_VIE from "../common/vi/points.json"
import CLASS_LIST_EN from "../user/en/classList.json"
import LAYOUT_BASIC_EN_USER from "../user/en/layoutBasic.json"
import CLASS_LIST_VIE from "../user/vi/classList.json"
import LAYOUT_BASIC_VIE_USER from "../user/vi/layoutBasic.json"

let i18nLocal = localStorage.getItem("i18n")

if (!i18nLocal) {
  localStorage.setItem("i18n", "vi"), (i18nLocal = "vi")
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
    form: FORM_EN,
    points: POINTS_EN,
    layoutBasic_admin: LAYOUT_BASIC_EN_ADMIN,
    studentManagement: STUDENT_MANAGEMENT_EN,
    classList: CLASS_LIST_EN,
  },
  vi: {
    layoutBasic_user: LAYOUT_BASIC_VIE_USER,
    modalInfo: MODAL_INFO_VIE,
    notification: NOTIFICATION_VIE,
    calendar: CALENDAR_VIE,
    form: FORM_VIE,
    points: POINTS_VIE,
    layoutBasic_admin: LAYOUT_BASIC_VIE_ADMIN,
    studentManagement: STUDENT_MANAGEMENT_VIE,
    classList: CLASS_LIST_VIE,
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
    "form",
    "points",
    "layoutBasic_admin",
    "studentManagement",
  ],
  fallbackLng: "vi",
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
})
