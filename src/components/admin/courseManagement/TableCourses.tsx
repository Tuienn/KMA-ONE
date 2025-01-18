import { Table, TableColumnsType, Tag } from "antd"
import { Dispatch, SetStateAction, useState } from "react"
import { useTranslation } from "react-i18next"
import { formatSemesterToObj } from "../../../utils/formatValue"
import ModalClass from "./ModalClass"

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
  const [classId, setClassId] = useState<number>(0)
  const [openModalClass, setOpenModalClass] = useState<boolean>(false)
  const [courseId, setCourseId] = useState<number>(0)
  const columns: TableColumnsType<DataType> = [
    {
      title: t("table.name"),
      dataIndex: "courseName",
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
      width: "120px",
    },
    {
      title: t("table.semester"),
      dataIndex: "semester",
      width: "180px",
    },
    {
      title: t("table.class"),
      dataIndex: "classes",
      width: "260px",
    },
  ]

  console.log(dataSource)

  const data = !dataSource
    ? []
    : dataSource.list.map((item: any) => {
        const { phase, year, round } = formatSemesterToObj(item.semester)

        return {
          key: item.id,
          courseName: (
            <a
              className="text-second"
              onClick={() => {
                handleSelectCourseId(item.id)
                handleOpenModal(true)
              }}
            >
              {item.courseName}
            </a>
          ),
          credit: item.credit,
          batch: <Tag>{item.batch}</Tag>,
          semester:
            t("listSearch.listPlaceholder.semesterYear") +
            " " +
            year +
            " / " +
            t("listSearch.listPlaceholder.semesterPhase") +
            " " +
            phase +
            " / " +
            t("listSearch.listPlaceholder.semesterRound") +
            " " +
            round,
          classes: item.classes?.map((item: any, index: number) => (
            <Tag
              className="cursor-pointer"
              key={index}
              onClick={() => {
                setClassId(item.id ?? 0)
                setOpenModalClass(true)
                setCourseId(item.courseId)
              }}
            >
              {item.name}
            </Tag>
          )),
        }
      })

  return (
    <>
      <ModalClass
        classId={classId}
        open={openModalClass}
        setOpen={setOpenModalClass}
        courseId={courseId}
      />
      <Table
        loading={loading}
        scroll={{ x: 200, y: 600 }}
        columns={columns}
        className="mt-3"
        bordered
        dataSource={data}
        pagination={{
          total: dataSource?.total * 25,
          pageSize: 25,
          current: dataSource?.page,
          onChange: handleChangePaging,
        }}
        // rowClassName={(record, index) => (index % 2 === 0 ? "bg-gray-100" : "")}
      />
    </>
  )
}

export default TableCourses
