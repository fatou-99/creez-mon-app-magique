import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClick = () => {
    setClickCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-8">
      <div className={`text-center space-y-8 transition-all duration-700 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
        {/* Main title with glow effect */}
        <div className="relative">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-glow-pulse">
            Hello World
          </h1>
          <div className="absolute inset-0 text-6xl md:text-8xl font-bold text-primary/20 blur-lg -z-10">
            Hello World
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
          Bienvenue dans votre nouvelle application ! Cette page démontre un design système moderne avec des animations fluides.
        </p>

        {/* Interactive button */}
        <div className="space-y-4">
          <Button 
            onClick={handleClick}
            className="px-8 py-4 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-glow hover:scale-105"
          >
            Cliquez-moi ! 
            {clickCount > 0 && <span className="ml-2">({clickCount})</span>}
          </Button>
          
          {clickCount > 0 && (
            <div className="animate-fade-in">
              <p className="text-foreground/60">
                {clickCount === 1 ? "Premier clic ! 🎉" : 
                 clickCount < 5 ? `${clickCount} clics et ça continue !` :
                 clickCount < 10 ? `Wow ! ${clickCount} clics ! Vous adorez cliquer ! 😄` :
                 `Incroyable ! ${clickCount} clics ! Vous êtes un champion du clic ! 🏆`}
              </p>
            </div>
          )}
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center space-x-4 mt-12">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-primary/70 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-3 h-3 bg-primary/40 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
