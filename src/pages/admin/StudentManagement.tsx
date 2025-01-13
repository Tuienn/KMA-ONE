import { PlusCircleOutlined } from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query"
import { App, Button } from "antd"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import apiService from "../../api/APIService"
import HeaderCommon from "../../components/admin/common/HeaderCommon"
import ListSearchCommon from "../../components/admin/common/ListSearchCommon"
import { FormItemCommonType } from "../../components/common/formItemCustom/FormItemCommon"
import ModalInfo from "../../components/common/ModalInfo"
import TableStudents from "../../components/common/table/TableStudents"
import { formatStudentData, getCurrenBatch } from "../../utils/formatValue"

const StudentManagement = () => {
  const { t } = useTranslation(["studentManagement", "notification"])

  const [studentModalState, setStudentModalState] = useState<{
    isOpen: boolean
    studentId: number | null
  }>({
    isOpen: false,
    studentId: null,
  })
  const { AT, CT, DT } = getCurrenBatch()
  const [paging, setPaging] = useState<number>(1)
  const { notification } = App.useApp()

  const handleChangePaging = (page: number) => {
    setPaging(page)
  }

  const queryListStudents = useQuery({
    queryKey: ["GET", "student-list", paging],
    queryFn: async () => {
      const res = await apiService("get", "/student", {
        pageIndex: paging,
        pageSize: 25,
      })

      return {
        page: paging,
        total: res.total,
        list: res.items.map((item: any) => formatStudentData(item)),
      }
    },
  })

  useEffect(() => {
    if (queryListStudents.isError) {
      notification.error({
        message: t("notification:api.title"),
        description: t("notification:api.get.error"),
      })
    }
  }, [queryListStudents.isError])

  const listSearch: FormItemCommonType[] = [
    {
      type: "input",
      name: "code",
      placeholder: t("listSearch.listPlaceholder.code"),
      className: "w-[calc(100%/5-8px)]",
    },
    {
      type: "input",
      name: "name",
      placeholder: t("listSearch.listPlaceholder.name"),
      rules: [
        {
          pattern: /[\x5F]+|[a-z]|[0-9]/,
          message: t("notification:form.inputPattern"),
        },
      ],
      className: "w-[calc(100%/5-8px)]",
    },
    {
      type: "date_picker",
      name: "dob",
      placeholder: t("listSearch.listPlaceholder.dob"),
      dateSetting: {
        type: "date",
        minDate: dayjs(`${new Date().getFullYear() - 40}/00/00`, "YYYY/MM/DD"),
        maxDate: dayjs(`${new Date().getFullYear() - 18}/00/00`, "YYYY/MM/DD"),
      },
      className: "w-[calc(100%/5-8px)]",
    },
    {
      type: "select",
      name: "gender",
      placeholder: t("listSearch.listPlaceholder.gender"),
      options: [
        { value: 0, label: t("listSearch.listPlaceholder.genderMale") },
        { value: 1, label: t("listSearch.listPlaceholder.genderFemale") },
      ],
      className: "w-[calc(100%/5-8px)]",
    },
    {
      type: "input",
      name: "address",
      placeholder: t("listSearch.listPlaceholder.address"),
      className: "w-[calc(100%/5)]",
    },
    {
      type: "input",
      name: "phone",
      placeholder: t("listSearch.listPlaceholder.phone"),
      rules: [
        {
          pattern: /^\d+$/,
          message: t("notification:form.inputPattern"),
        },
      ],
      className: "w-[calc(100%/5-8px)]",
    },
    {
      type: "select",
      name: "isActive",
      placeholder: t("listSearch.listPlaceholder.status"),
      options: [
        {
          value: "true",
          label: t("listSearch.listPlaceholder.statusActive"),
        },
        {
          value: "false",
          label: t("listSearch.listPlaceholder.statusInactive"),
        },
      ],
      className: "w-[calc(100%/5-8px)]",
    },
    {
      type: "input",
      name: "courseName",

      placeholder: t("listSearch.listPlaceholder.courseName"),
      className: "w-[calc(100%/5-8px)]",
    },
    {
      type: "select",
      name: "class",

      placeholder: t("listSearch.listPlaceholder.class"),
      options: [
        { value: "L01", label: "L01" },
        { value: "L02", label: "L02" },
        { value: "L03", label: "L03" },
        { value: "L04", label: "L04" },
        { value: "L05", label: "L05" },
      ],
      className: "w-[calc(100%/5-8px)]",
    },
    {
      type: "cascader_select",
      name: "batch",

      placeholder: t("listSearch.listPlaceholder.batch"),

      options: [
        {
          value: "AT",
          label: "AT",
          children: Array.from({ length: AT }, (_, i) => ({
            value: `AT${i + 1}`,
            label: `AT${i + 1}`,
          })),
        },
        {
          value: "CT",
          label: "CT",
          children: Array.from({ length: CT }, (_, i) => ({
            value: `CT${i + 1}`,
            label: `CT${i + 1}`,
          })),
        },
        {
          value: "DT",
          label: "DT",
          children: Array.from({ length: DT }, (_, i) => ({
            value: `DT${i + 1}`,
            label: `DT${i + 1}`,
          })),
        },
      ],
      className: "w-[calc(100%/5)]",
    },
  ]

  return (
    <div className="rounded-lg bg-white p-2">
      <HeaderCommon
        title={t("header.title")}
        extra={
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => {
              setStudentModalState({
                isOpen: true,
                studentId: null,
              })
            }}
          >
            {t("header.buttonCreate")}
          </Button>
        }
      />
      <ListSearchCommon title={t("listSearch.title")} listSearch={listSearch} />
      <TableStudents
        handleSelectStudentCode={setStudentModalState}
        loading={queryListStudents.isPending}
        handleChangePaging={handleChangePaging}
        permission="admin"
        dataSource={{
          page: paging,
          total: queryListStudents.isSuccess && queryListStudents.data.total,
          list: queryListStudents.isSuccess ? queryListStudents.data.list : [],
        }}
      />
      <ModalInfo
        permission="admin"
        open={studentModalState.isOpen}
        setStudentModalState={setStudentModalState}
        studentId={studentModalState.studentId}
      />
    </div>
  )
}

export default StudentManagement
