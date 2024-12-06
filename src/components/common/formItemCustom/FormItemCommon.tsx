import { DatePicker, Input, Select } from "antd"
import Form, { Rule } from "antd/es/form"
import { Dayjs } from "dayjs"
import { compareIgnoreCaseAndDiacritics } from "../../../utils/common"
import QuerySelect from "./QuerySelect"

export interface OptionsSelectType {
  value: string | number
  label: string
}
export interface QuerySettingType {
  initialParams?: any
  linkAPI: string
  formatOption: (dataQuery: any) => { value: any; label: string }
}
interface DateSettingType {
  type: "month" | "date" | "year" | "time"
  mutiple?: boolean | false
  minDate?: Dayjs //YYYY/MM/DD
  maxDate?: Dayjs //YYYY/MM/DD
}

export interface FormItemCommonType {
  type:
    | "input"
    | "select"
    | "query_select"
    | "search_select"
    | "range_picker"
    | "date_picker"
  name: string | string[]
  placeholder?: string
  disabled?: boolean | false
  label?: string | ""
  rules?: Rule[]
  className?: string | ""
  querySetting?: QuerySettingType
  dateSetting?: DateSettingType
  options?: OptionsSelectType[]
  loading?: boolean | false
}

const FormItemCommon: React.FC<FormItemCommonType> = ({
  type,
  name,
  placeholder,
  label,
  rules,
  className,
  disabled,
  querySetting,
  dateSetting,
  options,
  loading,
}) => {
  switch (type) {
    case "query_select":
      return (
        <QuerySelect
          name={name}
          placeholder={placeholder}
          label={label}
          rules={rules}
          querySetting={querySetting}
          className={className}
        />
      )
    case "select":
      return (
        <Form.Item
          name={name}
          className={className}
          rules={rules}
          label={label}
        >
          <Select
            placeholder={placeholder}
            options={options}
            disabled={disabled}
            notFoundContent={null}
            allowClear={true}
            loading={loading}
            popupMatchSelectWidth={false}
          />
        </Form.Item>
      )
    case "search_select":
      return (
        <Form.Item
          name={name}
          className={className}
          rules={rules}
          label={label}
        >
          <Select
            disabled={disabled}
            showSearch
            allowClear={true}
            options={options}
            placeholder={placeholder}
            filterOption={(input: string, option: any) =>
              compareIgnoreCaseAndDiacritics(input, option.label)
            }
            popupMatchSelectWidth={false}
            notFoundContent={null}
          />
        </Form.Item>
      )
    case "input":
      return (
        <Form.Item
          name={name}
          className={className}
          rules={rules}
          label={label}
        >
          <Input
            placeholder={placeholder}
            disabled={disabled}
            allowClear={true}
          />
        </Form.Item>
      )
    case "range_picker":
      const placeholderDate: [string, string] = placeholder
        ?.split("-")
        .slice(0, 2) as [string, string]
      return (
        <Form.Item
          name={name}
          className={className}
          label={label}
          rules={rules}
        >
          <DatePicker.RangePicker
            format="YYYY/MM/DD"
            placement={"bottomLeft"}
            placeholder={placeholderDate}
            minDate={dateSetting?.minDate}
            maxDate={dateSetting?.maxDate}
            disabled={disabled}
            allowClear={true}
            className="w-full"
          />
        </Form.Item>
      )
    case "date_picker":
      return (
        <Form.Item
          name={name}
          className={className}
          label={label}
          rules={rules}
        >
          <DatePicker
            type={dateSetting?.type}
            format="YYYY/MM/DD"
            placeholder={placeholder}
            disabled={disabled}
            allowClear={true}
            placement={"bottomLeft"}
            maxTagCount="responsive"
            multiple={dateSetting?.mutiple}
            maxDate={dateSetting?.maxDate}
            minDate={dateSetting?.minDate}
            className="w-full"
          />
        </Form.Item>
      )
  }
}

export default FormItemCommon
