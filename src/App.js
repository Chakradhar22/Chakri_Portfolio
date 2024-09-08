import Layout from './components/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import About from './pages/About'
import Certifications from './pages/Certifications'
import Profiles from './pages/Profiles'
import Contact from './pages/Contact'


function App() {
  return (
    <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/About' element={<About />} />
                    <Route path='/Projects' element={<Projects />} />
                    <Route path='/Skills' element={<Skills />} />
                    <Route path='/Certifications' element={<Certifications />} />
                    <Route path='/Profiles' element={<Profiles />} />
                    <Route path='/Contact' element={<Contact />} />

                </Routes>
            </Layout>
      </BrowserRouter>
  );
}

export default App;
