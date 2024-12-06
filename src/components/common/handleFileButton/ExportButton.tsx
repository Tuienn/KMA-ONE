import { UploadOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { memo } from "react"
import { utils, writeFile } from "xlsx"
interface Props {
  dataRows: any
  header: string[]
  fileName: string
}
const ExportButton: React.FC<Props> = ({ dataRows, header, fileName }) => {
  const exportToExcel = () => {
    const worksheet = utils.json_to_sheet(dataRows)
    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, "export")
    utils.sheet_add_aoa(worksheet, [header], { origin: "A1" })
    writeFile(workbook, `${fileName}.xlsx`, { compression: true })
  }

  return (
    <Button onClick={exportToExcel} icon={<UploadOutlined />} type="primary">
      Export excel
    </Button>
  )
}

export default memo(ExportButton)
