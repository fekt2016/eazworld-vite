import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useLogout } from '../features/authentication/useLogout'

const StyledSpan = styled.span`
  /* margin-right: 5rem; */
  font-size: 1.2rem;

  display: flex;
`

const Timer = () => {
  const { logout } = useLogout()
  const [delay, setDelay] = useState(600)

  const minutes = Math.floor(delay / 60)
  const seconds = Math.floor(delay % 60)
  useEffect(() => {
    const timer = setInterval(() => {
      setDelay(delay - 1)
    }, 1000)

    if (delay === 0) {
      clearInterval(timer)
      logout()
    }

    return () => {
      clearInterval(timer)
    }
  }, [delay, logout])
  document.addEventListener('click', () => {
    setDelay(600)
  })
  return (
    <>
      <StyledSpan>
        {minutes}:{seconds}
      </StyledSpan>
    </>
  )
}

export default Timer
