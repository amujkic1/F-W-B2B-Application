import { useState } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="layout-container">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <Header onMenuToggle={toggleSidebar} />

      {/* Main Content Area */}
      <main className="main-content min-h-[calc(100vh-4rem)] pt-16 md:ml-64 transition-all duration-300 transition-colors">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
