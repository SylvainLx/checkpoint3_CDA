import { useGetCountryQuery } from '@/graphql/generated/schema';
import { useRouter } from 'next/router';
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import React from 'react'

export default function CountryDetail() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div>loading...</div>
  }
  const { data, loading, error } = useGetCountryQuery({
    variables: {
      code: id as string,
    },
  });

  if (loading) {
    return <div>loading...</div>
  }
  if (error || !data) {
    return <div>error</div>
  }

  return (
    <div className='flex flex-col justify-center items-center mt-8 gap-2'>
      <h2 className='text-xl m-4' style={{ fontSize: '4rem' }}>{getUnicodeFlagIcon(data.country.code)}</h2>
      <p>Name: {data.country.name} ({data.country.code})</p>
      <p>Continent : {data?.country?.continent?.name}</p>
    </div>
  )
}