import { useQuery } from "@tanstack/react-query"
import { App, Form, Space } from "antd"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import apiService from "../../api/APIService"
import FormItemCommon from "../../components/common/formItemCustom/FormItemCommon"
import ExportButton from "../../components/common/handleFileButton/ExportButton"
import TableScores from "../../components/common/table/TableScores"
import CardInfo from "../../components/user/points/CardInfo"
import { formatScoreByStudentData } from "../../utils/formatValue"
import { getAuthToken } from "../../utils/handleStorage"

const Scores: React.FC = () => {
  const { t } = useTranslation(["form", "scores", "notification"])
  const [form] = Form.useForm()
  const { authStudentCode } = getAuthToken()
  const { notification } = App.useApp()

  // const dataSource = [
  //   {
  //     courseName: "Mathematics",
  //     credit: 3,
  //     firstScore: 8.5,
  //     secondScore: 7.0,
  //     examScore: 9.0,
  //     finalScore: 8.0,
  //   },
  //   {
  //     courseName: "Physics",
  //     credit: 4,
  //     firstScore: 7.5,
  //     secondScore: 6.5,
  //     examScore: 8.0,
  //     finalScore: 7.5,
  //     letterGrade: "C",
  //   },
  //   {
  //     courseName: "Geography",
  //     credit: 2,
  //     firstScore: 7.0,
  //     secondScore: 6.0,
  //     examScore: 7.5,
  //     finalScore: 7.0,
  //     letterGrade: "C+",
  //   },
  //   {
  //     courseName: "Physical Education",
  //     credit: 1,
  //     firstScore: 7.5,
  //     secondScore: 8.0,
  //     examScore: 8.5,
  //     finalScore: 8.0,
  //     letterGrade: "B+",
  //   },
  //   {
  //     courseName: "Computer Science",
  //     credit: 5,
  //     firstScore: 9.5,
  //     secondScore: 9.0,
  //     examScore: 9.5,
  //     finalScore: 9.5,
  //     letterGrade: "A",
  //   },
  //   {
  //     courseName: "Physics",
  //     credit: 4,
  //     firstScore: 7.5,
  //     secondScore: 6.5,
  //     examScore: 8.0,
  //     finalScore: 7.5,
  //     letterGrade: "C",
  //   },
  //   {
  //     courseName: "Geography",
  //     credit: 2,
  //     firstScore: 7.0,
  //     secondScore: 6.0,
  //     examScore: 7.5,
  //     finalScore: 7.0,
  //     letterGrade: "C",
  //   },
  //   {
  //     courseName: "Physical Education",
  //     credit: 1,
  //     firstScore: 7.5,
  //     secondScore: 8.0,
  //     examScore: 8.5,
  //     finalScore: 5,
  //     letterGrade: "B",
  //   },
  //   {
  //     courseName: "Computer Science",
  //     credit: 5,
  //     firstScore: 9.5,
  //     secondScore: 9.0,
  //     examScore: 9.5,
  //     finalScore: 9.5,
  //     letterGrade: "A+",
  //   },
  //   {
  //     courseName: "Mathematics",
  //     credit: 3,
  //     firstScore: 8.5,
  //     secondScore: 7.0,
  //     examScore: 9.0,
  //     finalScore: 8.0,
  //     letterGrade: "B+",
  //   },
  //   {
  //     courseName: "Physics",
  //     credit: 4,
  //     firstScore: 7.5,
  //     secondScore: 6.5,
  //     examScore: 8.0,
  //     finalScore: 7.5,
  //     letterGrade: "C",
  //   },
  //   {
  //     courseName: "Geography",
  //     credit: 2,
  //     firstScore: 7.0,
  //     secondScore: 6.0,
  //     examScore: 7.5,
  //     finalScore: 7.0,
  //     letterGrade: "C+",
  //   },
  //   {
  //     courseName: "Physical Education",
  //     credit: 1,
  //     firstScore: 7.5,
  //     secondScore: 8.0,
  //     examScore: 8.5,
  //     finalScore: 8.0,
  //     letterGrade: "B+",
  //   },
  // ]

  const queryScoreByStudent = useQuery({
    queryKey: ["GET", "scoreByStudent"],
    queryFn: async () => {
      const res = await apiService("get", "/student/score", {
        studentCode: authStudentCode,
      })

      return {
        dataSource: res.scores.map((item: any) =>
          formatScoreByStudentData(item),
        ),
        name: res.student.name,
        studentCode: res.student.studentCode,
        passed: res.passedSubject,
        failed: res.notPassedSubject,
        avgSocre: res.weightedAverage,
      }
    },
    staleTime: Infinity,
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
        <Form
          form={form}
          className="z-1 absolute top-[-40px] w-full lg:top-1 lg:flex lg:justify-end"
        >
          <Space.Compact className="w-full lg:max-w-[430px]">
            <FormItemCommon
              name="keyword"
              type="query_select"
              placeholder={t("form item search student.placeholder")}
              className="w-[70%]"
              querySetting={{
                linkAPI: "/search",
                formatOption: (dataQuery: any) =>
                  dataQuery.students.map((item: any) => ({
                    value: item.id,
                    label: `${item.name} - ${item.studentCode}`,
                  })),
              }}
            />
            <FormItemCommon
              type="select"
              name="type"
              options={[]}
              className="w-[30%]"
              placeholder={t("form item classify student.placeholder")}
            />
          </Space.Compact>
        </Form>
        <CardInfo
          name={queryScoreByStudent.data?.name}
          studentCode={queryScoreByStudent.data?.studentCode}
          passed={queryScoreByStudent.data?.passed}
          failed={queryScoreByStudent.data?.failed}
          avgScore={queryScoreByStudent.data?.avgSocre}
          exportButton={
            <ExportButton
              fileName={`${queryScoreByStudent.data?.name} - ${queryScoreByStudent.data?.studentCode}`}
              dataRows={queryScoreByStudent.data?.dataSource}
              headers={[
                t("scores:table.course name"),
                t("scores:table.credit"),
                t("scores:table.first score"),
                t("scores:table.second score"),
                t("scores:table.exam score"),
                t("scores:table.final score"),
                t("scores:table.letter grade"),
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
