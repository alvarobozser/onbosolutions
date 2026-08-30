import CTABanner from '../components/home/CTABanner'
import GuiasPreview from '../components/home/GuiasPreview'
import Hero from '../components/home/Hero'
import ServiciosPreview from '../components/home/ServiciosPreview'

export default function Home() {
  return (
    <main>
      <Hero />
      <ServiciosPreview />
      <CTABanner />
      <GuiasPreview />
    </main>
  )
}
