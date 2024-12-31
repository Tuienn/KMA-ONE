import {
  CheckOutlined,
  ExclamationOutlined,
  LineChartOutlined,
} from "@ant-design/icons"
import { ReactNode } from "react"
import { useTranslation } from "react-i18next"

interface Props {
  name: string
  studentCode: string

  passed: number
  failed: number
  avgScore: number
  exportButton: ReactNode
}

const CardInfo: React.FC<Props> = ({
  name,
  studentCode,
  passed,
  failed,
  avgScore,
  exportButton,
}) => {
  const { t } = useTranslation("points")

  return (
    <div className="mt-[40px] w-full lg:mt-0">
      <h2 className="mb-3 mt-0 text-3xl font-normal leading-9">{name}</h2>
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <p className="inline-block rounded-lg border-2 border-primary px-2 py-2 text-primary">
            {studentCode}
          </p>
          <p className="inline-block rounded-lg border-2 border-second px-2 py-2 text-second">
            {studentCode
              ? studentCode[0] + studentCode[1] + studentCode[3]
              : ""}
          </p>
        </div>
        {exportButton}
      </div>
      <div className="mt-3 flex flex-col rounded-xl bg-[#6a7ba2] md:flex-row">
        <div className="flex items-center border-b-[1px] border-slate-400 p-4 md:w-1/3 md:border-b-0 md:border-r-[1px]">
          <div className="w-[90%]">
            <p className="text-white">{t("card info.passed")}</p>
            <p className="text-4xl font-black text-[#93fdcb]">{passed}</p>
          </div>
          <CheckOutlined className="w-[10%] justify-center text-4xl text-[#93fdcb]" />
        </div>
        <div className="flex items-center border-b-[1px] border-slate-400 p-5 md:w-1/3 md:border-b-0 md:border-r-[1px]">
          <div className="w-[90%]">
            <p className="text-white">{t("card info.failed")}</p>
            <p className="text-4xl font-black text-[#F6D6D6]">{failed}</p>
          </div>
          <ExclamationOutlined className="w-[10%] justify-center text-4xl text-[#F6D6D6]" />
        </div>
        <div className="flex items-center p-5 md:w-1/3">
          <div className="w-[90%]">
            <p className="text-white">{t("card info.avg")}</p>
            <p className="text-4xl font-black text-yellow-200">{avgScore}</p>
          </div>
          <LineChartOutlined className="w-[10%] justify-center text-4xl text-yellow-200" />
        </div>
      </div>
    </div>
  )
}

export default CardInfo
