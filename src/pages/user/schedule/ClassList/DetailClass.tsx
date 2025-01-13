import { useQuery } from "@tanstack/react-query"
import { Empty, Tabs } from "antd"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import apiService from "../../../../api/APIService"
import ModalInfo from "../../../../components/common/ModalInfo"
import TableStudents from "../../../../components/common/table/TableStudents"
import BasicClassData from "../../../../components/user/schedule/classList/detailClass/BasicClassData"
import CarouselGroupClass from "../../../../components/user/schedule/classList/findClass/CarouselGroupClass"
import { formatStudentData } from "../../../../utils/formatValue"
import { getAuthToken } from "../../../../utils/handleStorage"

interface Props {}

const DetailClass: React.FC<Props> = () => {
  const { classId } = useParams<{ classId: string }>()
  const { t } = useTranslation("classList")
  const [studentModalState, setStudentModalState] = useState<{
    isOpen: boolean
    studentId: number | null
  }>({
    isOpen: false,
    studentId: null,
  })

  const { authStudentCode } = getAuthToken()

  const queryGroupClass = useQuery({
    queryKey: ["GET", "group-class"],
    queryFn: async () => {
      const res = await apiService("get", "/student/Classes", {
        studentCode: authStudentCode,
      })

      return res.filter((item: any) => item.id !== Number(classId))
    },
    staleTime: Infinity,
  })

  console.log(queryGroupClass.data)

  const queryStudentList = useQuery({
    queryKey: ["GET", "student-list-by-class", classId],
    queryFn: async () => {
      const res = await apiService("get", `/class/${classId}/Students`, {
        SortBy: "Name",
      })
      return {
        list: res.items.map((item: any) => formatStudentData(item)),
      }
    },
    staleTime: Infinity,
  })

  const itemsTab = [
    {
      key: "1",
      label: t("detailClass.tab1"),
      children: (
        <TableStudents
          permission="student"
          dataSource={queryStudentList.data}
          loading={queryStudentList.isPending}
          handleSelectStudentCode={setStudentModalState}
        />
      ),
    },
    { key: "2", label: t("detailClass.tab2") },
  ]
  return (
    <>
      <ModalInfo
        permission="guest"
        open={studentModalState.isOpen}
        setStudentModalState={setStudentModalState}
        studentId={studentModalState.studentId}
      />
      <div>
        <div className="flex flex-col md:flex-row">
          <div className="order-2 rounded-lg bg-white p-4 pt-0 md:w-4/5">
            <Tabs items={itemsTab} defaultValue={1} />
          </div>
          <div className="mb-4 flex md:order-1 md:mb-0 md:mr-4 md:w-1/5 md:flex-col">
            <img
              src="https://portal.actvn.edu.vn/images/background-course.png"
              alt=""
              className="w-1/3 rounded-lg md:w-full"
            />
            <div className="flex-1">
              <BasicClassData />
            </div>
          </div>
        </div>
        <h2 className="mt-4">{t("detailClass.otherClass")}</h2>
        {queryGroupClass.isSuccess ? (
          <CarouselGroupClass list={queryGroupClass.data} />
        ) : (
          <Empty />
        )}
      </div>
    </>
  )
}

export default DetailClass
