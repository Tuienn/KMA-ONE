import { PlusCircleOutlined } from "@ant-design/icons"
import { useMutation } from "@tanstack/react-query"
import { App, Button } from "antd"
import i18next from "i18next"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import apiService from "../../api/APIService"
import HeaderCommon from "../../components/admin/common/HeaderCommon"
import ListSearchCommon from "../../components/admin/common/ListSearchCommon"
import ModalCourse from "../../components/admin/courseManagement/ModalCourse"
import TableCourses from "../../components/admin/courseManagement/TableCourses"
import { FormItemCommonType } from "../../components/common/formItemCustom/FormItemCommon"
import ExportButton from "../../components/common/handleFileButton/ExportButton"
import { UsePath } from "../../context/PathProvider"
import {
  createSemesterOptions,
  formatCoursesForExcel,
  getCurrenBatch,
} from "../../utils/formatValue"

const CourseManagement = () => {
  const { t } = useTranslation(["courseManagement", "notification"])
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { AT, CT, DT } = getCurrenBatch()
  const [paging, setPaging] = useState<number>(1)
  const [courseIdModal, setCourseIdModal] = useState<string | number>("")
  const { notification } = App.useApp()
  const { searchPath } = UsePath()
  useEffect(() => {
    if (!openModal) {
      setCourseIdModal("")
    }
  }, [openModal])

  const muatateFilterCourse = useMutation({
    mutationKey: ["POST", "filter-course"],
    mutationFn: async () => {
      const res = await apiService(
        "post",
        "/course/filter",
        {},
        {
          pageSize: 25,
          pageIndex: paging,
          sortBy: "Id",
          SortDesc: false,
          ...searchPath,
          batch: searchPath.batch?.[1],
          semester: Number(searchPath.semester?.join("")),
        },
      )
      return {
        page: paging,
        total: res.total,
        list: res.courses,
      }
    },
    onError: () =>
      notification.error({
        message: t("notification:api.title"),
        description: t("notification:api.get.error"),
      }),
  })

  const mutateFilterAllCourses = useMutation({
    mutationKey: ["POST", "filter-all-courses"],
    mutationFn: async () => {
      const res = await apiService(
        "post",
        "/course/filter",
        {},
        {
          sortBy: "Id",
          SortDesc: false,
          ...searchPath,
          batch: searchPath.batch?.[1],
          semester: Number(searchPath.semester?.join("")),
        },
      )
      return res.courses.map((item: any) => formatCoursesForExcel(item))
    },
    onError: () =>
      notification.error({
        message: t("notification:api.title"),
        description: t("notification:api.get.error"),
      }),
  })

  useEffect(() => {
    muatateFilterCourse.mutate()
  }, [searchPath, paging])

  const handleRefecthFilter = () => {
    setPaging(1)
    muatateFilterCourse.mutate()
  }
  const listSearch: FormItemCommonType[] = [
    {
      type: "input",
      name: "courseName",
      placeholder: t("listSearch.listPlaceholder.name"),
      className: "w-[calc(100%/4-8px)]",
    },
    {
      type: "select",
      name: "credit",
      placeholder: t("listSearch.listPlaceholder.credit"),
      options: [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
      ],
      className: "w-[calc(100%/4-8px)]",
    },
    {
      type: "cascader_select",
      name: "batch",
      className: "w-[calc(100%/4-8px)]",
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
    },
    {
      type: "cascader_select",
      placeholder: t("listSearch.listPlaceholder.semester"),
      name: "semester",
      className: "w-[calc(100%/4)]",
      cascaderSetting: {
        isFullRender: true,
      },
      options: createSemesterOptions(i18next.language, 5, 2, 2),
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
              onClick={() => mutateFilterAllCourses.mutate()}
            >
              <ExportButton
                fileName="new_excel_courses"
                headers={[
                  t("table.name"),
                  t("table.credit"),
                  t("table.batch"),
                  t("table.semester"),
                  t("table.class"),
                ]}
                dataRows={
                  mutateFilterAllCourses.isSuccess
                    ? mutateFilterAllCourses.data
                    : []
                }
                loading={mutateFilterAllCourses.isPending}
              />
            </div>
            {/* <ImportButton /> */}
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={() => setOpenModal(true)}
            >
              {t("header.buttonCreate")}
            </Button>
          </div>
        }
      />
      <ListSearchCommon title={t("listSearch.title")} listSearch={listSearch} />
      <TableCourses
        loading={muatateFilterCourse.isPending}
        dataSource={muatateFilterCourse.data}
        handleChangePaging={setPaging}
        handleOpenModal={setOpenModal}
        handleSelectCourseId={setCourseIdModal}
      />
      <ModalCourse
        open={openModal}
        handleOpen={setOpenModal}
        courseId={courseIdModal === "" ? undefined : courseIdModal}
        handleRefetch={handleRefecthFilter}
      />
    </div>
  )
}

export default CourseManagement
