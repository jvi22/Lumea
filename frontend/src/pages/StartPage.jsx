import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <img 
          src="https://images.unsplash.com/photo-1506782081254-09bcfd996fd6?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background"
          className="w-full h-full object-cover opacity-70"
        />
      </div>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center p-8 min-h-screen">
        <div className="mb-16">
          <h1 className="text-6xl font-bold text-black mb-2">
            Lum<span className="relative">e
              <span className="absolute -top-3 -right-3 text-3xl">•</span>
            </span>a
          </h1>
          <p className="text-xl text-gray-800">Connect with the world around you</p>
        </div>
        
        <Link
          to="/signup"
          className="bg-black text-white px-12 py-4 rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl font-medium text-lg"
        >
          Get Started
        </Link>
      </main>
    </div>
  );
}