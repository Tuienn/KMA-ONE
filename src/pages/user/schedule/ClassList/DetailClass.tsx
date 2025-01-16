import { useQuery } from "@tanstack/react-query"
import { App, Tabs } from "antd"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import apiService from "../../../../api/APIService"
import ModalInfo from "../../../../components/common/ModalInfo"
import TableScores from "../../../../components/common/table/TableScores"
import TableStudents from "../../../../components/common/table/TableStudents"
import BasicClassData from "../../../../components/user/schedule/classList/detailClass/BasicClassData"
import CarouselOtherClass from "../../../../components/user/schedule/classList/detailClass/CarouselOtherClass"
import {
  formatScoreByStudentData,
  formatStudentData,
} from "../../../../utils/formatValue"
import { getAuthToken } from "../../../../utils/handleStorage"

const DetailClass: React.FC = () => {
  const { classId } = useParams<{ classId: string }>()
  const { authStudentCode } = getAuthToken()
  const { notification } = App.useApp()

  const { t } = useTranslation(["classList", "notification"])
  const [studentModalState, setStudentModalState] = useState<{
    isOpen: boolean
    studentId: number | null
  }>({
    isOpen: false,
    studentId: null,
  })
  const queryClassList = useQuery({
    queryKey: ["GET", "group-other-class", classId],
    queryFn: async () =>
      apiService("get", "/student/Classes", {
        studentCode: authStudentCode,
      }),
    staleTime: Infinity,
  })
  const queryScoreList = useQuery({
    queryKey: ["GET", "score-list-by-class", classId],
    queryFn: async () => {
      const res = await apiService("get", `/class/${classId}/Scores`)
      return res.scores.map((item: any) => formatScoreByStudentData(item))
    },
    staleTime: Infinity,
  })

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

  useEffect(() => {
    if (
      queryStudentList.isError ||
      queryScoreList.isError ||
      queryClassList.isError
    ) {
      notification.error({
        message: t("notification:api.title"),
        description: t("notification:api.get.error"),
      })
    }
  }, [queryStudentList.isError, queryScoreList.isError, queryClassList.isError])

  const classData =
    queryClassList.isSuccess &&
    queryClassList.data.find((item: any) => item.id === Number(classId))

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
    {
      key: "2",
      label: t("detailClass.tab2"),
      children: (
        <TableScores
          type="list-by-course"
          dataSource={queryScoreList.data}
          loading={queryScoreList.isPending}
        />
      ),
    },
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
          <div className="mb-4 flex gap-2 md:order-1 md:mb-0 md:mr-4 md:w-1/5 md:flex-col">
            <div className="w-1/3 md:w-full">
              <img
                src="https://portal.actvn.edu.vn/images/background-course.png"
                alt=""
                className="h:auto rounded-lg"
              />
            </div>
            <div className="flex-1">
              <BasicClassData
                className={classData?.name}
                courseName={classData?.course}
                room={classData?.location}
                session={classData?.period}
                teacherName={classData?.teacherName}
              />
            </div>
          </div>
        </div>

        <CarouselOtherClass
          list={
            queryClassList.isSuccess
              ? queryClassList.data.filter(
                  (item: any) => item.id !== Number(classId),
                )
              : []
          }
        />
      </div>
    </>
  )
}

export default DetailClass
