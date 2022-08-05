import { useState, useCallback } from 'react'
import SearchInput from 'src/components/SearchInput'
import Table from 'src/components/Table'
import styled from 'styled-components'
import { getUsers } from 'src/api/users'

const Content = styled.div`
  margin: 100px auto;
  width: 992px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SearchInputWrapper = styled.div`
  width: 300px;
`

const TableWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
`
export interface User {
  id: number
  avatar_url: string
  login: string
  type: string
  score: string
}

export interface Users {
  items: User[]
  total_count: number
  loading: boolean
}

const Homepage = () => {
  const [users, setUsers] = useState<Users>()

  const handleSearch = useCallback(async (value: string) => {
    try {
      setUsers({ items: [], total_count: 0, loading: true })
      const query = {
        q: value,
        per_page: 100,
        page: 1,
      }
      const queryString = new URLSearchParams(query as any).toString()
      const results = await getUsers(queryString)
      setUsers(results)
    } catch (error) {
      console.log('error ', error)
      setUsers({ loading: false } as any)
    }
  }, [])

  const handleClearTable = useCallback(() => {
    setUsers({ items: [], total_count: 0, loading: false })
  }, [])

  return (
    <Content>
      <SearchInputWrapper>
        <SearchInput onSearch={handleSearch} onClear={handleClearTable} />
      </SearchInputWrapper>
      <TableWrapper>
        <Table
          loading={users?.loading}
          items={users?.items || []}
          total={users?.total_count || 0}
        />
      </TableWrapper>
    </Content>
  )
}

export default Homepage
