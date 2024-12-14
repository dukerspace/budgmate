'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Setting() {
  const router = useRouter()

  const onDelete = async () => {
    const response = await fetch(`/api/users/me`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      await signOut()
      return router.push('/')
    }
  }

  return (
    <>
      <button onClick={() => onDelete()}>delete</button>
    </>
  )
}
