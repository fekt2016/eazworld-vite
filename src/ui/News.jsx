import { useState } from 'react'
import styled from 'styled-components'

import Heading from '../ui/Heading'
import TestCard from './TestCard'

import { useTest } from '../features/test/useTest'
import CloseIcon from './CloseIcon'

const StyledNews = styled.div`
  position: relative;
  background-color: var(--color--blue-100);
  color: var(--color-grey-900);
  flex: 1;
  border-radius: 10px;
  padding: 2rem;
  order: 1;
`

const TextBox = styled.div`
  margin-bottom: 1rem;
  background-color: var(--color-blue-700);
  border-radius: 10px;
  padding: 1rem;
  color: var(--color-blue-100);
`
const TestBox = styled.div`
  padding: 1rem;
  border-radius: 10px;
`
const HeadingBox = styled.div`
  border-bottom: 1px solid var(--color-red-700);
  margin-bottom: 1rem;
`

function News() {
  const [close, setClose] = useState(false)

  const { data: dataList, isLoading } = useTest()

  if (isLoading) return <p>loading</p>

  console.log(dataList)

  if (close === false)
    return (
      <StyledNews>
        <CloseIcon onClick={() => setClose(true)} />
        <HeadingBox>
          <Heading as="h4">urgent notice</Heading>
        </HeadingBox>

        <TextBox>
          <p>You will be receving some notification here </p>
        </TextBox>

        <TestBox>
          {dataList.map((item) => (
            <TestCard
              key={item.id}
              fullName={item.fullName}
              msg={item.msg}
              loc={item.loc}
            />
          ))}
        </TestBox>
      </StyledNews>
    )
}

export default News
