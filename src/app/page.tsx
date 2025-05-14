
"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button'; 
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'; 
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"; 
import { PauseCircle, PlayCircle, Star, CheckCircle2 } from 'lucide-react';

interface IsPlayingState {
  [key: string]: boolean;
}

interface AudioRefs {
  [key: string]: React.RefObject<HTMLAudioElement>;
}

interface AudioProgressState {
  [key: string]: number; // Percentage
}

interface AudioDurationState {
  [key: string]: string; // Formatted time string
}

interface AudioCurrentTimeState {
  [key: string]: string; // Formatted time string
}


export default function Home() {
  const initialAudioSources = [
    'party-dj', 'radio-dj', 'station-jingle', 'podcast-intro', 'promo-maker', 'sung-jingles'
  ];

  const [isPlaying, setIsPlaying] = useState<IsPlayingState>(
    initialAudioSources.reduce((acc, id) => ({ ...acc, [id]: false }), {})
  );
  
  const audioRefs: AudioRefs = initialAudioSources.reduce((acc, id) => ({
    ...acc,
    [id]: useRef<HTMLAudioElement>(null)
  }), {});

  const [audioProgress, setAudioProgress] = useState<AudioProgressState>(
    initialAudioSources.reduce((acc, id) => ({ ...acc, [id]: 0 }), {})
  );
  const [audioDurations, setAudioDurations] = useState<AudioDurationState>(
    initialAudioSources.reduce((acc, id) => ({ ...acc, [id]: '00:00' }), {})
  );
  const [audioCurrentTimes, setAudioCurrentTimes] = useState<AudioCurrentTimeState>(
    initialAudioSources.reduce((acc, id) => ({ ...acc, [id]: '00:00' }), {})
  );


  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    Object.entries(audioRefs).forEach(([id, ref]) => {
      const audio = ref.current;
      if (audio) {
        const updateTimes = () => {
          setAudioCurrentTimes(prev => ({ ...prev, [id]: formatTime(audio.currentTime) }));
          setAudioProgress(prev => ({ ...prev, [id]: (audio.currentTime / audio.duration) * 100 }));
        };
        const setDuration = () => {
           if (isFinite(audio.duration)) {
            setAudioDurations(prev => ({ ...prev, [id]: formatTime(audio.duration) }));
           }
        };
        const handleEnded = () => {
          setIsPlaying(prev => ({ ...prev, [id]: false }));
          setAudioProgress(prev => ({ ...prev, [id]: 0 }));
          setAudioCurrentTimes(prev => ({ ...prev, [id]: '00:00' }));
        };

        audio.addEventListener('timeupdate', updateTimes);
        audio.addEventListener('loadedmetadata', setDuration);
        audio.addEventListener('durationchange', setDuration); 
        audio.addEventListener('ended', handleEnded);
        
        if (audio.readyState >= 1 && isFinite(audio.duration)) { 
            setDuration();
        }

        return () => {
          audio.removeEventListener('timeupdate', updateTimes);
          audio.removeEventListener('loadedmetadata', setDuration);
          audio.removeEventListener('durationchange', setDuration);
          audio.removeEventListener('ended', handleEnded);
        };
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handlePlay = (id: string) => {
    Object.entries(audioRefs).forEach(([key, ref]) => {
      if (key !== id && ref.current) {
        ref.current.pause();
        setIsPlaying(prev => ({ ...prev, [key]: false }));
      }
    });

    const currentAudio = audioRefs[id]?.current;
    if (currentAudio) {
      if (isPlaying[id]) {
        currentAudio.pause();
      } else {
        currentAudio.play().catch(error => console.error("Error playing audio:", error));
      }
      setIsPlaying(prev => ({ ...prev, [id]: !prev[id] }));
    }
  };

  const testimonials = [
    {
      avatar: "🧔",
      name: "Paul, London - UK",
      rating: 5,
      text: "I love it, it does exactly what it says on the tin. I've been looking for something like this for a long time. I'm a radio presenter and I've been using it for my show. Great for creating sweepers and station IDs!"
    },
    {
      avatar: "👩‍",
      name: "Patricia, Miami - USA",
      rating: 5,
      text: "It's so easy, so fast and the results are amazing. I've been using the AI JingleMaker for my podcast intros and my promos for a few weeks. It definitely levels up my production. And it is so cheap!"
    }
  ];

  const demoTracks = [
    { id: 'party-dj', title: 'Party DJ Drop', path: '/demos/party-dj.mp3' },
    { id: 'radio-dj', title: 'Radio DJ Drop', path: '/demos/radio-dj.mp3' },
    { id: 'station-jingle', title: 'Station Jingle', path: '/demos/station-jingle.mp3' },
    { id: 'podcast-intro', title: 'Podcast Intro', path: '/demos/podcast-intro.mp3' },
  ];

  const premiumFeatures = [
    { 
      id: 'promo-maker', 
      title: '👉 Promo Maker', 
      description: 'Create longer promos (up to 30 seconds), leveraging the power of generative AI. We help you write your script, record it and even illustrate it with an AI image, in less than 30 seconds!',
      path: '/demos/promo-maker.mp3'
    },
    { 
      id: 'sung-jingles', 
      title: '🎶 Sung Jingles', 
      description: "We can create bespoke sung jingles, handcrafted on demand.",
      path: '/demos/sung-jingles.mp3'
    }
  ];

  const pricingPlans = [
    {
      name: "Free Account",
      productions: "3 productions per month",
      price: "Free",
      features: ["Basic jingle generation", "Limited sound effects", "Access to standard voices"],
      cta: "Get Started",
    },
    {
      name: "Starter Plan",
      productions: "10 productions per month",
      price: "$9/mo",
      features: ["All Free features", "More sound effects", "Enhanced voices"],
      cta: "Choose Plan",
    },
    {
      name: "Power Plan",
      productions: "30 productions per month",
      price: "$29/mo",
      features: ["All Starter features", "Premium voices", "AI Script Helper", "Priority support"],
      cta: "Choose Plan",
      popular: true,
    },
    {
      name: "Pro Plan",
      productions: "60 productions per month",
      price: "$59/mo",
      features: ["All Power features", "Commercial rights", "Advanced editor tools"],
      cta: "Choose Plan",
    },
    {
      name: "Giga Plan",
      productions: "120 productions per month",
      price: "$99/mo",
      features: ["All Pro features", "Team access (up to 3 users)", "Custom integrations"],
      cta: "Choose Plan",
    },
  ];

  const faqs = [
    { q: "How long does it take to get the jingle?", a: "It only takes a few seconds!" },
    { q: "How much does it cost to generate a jingle?", a: "You don't pay for jingle generation. You only pay for the custom AI voiceover generation (US$39 (+ sales tax where it applies) for 100 credits with extra discounts on quantities. NO SUBSCRIPTION.). You can generate an infinity of jingles per voiceover." },
    { q: "Is the payment secure?", a: "Yes, we're using Paddle to process your payment." },
    { q: "Can I create multiple jingles?", a: "Of course, you can. You can create as many jingles as you want with your AI voiceovers. You only pay for the voiceover generations." },
    { q: "Can I use the jingle for my radio show or my podcast?", a: "Yes of course! Or for any other media activity. Be creative!" },
    { q: "How many different voices do you have?", a: "We offer more than 40 stunning voices, male & female, young, mature, dynamic, romantic, deep and playful." },
    { q: "How many different sound effects do you offer?", a: "We've curated 250+ sound effects and will add new suggestions on a weekly basis." },
    { q: "What is the format of the voiceovers and jingles?", a: "Voiceovers and jingles are generated in MP3 format. You can download both your voiceovers and your jingles." },
    { q: "Do you offer sung jingles?", a: "Yes, we do. They're handcrafted on demand by Fred, the founder of the AI Jingle Maker, based on your creative brief." },
    { q: "Can I insert pauses in my AI-generated text?", a: "If you want to insert pauses in your AI voiceover, use the SSML Break Instructions, for instance for a pause of half a second, insert <break time=\"0.5s\" /> in your text." }
  ];
  
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-indigo-950 text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 md:pt-20 lg:pt-24 pb-12 md:pb-16">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] bg-repeat opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                The #1 AI Jingle Generator
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              The easiest way to create
            </p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10 text-lg md:text-xl">
              {['jingles', 'DJ drops', 'sweepers', 'station IDs', 'podcast intros', 'promos'].map((item, idx) => (
                <span key={idx} className={`py-1 px-3 rounded-full bg-opacity-30 ${
                  idx % 3 === 0 ? 'bg-primary/30' : idx % 3 === 1 ? 'bg-purple-700/30' : 'bg-blue-700/30'
                } text-foreground`}>
                  {item}
                </span>
              ))}
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              You can pick an intro, a background, an outro, create your voiceover with AI and let the JINGLEMAKER magically generate your jingle or sweeper in the blink of an eye!
            </p>
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
              Get Started Now
            </Button>
            <p className="mt-4 text-muted-foreground/80">
              You can download both the final jingles and the raw voiceovers.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-900/30 to-purple-900/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "60k+", label: "Already 60,000+ users" },
              { value: "10", label: "seconds to generate a jingle" },
              { value: "35+", label: "Voices, 250+ Sound FX, Unlimited variations" },
              { value: "$0", label: "No subscription. Zero Learning Curve." },
            ].map((stat, idx) => (
              <Card key={idx} className="bg-card/50 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Choose Your Plan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch justify-center">
            {pricingPlans.map((plan, idx) => (
              <Card 
                key={idx} 
                className={`flex flex-col bg-card/50 backdrop-blur-sm border 
                  ${plan.popular ? 'border-primary shadow-xl ring-2 ring-primary' : 'border-border'}`}
                
              >
                <CardHeader className="pb-4">
                  <CardTitle className={`text-2xl font-semibold ${plan.popular ? 'text-primary' : 'text-foreground'}`}>{plan.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">{plan.productions}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4 pt-2">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-4">{plan.price}</div>
                  <ul className="space-y-2 text-muted-foreground">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center">
                        <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-6">
                  <Button className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90' : 'bg-primary/80 hover:bg-primary'} text-primary-foreground transition-opacity`}>
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-900/30 to-purple-900/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start mb-4">
                    <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-xl font-bold text-white ${idx % 2 === 0 ? 'bg-blue-600' : 'bg-purple-600'}`}>{testimonial.avatar}</div>
                    <div className="ml-4">
                      <div className="font-medium text-foreground">{testimonial.name}</div>
                      <div className="flex mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{testimonial.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Listen to some demos 🔊
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {demoTracks.map((demo) => (
              <Card key={demo.id} className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">{demo.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-primary/20 rounded-lg p-4 flex items-center justify-between">
                    <Button 
                      onClick={() => handlePlay(demo.id)}
                      size="icon"
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white"
                      aria-label={isPlaying[demo.id] ? `Pause ${demo.title}` : `Play ${demo.title}`}
                    >
                      {isPlaying[demo.id] ? <PauseCircle className="w-6 h-6" /> : <PlayCircle className="w-6 h-6" />}
                    </Button>
                    <div className="flex-1 mx-4">
                      <div className="h-2 bg-indigo-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-150" 
                          style={{width: `${audioProgress[demo.id] || 0}%`}}
                        ></div>
                      </div>
                       <div className="text-xs text-muted-foreground mt-1 text-right">{audioCurrentTimes[demo.id] || '00:00'} / {audioDurations[demo.id] || '00:00'}</div>
                    </div>
                  </div>
                  <audio ref={audioRefs[demo.id]} src={demo.path} preload="metadata" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Premium Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {premiumFeatures.map((feature) => (
              <Card key={feature.id} className="bg-card/50 backdrop-blur-sm">
                 <CardHeader>
                    <CardTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{feature.description}</p>
                  <div className="bg-primary/20 rounded-lg p-4 flex items-center justify-between">
                    <Button 
                      onClick={() => handlePlay(feature.id)}
                      size="icon"
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white"
                       aria-label={isPlaying[feature.id] ? `Pause ${feature.title}` : `Play ${feature.title}`}
                    >
                       {isPlaying[feature.id] ? <PauseCircle className="w-6 h-6" /> : <PlayCircle className="w-6 h-6" />}
                    </Button>
                    <div className="flex-1 mx-4">
                      <div className="h-2 bg-indigo-800 rounded-full overflow-hidden">
                         <div 
                            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-150" 
                            style={{width: `${audioProgress[feature.id] || 0}%`}}
                          ></div>
                      </div>
                       <div className="text-xs text-muted-foreground mt-1 text-right">{audioCurrentTimes[feature.id] || '00:00'} / {audioDurations[feature.id] || '00:00'}</div>
                    </div>
                  </div>
                  <audio ref={audioRefs[feature.id]} src={feature.path} preload="metadata" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-900/30 to-purple-900/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="max-w-4xl mx-auto">
            {faqs.map((faq, i) => (
              <AccordionItem value={`item-${i}`} key={i} className="bg-card/50 backdrop-blur-sm rounded-xl mb-2 border-primary/30">
                <AccordionTrigger className="p-6 text-left font-semibold text-lg text-blue-300 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0 text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Ready to Create Your First Jingle?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join 60,000+ users who are creating professional jingles in seconds. No technical skills required!
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
            Start Creating Now
          </Button>
          <p className="mt-4 text-muted-foreground/80">
            No subscription needed. Pay only for what you use.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                AI Jingle Maker
              </div>
              <p className="text-muted-foreground mt-2">The #1 AI Jingle Generator</p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {['About', 'Terms', 'Privacy', 'Contact'].map(link => (
                <a key={link} href="#" className="text-muted-foreground hover:text-foreground transition-colors">{link}</a>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/50 text-center text-muted-foreground">
            {currentYear !== null ? <p>© {currentYear} AI Jingle Maker. All rights reserved.</p> : <p>Loading year...</p>}
          </div>
        </div>
      </footer>
    </div>
  );
}
