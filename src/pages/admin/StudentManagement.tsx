import dayjs from "dayjs"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import HeaderCommon from "../../components/admin/common/HeaderCommon"
import ListSearchCommon from "../../components/admin/common/ListSearchCommon"
import { FormItemCommonType } from "../../components/common/formItemCustom/FormItemCommon"
import ModalInfo from "../../components/common/ModalInfo"
import { UsePath } from "../../context/PathProvider"

const StudentManagement = () => {
  const { t } = useTranslation(["studentManagement", "notification"])
  const [openModal, setOpenModal] = useState<boolean>(false)

  const listSearch: FormItemCommonType[] = [
    {
      type: "input",
      name: "code",
      placeholder: t("list search.list placholder.code"),
      className: "w-[calc(100%/3-8px)]",
    },
    {
      type: "input",
      name: "name",
      placeholder: t("list search.list placholder.name"),
      rules: [
        {
          pattern: /^[a-zA-Z]+$/,
          message: t("notification:form.input pattern"),
        },
      ],
      className: "w-[calc(100%/3-8px)]",
    },
    {
      type: "date_picker",
      name: "dob",
      placeholder: t("list search.list placholder.dob"),
      dateSetting: {
        type: "date",
        minDate: dayjs(`${new Date().getFullYear() - 40}/00/00`, "YYYY/MM/DD"),
        maxDate: dayjs(`${new Date().getFullYear() - 18}/00/00`, "YYYY/MM/DD"),
      },
      className: "w-[calc(100%/3-8px)]",
    },
    {
      type: "select",
      name: "gender",
      placeholder: t("list search.list placholder.gender"),
      options: [
        { value: 0, label: t("list search.list placholder.gender male") },
        { value: 1, label: t("list search.list placholder.gender female") },
      ],
      className: "w-[calc(100%/4-8px)]",
    },
    {
      type: "input",
      name: "address",
      placeholder: t("list search.list placholder.address"),
      className: "w-[calc(100%/4-8px)]",
    },
    {
      type: "input",
      name: "phone",
      placeholder: t("list search.list placholder.phone"),
      rules: [
        {
          pattern: /^\d+$/,
          message: t("notification:form.input pattern"),
        },
      ],
      className: "w-[calc(100%/4-8px)]",
    },
    {
      type: "select",
      name: "isActive",
      placeholder: t("list search.list placholder.status"),
      options: [
        {
          value: "true",
          label: t("list search.list placholder.status active"),
        },
        {
          value: "false",
          label: t("list search.list placholder.status inactive"),
        },
      ],
      className: "w-[calc(100%/4-8px)]",
    },
  ]

  const { searchPath } = UsePath()
  console.log(searchPath)

  return (
    <div className="rounded-lg bg-white p-2">
      <HeaderCommon
        title={t("header.title")}
        button={t("header.button")}
        buttonClick={setOpenModal}
      />
      <ListSearchCommon
        title={t("list search.title")}
        buttonSearch={t("list search.button search")}
        buttonReset={t("list search.button reset")}
        listSearch={listSearch}
      />
      <ModalInfo
        permission="admin"
        open={openModal}
        setOpen={setOpenModal}
        adminCreateMode={true}
      />
    </div>
  )
}

export default StudentManagement
