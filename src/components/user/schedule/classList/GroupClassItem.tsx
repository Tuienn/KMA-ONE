import { useTranslation } from "react-i18next"
import ClassItem from "./ClassItem"

export interface ClassItemProps {
  id: string | number
  className: string
  course: string
}

interface Props {
  list: ClassItemProps[]
}

const GroupClassItem: React.FC<Props> = ({ list }) => {
  const { t } = useTranslation("classList")
  return (
    <div className="mt-3 md:mt-0">
      <h2 className="!font-medium">{t("find class.list")} (24)</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 shadow-sm md:grid-cols-3 md:gap-4 lg:grid-cols-4 2xl:grid-cols-6">
        {list.map((item: ClassItemProps) => (
          <ClassItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}

export default GroupClassItem
