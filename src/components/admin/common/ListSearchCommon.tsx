import { RedoOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Card, Flex, Form } from "antd"
import dayjs from "dayjs"
import React from "react"
import { UsePath, UseSearch } from "../../../context/PathProvider"
import { formatDateToString } from "../../../utils/common"
import FormItemCommon, {
  FormItemCommonType,
} from "../../common/formItemCustom/FormItemCommon"

interface Props {
  title: string
  buttonSearch: string
  buttonReset: string
  listSearch: FormItemCommonType[]
}

const ListSearchCommon: React.FC<Props> = ({
  title,
  buttonSearch,
  buttonReset,
  listSearch,
}) => {
  const [form] = Form.useForm()
  const { history } = UsePath()

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
            {buttonSearch}
          </Button>
          <Button
            danger
            icon={<RedoOutlined />}
            onClick={() => {
              form.resetFields(), UseSearch(history, "/student-management", {})
            }}
          >
            {buttonReset}
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        onFinish={(value: any) => {
          for (let key in value) {
            if (dayjs.isDayjs(value[key])) {
              value[key] = formatDateToString(value[key])
            }
          }
          console.log(value)

          UseSearch(history, "/student-management", value)
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
