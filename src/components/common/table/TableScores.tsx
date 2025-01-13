import { Grid, Table, TableColumnsType, Tag } from "antd"
import { useTranslation } from "react-i18next"

interface DataType {
  key: number
  courseName?: string
  credit?: number
  studentName?: string
  studentCode?: string
  firstScore: number //Điểm thành phần 1
  secondScore: number //Điểm thành phần 2
  examScore: number //Điểm thi
  finalScore: number //Điểm cuối kỳ
  letterGrade: string //Điểm chữ
}

interface Props {
  loading: boolean
  dataSource: any
  type: "list-by-student" | "list-by-course"
}

const { useBreakpoint } = Grid
const TableScores: React.FC<Props> = ({ loading, dataSource, type }) => {
  const { t } = useTranslation("scores")
  const { md } = useBreakpoint()

  const columns: TableColumnsType<DataType> = [
    {
      title: md ? t("table.courseName") : t("tableShorten.courseName"),
      dataIndex: "courseName",
      fixed: "left",
      width: "200px",
      hidden: type === "list-by-course",
    },
    {
      title: md ? t("table.credit") : t("tableShorten.credit"),
      dataIndex: "credit",
      width: md ? "120px" : "80px",
      hidden: type === "list-by-course",
    },
    {
      title: md ? t("table.studentName") : t("tableShorten.studentName"),
      dataIndex: "studentName",
      fixed: "left",
      width: "200px",
      hidden: type === "list-by-student",
    },
    {
      title: md ? t("table.studentCode") : t("tableShorten.studentCode"),
      dataIndex: "studentCode",
      width: md ? "160px" : "80px",
      hidden: type === "list-by-student",
    },
    {
      title: md ? t("table.firstScore") : t("tableShorten.firstScore"),
      dataIndex: "firstScore",
      width: md ? "160px" : "80px",
    },
    {
      title: md ? t("table.secondScore") : t("tableShorten.secondScore"),
      dataIndex: "secondScore",
      width: md ? "160px" : "80px",
    },
    {
      title: md ? t("table.examScore") : t("tableShorten.examScore"),
      dataIndex: "examScore",
      width: md ? "160px" : "80px",
    },
    {
      title: md ? t("table.finalScore") : t("tableShorten.finalScore"),
      dataIndex: "finalScore",
      width: md ? "160px" : "80px",
    },
    {
      title: md ? t("table.letterGrade") : t("tableShorten.letterGrade"),
      dataIndex: "letterGrade",
      width: md ? "160px" : "80px",
      sorter: (a, b) => a.finalScore - b.finalScore,
    },
  ]

  const data = !loading
    ? dataSource.map((item: any, index: number) => ({
        key: index,
        courseName: item.courseName,
        firstScore: item.firstScore,
        secondScore: item.secondScore,
        examScore: item.examScore,
        finalScore: item.finalScore,
        letterGrade: (
          <Tag color={item.finalScore >= 7.7 ? "green" : "red"}>
            {item.letterGrade}
          </Tag>
        ),
        credit: item.credit,
      }))
    : []

  return (
    <Table
      loading={loading}
      scroll={{ x: 200, y: 600 }}
      columns={columns}
      className="mt-3"
      bordered
      dataSource={data}
      pagination={false}
      // rowClassName={(record, index) => (index % 2 === 0 ? "bg-gray-100" : "")}
    />
  )
}

export default TableScores
