'use client'
import dynamic from 'next/dynamic'

const WilsonAI = dynamic(() => import('./WilsonAI'), { ssr: false })

export default function ClientPage() {
  return <WilsonAI />
}