import { useState } from 'react'
import styled from 'styled-components'
import { IoMdClose } from 'react-icons/io'
import Heading from '../ui/Heading'
import TestCard from './TestCard'

import { useTest } from '../features/test/useTest'

// const datalist = [
//   {
//     id: '001',
//     name: 'yussif umar',
//     image: '../../avatar.png',
//     msg: 'i am really happy with your work',
//     loc: 'accra',
//   },
//   {
//     id: '003',
//     name: 'sahada',
//     image: '../../avatar.png',
//     msg: 'great work',
//     loc: 'nima',
//   },
// ]

const StyledNews = styled.div`
  position: relative;

  color: var(--color-grey-900);
  flex: 1;
  border-radius: 10px;
  padding: 2rem;
  order: 1;
`
const Icon = styled(IoMdClose)`
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 3rem;
  cursor: pointer;
`
const TextBox = styled.div`
  margin-bottom: 1rem;
  background-color: var(--color-blue-700);
  border-radius: 10px;
  padding: 1rem;
  color: var(--color-blue-100);
`
const TestBox = styled.div`
  background-color: var(--color-grey-200);
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
        <Icon onClick={() => setClose(true)} />
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
              name={item.name}
              image={item.image}
              msg={item.msg}
              loc={item.loc}
            />
          ))}
        </TestBox>
      </StyledNews>
    )
}

export default News
