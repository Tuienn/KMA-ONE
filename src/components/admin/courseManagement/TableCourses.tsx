import { Table, TableColumnsType, Tag } from "antd"
import { Dispatch, SetStateAction } from "react"
import { useTranslation } from "react-i18next"
import { formatOptionsSemester } from "../../../utils/formatValue"

interface Props {
  loading: boolean
  dataSource: any
  handleOpenModal: Dispatch<SetStateAction<boolean>>
  handleSelectCourseId: Dispatch<SetStateAction<string | number>>
  handleChangePaging: (page: number) => void
}

interface DataType {
  key: number
  name: string
  credit: number
  batch: string
  semester: number
  class: string[]
}

const TableCourses: React.FC<Props> = ({
  loading,
  dataSource,
  handleChangePaging,
  handleSelectCourseId,
  handleOpenModal,
}) => {
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
      width: "120px",
    },
    {
      title: t("table.batch"),
      dataIndex: "batch",
      width: "160px",
    },
    {
      title: t("table.semester"),
      dataIndex: "semester",
      width: "180px",
    },
    {
      title: t("table.class"),
      dataIndex: "class",
      width: "160px",
    },
  ]

  const data = dataSource.list.map((item: any) => {
    const { phase, year, round } = formatOptionsSemester(item.semester)

    return {
      key: item.id,
      name: (
        <a
          className="text-second"
          onClick={() => {
            handleSelectCourseId(item.id)
            handleOpenModal(true)
          }}
        >
          {item.name}
        </a>
      ),
      credit: item.credit,
      batch: <Tag>{item.batch}</Tag>,
      semester:
        t("list search.list placholder.semester year") +
        " " +
        year +
        " / " +
        t("list search.list placholder.semester phase") +
        " " +
        phase +
        " / " +
        t("list search.list placholder.semester round") +
        " " +
        round,
      class: item.class?.map((item: any) => <Tag key={item}>{item}</Tag>),
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
      pagination={{
        total: dataSource.total * 10,
        pageSize: 10,
        current: dataSource.page,
        onChange: handleChangePaging,
      }}
      // rowClassName={(record, index) => (index % 2 === 0 ? "bg-gray-100" : "")}
    />
  )
}

export default TableCourses
