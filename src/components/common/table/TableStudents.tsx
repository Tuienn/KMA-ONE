import { Grid, Table, TableColumnsType, Tag, Tooltip, Typography } from "antd"
import { Dispatch, SetStateAction } from "react"
import { useTranslation } from "react-i18next"
import type { DataStudentType } from "../ModalInfo"

interface Props {
  dataSource: any
  loading: boolean
  handleSelectStudentCode: Dispatch<SetStateAction<string | number>>
  handleOpenModal: Dispatch<SetStateAction<boolean>>
  handleChangePaging: (page: number) => void
}

interface DataType extends DataStudentType {
  key: string
  gpa: number
}

const TableStudents: React.FC<Props> = ({
  dataSource,
  loading,
  handleSelectStudentCode,
  handleOpenModal,
  handleChangePaging,
}) => {
  const { t } = useTranslation("modalInfo")
  const { md } = Grid.useBreakpoint()

  const columns: TableColumnsType<DataType> = [
    {
      title: md
        ? t("information.student code")
        : t("information shorten.student code"),
      dataIndex: "code",
      fixed: "left",
      width: "130px",
    },
    {
      title: md ? t("information.name") : t("information shorten.name"),
      dataIndex: "name",
      width: "200px",
    },
    {
      title: md ? t("information.birth") : t("information shorten.birth"),
      dataIndex: "birth",
      width: md ? "150px" : "130px",
    },
    {
      title: md ? t("information.gender") : t("information shorten.gender"),
      dataIndex: "gender",
      width: "100px",
    },
    {
      title: md ? t("information.phone") : t("information shorten.phone"),
      dataIndex: "phone",
      width: md ? "150px" : "130px",
    },
    {
      title: md ? t("information.address") : t("information shorten.address"),
      dataIndex: "address",
      width: "200px",
    },
    {
      title: "GPA",
      dataIndex: "gpa",
      width: "80px",
    },
    {
      title: md ? t("information.status") : t("information shorten.status"),
      dataIndex: "status",
      width: md ? "110px" : "100px",
    },
  ]

  // console.log(dataSource.list)

  const data = !loading
    ? dataSource.list.map((item: any) => ({
        key: item.id,
        code: (
          <a
            className="text-second"
            onClick={() => {
              handleSelectStudentCode(item.id)
              handleOpenModal(true)
            }}
          >
            {item.code}
          </a>
        ),
        name: item.name,
        birth: item.birth,
        gender:
          item.gender === 0 ? (
            <Tag>{t("information.gender male")}</Tag>
          ) : (
            <Tag>{t("information.gender female")}</Tag>
          ),
        phone: item.phone,
        status: item.status ? (
          <Tag color="green">{t("information.status active")}</Tag>
        ) : (
          <Tag color="red">{t("information.status inactive")}</Tag>
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
      pagination={{
        current: dataSource.page,
        pageSize: 25,
        total: dataSource.total * 25,
        onChange: handleChangePaging,
        // showLessItems: true,
        // hideOnSinglePage: true,
      }}
    />
  )
}

export default TableStudents
