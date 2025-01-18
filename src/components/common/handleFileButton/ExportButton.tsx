import { UploadOutlined } from "@ant-design/icons"
import { Button } from "antd"
import _ from "lodash"
import { memo, useEffect, useRef } from "react"
import { utils, writeFile } from "xlsx"

interface Props {
  dataRows: any
  headers: string[]
  fileName: string
  loading?: boolean
}

const ExportButton: React.FC<Props> = ({
  dataRows,
  headers,
  fileName,
  loading,
}) => {
  const prevLoading = useRef<boolean | undefined>(loading)

  const removeNullUndefinedFields = (arr: any[]) => {
    return _.map(arr, (obj) => _.omitBy(obj, _.isNil))
  }

  const formatDataRows = removeNullUndefinedFields(dataRows)

  const getWidthColumns = () => {
    const widths = headers.map((header: string) => _.deburr(header).length)

    formatDataRows.forEach((row: any) => {
      for (const key in row) {
        const indexWidth = Object.keys(row).indexOf(key)
        if (_.deburr(row[key].toString()).length > widths[indexWidth]) {
          widths[indexWidth] = row[key].toString().length
        }
      }
    })
    return widths
  }

  // const exportToExcel = _.debounce(() => {
  //   if (!formatDataRows.length) return

  //   const worksheet = utils.json_to_sheet(formatDataRows)
  //   const workbook = utils.book_new()
  //   utils.book_append_sheet(workbook, worksheet, "export")

  //   utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" })

  //   worksheet["!cols"] = getWidthColumns().map((w: number) => ({ wch: w }))

  //   writeFile(workbook, `${fileName}.xlsx`, { compression: true })
  // }, 300) // Debounce 300ms để tránh chạy quá nhanh
  const exportToExcel = () => {
    const worksheet = utils.json_to_sheet(formatDataRows)
    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, "export")

    utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" })

    worksheet["!cols"] = getWidthColumns().map((w: number) => ({ wch: w }))

    writeFile(workbook, `${fileName}.xlsx`, { compression: true })
  }

  useEffect(() => {
    if (prevLoading.current && !loading) {
      exportToExcel()
    }
    prevLoading.current = loading
  }, [loading]) // Chạy khi loading thay đổi

  return (
    <Button loading={loading} icon={<UploadOutlined />}>
      Export excel
    </Button>
  )
}

export default memo(ExportButton)
