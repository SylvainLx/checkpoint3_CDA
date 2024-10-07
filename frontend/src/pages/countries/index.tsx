import React from 'react'
import { useAddCountryMutation, useGetContinentsQuery, useGetCountriesQuery } from '@/graphql/generated/schema'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import Link from 'next/link'

export default function Countries() {
  const { data, loading, error, refetch } = useGetCountriesQuery()
  const { data: continent, loading: continentLoading, error: continentError } = useGetContinentsQuery()

  const [createCountry] = useAddCountryMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const name = formData.get('name') as string
    const emoji = formData.get('emoji') as string
    const code = formData.get('code') as string
    const continentId = formData.get('continent') as string

    if (!name || !emoji || !code || !continentId) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await createCountry({
        variables: {
          data: {
            name,
            emoji,
            code,
            continent: { id: parseInt(continentId) }
          }
        }
      })
      await refetch()
      form.reset()
    } catch (e) {
      console.error(e)
    }
  }

  if (loading || continentLoading) return <div>Loading...</div>
  if (error || continentError) return <div>Error</div>

  return (
    <section className='flex flex-col items-center'>
      <form
        onSubmit={handleSubmit}
        className='bg-slate-100 border-2 border-slate-600 flex flex-col gap-4 md:flex-row items-center m-4 md:m-8 p-4 md:p-8 justify-center'>
        <div className='flex flex-col'>
          <label>Name</label>
          <input type="text" name="name" />
        </div>
        <div className='flex flex-col'>
          <label>Emoji</label>
          <input type="text" name="emoji" />
        </div>
        <div className='flex flex-col'>
          <label>Code</label>
          <input type="text" name="code" />
        </div>
        <div className='flex flex-col'>
          <select name="continent">
            {continent?.continents.map((continent) => (
              <option key={continent.id} value={continent.id}>{continent.name}</option>
            ))}
          </select>
        </div>
        <button type='submit' className="bg-[#F7136B] text-white p-4 w-full md:w-auto rounded-lg">Add</button>
      </form>

      <div className='flex flex-wrap justify-center'>
        {data?.countries.map((country) => (
          <Link href={`/countries/${country.code}`} key={country.id} className='bg-slate-100 border-2 border-slate-600 flex flex-col gap-2 items-center m-4 w-24 h-24 justify-center'>
            <div>{country.name}</div>
            <div>{getUnicodeFlagIcon(country.code)}</div>
          </Link>
        ))}
      </div>

    </section >
  )
}