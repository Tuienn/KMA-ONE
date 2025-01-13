import { Grid, Table, TableColumnsType, Tag, Tooltip, Typography } from "antd"
import { Dispatch, SetStateAction } from "react"
import { useTranslation } from "react-i18next"
import type { DataStudentType } from "../ModalInfo"

interface Props {
  dataSource: any
  loading: boolean
  handleSelectStudentCode: Dispatch<
    SetStateAction<{
      isOpen: boolean
      studentId: number | null
    }>
  >
  permission: "admin" | "student"
  handleChangePaging?: (page: number) => void
}

interface DataType extends DataStudentType {
  key: string
  gpa: number
}

const TableStudents: React.FC<Props> = ({
  dataSource,
  loading,
  handleSelectStudentCode,
  handleChangePaging,
  permission,
}) => {
  const { t } = useTranslation("modalInfo")
  const { md } = Grid.useBreakpoint()

  const columns: TableColumnsType<DataType> = [
    {
      title: md
        ? t("information.studentCode")
        : t("informationShorten.studentCode"),
      dataIndex: "code",
      fixed: "left",
      width: "130px",
    },
    {
      title: md ? t("information.name") : t("informationShorten.name"),
      dataIndex: "name",
      width: "200px",
    },
    {
      title: md ? t("information.birth") : t("informationShorten.birth"),
      dataIndex: "birth",
      width: md ? "150px" : "130px",
    },
    {
      title: md ? t("information.gender") : t("informationShorten.gender"),
      dataIndex: "gender",
      width: "100px",
    },
    {
      title: md ? t("information.phone") : t("informationShorten.phone"),
      dataIndex: "phone",
      width: md ? "150px" : "130px",
    },
    {
      title: md ? t("information.address") : t("informationShorten.address"),
      dataIndex: "address",
      width: "200px",
    },
    {
      title: "GPA",
      dataIndex: "gpa",
      width: "80px",
    },
    {
      title: md ? t("information.status") : t("informationShorten.status"),
      dataIndex: "status",
      width: md ? "110px" : "100px",
      hidden: permission === "student",
    },
  ]

  const data =
    dataSource && dataSource.list
      ? dataSource.list.map((item: any) => ({
          key: item.id,
          code: (
            <a
              className="text-second"
              onClick={() => {
                handleSelectStudentCode({
                  isOpen: true,
                  studentId: item.id,
                })
              }}
            >
              {item.code}
            </a>
          ),
          name: item.name,
          birth: item.birth,
          gender:
            item.gender === 0 ? (
              <Tag>{t("information.genderMale")}</Tag>
            ) : (
              <Tag>{t("information.genderFemale")}</Tag>
            ),
          phone: item.phone,
          status: item.status ? (
            <Tag color="green">{t("information.statusActive")}</Tag>
          ) : (
            <Tag color="red">{t("information.statusInactive")}</Tag>
          ),
          address: (
            <Tooltip title={item.address}>
              <Typography.Text ellipsis>{item.address}</Typography.Text>
            </Tooltip>
          ),
          gpa:
            item.gpa > 2.0 ? (
              <Tag color={item.gpa > 3.0 ? "green" : "red"}>{item.gpa}</Tag>
            ) : (
              <Tag color="red">{item.gpa}</Tag>
            ),
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
      pagination={
        handleChangePaging
          ? {
              current: dataSource.page,
              pageSize: 25,
              total: dataSource.total * 25,
              onChange: handleChangePaging,
              // showLessItems: true,
              // hideOnSinglePage: true,
            }
          : false
      }
    />
  )
}

export default TableStudents
