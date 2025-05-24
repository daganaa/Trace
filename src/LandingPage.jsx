import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { useState, useEffect } from 'react';
import Header from './components/Header';

function LandingPage({ onGetStarted }) {
  const [typeEffect] = useTypewriter({
    words: ['immortalized.', 're-captured.', 'transcribed.'],
    loop: true, 
    delaySpeed: 2000,
    typeSpeed: 100,
    deleteSpeed: 50
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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
                <h1 className={`text-[15vw] lg:text-[12vw] font-bold font-serif text-gray-900 leading-[0.9] whitespace-nowrap transform transition-all duration-1000 ease-out ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}>
                  <span className="text-[6vw] lg:text-[6vw]">
                    Your<br/>
                    voice,{' '}<br/>
                  </span>
                  <span className="text-blue-200 text-[6vw] lg:text-[6vw]">
                    {typeEffect}
                    <Cursor cursorStyle="|" cursorColor="#93c5fd" />
                  </span>
                </h1>
                
                <div className={`mt-8 max-w-lg transform transition-all duration-1000 ease-out delay-300 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Transform conversations into insights through AI-powered voice journaling. Speak freely, reflect deeply.
                  </p>
                </div>          
                
                <div className={`flex mt-12 space-x-6 transform transition-all duration-1000 ease-out delay-500 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}>
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
        <section className="h-screen flex flex-col items-center justify-center snap-start pt-20 bg-gray-50">
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

        {/* Insight at a Glance Section */}
        <section className="h-screen flex items-center justify-center snap-start pt-20 bg-white">
          <div className="w-full max-w-7xl px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold font-serif text-gray-900 mb-6">
                  Insight at a glance
                </h1>
                <div className="w-24 h-1 bg-gray-300 mb-8"></div>
                <p className="text-lg text-gray-600 leading-relaxed mb-12">
                  Your personal dashboard transforms conversations into visual stories. Track patterns, discover themes, and watch your growth unfold.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-200 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-900 font-medium">Real-time sentiment analysis</span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-200 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-900 font-medium">Topic frequency tracking</span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-200 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-900 font-medium">Mood timeline visualization</span>
                  </div>
                </div>
              </div>
              
              {/* Right Dashboard */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Your Journal Insights</h3>
                  <span className="text-sm text-gray-500">Last 30 days</span>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-sm font-medium text-gray-600 mb-4">Mood Distribution</h4>
                  <div className="flex space-x-2 mb-4">
                    {[40, 60, 45, 70, 55, 50, 65].map((height, i) => (
                      <div key={i} className={`bg-blue-200 rounded-sm flex-1`} style={{height: `${height}px`}}></div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Overall Sentiment</p>
                    <p className="text-xl font-semibold text-gray-900">Positive</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Personal Metrics Section */}
        <section className="h-screen flex items-center justify-center snap-start pt-20 bg-gray-50">
          <div className="w-full max-w-7xl px-8">
            <div className="text-center mb-16">
              <h1 className="text-5xl lg:text-6xl font-bold font-serif text-gray-900 mb-6">
                Personal Metrics
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Understand yourself better with beautiful visualizations of your thoughts and feelings
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Word Cloud */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Word Cloud</h3>
                </div>
                <p className="text-sm text-gray-600 mb-6">Most frequent themes in your conversations</p>
                
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-2xl font-light text-blue-300">Growth</span>
                    <span className="text-lg font-light text-blue-200">Family</span>
                    <span className="text-xl font-light text-blue-250">Work</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-lg font-light text-blue-200">Dreams</span>
                    <span className="text-sm font-light text-blue-150">Health</span>
                  </div>
                </div>
              </div>
              
              {/* Mood Timeline */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Mood Timeline</h3>
                </div>
                <p className="text-sm text-gray-600 mb-6">Track emotional patterns over time</p>
                
                <div className="flex items-end space-x-2 h-24">
                  {[30, 45, 60, 40, 70, 55, 65].map((height, i) => (
                    <div key={i} className="bg-red-200 rounded-sm flex-1" style={{height: `${height}%`}}></div>
                  ))}
                </div>
              </div>
              
              {/* Topic Frequency */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Topic Frequency</h3>
                </div>
                <p className="text-sm text-gray-600 mb-6">Discover what matters most to you</p>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Personal Growth</span>
                    <span className="text-sm font-semibold text-gray-900">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-200 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Relationships</span>
                    <span className="text-sm font-semibold text-gray-900">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-200 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Career</span>
                    <span className="text-sm font-semibold text-gray-900">40%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-200 h-2 rounded-full" style={{width: '40%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LandingPage;