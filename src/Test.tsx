import type { GetProp, TableProps } from "antd"
import { Table } from "antd"
import type { SorterResult } from "antd/es/table/interface"
import queryString from "query-string"
import React, { useEffect, useState } from "react"

type ColumnsType<T extends object = object> = TableProps<T>["columns"]
type TablePaginationConfig = Exclude<GetProp<TableProps, "pagination">, boolean>

interface DataType {
  name: {
    first: string
    last: string
  }
  gender: string
  email: string
  login: {
    uuid: string
  }
}

interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: SorterResult<any>["field"]
  sortOrder?: SorterResult<any>["order"]
  filters?: Parameters<GetProp<TableProps, "onChange">>[1]
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
    render: (name) => `${name.first} ${name.last}`,
    width: "20%",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    filters: [
      { text: "Male", value: "male" },
      { text: "Female", value: "female" },
    ],
    width: "20%",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
]

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
})

const Test: React.FC = () => {
  const [data, setData] = useState<DataType[]>()
  const [loading, setLoading] = useState(false)
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 25,
    },
  })

  const fetchData = () => {
    setLoading(true)
    fetch(
      `https://randomuser.me/api?${queryString.stringify(getRandomuserParams(tableParams))}`,
    )
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results)
        setLoading(false)
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        })
      })
  }

  useEffect(fetchData, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
  ])

  const handleTableChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
  ) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    })

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([])
    }
  }

  console.log(tableParams)

  return (
    <Table<DataType>
      columns={columns}
      rowKey={(record) => record.login.uuid}
      dataSource={data}
      pagination={{
        pageSize: 25,
        total: 20,
      }}
      loading={loading}
      onChange={handleTableChange}
    />
  )
}

export default Test
