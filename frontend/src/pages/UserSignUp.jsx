import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [fade, setFade] = useState(true);
  const navigate = useNavigate();

  const steps = [
    "Your name is ____________",
    "and you would like to sign up with your email address______________",
    "Create a strong password with min 6 characters _______________",
    "Great, you are all set."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
        setFade(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [steps.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful signup
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-4xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Pink left section */}
          <div className="w-full md:w-2/5 bg-gradient-to-b from-pink-300 to-pink-500 p-8 md:p-12 text-white">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-6">Sign up</h1>
                <p className="text-lg mb-2">Get started in a few clicks,</p>
                <p className="text-lg mb-2">build meaningful connections</p>
                <p className="text-lg">right away.</p>
              </div>
              
              <div className="mt-8">
                <p className="text-lg">Have an account?</p>
                <Link 
                  to="/login" 
                  className="inline-block mt-3 px-6 py-2 bg-white text-pink-400 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>

          {/* White right section */}
          <div className="w-full md:w-3/5 p-8 md:p-12">
            <div className="h-20 mb-8 flex items-center">
              <p className={`text-lg text-gray-700 ${fade ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                {steps[currentStep]}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password (min 6 characters)"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all"
                  minLength={6}
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-pink-400 text-white py-3 px-4 rounded-lg font-medium hover:bg-pink-500 transition-colors flex items-center justify-center"
              >
                Create account
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;