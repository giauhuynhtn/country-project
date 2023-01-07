import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Brightness1Icon from '@mui/icons-material/Brightness1'
import HomeIcon from '@mui/icons-material/Home'

import { AppDispatch, RootState } from '../../redux/store'
import { openCart, removeCart } from '../../redux/slices/cartSlice'
import { changeTheme } from '../../redux/slices/themeSlice'
import { Container, Link } from '@mui/material'
import { themePalette } from '../ThemePalette'
import { filterCountry } from '../../redux/slices/countriesSlice'
import { Search, StyledInputBase } from '../StyledComponents'

function Header() {
  const dispatch = useDispatch<AppDispatch>()
  const { cartList, themeObj } = useSelector((state: RootState) => {
    return state
  })

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [searchValue, setSearchValue] = React.useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const hanlleFilter = () => {
    dispatch(filterCountry(searchValue))
  }

  const handleCartOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  let navigate = useNavigate()
  const isMenuOpen = Boolean(anchorEl)
  const menuId = 'primary-search-account-menu'

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ top: 40, right: 0 }}
    >
      <Box sx={{ minWidth: 300, flexGrow: 1 }}>
        <Typography>FLAGS CART: </Typography>

        {cartList.items.length > 0 ? (
          cartList.items.map((country, index) => {
            return (
              <MenuItem key={index}>
                <Container
                  onClick={() => {
                    navigate(`/info/${country.name.common}/`)
                  }}
                  sx={{
                    flexGrow: 1,
                    fontSize: 22,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                >
                  <Typography sx={{ fontSize: 30, marginRight: 2 }}>
                    {country.flag}
                  </Typography>
                  <Typography>{country.name.common}</Typography>
                </Container>

                <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => dispatch(removeCart(country))}
                >
                  <DeleteOutlineIcon spacing={40} sx={{ left: 0 }} />
                </IconButton>
              </MenuItem>
            )
          })
        ) : (
          <Typography>Empty cart</Typography>
        )}
      </Box>
    </Menu>
  )

  return (
    <ThemeProvider theme={themePalette}>
      <Box
        sx={{
          flexGrow: 1,
          position: 'fixed',
          width: '100%',
          top: 0,
          zIndex: '99',
        }}
      >
        <AppBar position="static">
          <Toolbar sx={{ bgcolor: `${themeObj.currentTheme}.main` }}>
            <Box sx={{ display: { md: 'flex' } }}>
              <IconButton
                size="large"
                aria-label="go to home page"
                color="inherit"
              >
                <Badge color="error">
                  <Link
                    href="/"
                    underline="none"
                    sx={{
                      display: { xs: 'none', sm: 'block' },
                      color: 'white',
                      padding: '0 4px',
                    }}
                  >
                    <HomeIcon />
                  </Link>
                </Badge>
              </IconButton>
            </Box>

            <Search>
              <StyledInputBase
                value={searchValue}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleChange}
              />
            </Search>

            <Box sx={{ display: { md: 'flex' }, flexGrow: 1 }}>
              <IconButton
                size="large"
                aria-label="searching countries"
                color="inherit"
                onClick={hanlleFilter}
              >
                <Badge color="error">
                  <SearchIcon />
                </Badge>
              </IconButton>
            </Box>

            {themeObj.themeList.map((item, index) => (
              <Box sx={{ display: { md: 'flex' } }} key={index}>
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => {
                    dispatch(changeTheme(item))
                  }}
                >
                  <Badge color="error">
                    <Brightness1Icon
                      sx={{
                        color: `${item}.main`,
                      }}
                    />
                  </Badge>
                </IconButton>
              </Box>
            ))}

            <Box
              sx={{ display: { md: 'flex' } }}
              onClick={() => dispatch(openCart())}
            >
              <IconButton
                size="large"
                aria-label="show cart items"
                color="inherit"
                onClick={handleCartOpen}
              >
                <Badge badgeContent={cartList.items.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {cartList.isOpening && renderMenu}
      </Box>
    </ThemeProvider>
  )
}

export default Header
