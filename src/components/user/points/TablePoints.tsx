import { Grid, Table, TableColumnsType } from "antd"
import { useTranslation } from "react-i18next"

interface Props {
  loading: boolean
  dataSource: any
}

interface DataType {
  key: number
  subjectName: string
  credit: number
  firstScore: number //Điểm thành phần 1
  secondScore: number //Điểm thành phần 2
  examScore: number //Điểm thi
  finalScore: number //Điểm cuối kỳ
  letterGrade: string //Điểm chữ
}

const { useBreakpoint } = Grid
const TablePoints: React.FC<Props> = ({ loading, dataSource }) => {
  const { t } = useTranslation("points")
  const { md } = useBreakpoint()

  const columns: TableColumnsType<DataType> = [
    {
      title: md ? t("table.subject name") : t("table shorten.subject name"),
      dataIndex: "subjectName",
      fixed: "left",
      width: "200px",
    },
    {
      title: md ? t("table.credit") : t("table shorten.credit"),
      dataIndex: "credit",
      width: md ? "160px" : "80px",
    },
    {
      title: md ? t("table.first score") : t("table shorten.first score"),
      dataIndex: "firstScore",
      width: md ? "160px" : "80px",
    },
    {
      title: md ? t("table.second score") : t("table shorten.second score"),
      dataIndex: "secondScore",
      width: md ? "160px" : "80px",
    },
    {
      title: md ? t("table.exam score") : t("table shorten.exam score"),
      dataIndex: "examScore",
      width: md ? "160px" : "80px",
    },
    {
      title: md ? t("table.final score") : t("table shorten.final score"),
      dataIndex: "finalScore",
      width: md ? "160px" : "80px",
    },
    {
      title: md ? t("table.letter grade") : t("table shorten.letter grade"),
      dataIndex: "letterGrade",
      width: md ? "160px" : "80px",

      sorter: (a, b) => a.finalScore - b.finalScore,
    },
  ]

  const data = dataSource.map((item: any, index: number) => ({
    key: index,
    subjectName: item.subjectName,
    firstScore: item.firstScore,
    secondScore: item.secondScore,
    examScore: item.examScore,
    finalScore: item.finalScore,
    letterGrade: item.letterGrade,
    credit: item.credit,
  }))

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

export default TablePoints
