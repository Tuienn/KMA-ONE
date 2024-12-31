import { useQuery } from "@tanstack/react-query"
import { Form, Select, Spin } from "antd"

import { DefaultOptionType } from "antd/es/select"
import { debounce } from "lodash"
import { useEffect, useState } from "react"
import apiService from "../../../api/APIService"
import { compareIgnoreCaseAndDiacritics } from "../../../utils/common"
import { FormItemCommonType, QuerySettingType } from "./FormItemCommon"

type QuerySelectType = Omit<FormItemCommonType, "type" | "options">

const formatQuerySelectKeyword = (_params: any, searchValue: string) => {
  const params = { ..._params }
  if (
    searchValue !== null &&
    searchValue !== undefined &&
    searchValue.length > 1
  ) {
    params.keyword = searchValue
  } else {
    delete params.keyword
  }
  return params
}

const QuerySelect: React.FC<QuerySelectType> = ({
  name,
  placeholder,
  label,
  rules,
  querySetting,
  className,
}) => {
  const { initialParams, linkAPI, formatOption } =
    querySetting as QuerySettingType
  const [debounceParams, setDebounceParams] = useState<any>({})
  useEffect(() => {
    setDebounceParams({ ...initialParams })
  }, [initialParams])

  const debouncedSetParams = debounce((value: string) => {
    setDebounceParams(formatQuerySelectKeyword(debounceParams, value))
  }, 500)

  const listDataQuery = useQuery({
    queryKey: [name, debounceParams],
    queryFn: async () => apiService("get", linkAPI, debounceParams),
    enabled: debounceParams.keyword !== undefined,
  })

  const options: DefaultOptionType[] = listDataQuery.isSuccess
    ? listDataQuery.data?.map(formatOption)
    : []

  return (
    <Form.Item name={name} className={className} rules={rules} label={label}>
      <Select
        className="w-full"
        allowClear={true}
        showSearch
        placeholder={placeholder}
        onSearch={(value) => debouncedSetParams(value)}
        loading={listDataQuery.isFetching}
        notFoundContent={
          listDataQuery.isFetching ? <Spin size="small" /> : null
        }
        filterOption={(input: string, option: any) =>
          compareIgnoreCaseAndDiacritics(input, option.label)
        }
        optionFilterProp="children"
        options={options}
        popupMatchSelectWidth={false}
      />
    </Form.Item>
  )
}

export default QuerySelect
