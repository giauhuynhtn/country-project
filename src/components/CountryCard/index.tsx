import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import { addCart } from '../../redux/slices/cartSlice'
import { Country } from '../../redux/slices/countriesSlice'
import { themePalette } from '../ThemePalette'

type CountryObj = {
  country: Country
}

function CountryCard({ country }: CountryObj) {
  const dispatch = useDispatch<AppDispatch>()
  const { themeObj, cartList } = useSelector((state: RootState) => {
    return state
  })
  let navigate = useNavigate()
  const handleAddCountry = () => {
    dispatch(addCart(country))
  }

  return (
    <ThemeProvider theme={themePalette}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 100 }} component="div">
            {country.flag}
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: 24 }} color="black">
            {country.name.common}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            Region: {country.region}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Languages: {Object.values(country.languages).join(', ')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Population: {country.population}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => handleAddCountry()}
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
        </CardActions>
        <CardActions>
          <Button
            onClick={() => {
              navigate('/')
            }}
            variant="contained"
            sx={{ bgcolor: `${themeObj.currentTheme}.dark` }}
          >
            Go to homepage
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  )
}

export default CountryCard
