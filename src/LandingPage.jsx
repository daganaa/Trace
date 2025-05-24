import { useTypewriter, Cursor } from 'react-simple-typewriter';
import Header from './components/Header';

function LandingPage({ onGetStarted }) {
  const [typeEffect] = useTypewriter({
    words: ['immortalized.', 're-captured.', 'transcribed.'],
    loop: true, 
    delaySpeed: 2000,
    typeSpeed: 100,
    deleteSpeed: 50
  });

  return (
    <div className="relative">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <Header onGetStarted={onGetStarted} />
      </div>
      
      {/* Scroll Container */}
      <div className="h-screen snap-y snap-mandatory overflow-y-scroll">
        {/* Hero Section */}
        <section className="h-screen flex items-center justify-center snap-start pt-20">
          <div className="w-full max-w-none px-8">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h1 className="text-[15vw] lg:text-[12vw] font-bold font-serif text-gray-900 leading-[0.9] whitespace-nowrap">
                  <span className="text-[6vw] lg:text-[6vw]">
                    Your<br/>
                    voice,{' '}<br/>
                  </span>
                  <span className="text-blue-200 text-[6vw] lg:text-[6vw]">
                    {typeEffect}
                    <Cursor cursorStyle="|" cursorColor="#93c5fd" />
                  </span>
                </h1>
                
                <div className="mt-8 max-w-lg">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Transform conversations into insights through AI-powered voice journaling. Speak freely, reflect deeply.
                  </p>
                </div>          
                
                <div className="flex mt-12 space-x-6">
                  <button 
                    onClick={onGetStarted}
                    className="flex items-center px-8 py-4 bg-blue-200 text-white font-semibold rounded-lg hover:bg-blue-300 transition-colors text-lg"
                  >
                    Schedule My First Call
                  </button>
                  <button 
                    onClick={onGetStarted}
                    className="flex items-center px-8 py-4 bg-white text-blue-200 font-semibold rounded-lg border-2 border-blue-200 hover:bg-blue-50 transition-colors text-lg"
                  >
                    Watch 45-sec demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="h-screen flex flex-col items-center justify-center snap-start pt-20">
          <div className="w-full max-w-6xl px-8 text-center">
            <h1 className="text-6xl lg:text-8xl font-bold font-serif text-gray-900 mb-8">
              How It Works
            </h1>
            
            <p className="text-lg text-gray-500 mb-16 max-w-2xl mx-auto">
              Three simple steps to transform your voice into meaningful insights
            </p>
            
            <div className="grid md:grid-cols-3 gap-12 items-start">
              {/* Step 1 - Schedule Call */}
              <div className="flex flex-col items-center bg-white p-8 rounded-lg border border-gray-200 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-blue-50 hover:border-blue-300">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mb-6 transition-all duration-300 hover:bg-blue-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-6xl font-serif text-blue-200 mb-4 transition-colors duration-300 hover:text-blue-300">1</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 transition-colors duration-300 hover:text-blue-600">Schedule Call</h3>
                <p className="text-gray-600 text-center transition-colors duration-300 hover:text-gray-700">
                  Pick a time that works for you. No pressure, just conversation.
                </p>
              </div>

              {/* Step 2 - Speak Freely */}
              <div className="flex flex-col items-center bg-white p-8 rounded-lg border border-gray-200 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-blue-50 hover:border-blue-300">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mb-6 transition-all duration-300 hover:bg-blue-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-6xl font-serif text-blue-200 mb-4 transition-colors duration-300 hover:text-blue-300">2</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 transition-colors duration-300 hover:text-blue-600">Speak Freely</h3>
                <p className="text-gray-600 text-center transition-colors duration-300 hover:text-gray-700">
                  Share your thoughts naturally. Our AI listens and understands.
                </p>
              </div>

              {/* Step 3 - Reflect */}
              <div className="flex flex-col items-center bg-white p-8 rounded-lg border border-gray-200 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-blue-50 hover:border-blue-300">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mb-6 transition-all duration-300 hover:bg-blue-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div className="text-6xl font-serif text-blue-200 mb-4 transition-colors duration-300 hover:text-blue-300">3</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 transition-colors duration-300 hover:text-blue-600">Reflect</h3>
                <p className="text-gray-600 text-center transition-colors duration-300 hover:text-gray-700">
                  Receive personalized insights and summaries to guide your journey.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LandingPage;