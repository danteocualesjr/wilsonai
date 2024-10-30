// Import the WilsonAI component from the components directory
import WilsonAI from '@/components/WilsonAI'

// Define the main Home page component
export default function Home() {
  return (
    // Main container element for the page
    <main>
      {/* Render the WilsonAI chat interface component */}
      <WilsonAI />
    </main>
  )
}