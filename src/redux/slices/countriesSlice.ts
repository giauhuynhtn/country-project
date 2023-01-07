import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export type Country = {
  region: string[]
  population: number
  languages: {
    [key: string]: string
  }
  name: { common: string }
  flag: string
}

export interface CountriesState {
  items: Country[]
  filteredItems: Country[]
  isLoading: boolean
}

const initialState: CountriesState = {
  items: [],
  filteredItems: [],
  isLoading: false,
}

export const fetchCountriesThunk = createAsyncThunk(
  'countries/fetch',
  async () => {
    const URL =
      'https://restcountries.com/v3.1/all?fields=name,languages,region,population,flag'
    const response = await axios.get(URL)

    return { data: response.data, status: response.status }
  }
)

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    filterCountry: (state, action: PayloadAction<string>) => {
      const filteredCountries = state.items.filter((country) => {
        const lowerCaseName = country.name.common.toLowerCase()
        return lowerCaseName.includes(action.payload.toLowerCase())
      })
      state.filteredItems = filteredCountries
    },

    sortCountriesByName: (state, action: PayloadAction<string>) => {
      const sortType = action.payload
      console.log('sortType in acion:', sortType)
      const sortList = [...state.filteredItems]

      sortList.sort(function (a, b) {
        return a.name.common.localeCompare(b.name.common)
      })

      if (sortType === 'asc') {
        state.filteredItems = sortList
      } else if (sortType === 'desc') {
        state.filteredItems = sortList.reverse()
      }
    },

    sortCountriesByPopulation: (state, action: PayloadAction<string>) => {
      const sortType = action.payload
      const sortList = [...state.filteredItems]
      if (sortType === 'asc') {
        sortList.sort(function (a, b) {
          return a.population - b.population
        })
      } else if (sortType === 'desc') {
        sortList.sort(function (a, b) {
          return b.population - a.population
        })
      }

      state.filteredItems = sortList
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(fetchCountriesThunk.pending, (state: any) => {
      state.isLoading = true
    })

    builder.addCase(
      fetchCountriesThunk.fulfilled,
      (state: any, action: any) => {
        state.items = action.payload.data
        state.filteredItems = action.payload.data
        state.isLoading = false
      }
    )
  },
})

export const { filterCountry, sortCountriesByName, sortCountriesByPopulation } =
  countriesSlice.actions

export default countriesSlice.reducer
