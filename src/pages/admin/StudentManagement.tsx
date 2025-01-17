import { PlusCircleOutlined } from "@ant-design/icons"
import { useMutation, useQuery } from "@tanstack/react-query"
import { App, Button } from "antd"
import dayjs from "dayjs"
import i18next from "i18next"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import apiService from "../../api/APIService"
import HeaderCommon from "../../components/admin/common/HeaderCommon"
import ListSearchCommon from "../../components/admin/common/ListSearchCommon"
import { FormItemCommonType } from "../../components/common/formItemCustom/FormItemCommon"
import ExportButton from "../../components/common/handleFileButton/ExportButton"
import ModalInfo from "../../components/common/ModalInfo"
import TableStudents from "../../components/common/table/TableStudents"
import { UsePath } from "../../context/PathProvider"
import {
  formatStudentData,
  formatStudentsForExcel,
} from "../../utils/formatValue"

const StudentManagement = () => {
  const { t } = useTranslation([
    "studentManagement",
    "notification",
    "modalInfo",
  ])
  const [studentModalState, setStudentModalState] = useState<{
    isOpen: boolean
    studentId: number | null
  }>({
    isOpen: false,
    studentId: null,
  })

  const [paging, setPaging] = useState<number>(1)
  const { notification, message } = App.useApp()
  const { searchPath } = UsePath()

  const queryCourses = useQuery({
    queryKey: ["GET", "courses"],
    queryFn: async () => {
      const res = await apiService("get", "/course")
      return res.items.map((item: any) => ({
        value: item.id,
        label: item.name + " - " + item.batch,
      }))
    },
    staleTime: Infinity,
  })
  const mutationFilterStudents = useMutation({
    mutationKey: ["POST", "student-list", searchPath],
    mutationFn: async () => {
      const res = await apiService(
        "post",
        "/student/Filter",
        {},
        {
          pageIndex: paging,
          pageSize: 25,
          sortBy: "Name",
          sortDesc: false,
          ...searchPath,
          batch: searchPath.batch?.[1],
        },
      )
      return {
        page: paging,
        total: res.total,
        list: res.studentresult.map((item: any) => formatStudentData(item)),
      }
    },
    onError: () => {
      notification.error({
        message: t("notification:api.title"),
        description: t("notification:api.get.error"),
      })
    },
  })
  const mutationFilterAllStudents = useMutation({
    mutationKey: ["POST", "all-student-list"],
    mutationFn: async () => {
      const res = await apiService(
        "post",
        "/student/Filter",
        {},
        {
          sortBy: "Name",
          sortDesc: false,
          ...searchPath,
          batch: searchPath.batch?.[1],
        },
      )
      return res.studentresult.map((item: any) =>
        formatStudentsForExcel(i18next.language as "en" | "vi", item),
      )
    },
  })
  const handleChangePaging = (page: number) => {
    setPaging(page)
  }

  const handleRefecthFilter = () => {
    setPaging(1)
    mutationFilterStudents.mutate()
  }

  useEffect(() => {
    if (!searchPath.courseId && searchPath.className) {
      message.warning(t("listSearch.warning"))
    }

    mutationFilterStudents.mutate()
  }, [searchPath, paging])

  const listSearch: FormItemCommonType[] = [
    {
      type: "input",
      name: "studentCode",
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
      name: "phoneNumber",
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
      type: "search_select",
      name: "courseId",
      placeholder: t("listSearch.listPlaceholder.courseName"),
      options: queryCourses.isSuccess ? queryCourses.data : [],
      className: "w-[calc(200%/5-8px)]",
    },
    {
      type: "select",
      name: "className",

      placeholder: t("listSearch.listPlaceholder.class"),
      options: [
        { value: "L01", label: "L01" },
        { value: "L02", label: "L02" },
        { value: "L03", label: "L03" },
        { value: "L04", label: "L04" },
        { value: "L05", label: "L05" },
      ],
      className: "w-[calc(100%/5)]",
    },
  ]

  return (
    <div className="rounded-lg bg-white p-2">
      <HeaderCommon
        title={t("header.title")}
        extra={
          <div className="flex gap-2">
            <div
              className="inline"
              onClick={() => mutationFilterAllStudents.mutate()}
            >
              <ExportButton
                fileName="new_excel_students"
                headers={[
                  t("modalInfo:information.studentCode"),
                  t("modalInfo:information.name"),
                  t("modalInfo:information.birth"),
                  t("modalInfo:information.gender"),
                  t("modalInfo:information.phone"),
                  t("modalInfo:information.address"),
                  "GPA",
                  t("modalInfo:information.status"),
                ]}
                dataRows={
                  mutationFilterAllStudents.isSuccess
                    ? mutationFilterAllStudents.data
                    : []
                }
                loading={mutationFilterAllStudents.isPending}
              />
            </div>
            {/* <ImportButton /> */}
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
            </Button>{" "}
          </div>
        }
      />
      <ListSearchCommon title={t("listSearch.title")} listSearch={listSearch} />
      <TableStudents
        handleSelectStudentCode={setStudentModalState}
        loading={mutationFilterStudents.isPending}
        handleChangePaging={handleChangePaging}
        permission="admin"
        dataSource={{
          page: paging,
          total: mutationFilterStudents.isSuccess
            ? mutationFilterStudents.data.total
            : 0,
          list: mutationFilterStudents.isSuccess
            ? mutationFilterStudents.data.list
            : [],
        }}
      />
      <ModalInfo
        permission="admin"
        open={studentModalState.isOpen}
        setStudentModalState={setStudentModalState}
        studentId={studentModalState.studentId}
        refetchFilter={handleRefecthFilter}
      />
    </div>
  )
}

export default StudentManagement
