import { Form, Space } from "antd"
import i18next from "i18next"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { UsePath, UseSearch } from "../../../context/PathProvider"
import {
  createSemesterOptions,
  formatSemsterOptionValue,
} from "../../../utils/formatValue"
import FormItemCommon from "../../common/formItemCustom/FormItemCommon"

const FindScore: React.FC = () => {
  const { t } = useTranslation(["scores", "notification"])
  const [form] = Form.useForm()
  const { searchPath, history } = UsePath()
  const studentCodeValue = Form.useWatch("studentCode", form)
  const semesterValue = Form.useWatch("semester", form)

  useEffect(() => {
    form.setFieldsValue({
      // semester: searchPath.semester,
      studentCode: searchPath.studentCode,
    })
  }, [])

  useEffect(() => {
    if (studentCodeValue) {
      UseSearch(history, "/scores", {
        studentCode: studentCodeValue,
        semester: semesterValue && formatSemsterOptionValue(semesterValue),
      })
    }
  }, [studentCodeValue, semesterValue])

  return (
    <Form
      form={form}
      className="z-1 absolute top-[-40px] w-full lg:top-1 lg:flex lg:justify-end"
    >
      <Space.Compact className="w-full lg:max-w-[430px]">
        <FormItemCommon
          name="studentCode"
          type="query_select"
          placeholder={t("scores:findScore.inputPlaceholder")}
          className="w-[60%]"
          querySetting={{
            initialParams: {
              keyword: searchPath.studentCode,
            },
            linkAPI: "student/search",
            formatOption: (dataQuery: any) =>
              dataQuery.students.map((item: any) => ({
                value: item.studentCode,
                label: `${item.name} - ${item.studentCode}`,
              })),
          }}
        />
        <FormItemCommon
          className="w-[40%]"
          placeholder={t("scores:findScore.selectPlaceholder")}
          type="cascader_select"
          name="semester"
          options={createSemesterOptions(i18next.language, 5, 2, 2)}
          cascaderSetting={{
            placement: "bottomRight",
            isFullRender: true,
            changeOnSelect: true,
          }}
        />
      </Space.Compact>
    </Form>
  )
}

export default FindScore
