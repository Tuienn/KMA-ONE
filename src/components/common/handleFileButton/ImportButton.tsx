import { UploadOutlined } from "@ant-design/icons"
import { Button, Upload } from "antd"
import React, { memo } from "react"

import { read, utils } from "xlsx"
interface ImportButtonProps {
  setData: React.Dispatch<any>
}

const ImportButton: React.FC<ImportButtonProps> = ({ setData }) => {
  const handleFileUpload = (file: File) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer)
        const workbook = read(data, { type: "array" })

        // Lấy sheet đầu tiên và chuyển sang JSON
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = utils.sheet_to_json(worksheet)

        setData(jsonData) // Gửi dữ liệu JSON qua props setData
      } catch (error) {
        console.error("Lỗi khi đọc file Excel:", error)
      }
    }

    reader.readAsArrayBuffer(file)
    return false // Ngăn Ant Design upload mặc định
  }

  return (
    <Upload
      accept=".xlsx, .xls"
      showUploadList={false}
      beforeUpload={handleFileUpload}
    >
      <Button icon={<UploadOutlined />}>Import excel</Button>
    </Upload>
  )
}

export default memo(ImportButton)
