import { useQuery } from "@tanstack/react-query"
import { Select } from "antd"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import apiService from "../../../../api/APIService"
import GroupClassItem from "../../../../components/user/schedule/classList/findClass/GroupClassItem"
import { compareIgnoreCaseAndDiacritics } from "../../../../utils/common"

const FindClass: React.FC = () => {
  const { t } = useTranslation("classList")
  const navigate = useNavigate()

  const queryGroupClass = useQuery({
    queryKey: ["GET", "group-class"],
    queryFn: async () => apiService("get", "/class"),
    staleTime: Infinity,
  })

  return (
    <div className="relative">
      <div className="md:absolute md:right-0 md:top-0 md:w-[300px]">
        <Select
          className="w-full"
          showSearch
          allowClear={true}
          options={queryGroupClass.data?.map((item: any) => ({
            value: item.id,
            label: `${item.course} - ${item.className}`,
          }))}
          placeholder={t("find class.placeholder")}
          filterOption={(input: string, option: any) =>
            compareIgnoreCaseAndDiacritics(input, option.label)
          }
          popupMatchSelectWidth={false}
          notFoundContent={null}
          onChange={(value: any) => {
            navigate(`/schedule/class-list/${value}`)
          }}
        />
      </div>
      {queryGroupClass.isSuccess && (
        <GroupClassItem list={queryGroupClass.data} />
      )}
    </div>
  )
}
export default FindClass
