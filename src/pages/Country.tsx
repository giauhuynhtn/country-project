import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import Header from '../components/Header'
import CountryCard from '../components/CountryCard'

function Country() {
  const { id } = useParams<{ id: string }>()
  const { countries } = useSelector((state: RootState) => state)
  const countryInfo = countries.items.find(
    (i) => id && i.name.common.toLocaleLowerCase() === id.toLocaleLowerCase()
  )

  return (
    <>
      <Header />
      {countryInfo && <CountryCard country={countryInfo} />}
    </>
  )
}

export default Country
