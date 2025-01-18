import { useQuery } from "@tanstack/react-query"
import { App } from "antd"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import apiService from "../../api/APIService"
import ExportButton from "../../components/common/handleFileButton/ExportButton"
import TableScores from "../../components/common/table/TableScores"
import CardInfo from "../../components/user/points/CardInfo"
import FindScore from "../../components/user/points/FindScore"
import { UsePath, UseSearch } from "../../context/PathProvider"
import { formatScoreByStudentData } from "../../utils/formatValue"
import { getAuthToken } from "../../utils/handleStorage"

const Scores: React.FC = () => {
  const { t } = useTranslation(["scores", "notification"])
  const { authStudentCode } = getAuthToken()
  const { notification } = App.useApp()

  const { searchPath, history } = UsePath()

  useEffect(() => {
    if (!searchPath.studentCode) {
      UseSearch(history, "/scores", {
        ...searchPath,
        studentCode: authStudentCode,
      })
    }
  }, [])

  const queryScoreByStudent = useQuery({
    queryKey: ["GET", "scoreByStudent", searchPath],
    queryFn: async () => {
      const res = await apiService("get", "/student/score", {
        studentCode: searchPath.studentCode,
        semester: searchPath.semester,
      })

      return {
        dataSource: {
          list: res.scores.map((item: any) => formatScoreByStudentData(item)),
        },
        name: res.student.name,
        studentCode: res.student.studentCode,
        passed: res.passedSubject,
        failed: res.notPassedSubject,
        avgSocre: res.weightedAverage,
      }
    },
    staleTime: Infinity,
    enabled: !!searchPath.studentCode,
  })

  useEffect(() => {
    if (queryScoreByStudent.isError) {
      notification.error({
        message: t("notification:api.title"),
        description: t("notification:api.get.error"),
      })
    }
  }, [queryScoreByStudent.isError])

  return (
    <div>
      <div className="relative h-fit">
        <FindScore />
        <CardInfo
          name={queryScoreByStudent.data?.name}
          studentCode={queryScoreByStudent.data?.studentCode}
          passed={queryScoreByStudent.data?.passed}
          failed={queryScoreByStudent.data?.failed}
          avgScore={queryScoreByStudent.data?.avgSocre}
          exportButton={
            <ExportButton
              fileName={`${queryScoreByStudent.data?.name} - ${queryScoreByStudent.data?.studentCode}`}
              dataRows={queryScoreByStudent.data?.dataSource.list}
              headers={[
                t("scores:table.courseName"),
                t("scores:table.credit"),
                t("scores:table.firstScore"),
                t("scores:table.secondScore"),
                t("scores:table.examScore"),
                t("scores:table.finalScore"),
                t("scores:table.letterGrade"),
              ]}
            />
          }
        />
      </div>
      {/* <div className="mt-3 flex place-content-end"></div> */}
      <TableScores
        loading={queryScoreByStudent.isPending}
        dataSource={queryScoreByStudent.data?.dataSource ?? []}
        type="list-by-student"
      />
    </div>
  )
}

export default Scores
