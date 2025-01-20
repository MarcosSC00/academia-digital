import { Nav } from "./components/nav"
import { AsideBar } from "./components/asidebar"
import { Outlet } from "react-router-dom"
import { EntityProvider } from "./context/EntityContext"
import { MenuMobile } from "./pages/menu-mobile"
import { Toaster } from "sonner"
import * as Dialog from '@radix-ui/react-dialog'

function App() {

  return (
    <EntityProvider>
      <Toaster
        richColors={true}
        toastOptions={{ duration: 2000 }}
      />
      <div className="w-full h-full min-h-screen flex">
        <AsideBar />
        <div className="flex flex-col w-full">
          <Nav />
          <Dialog.Root>
            <main className="overflow-y-auto h-full">
              <div className="container h-full p-6 mx-auto">
                <div className="flex md:hidden">
                  <MenuMobile />
                </div>
                <Outlet />
              </div>
            </main>
          </Dialog.Root>
        </div>
      </div>
    </EntityProvider>
  )
}

export default App
