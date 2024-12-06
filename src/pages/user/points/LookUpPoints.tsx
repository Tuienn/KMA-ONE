import { Form, Space } from "antd"
import { useTranslation } from "react-i18next"
import FormItemCommon from "../../../components/common/formItemCustom/FormItemCommon"
import ExportButton from "../../../components/common/handleFileButton/ExportButton"
import CardInfo from "../../../components/user/points/CardInfo"
import TablePoints from "../../../components/user/points/TablePoints"
import { getAuthToken } from "../../../utils/handleStorage"

const LookUpPoints: React.FC = () => {
  const { t } = useTranslation(["form", "points"])
  const [form] = Form.useForm()
  const { authStudentCode } = getAuthToken()

  const dataSource = [
    {
      subjectName: "Mathematics",
      credit: 3,
      firstScore: 8.5,
      secondScore: 7.0,
      examScore: 9.0,
      finalScore: 8.0,
    },
    {
      subjectName: "Physics",
      credit: 4,
      firstScore: 7.5,
      secondScore: 6.5,
      examScore: 8.0,
      finalScore: 7.5,
      letterGrade: "C",
    },
    {
      subjectName: "Geography",
      credit: 2,
      firstScore: 7.0,
      secondScore: 6.0,
      examScore: 7.5,
      finalScore: 7.0,
      letterGrade: "C+",
    },
    {
      subjectName: "Physical Education",
      credit: 1,
      firstScore: 7.5,
      secondScore: 8.0,
      examScore: 8.5,
      finalScore: 8.0,
      letterGrade: "B+",
    },
    {
      subjectName: "Computer Science",
      credit: 5,
      firstScore: 9.5,
      secondScore: 9.0,
      examScore: 9.5,
      finalScore: 9.5,
      letterGrade: "A",
    },
    {
      subjectName: "Physics",
      credit: 4,
      firstScore: 7.5,
      secondScore: 6.5,
      examScore: 8.0,
      finalScore: 7.5,
      letterGrade: "C",
    },
    {
      subjectName: "Geography",
      credit: 2,
      firstScore: 7.0,
      secondScore: 6.0,
      examScore: 7.5,
      finalScore: 7.0,
      letterGrade: "C",
    },
    {
      subjectName: "Physical Education",
      credit: 1,
      firstScore: 7.5,
      secondScore: 8.0,
      examScore: 8.5,
      finalScore: 8.0,
      letterGrade: "B",
    },
    {
      subjectName: "Computer Science",
      credit: 5,
      firstScore: 9.5,
      secondScore: 9.0,
      examScore: 9.5,
      finalScore: 9.5,
      letterGrade: "A+",
    },
    {
      subjectName: "Mathematics",
      credit: 3,
      firstScore: 8.5,
      secondScore: 7.0,
      examScore: 9.0,
      finalScore: 8.0,
      letterGrade: "B+",
    },
    {
      subjectName: "Physics",
      credit: 4,
      firstScore: 7.5,
      secondScore: 6.5,
      examScore: 8.0,
      finalScore: 7.5,
      letterGrade: "C",
    },
    {
      subjectName: "Geography",
      credit: 2,
      firstScore: 7.0,
      secondScore: 6.0,
      examScore: 7.5,
      finalScore: 7.0,
      letterGrade: "C+",
    },
    {
      subjectName: "Physical Education",
      credit: 1,
      firstScore: 7.5,
      secondScore: 8.0,
      examScore: 8.5,
      finalScore: 8.0,
      letterGrade: "B+",
    },
  ]

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
                formatOption: (dataQuery: any) => {
                  return {
                    value: dataQuery.id,
                    label: `${dataQuery.name} - ${dataQuery.studentCode}`,
                  }
                },
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
          name="Nguyễn Lưu Quốc Hoàng"
          studentCode="CT060215"
          className="CT6B"
          passed={42}
          failed={3}
          avgScore={2.5}
          exportButton={
            <ExportButton
              fileName="Nguyễn Lưu Quốc Hoàng_scores"
              dataRows={dataSource}
              header={[
                t("points:table.subject name"),
                t("points:table.credit"),
                t("points:table.first score"),
                t("points:table.second score"),
                t("points:table.exam score"),
                t("points:table.final score"),
                t("points:table.letter grade"),
              ]}
            />
          }
        />
      </div>
      {/* <div className="mt-3 flex place-content-end"></div> */}
      <TablePoints loading={false} dataSource={dataSource} />
    </div>
  )
}

export default LookUpPoints
