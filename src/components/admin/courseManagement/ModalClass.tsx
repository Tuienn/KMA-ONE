import { useMutation, useQuery } from "@tanstack/react-query"
import { App, Badge, Button, Form, Modal } from "antd"
import { Dispatch, SetStateAction } from "react"
import { useTranslation } from "react-i18next"
import apiService from "../../../api/APIService"
import FormItemCommon from "../../common/formItemCustom/FormItemCommon"

interface Props {
  classId: number
  courseId: number
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  handleRefetch?: () => void
}
const ModalClass: React.FC<Props> = ({
  classId,
  open,
  setOpen,
  handleRefetch,
  courseId,
}) => {
  const [form] = Form.useForm()
  const { notification } = App.useApp()
  const { t } = useTranslation("courseManagement")
  const queryClassInfo = useQuery({
    queryKey: ["GET", "class", classId],
    queryFn: async () => apiService("get", `class/${classId}`),
  })

  const muateUpdateBasicClass = useMutation({
    mutationFn: async (data: any) =>
      apiService("put", `class/${classId}`, {}, data),
    onSuccess: () => {
      setOpen(false)
    },
  })

  const mutateAddListStudent = useMutation({
    mutationFn: async (data: any) =>
      apiService("post", `Class/${classId}/add_students`, {}, data),
    onSuccess: (res) => {
      console.log(res)

      if (res.successMessages.length > 0) {
        notification.success({
          message: "KMA thông báo",
          description:
            res.successMessages.join(", ") ??
            "Thêm danh sách sinh viên thành công",
        })
      }
      if (res.errorMessages.length > 0) {
        notification.error({
          message: "KMA thông báo",
          description:
            res.errorMessages.join(", ") ?? "Thêm danh sách sinh viên thất bại",
        })
      }
    },
  })

  const handleFinish = (values: any) => {
    muateUpdateBasicClass.mutate({
      courseTd: courseId,
      name: queryClassInfo?.data?.name,
      teacherName: values.teacherName,
      location: values.location,
    })
    mutateAddListStudent.mutate(values.students)
  }
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      title={t("modalClass.title")}
      centered
      footer={
        <div className="flex justify-end gap-3">
          {/* <Popconfirm
            onConfirm={() => form.submit()}
            title={t("modalCourse.remove.popconfirmTitle")}
            okText={t("modalCourse.remove.popconfirmOk")}
            cancelText={t("modalCourse.remove.popconfirmCancel")}
          >
            <Button danger>{t("modalClass.remove.button")}</Button>
          </Popconfirm> */}
          <Button onClick={() => form.submit()} type="primary">
            {t("modalClass.update")}
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        className="border-b-2 border-t-4 py-3"
        layout="vertical"
        colon={false}
        onFinish={handleFinish}
      >
        <div className="mb-2 flex flex-col gap-2">
          <div className="flex gap-2">
            <Badge color="green" />{" "}
            <span>
              {t("modalClass.form.course")}{" "}
              {queryClassInfo?.data?.course ?? "Lập trình nhân Linux"}
            </span>
          </div>
          <div className="flex gap-2">
            <Badge color="blue" />{" "}
            <span>{t("modalClass.form.batch")}: CT6</span>
          </div>
          <div className="flex gap-2">
            <Badge color="orange" />{" "}
            <span>
              {t("modalClass.form.className")} {queryClassInfo?.data?.name}
            </span>
          </div>
        </div>
        <FormItemCommon
          type="input"
          name="teacherName"
          label={t("modalClass.form.teacher")}
          placeholder={t("modalClass.form.placeholderTeacher")}
        />
        <FormItemCommon
          type="input"
          name={"location"}
          label={t("modalClass.form.room")}
          placeholder={t("modalClass.form.placeholderRoom")}
        />
        <FormItemCommon
          type="query_select"
          name="students"
          label={t("modalClass.form.student")}
          querySetting={{
            isMutiple: true,
            linkAPI: "student/search",
            formatOption: (dataQuery: any) =>
              dataQuery.students.map((item: any) => ({
                value: item.studentCode,
                label: `${item.name} - ${item.studentCode}`,
              })),
          }}
        />
      </Form>
    </Modal>
  )
}

export default ModalClass
