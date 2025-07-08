import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Features from './components/Features';
import SafetyMap from './components/SafetyMap';
import Alerts from './components/Alerts';
import About from './components/About';
import Contact from './components/Contact';
import Statistics from './components/Statistics';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-purple-950 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Features />
              </>
            } />
            <Route path="/map" element={<SafetyMap />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/stats" element={<Statistics />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;