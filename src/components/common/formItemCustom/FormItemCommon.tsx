import { Cascader, DatePicker, Input, Select, Switch } from "antd"
import Form, { Rule } from "antd/es/form"
import { DefaultOptionType } from "antd/es/select"
import { Dayjs } from "dayjs"
import { compareIgnoreCaseAndDiacritics } from "../../../utils/common"
import QuerySelect from "./QuerySelect"

export interface QuerySettingType {
  initialParams?: any
  linkAPI: string
  formatOption: (dataQuery: any) => { value: any; label: string }[]
  isMutiple?: boolean | false
}
interface DateSettingType {
  type: "month" | "date" | "year" | "time"
  mutiple?: boolean | false
  minDate?: Dayjs //YYYY/MM/DD
  maxDate?: Dayjs //YYYY/MM/DD
}
interface CascaderSettingType {
  isFullRender?: boolean | false
  placement?: "bottomLeft" | "bottomRight" | "topLeft" | "topRight"
  changeOnSelect?: boolean | false
}

interface SelectSettingType {
  multiple?: boolean | false
}

export interface FormItemCommonType {
  type:
    | "input"
    | "select"
    | "query_select"
    | "search_select"
    | "range_picker"
    | "date_picker"
    | "cascader_select"
    | "switch"
  name: string | string[]
  placeholder?: string
  disabled?: boolean | false
  label?: string | ""
  rules?: Rule[]
  className?: string | ""
  querySetting?: QuerySettingType
  dateSetting?: DateSettingType
  cascaderSetting?: CascaderSettingType
  selectSetting?: SelectSettingType
  options?: DefaultOptionType[]
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
  cascaderSetting,
  selectSetting,
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
          disabled={disabled}
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
            allowClear
            loading={loading}
            popupMatchSelectWidth={false}
            mode={selectSetting?.multiple ? "multiple" : undefined}
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
            allowClear
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

    case "cascader_select": {
      const displayRender = cascaderSetting?.isFullRender
        ? undefined
        : (labels: string[]) => labels[labels.length - 1]

      return (
        <Form.Item
          name={name}
          className={className}
          rules={rules}
          label={label}
        >
          <Cascader
            placeholder={placeholder}
            options={options}
            allowClear
            displayRender={displayRender}
            disabled={disabled}
            placement={cascaderSetting?.placement ?? "bottomLeft"}
            changeOnSelect={cascaderSetting?.changeOnSelect}
          />
        </Form.Item>
      )
    }
    case "switch": {
      const placeholderSwitch = placeholder ? placeholder.split("-") : ["", ""]
      return (
        <Form.Item
          name={name}
          className={className}
          rules={rules}
          label={label}
          valuePropName="checked"
          initialValue={true}
        >
          <Switch
            checkedChildren={placeholderSwitch[0]}
            unCheckedChildren={placeholderSwitch[1]}
            defaultChecked
          />
        </Form.Item>
      )
    }

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
            allowClear
            spellCheck={false}
          />
        </Form.Item>
      )
    case "range_picker": {
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
            allowClear
            className="w-full"
          />
        </Form.Item>
      )
    }
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
            allowClear
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
