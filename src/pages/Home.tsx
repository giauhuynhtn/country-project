import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import { Container } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'

import { AppDispatch, RootState } from '../redux/store'
import { fetchCountriesThunk } from '../redux/slices/countriesSlice'
import { themePalette } from '../components/ThemePalette'
import Header from '../components/Header'
import CountryRow from '../components/CountryRow'
import CountryHeaderRow from '../components/CountryHeaderRow'

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const { countries } = useSelector((state: RootState) => {
    return state
  })

  useEffect(() => {
    dispatch(fetchCountriesThunk())
  }, [dispatch])

  const renderTableCountries = (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="countries table">
        <CountryHeaderRow />
        <TableBody>
          {countries.filteredItems.map((country, index) => (
            <CountryRow country={country} key={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )

  return (
    <ThemeProvider theme={themePalette}>
      <Header />
      <Container sx={{ marginTop: '100px' }}>
        {countries.filteredItems && renderTableCountries}
      </Container>
    </ThemeProvider>
  )
}
