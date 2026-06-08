import { useEffect, useState } from 'react'
import './App.css'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { getRouteFromPath } from './booking'
import { toAppPath, toBrowserPath } from './routing'
import { AssemblyView } from './views/AssemblyView'
import { BookingView } from './views/BookingView'
import { HomeView } from './views/HomeView'

const readCurrentRoute = () => getRouteFromPath(toAppPath(window.location.pathname))

function App() {
  const [route, setRoute] = useState(readCurrentRoute)

  useEffect(() => {
    function handlePopState() {
      setRoute(readCurrentRoute())
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  function navigate(path: string) {
    const browserPath = toBrowserPath(path)

    if (browserPath !== window.location.pathname) {
      window.history.pushState(null, '', browserPath)
    }

    setRoute(getRouteFromPath(path))
  }

  return (
    <div className="site-shell">
      <SiteHeader onNavigate={navigate} />

      <main className="site-main">
        {route.view === 'home' ? (
          <HomeView onNavigate={navigate} />
        ) : route.view === 'assembly' ? (
          <AssemblyView onNavigate={navigate} />
        ) : (
          <BookingView reason={route.reason} onBack={() => navigate('/')} />
        )}
      </main>

      <SiteFooter />
    </div>
  )
}

export default App
