import { Table as ATable } from 'antd'
import { User } from 'src/containers/HomePage'
import styled from 'styled-components'
import LazyLoad from 'react-lazyload'

const StyledImg = styled.img`
  width: 144px;
  height: 144px;
`

const columns = [
  {
    title: 'Avatar',
    dataIndex: 'avatar_url',
    key: 'avatar_url',
    render: (text: string, record: User) => {
      return (
        <LazyLoad offset={100}>
          <StyledImg src={text} alt={record.login} />
        </LazyLoad>
      )
    },
  },
  {
    title: 'Login',
    dataIndex: 'login',
    key: 'login',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
  },
]

interface TableProps {
  items: User[]
  total: number
  loading: boolean | undefined
}

const Table = ({ loading = false, items = [], total }: TableProps) => {
  return (
    <ATable
      loading={loading}
      dataSource={items.map((item) => ({ key: item.id, ...item }))}
      columns={columns}
      pagination={{ total, pageSize: 100 }}
    />
  )
}

export default Table
