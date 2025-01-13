import { Carousel, Grid } from "antd"
import ClassItem from "./ClassItem"
import { ClassItemProps } from "./GroupClassItem"

interface Props {
  list: ClassItemProps[]
}

const CarouselGroupClass: React.FC<Props> = ({ list }) => {
  const { md } = Grid.useBreakpoint()
  return (
    <Carousel
      dots={false}
      infinite={false}
      slidesToShow={md ? 4 : 2}
      lazyLoad="anticipated"
      slidesToScroll={md ? 4 : 2}
      vertical={md ? true : false}
      className="w-full"
    >
      {list.map((item: ClassItemProps, index: number) => (
        <div className={`${index % 2 === 0 ? "pr-2" : "pl-2"}`} key={item.id}>
          <ClassItem {...item} />
        </div>
      ))}
    </Carousel>
  )
}

export default CarouselGroupClass
