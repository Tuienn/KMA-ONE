import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { App, Button, Form, Modal, Popconfirm } from "antd"
import i18next from "i18next"
import { Dispatch, SetStateAction, useEffect } from "react"
import { useTranslation } from "react-i18next"
import apiService from "../../../api/APIService"
import {
  createSemesterOptions,
  formatOptionsSemester,
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
  const queryClient = useQueryClient()

  const { notification } = App.useApp()

  useEffect(() => {
    if (open) {
      form.resetFields()
    }
  }, [open])

  const queryCourse = useQuery({
    queryKey: ["GET", "course", courseId],
    queryFn: async () => {
      const res = await apiService("get", `/course/${courseId}`)
      const semester = formatOptionsSemester(res.semester)
      const data = {
        ...res,
        batch: [res.batch.slice(0, 2), res.batch],
        semester: [semester.year, semester.phase, semester.round],
      }
      form.setFieldsValue(data)
      return data
    },
    enabled: !isCreateMode && open,
    // staleTime: Infinity,
  })

  const handleMutationSuccess = (type: "create" | "update" | "delete") => {
    notification.success({
      message: t("notification:api.title"),
      description: t(`notification:api.${type}.success`),
    })
    queryClient.invalidateQueries({ queryKey: ["GET", "list-course"] })
    handleOpen(false)
  }
  const handleMutationError = (type: "create" | "update" | "delete") => {
    notification.error({
      message: t("notification:api.title"),
      description: t(`notification:api.${type}.success`),
    })
  }

  const mutationDeleteCourse = useMutation({
    mutationKey: ["DELETE", "course", courseId],
    mutationFn: async () => apiService("delete", `/course/${courseId}`),
    onSuccess: () => handleMutationSuccess("delete"),
    onError: () => handleMutationError("delete"),
  })

  const mutationUpdateCourse = useMutation({
    mutationKey: ["PUT", "course", courseId],
    mutationFn: async (data: any) =>
      apiService("put", `/course/${courseId}`, {}, data),
    onSuccess: () => handleMutationSuccess("update"),
    onError: () => handleMutationError("update"),
  })
  const mutationCreateCourse = useMutation({
    mutationKey: ["POST", "course"],
    mutationFn: async (data: any) => apiService("post", "/course", {}, data),
    onSuccess: () => handleMutationSuccess("create"),
    onError: () => handleMutationError("create"),
  })

  const handleSubmit = (values: any) => {
    const data = {
      ...values,
      semester: parseInt(
        `${values.semester[0]}${values.semester[1]}${values.semester[2]}`,
      ),
      batch: values.batch[1],
    }

    if (isCreateMode) {
      mutationCreateCourse.mutate(data)
    } else {
      mutationUpdateCourse.mutate(data)
    }
  }

  return (
    <Modal
      loading={queryCourse.isLoading}
      open={open}
      onCancel={() => {
        handleOpen(false)
      }}
      centered
      footer={
        !isCreateMode ? (
          <div className="flex justify-end gap-2">
            <Popconfirm
              onConfirm={() => mutationDeleteCourse.mutate()}
              title={t("modalCourse.remove.popconfirmTitle")}
              okText={t("modalCourse.remove.popconfirmOk")}
              cancelText={t("modalCourse.remove.popconfirmCancel")}
            >
              <Button danger loading={mutationDeleteCourse.isPending}>
                {t("modalCourse.remove.button")}
              </Button>
            </Popconfirm>
            <Button
              type="primary"
              onClick={() => form.submit()}
              loading={mutationUpdateCourse.isPending}
            >
              {t("modalCourse.update")}
            </Button>
          </div>
        ) : (
          <Button
            type="primary"
            onClick={() => form.submit()}
            loading={mutationCreateCourse.isPending}
          >
            {t("modalCourse.create")}
          </Button>
        )
      }
      title={<h2>{t("modalCourse.title")}</h2>}
    >
      <Form
        form={form}
        layout="vertical"
        className="border-b-2 border-t-4 py-3"
        onFinish={handleSubmit}
      >
        <FormItemCommon
          type="input"
          name="name"
          label={t("modalCourse.form.courseName")}
          placeholder={t("modalCourse.form.placeholderCourseName")}
          rules={[
            {
              required: true,
              message: t("notification:form.inputRequired"),
            },
          ]}
        />
        <div className="flex gap-2">
          <FormItemCommon
            className="w-[calc(100%/2)]"
            type="select"
            name="credit"
            label={t("modalCourse.form.credit")}
            placeholder={t("modalCourse.form.placeholderCredit")}
            options={[
              { value: 1, label: "1" },
              { value: 2, label: "2" },
              { value: 3, label: "3" },
              { value: 4, label: "4" },
            ]}
            rules={[
              {
                required: true,
                message: t("notification:form.selectRequired"),
              },
            ]}
          />
          <FormItemCommon
            label={t("modalCourse.form.batch")}
            className="w-[calc(100%/2-8px)]"
            type="cascader_select"
            name="batch"
            placeholder={t("modalCourse.form.placeholderBatch")}
            rules={[
              {
                required: true,
                message: t("notification:form.selectRequired"),
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
          label={t("modalCourse.form.semester")}
          name="semester"
          options={createSemesterOptions(i18next.language, 5, 2, 2)}
          placeholder={t("modalCourse.form.placeholderSemester")}
          cascaderSetting={{
            isFullRender: true,
          }}
          rules={[
            {
              required: true,
              message: t("notification:form.selectRequired"),
            },
          ]}
        />
        {/* <FormItemCommon
          type="input"
          label={t("modal course.form.teacher")}
          name="teacherName"
          placeholder={t("modal course.form.placholder teacher")}
        /> */}
      </Form>
    </Modal>
  )
}

export default ModalCourse
