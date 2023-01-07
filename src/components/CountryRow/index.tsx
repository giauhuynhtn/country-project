import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import { Typography } from '@mui/material'

import { AppDispatch, RootState } from '../../redux/store'
import { addCart } from '../../redux/slices/cartSlice'
import { Country } from '../../redux/slices/countriesSlice'

type CountryObj = {
  country: Country
}

function CountryRow({ country }: CountryObj) {
  const dispatch = useDispatch<AppDispatch>()
  const { themeObj, cartList } = useSelector((state: RootState) => {
    return state
  })
  let navigate = useNavigate()
  const handleAddCountry = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(addCart(country))
  }

  return (
    <TableRow
      hover={true}
      onClick={() => {
        navigate(`/info/${country.name.common}/`)
      }}
    >
      <TableCell align="center" sx={{ width: 100 }}>
        <Typography sx={{ fontSize: 40 }}>{country.flag}</Typography>
      </TableCell>
      <TableCell align="left" sx={{ width: 100 }}>
        {country.name.common}
      </TableCell>
      <TableCell align="left" sx={{ width: 200 }}>
        {Object.values(country.languages).join(', ')}
      </TableCell>
      <TableCell align="left" sx={{ width: 100 }}>
        {country.population}
      </TableCell>
      <TableCell align="left" sx={{ width: 100 }}>
        {country.region}
      </TableCell>
      <TableCell align="left" sx={{ width: 100 }}>
        <Button
          onClick={handleAddCountry}
          variant="contained"
          sx={{ bgcolor: `${themeObj.currentTheme}.dark` }}
          disabled={
            cartList.items.find((i) => i.name.common === country.name.common)
              ? true
              : false
          }
        >
          ADD
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default CountryRow
