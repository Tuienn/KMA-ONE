import { UploadOutlined } from "@ant-design/icons"
import { Button } from "antd"
import _ from "lodash"
import { memo } from "react"
import { utils, writeFile } from "xlsx"
interface Props {
  dataRows: any
  headers: string[]
  fileName: string
}
const ExportButton: React.FC<Props> = ({ dataRows, headers, fileName }) => {
  const getWidthColumns = () => {
    const widths = headers.map((header: string) => _.deburr(header).length)

    dataRows.forEach((row: any) => {
      for (const key in row) {
        const indexWidth = Object.keys(row).indexOf(key)
        if (_.deburr(row[key].toString()).length > widths[indexWidth]) {
          widths[indexWidth] = row[key].toString().length
        }
      }
    })
    return widths
  }

  // console.log(getWidthColumns())

  const exportToExcel = () => {
    const worksheet = utils.json_to_sheet(dataRows)
    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, "export")

    utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" })

    worksheet["!cols"] = getWidthColumns().map((w: number) => ({ wch: w }))

    writeFile(workbook, `${fileName}.xlsx`, { compression: true })
  }

  return (
    <Button onClick={exportToExcel} icon={<UploadOutlined />} type="primary">
      Export excel
    </Button>
  )
}

export default memo(ExportButton)
