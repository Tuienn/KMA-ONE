import { useMutation, useQuery } from "@tanstack/react-query"
import { App, Tabs } from "antd"
import i18next from "i18next"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import apiService from "../../api/APIService"
import HeaderCommon from "../../components/admin/common/HeaderCommon"
import ListSearchCommon from "../../components/admin/common/ListSearchCommon"
import { FormItemCommonType } from "../../components/common/formItemCustom/FormItemCommon"
import TableScores from "../../components/common/table/TableScores"
import { UsePath, UseSearch } from "../../context/PathProvider"
import {
  createSemesterOptions,
  formatScoreByStudentData,
  formatSemsterOptionValue,
} from "../../utils/formatValue"

const ScoreManagement = () => {
  const { t } = useTranslation(["scoreManagement", "notification"])
  const { notification, message } = App.useApp()
  const { history, pathname, searchPath } = UsePath()
  const [paging, setPaging] = useState<number>(1)
  const [mode, setMode] = useState<"list-by-student" | "list-by-course">(
    pathname.split("/")[2] as "list-by-student" | "list-by-course",
  )
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

  const listSearch: FormItemCommonType[] = [
    {
      type: "query_select",
      name: "studentCode",
      placeholder: t("listSearch.listPlaceholder.student"),
      className: "w-[calc(20%-8px)]",
      querySetting: {
        // initialParams: {
        //   keyword: searchPath.studentCode,
        // },
        linkAPI: "/student/search",

        formatOption: (dataQuery) =>
          dataQuery.students.map((item: any) => ({
            value: item.studentCode,
            label: item.name + " - " + item.studentCode,
          })),
      },
    },
    {
      className: "w-[calc(20%-8px)]",
      disabled: mode === "list-by-course",
      placeholder: t("listSearch.listPlaceholder.semester"),
      type: "cascader_select",
      name: "semester",
      options: createSemesterOptions(i18next.language, 5, 2, 2),
      cascaderSetting: {
        isFullRender: true,
        changeOnSelect: true,
      },
    },
    {
      type: "search_select",
      name: "courseId",
      disabled: mode === "list-by-student",
      placeholder: t("listSearch.listPlaceholder.courseName"),
      options: queryCourses.isSuccess ? queryCourses.data : [],
      className: "w-[calc(200%/5-8px)]",
    },
    {
      type: "select",
      name: "className",
      disabled: mode === "list-by-student",
      placeholder: t("listSearch.listPlaceholder.class"),
      options: [
        { value: "L01", label: "L01" },
        { value: "L02", label: "L02" },
        { value: "L03", label: "L03" },
        { value: "L04", label: "L04" },
        { value: "L05", label: "L05" },
      ],
      className: "w-1/5",
    },
  ]

  const queryScoreByStudent = useQuery({
    queryKey: ["GET", "scoreByStudent", searchPath],
    queryFn: async () => {
      const formatSemester =
        searchPath.semester && formatSemsterOptionValue(searchPath.semester)
      const res = await apiService("get", "/student/score", {
        studentCode: searchPath.studentCode,
        semester: formatSemester,
      })

      return {
        list: res.scores.map((item: any) => formatScoreByStudentData(item)),
      }
    },
    staleTime: Infinity,
    enabled: !!searchPath.studentCode && mode === "list-by-student",
  })

  const mutateScoresByCourse = useMutation({
    mutationKey: ["POST", "scoreByCourse", searchPath],
    mutationFn: async () => {
      const res = await apiService(
        "post",
        "/Course/filter-scores",
        {},
        {
          page: {
            SortBy: "Name",
            SortDesc: false,
            pageSize: 25,
            pageIndex: paging,
          },
          ...searchPath,
        },
      )
      return {
        list: res.scores.map((item: any) => formatScoreByStudentData(item)),
        total: res.total,
        page: paging,
      }
    },
  })

  useEffect(() => {
    if (mode === "list-by-course") {
      if (!searchPath.courseId) {
        message.warning(t("listSearch.warning"))
        return
      }
      mutateScoresByCourse.mutate()
    } else {
      if (!searchPath.studentCode) {
        message.warning(t("listSearch.warningStudent"))
      }
    }
  }, [searchPath, paging])

  useEffect(() => {
    if (queryScoreByStudent.isError) {
      notification.error({
        message: t("notification:api.title"),
        description: t("notification:api.get.error"),
      })
    }
  }, [queryScoreByStudent.isError])

  return (
    <>
      <div className="round-lg bg-white p-2">
        <HeaderCommon
          title={t("header.title")}
          extra={
            <div className="flex gap-2">
              {/* <ExportButton />
              <ImportButton /> */}
              {/* <Button type="primary" icon={<PlusCircleOutlined />}>
                Tạo mới điểm
              </Button>{" "} */}
            </div>
          }
        />
        <Tabs
          items={[
            {
              label: t("header.mode.studentList"),
              key: "list-by-student",
            },
            {
              label: t("header.mode.courseList"),
              key: "list-by-course",
            },
          ]}
          onChange={(value) => {
            setMode(value as "list-by-student" | "list-by-course")
            UseSearch(history, `/score-management/${value}`, {})
          }}
          className="mt-3 h-[50px]"
          defaultActiveKey={pathname.split("/")[2]}
        />
        <ListSearchCommon
          title={t("listSearch.title")}
          listSearch={listSearch}
        />
        <TableScores
          type={mode}
          loading={
            queryScoreByStudent.isLoading || mutateScoresByCourse.isPending
          }
          dataSource={
            mode === "list-by-student"
              ? queryScoreByStudent.isSuccess
                ? queryScoreByStudent.data?.list
                : []
              : mutateScoresByCourse.isSuccess
                ? mutateScoresByCourse.data
                : []
          }
          handleChangePaging={
            mode === "list-by-student" ? undefined : setPaging
          }
        />
      </div>
    </>
  )
}

export default ScoreManagement
