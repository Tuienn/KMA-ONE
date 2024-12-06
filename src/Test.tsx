import React from "react"
import { Button, Carousel } from "antd"
import { CarouselRef } from "antd/es/carousel"

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
}

const Test: React.FC = () => {
  const carouselRef = React.useRef<CarouselRef>(null)
  const onChange = (currentSlide: number) => {
    console.log(currentSlide)
  }

  return (
    <>
      <Carousel ref={carouselRef} afterChange={onChange}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      <Button onClick={() => carouselRef.current?.goTo(2, true)}>Next</Button>
    </>
  )
}

export default Test
