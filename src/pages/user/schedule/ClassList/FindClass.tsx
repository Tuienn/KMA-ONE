import { useQuery } from "@tanstack/react-query"
import { App, Select } from "antd"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import apiService from "../../../../api/APIService"
import GroupClassItem from "../../../../components/user/schedule/classList/findClass/GroupClassItem"
import { compareIgnoreCaseAndDiacritics } from "../../../../utils/common"
import { getAuthToken } from "../../../../utils/handleStorage"

const FindClass: React.FC = () => {
  const { t } = useTranslation(["classList", "notification"])
  const navigate = useNavigate()
  const { authStudentCode } = getAuthToken()
  const { notification } = App.useApp()

  const queryGroupClass = useQuery({
    queryKey: ["GET", "group-class"],
    queryFn: async () =>
      apiService("get", "/student/Classes", {
        studentCode: authStudentCode,
      }),
    staleTime: Infinity,
  })

  useEffect(() => {
    if (queryGroupClass.isError) {
      notification.error({
        message: t("notification:api.title"),
        description: t("notification:api.get.error"),
      })
    }
  }, [queryGroupClass.isError])

  return (
    <div className="relative">
      <div className="md:absolute md:right-0 md:top-0 md:w-[300px]">
        <Select
          className="w-full"
          showSearch
          allowClear={true}
          options={queryGroupClass.data?.map((item: any) => ({
            value: item.id,
            label: `${item.course} - ${item.name}`,
          }))}
          placeholder={t("findClass.placeholder")}
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
