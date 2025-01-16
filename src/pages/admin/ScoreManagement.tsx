import { PlusCircleOutlined } from "@ant-design/icons"
import { Button, Tabs } from "antd"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import HeaderCommon from "../../components/admin/common/HeaderCommon"
import ListSearchCommon from "../../components/admin/common/ListSearchCommon"
import { FormItemCommonType } from "../../components/common/formItemCustom/FormItemCommon"
import TableScores from "../../components/common/table/TableScores"
import { UsePath, UseSearch } from "../../context/PathProvider"
import { getCurrenBatch } from "../../utils/formatValue"

const ScoreManagement = () => {
  const { t } = useTranslation(["scoreManagement", "courseManagement"])
  const { history, pathname } = UsePath()
  const [mode, setMode] = useState<"list-by-student" | "list-by-course">(
    pathname.split("/")[2] as "list-by-student" | "list-by-course",
  )
  const { AT, CT, DT } = getCurrenBatch()

  const listSearch: FormItemCommonType[] = [
    {
      type: "query_select",
      name: "studentCode",
      disabled: mode === "list-by-course",
      placeholder: t("listSearch.listPlaceholder.student"),
      className: "w-[calc(40%-8px)]",
      querySetting: {
        initialParams: {},
        linkAPI: "/student/search",
        formatOption: (dataQuery) =>
          dataQuery.students.map((item: any) => ({
            value: item.studentCode,
            label: item.name + " - " + item.studentCode,
          })),
      },
    },
    {
      type: "input",
      name: "courseName",
      disabled: mode === "list-by-student",
      placeholder: t("listSearch.listPlaceholder.courseName"),
      className: "w-[calc(100%/5-8px)]",
    },
    {
      type: "select",
      name: "class",
      disabled: mode === "list-by-student",
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
      className: "w-[calc(100%/5)]",
      placeholder: t("listSearch.listPlaceholder.batch"),
      disabled: mode === "list-by-student",
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
  ]

  const dataSource = [
    {
      courseName: "Mathematics",
      credit: 3,
      firstScore: 8.5,
      secondScore: 7.0,
      examScore: 9.0,
      finalScore: 8.0,
    },
    {
      courseName: "Physics",
      credit: 4,
      firstScore: 7.5,
      secondScore: 6.5,
      examScore: 8.0,
      finalScore: 7.5,
      letterGrade: "C",
    },
    {
      courseName: "Geography",
      credit: 2,
      firstScore: 7.0,
      secondScore: 6.0,
      examScore: 7.5,
      finalScore: 7.0,
      letterGrade: "C+",
    },
    {
      courseName: "Physical Education",
      credit: 1,
      firstScore: 7.5,
      secondScore: 8.0,
      examScore: 8.5,
      finalScore: 8.0,
      letterGrade: "B+",
    },
    {
      courseName: "Computer Science",
      credit: 5,
      firstScore: 9.5,
      secondScore: 9.0,
      examScore: 9.5,
      finalScore: 9.5,
      letterGrade: "A",
    },
    {
      courseName: "Physics",
      credit: 4,
      firstScore: 7.5,
      secondScore: 6.5,
      examScore: 8.0,
      finalScore: 7.5,
      letterGrade: "C",
    },
    {
      courseName: "Geography",
      credit: 2,
      firstScore: 7.0,
      secondScore: 6.0,
      examScore: 7.5,
      finalScore: 7.0,
      letterGrade: "C",
    },
    {
      courseName: "Physical Education",
      credit: 1,
      firstScore: 7.5,
      secondScore: 8.0,
      examScore: 8.5,
      finalScore: 5,
      letterGrade: "B",
    },
  ]

  return (
    <>
      <div className="round-lg bg-white p-2">
        <HeaderCommon
          title={t("header.title")}
          extra={
            <div className="flex gap-2">
              {/* <ExportButton />
              <ImportButton /> */}
              <Button type="primary" icon={<PlusCircleOutlined />}>
                Tạo mới điểm
              </Button>{" "}
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
          defaultValue={pathname.split("/")[2]}
        />
        <ListSearchCommon
          title={t("listSearch.title")}
          listSearch={listSearch}
        />
        <TableScores type={mode} loading={false} dataSource={dataSource} />
      </div>
    </>
  )
}

export default ScoreManagement
