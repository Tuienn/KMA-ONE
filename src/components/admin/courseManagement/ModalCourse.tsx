import { Button, Form, Modal } from "antd"
import i18next from "i18next"
import { Dispatch, SetStateAction } from "react"
import { useTranslation } from "react-i18next"
import {
  createSemesterOptions,
  getCurrenBatch,
} from "../../../utils/formatValue"
import FormItemCommon from "../../common/formItemCustom/FormItemCommon"

interface Props {
  open: boolean
  handleOpen: Dispatch<SetStateAction<boolean>>
  courseId?: string | number
}

const ModalCourse: React.FC<Props> = ({ open, handleOpen, courseId }) => {
  const [form] = Form.useForm()
  const { t } = useTranslation(["courseManagement", "notification"])
  const isCreateMode = courseId ? false : true
  const { AT, CT, DT } = getCurrenBatch()
  const handleSubmit = (values: any) => {
    console.log(values)
  }
  return (
    <Modal
      open={open}
      onCancel={() => handleOpen(false)}
      centered
      footer={
        !isCreateMode ? (
          <div className="flex justify-end gap-2">
            <Button danger>{t("modal course.delete")}</Button>
            <Button type="primary" onClick={() => form.submit()}>
              {t("modal course.update")}
            </Button>
          </div>
        ) : (
          <Button type="primary" onClick={() => form.submit()}>
            {t("modal course.create")}
          </Button>
        )
      }
      title={<h2>{t("modal course.title")}</h2>}
    >
      <Form
        form={form}
        layout="vertical"
        className="border-b-2 border-t-4 py-3"
        onFinish={handleSubmit}
      >
        <FormItemCommon
          type="input"
          name="courseName"
          label={t("modal course.form.course name")}
          placeholder={t("modal course.form.placholder course name")}
          rules={[
            {
              required: true,
              message: t("notification:form.input required"),
            },
          ]}
        />
        <div className="flex gap-2">
          <FormItemCommon
            className="w-[calc(100%/2)]"
            type="select"
            name="credit"
            label={t("modal course.form.credit")}
            placeholder={t("modal course.form.placholder credit")}
            options={[
              { value: 1, label: "1" },
              { value: 2, label: "2" },
              { value: 3, label: "3" },
              { value: 4, label: "4" },
            ]}
            rules={[
              {
                required: true,
                message: t("notification:form.select required"),
              },
            ]}
          />
          <FormItemCommon
            label={t("modal course.form.batch")}
            className="w-[calc(100%/2-8px)]"
            type="cascader_select"
            name="batch"
            placeholder={t("modal course.form.placholder batch")}
            rules={[
              {
                required: true,
                message: t("notification:form.select required"),
              },
            ]}
            options={[
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
            ]}
          />
        </div>
        <FormItemCommon
          type="cascader_select"
          label={t("modal course.form.semester")}
          name="semester"
          options={createSemesterOptions(i18next.language, 5, 2, 2)}
          placeholder={t("modal course.form.placholder semester")}
          cascaderSetting={{
            isFullRender: true,
          }}
          rules={[
            {
              required: true,
              message: t("notification:form.select required"),
            },
          ]}
        />
        <FormItemCommon
          type="input"
          label={t("modal course.form.teacher")}
          name="teacherName"
          placeholder={t("modal course.form.placholder teacher")}
        />
      </Form>
    </Modal>
  )
}

export default ModalCourse
