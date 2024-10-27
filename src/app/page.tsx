import dynamic from 'next/dynamic'

// Dynamically import WilsonAI with no SSR
const WilsonAI = dynamic(() => import('@/components/WilsonAI'), { ssr: false })

export default function Home() {
  return <WilsonAI />
}