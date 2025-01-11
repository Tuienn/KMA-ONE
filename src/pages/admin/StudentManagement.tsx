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
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [studentIdModal, setStudentIdModal] = useState<string | number>("")
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
      placeholder: t("list search.list placholder.code"),
      className: "w-[calc(100%/5-8px)]",
    },
    {
      type: "input",
      name: "name",
      placeholder: t("list search.list placholder.name"),
      rules: [
        {
          pattern: /[\x5F]+|[a-z]|[0-9]/,
          message: t("notification:form.input pattern"),
        },
      ],
      className: "w-[calc(100%/5-8px)]",
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
      className: "w-[calc(100%/5-8px)]",
    },
    {
      type: "select",
      name: "gender",
      placeholder: t("list search.list placholder.gender"),
      options: [
        { value: 0, label: t("list search.list placholder.gender male") },
        { value: 1, label: t("list search.list placholder.gender female") },
      ],
      className: "w-[calc(100%/5-8px)]",
    },
    {
      type: "input",
      name: "address",
      placeholder: t("list search.list placholder.address"),
      className: "w-[calc(100%/5)]",
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
      className: "w-[calc(100%/5-8px)]",
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
      className: "w-[calc(100%/5-8px)]",
    },
    {
      type: "input",
      name: "courseName",

      placeholder: t("list search.list placholder.course name"),
      className: "w-[calc(100%/5-8px)]",
    },
    {
      type: "select",
      name: "class",

      placeholder: t("list search.list placholder.class"),
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

      placeholder: t("list search.list placholder.batch"),

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
              setStudentIdModal("")
              setOpenModal(true)
            }}
          >
            {t("header.button create")}
          </Button>
        }
      />
      <ListSearchCommon
        title={t("list search.title")}
        listSearch={listSearch}
      />
      <TableStudents
        handleOpenModal={setOpenModal}
        handleSelectStudentCode={setStudentIdModal}
        loading={queryListStudents.isPending}
        handleChangePaging={handleChangePaging}
        dataSource={{
          page: paging,
          total: queryListStudents.isSuccess && queryListStudents.data.total,
          // list: [
          //   {
          //     name: "User 1",
          //     code: "Code_001",
          //     birth: null,
          //     gender: null,
          //     address: null,
          //     phone: null,
          //     status: true,
          //     gpa: 3.5,
          //     id: 1,
          //   },
          //   {
          //     name: "User 2",
          //     code: "Code_002",
          //     birth: "1991-02-12",
          //     gender: 1,
          //     address: "Address 2",
          //     phone: "0901234501",
          //     status: false,
          //     gpa: 3.8,
          //     id: 2,
          //   },
          //   {
          //     name: "User 3",
          //     code: "Code_003",
          //     birth: "1992-03-15",
          //     gender: 0,
          //     address: "Address 3",
          //     phone: "0901234502",
          //     status: true,
          //     gpa: 3.2,
          //     id: 3,
          //   },
          //   {
          //     name: "User 4",
          //     code: "Code_004",
          //     birth: "1993-04-18",
          //     gender: 1,
          //     address: "Address 4",
          //     phone: "0901234503",
          //     status: false,
          //     gpa: 3.9,
          //     id: 4,
          //   },
          //   {
          //     name: "User 5",
          //     code: "Code_005",
          //     birth: "1994-05-20",
          //     gender: 0,
          //     address: "Address 5",
          //     phone: "0901234504",
          //     status: true,
          //     gpa: 3.1,
          //     id: 5,
          //   },
          //   {
          //     name: "User 6",
          //     code: "Code_006",
          //     birth: "1995-06-22",
          //     gender: 1,
          //     address: "Address 6",
          //     phone: "0901234505",
          //     status: false,
          //     gpa: 3.7,
          //     id: 6,
          //   },
          // ],
          list: queryListStudents.isSuccess ? queryListStudents.data.list : [],
        }}
      />
      <ModalInfo
        permission="admin"
        open={openModal}
        setOpen={setOpenModal}
        studentId={studentIdModal === "" ? undefined : studentIdModal}
      />
    </div>
  )
}

export default StudentManagement
