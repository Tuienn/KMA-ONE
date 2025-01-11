import { RedoOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Card, Flex, Form } from "antd"
import dayjs from "dayjs"
import i18next from "i18next"
import React, { useEffect } from "react"
import { UsePath, UseSearch } from "../../../context/PathProvider"
import { formatDateToString } from "../../../utils/common"
import FormItemCommon, {
  FormItemCommonType,
} from "../../common/formItemCustom/FormItemCommon"

interface Props {
  title: string
  listSearch: FormItemCommonType[]
}

const ListSearchCommon: React.FC<Props> = ({ title, listSearch }) => {
  const [form] = Form.useForm()
  const { history } = UsePath()

  const { searchPath, pathname } = UsePath()

  useEffect(() => {}, [])

  useEffect(() => {
    form.setFieldsValue(searchPath)
  }, [pathname])

  return (
    <Card
      className="mt-3 border-2"
      title={title}
      styles={{
        header: {
          paddingRight: 12,
          paddingLeft: 12,
          borderBottomWidth: 2,
        },
        body: {
          padding: 12,
        },
      }}
      extra={
        <div className="flex gap-2">
          <Button
            icon={<SearchOutlined />}
            onClick={() => form.submit()}
            type="primary"
          >
            {i18next.language === "en" ? "Search" : "Tìm kiếm"}
          </Button>
          <Button
            danger
            icon={<RedoOutlined />}
            onClick={() => {
              form.resetFields()
              UseSearch(history, pathname, {})
            }}
          >
            {i18next.language === "en" ? "Reset" : "Làm mới"}
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        onFinish={(value: any) => {
          for (const key in value) {
            if (dayjs.isDayjs(value[key])) {
              value[key] = formatDateToString(value[key])
            }
          }

          UseSearch(history, pathname, value)
        }}
      >
        <Flex gap={8} wrap>
          {listSearch.map((item, index) => (
            <FormItemCommon key={index} {...item} />
          ))}
        </Flex>
      </Form>
    </Card>
  )
}

export default ListSearchCommon
