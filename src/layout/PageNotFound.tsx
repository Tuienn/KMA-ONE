import { Button, Result } from "antd"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

const PageNotFound: React.FC = () => {
  const { t } = useTranslation("notification")
  const nagivate = useNavigate()

  return (
    <Result
      status="404"
      title={404}
      subTitle={t("pageNotFound.title")}
      extra={
        <Button type="primary" onClick={() => nagivate("/")}>
          {t("pageNotFound.button")}
        </Button>
      }
    />
  )
}

export default PageNotFound
