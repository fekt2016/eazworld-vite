import { styled } from 'styled-components'

import { useState } from 'react'
import ButtonIcon from '../../ui/ButtonIcon'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2'
import { getTestimonial } from '../../services/apiTestimonial'
import Spinner from '../../ui/Spinner'
import { useQuery } from '@tanstack/react-query'

const testData = [
  {
    name: 'yussif faisal',
    location: 'accra',
    msg: 'Your service is the best and the fastest thanks',
    img: '../../../default.png',
  },
  {
    name: 'Abdallah faisal',
    location: 'nima',
    msg: 'Your service is the best and the fastest thanks',
    img: '../../../default.png',
  },
  {
    name: 'hafsa faisal',
    location: 'achimota',
    msg: 'Your service is the best and the fastest thanks',
    img: '../../../default.png',
  },
  {
    name: 'faisal umar',
    location: 'mamobi',
    msg: 'Your service is the best and the fastest thanks',
    img: '../../../default.png',
  },
]
const SliderContainer = styled.div`
  background-color: white;
  height: 28rem;
  width: 50rem;
  margin: 0 auto;
  position: relative;
  border-radius: var(--border-radius-lg);
`
function Slider() {
  const [currentIndex, setCurrentIndex] = useState(2)

  const { isLoading, data: test, error } = useQuery({
    queryKey: ['testimonial'],
    queryFn: getTestimonial,
  })
  if (isLoading) return <Spinner />
  if (error) return 'An error has occurred: ' + error.message

  console.log(test[0].id)
  console.log(error)

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? testData.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }
  const goToNext = () => {
    const isLastSlide = currentIndex === testData.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  return (
    <SliderContainer>
      {/* <Slide
      // key={test[currentIndex].id}
      // location={test[currentIndex].location}
      // name={test[currentIndex].name}
      // msg={test[currentIndex].message}
      /> */}
      <ButtonIcon type="slideIconLeft" onClick={goToPrevious}>
        <HiOutlineChevronLeft />
      </ButtonIcon>
      <ButtonIcon type="slideIconRight" onClick={goToNext}>
        <HiOutlineChevronRight />
      </ButtonIcon>
    </SliderContainer>
  )
}

export default Slider
