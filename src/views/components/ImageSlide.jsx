import { useState } from "react";
import styled from "styled-components";
// import { img1 } from "../../../public/2.png";
// import { img1 } from "../../../2.png";

// Sample images (replace with your own URLs)
const images = [
  "https://res.cloudinary.com/dtmqkznyd/image/upload/v1745975084/products/1745975082720-938775222-cover.jpg",
  "https://res.cloudinary.com/dtmqkznyd/image/upload/v1745949227/products/1745949225961-400102887-cover.jpg",
  "https://res.cloudinary.com/dtmqkznyd/image/upload/v1745951571/products/1745951570051-755156979-cover.jpg",
];

// Styled Components
const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: auto;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SlideTrack = styled.div`
  display: flex;
  width: 400%;
  transition: transform 0.5 ease-in-out;
  transform: translateX(-${(props) => props.currentSlide * 100}%);
`;

const Slide = styled.div`
  flex-shrink: 0;
  width: 25%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 1.2rem;
  z-index: 2;
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const PrevButton = styled(NavButton)`
  left: 10px;
`;

const NextButton = styled(NavButton)`
  right: 10px;
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 5px;
  background-color: ${(props) => (props.active ? "#000" : "#ccc")};
  border: none;
  cursor: pointer;
  padding: 0;
`;

// Main Component
const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, []);

  const goToPrev = () =>
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const goToNext = () =>
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <SliderContainer>
      <SlideTrack currentSlide={currentSlide}>
        {images.map((src, index) => (
          <Slide key={index}>
            <img src={src} alt={`Slide ${index + 1}`} />
          </Slide>
        ))}
      </SlideTrack>

      <PrevButton onClick={goToPrev}>❮</PrevButton>
      <NextButton onClick={goToNext}>❯</NextButton>

      <DotsContainer>
        {images.map((_, index) => (
          <Dot
            key={index}
            active={currentSlide === index}
            onClick={() => goToSlide(index)}
          />
        ))}
      </DotsContainer>
    </SliderContainer>
  );
};

export default ImageSlider;
