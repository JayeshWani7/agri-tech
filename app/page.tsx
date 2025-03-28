import React from 'react';
import { Plane as Plant, Gamepad2, Languages, Users, ChevronRight, Sprout } from 'lucide-react';
import Link from 'next/link';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navbar */}
      <nav className="bg-green-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="text-2xl font-bold">AgriTech</div>
          <div className="space-x-4">
            <Link href="/guide">Farmer's Guide</Link>
            <Link href="https://timely-brioche-a6638b.netlify.app/">Condition Analysis System</Link>
            <Link href="">Gamified Simulation</Link>
            <Link href="https://algae-biofuel-advisor.vercel.app/">Algae Biofuel Advisor</Link>
            <Link href="https://wheatwise-buddy.lovable.app/">Chatbot</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80"
            alt="Farm background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center">
            <Sprout className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Empowering Farmers Through
              <span className="text-green-600"> Digital Innovation</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Learn modern farming techniques through interactive simulations and multilingual guides.
              Transform your farming practices with technology that speaks your language.
            </p>
            <Link href="/guide">
              <button className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center mx-auto gap-2">
                Get Started <ChevronRight className="h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Multilingual Support */}
            <div className="text-center p-6 rounded-xl bg-green-50 hover:bg-green-100 transition-colors duration-200">
              <Languages className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Multilingual Guides</h3>
              <p className="text-gray-600">Access farming knowledge in your preferred language, making learning accessible to everyone.</p>
            </div>

            {/* Interactive Learning */}
            <div className="text-center p-6 rounded-xl bg-green-50 hover:bg-green-100 transition-colors duration-200">
              <Gamepad2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Simulation Games</h3>
              <p className="text-gray-600">Learn through interactive farming simulations that make complex concepts simple and engaging.</p>
            </div>

            {/* Yield Optimization */}
            <div className="text-center p-6 rounded-xl bg-green-50 hover:bg-green-100 transition-colors duration-200">
              <Plant className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Yield Optimization</h3>
              <p className="text-gray-600">Get personalized recommendations to maximize your crop yield using data-driven insights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">Join thousands of farmers who have transformed their farming practices</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <h4 className="font-semibold">Farmer {i}</h4>
                    <p className="text-sm text-gray-500">Region {i}</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Using the simulation-based learning approach helped me understand modern farming techniques better.
                  My crop yield has increased by 40% since implementing these practices."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Farming Practice?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join our community of innovative farmers and start your journey towards better yields today.
          </p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors duration-200">
            Start Learning Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">Empowering farmers through technology and education for a sustainable future.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Multilingual Guides</li>
                <li>Interactive Simulations</li>
                <li>Yield Optimization</li>
                <li>Community Support</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Blog</li>
                <li>Success Stories</li>
                <li>FAQs</li>
                <li>Contact Support</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
                <li>LinkedIn</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AgriTech Innovation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;