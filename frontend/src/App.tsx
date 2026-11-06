import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Layout } from './components/Layout'
import { DashboardPage } from './pages/DashboardPage'
import {
  CustomersPage,
  NotFoundPage,
  ProductsPage,
  QuotationsPage,
  RequestsPage,
  SettingsPage,
} from './pages/PlaceholderPages'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="anfragen" element={<RequestsPage />} />
          <Route path="angebote" element={<QuotationsPage />} />
          <Route path="produkte" element={<ProductsPage />} />
          <Route path="kunden" element={<CustomersPage />} />
          <Route path="einstellungen" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
