import { Table, TableColumnsType, Tag } from "antd"
import { useTranslation } from "react-i18next"
import { formatOptionsSemester } from "../../../utils/formatValue"

interface Props {
  loading: boolean
  dataSource: any
}

interface DataType {
  key: number
  name: string
  credit: number
  batch: string
  semester: number
  class: string[]
}

const TableCourses: React.FC<Props> = ({ loading, dataSource }) => {
  const { t } = useTranslation("courseManagement")
  const columns: TableColumnsType<DataType> = [
    {
      title: t("table.name"),
      dataIndex: "name",
      width: "300px",
      fixed: "left",
    },
    {
      title: t("table.credit"),
      dataIndex: "credit",
      width: "160px",
    },
    {
      title: t("table.batch"),
      dataIndex: "batch",
      width: "160px",
    },
    {
      title: t("table.semester"),
      dataIndex: "semester",
      width: "160px",
    },
    {
      title: t("table.class"),
      dataIndex: "class",
      width: "160px",
    },
  ]

  const data = dataSource.map((item: any, index: number) => {
    const { phase, year, round } = formatOptionsSemester(item.semester)

    return {
      key: index,
      name: item.name,
      credit: item.credit,
      batch: item.batch,
      semester:
        t("list search.list placholder.semester year") +
        " " +
        year +
        "/" +
        t("list search.list placholder.semester phase") +
        " " +
        phase +
        "/" +
        t("list search.list placholder.semester round") +
        " " +
        round,
      class: item.class.map((item: any) => <Tag key={item}>{item}</Tag>),
    }
  })

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

export default TableCourses
