import { Carousel, Empty, Grid } from "antd"
import { useTranslation } from "react-i18next"
import ClassItem from "../findClass/ClassItem"
import { ClassItemProps } from "../findClass/GroupClassItem"

interface Props {
  list: ClassItemProps[]
}

const CarouselOtherClass: React.FC<Props> = ({ list }) => {
  const { t } = useTranslation("classList")

  const { md } = Grid.useBreakpoint()

  return (
    <>
      <h2 className="mt-4">
        {t("detailClass.otherClass")} ({list.length})
      </h2>
      {list.length > 0 ? (
        <div className="relative">
          <Carousel
            dots={md ? true : false}
            // dotPosition="top"
            infinite={false}
            slidesToShow={md ? 4 : 2}
            lazyLoad="anticipated"
            slidesToScroll={md ? 4 : 2}
            // vertical={md ? true : false}
            className="mt-2"
          >
            {list.map((item: ClassItemProps) => (
              <div key={item.id} className="p-2">
                <ClassItem {...item} />
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <Empty />
      )}
    </>
  )
}

export default CarouselOtherClass
