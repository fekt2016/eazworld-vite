/* eslint react/prop-types : 0 */

import { useEffect, useState } from 'react'

import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import styled from 'styled-components'

function Slider({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const slideLenght = slides.length

  const intervalTime = 5000
  const autoScroll = true

  useEffect(() => {
    let interval
    if (autoScroll) {
      interval = setInterval(nextSlide, intervalTime)
    }

    return () => clearInterval(interval)
  }, [nextSlide, autoScroll])

  const sliderStyles = {
    height: '100%',
    position: 'relative',
  }

  const slideStyles = {
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${slides[currentIndex].url})`,
    transition: 'all .3s ease-in',
  }

  const Slide = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `
  const letfArrow = {
    position: 'absolute',
    top: '50%',
    transform: 'transale(0, -50%)',
    left: '25px',
    fontSize: '45px',
    color: '#fff',
  }
  const rightArrow = {
    position: 'absolute',
    top: '50%',
    transform: 'transale(0, -50%)',
    right: '20px',
    fontSize: '45px',
    color: '#fff',
    zIndex: 1,
    cursor: 'pointer',
  }

  const H1 = styled.div`
    font-size: 4rem;
    color: var(--color-white-0);
    text-transform: capitalize;
  `

  function prevSlide() {
    setCurrentIndex(currentIndex === 0 ? slideLenght - 1 : currentIndex - 1)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function nextSlide() {
    setCurrentIndex(currentIndex === slideLenght - 1 ? 0 : currentIndex + 1)
  }
  return (
    <div style={sliderStyles}>
      <HiChevronLeft style={letfArrow} onClick={prevSlide} />
      <HiChevronRight style={rightArrow} onClick={nextSlide} />
      <Slide style={slideStyles}>
        <H1>
          <span>{slides[currentIndex].title}</span>
        </H1>
      </Slide>
    </div>
  )
}

export default Slider
