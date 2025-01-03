import { PlusCircleOutlined } from "@ant-design/icons"
import { Button } from "antd"
import i18next from "i18next"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import HeaderCommon from "../../components/admin/common/HeaderCommon"
import ListSearchCommon from "../../components/admin/common/ListSearchCommon"
import ModalCourse from "../../components/admin/courseManagement/ModalCourse"
import TableCourses from "../../components/admin/courseManagement/TableCourses"
import { FormItemCommonType } from "../../components/common/formItemCustom/FormItemCommon"
import { createSemesterOptions, getCurrenBatch } from "../../utils/formatValue"

const CourseManagement = () => {
  const { t } = useTranslation("courseManagement")
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { AT, CT, DT } = getCurrenBatch()

  const listSearch: FormItemCommonType[] = [
    {
      type: "input",
      name: "name",
      placeholder: t("list search.list placholder.name"),
      className: "w-[calc(100%/4-8px)]",
    },
    {
      type: "select",
      name: "credit",
      placeholder: t("list search.list placholder.credit"),
      options: [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
      ],
      className: "w-[calc(100%/7-8px)]",
    },
    {
      type: "cascader_select",
      name: "batch",
      className: "w-[150px]",
      placeholder: t("list search.list placholder.batch"),
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
      placeholder: t("list search.list placholder.semester"),
      name: "semester",
      className: "w-[150px]",
      options: createSemesterOptions(i18next.language, 5, 2, 2),
    },
  ]
  return (
    <div className="rounded-lg bg-white p-2">
      <HeaderCommon
        title={t("header.title")}
        extra={
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => setOpenModal(true)}
          >
            {t("header.button create")}
          </Button>
        }
      />
      <ListSearchCommon
        title={t("list search.title")}
        listSearch={listSearch}
      />
      <TableCourses
        loading={false}
        dataSource={[
          {
            key: 1,
            name: "Course 1",
            credit: 3,
            batch: "AT1",
            semester: 111,
            class: ["L01", "L02", "L03"],
          },
          {
            key: 2,
            name: "Course 2",
            credit: 4,
            batch: "CT2",
            semester: 222,
            class: ["L01", "L02", "L03"],
          },
          {
            key: 3,
            name: "Course 3",
            credit: 2,
            batch: "DT3",
            semester: 311,
            class: ["L01", "L02", "L03"],
          },
          {
            key: 4,
            name: "Course 4",
            credit: 1,
            batch: "AT2",
            semester: 422,
            class: ["L01", "L02", "L03"],
          },
        ]}
      />
      <ModalCourse open={openModal} handleOpen={setOpenModal} />
    </div>
  )
}

export default CourseManagement
