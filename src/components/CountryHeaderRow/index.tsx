import React, { useState } from 'react'
import { TableCell, TableHead, TableRow } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import {
  sortCountriesByName,
  sortCountriesByPopulation,
} from '../../redux/slices/countriesSlice'

function CountryHeadingRow() {
  const dispatch = useDispatch<AppDispatch>()
  const { themeObj } = useSelector((state: RootState) => {
    return state
  })
  const [sortName, setSortName] = useState('asc')
  const [sortPopulation, setSortPopulation] = useState('asc')

  const handleSortByName = () => {
    setSortName((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    dispatch(sortCountriesByName(sortName))
  }

  const handleSortByPopulation = () => {
    setSortPopulation((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    dispatch(sortCountriesByPopulation(sortPopulation))
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell align="center" sx={{ fontSize: 16, color: '#212121' }}>
          Flag
        </TableCell>
        <TableCell align="left" sx={{ fontSize: 16, color: '#212121' }}>
          Name
          {sortName === 'desc' ? (
            <ArrowUpwardIcon
              sx={{ color: `${themeObj.currentTheme}.dark` }}
              onClick={handleSortByName}
            />
          ) : (
            <ArrowDownwardIcon
              sx={{ color: `${themeObj.currentTheme}.dark` }}
              onClick={handleSortByName}
            />
          )}
        </TableCell>
        <TableCell align="left" sx={{ fontSize: 16, color: '#212121' }}>
          Languages
        </TableCell>
        <TableCell align="left" sx={{ fontSize: 16, color: '#212121' }}>
          Population
          {sortPopulation === 'desc' ? (
            <ArrowUpwardIcon
              sx={{ color: `${themeObj.currentTheme}.dark` }}
              onClick={handleSortByPopulation}
            />
          ) : (
            <ArrowDownwardIcon
              sx={{ color: `${themeObj.currentTheme}.dark` }}
              onClick={handleSortByPopulation}
            />
          )}
        </TableCell>
        <TableCell align="left" sx={{ fontSize: 16, color: '#212121' }}>
          Region
        </TableCell>
        <TableCell
          align="left"
          sx={{ fontSize: 24, color: '#333' }}
        ></TableCell>
      </TableRow>
    </TableHead>
  )
}

export default CountryHeadingRow
