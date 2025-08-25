import './App.css'
import MainLayout from './layouts/MainLayout.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import ViewBooks from './pages/ViewBooks.jsx'
import BookDetails from './pages/BookDetails.jsx'
import AddBook from './pages/AddBook.jsx'
import EditBook from './pages/EditBook.jsx'

function App() {
      const router= createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<MainLayout />}>
          <Route index element={<ViewBooks />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/books/add-book" element={<AddBook />} />
          <Route path="/books/edit/:id" element={<EditBook />} />
          </Route>
        )
      )
  return <RouterProvider router={router} />
}

export default App
