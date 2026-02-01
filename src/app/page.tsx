import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Gem, UserCheck, ChevronRight, MapPin, Users, Calendar, ArrowRight, Compass, Heart, Award } from 'lucide-react';
import { getTrips, getTransport } from '@/lib/firestore-db';

export default async function Home() {
  const trips = await getTrips();
  const featuredTrips = trips.slice(0, 6);
  const transports = await getTransport();
  const featuredFleet = transports.slice(0, 3);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What kind of trips does Nongtung offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nongtung offers bespoke adventure experiences in Northern Thailand, including trekking, camping, and private van rentals with expert local guides.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is it safe to travel with Nongtung?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, safety is our priority. All our guides are professionally trained, and we use high-quality equipment for all our trekking and camping trips.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I rent a private van for my own group?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. We provide a premium fleet of comfortable 9-seater vans with professional drivers who have expert knowledge of Northern Thailand mountain roads.'
        }
      }
    ]
  };

  return (
    <div className="fade-in bg-[#fdfdfb]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Immersive Hero Section */}
      <div className="relative h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 z-10"></div>
        <Image
          src="https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&q=80&w=1600"
          fill
          className="absolute inset-0 w-full h-full object-cover z-0"
          alt="Adventurers exploring Northern Thailand mountains"
          priority
        />
        <div className="relative z-20 text-center text-white px-6 max-w-5xl">
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] mb-4 md:mb-6 block drop-shadow-lg">Explore Northern Thailand</span>
          <h1 className="text-4xl md:text-8xl font-black mb-6 md:mb-8 font-heading leading-[0.9] tracking-tighter drop-shadow-2xl">
            NORTHERN THAILAND<br /><span className="text-primary italic">ADVENTURES</span>
          </h1>
          <p className="text-base md:text-xl text-white/80 mb-8 md:mb-12 max-w-2xl mx-auto font-medium drop-shadow-md">
            Bespoke camping, trekking, and corporate teambuilding trips in Chiang Mai designed for those who seek authentic experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <Link href="/trips" className="bg-primary hover:bg-forest text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl hover:shadow-primary/20 transform hover:-translate-y-1">
              Book a Trip
            </Link>
            <Link href="/transport" className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-forest text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl">
              Rent a Van Now
            </Link>
          </div>
        </div>
      </div>

      {/* Atmospheric Statistics */}
      <section className="relative z-30 -mt-12 md:-mt-16 pb-12 md:pb-20">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-14 border border-forest/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
              <div className="space-y-2">
                <div className="text-2xl md:text-4xl font-black font-heading text-forest tracking-tighter uppercase">Authentic</div>
                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-forest/30">Real Adventure</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl md:text-4xl font-black font-heading text-forest tracking-tighter uppercase">Local</div>
                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-forest/30">Expert Guides</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl md:text-4xl font-black font-heading text-forest tracking-tighter uppercase">Clean</div>
                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-forest/30">Quality Gear</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl md:text-4xl font-black font-heading text-primary tracking-tighter uppercase">Trusted</div>
                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/50">Safety Certified</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Adventures */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16 gap-4 md:gap-6">
            <div className="max-w-xl">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 md:mb-3 block">Recommended for You</span>
              <h2 className="text-3xl md:text-5xl font-black font-heading text-forest tracking-tighter uppercase">POPULAR ADVENTURES</h2>
            </div>
            <Link href="/trips" className="text-[10px] font-black uppercase tracking-[0.2em] text-forest/40 hover:text-primary transition-colors flex items-center gap-2 group">
              See All Trips <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {featuredTrips.map(trip => (
              <Link key={trip.id} href={`/trips/${trip.id}`} className="group block h-full">
                <div className="relative aspect-[4/5] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden immersive-shadow border border-forest/5 mb-4 md:mb-6">
                  <Image
                    src={trip.image}
                    alt={trip.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 left-4 md:top-5 md:left-5">
                    <span className="bg-white/95 backdrop-blur-md text-forest font-black px-3 py-1.5 rounded-xl text-[10px] uppercase tracking-widest shadow-sm">
                      {trip.duration}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5 md:right-5 flex justify-between items-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="bg-primary text-white px-4 py-2 rounded-xl text-lg font-black shadow-xl">
                      ฿{trip.price.toLocaleString()}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-forest shadow-xl">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div className="px-2">
                  <h3 className="text-base font-black text-forest font-heading group-hover:text-primary transition-colors leading-tight break-words">
                    {trip.title}
                  </h3>
                  {trip.subtitle && (
                    <p className="text-[11px] font-medium text-forest/40 mt-1 line-clamp-2">
                      {trip.subtitle}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2 mb-4">
                    {trip.tags?.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[9px] font-black uppercase tracking-[0.2em] text-forest/40">
                        • {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Nongtueng - The Premium Edge */}
      <section className="py-12 md:py-24 bg-surface/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10 md:mb-20">
            <span className="text-[10px] font-black text-forest/20 uppercase tracking-[0.4em] mb-2 md:mb-4 block">Our Commitment</span>
            <h2 className="text-3xl md:text-5xl font-black font-heading text-forest tracking-tighter">WHY EXPLORE WITH US?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[
              { icon: Compass, title: 'Safe Trips', desc: 'Our guides are trained for safety on every trail.' },
              { icon: Heart, title: 'Bespoke Service', desc: 'Customized private trips and teambuilding for your needs.' },
              { icon: Award, title: 'Local Guides', desc: 'We know the best hidden spots in Northern Thailand.' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] immersive-shadow border border-forest/5 hover:-translate-y-2 transition-all duration-500 group">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-surface rounded-2xl flex items-center justify-center text-primary mb-6 md:mb-8 group-hover:bg-primary group-hover:text-white transition-all shadow-soft overflow-hidden">
                  <item.icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h3 className="text-xl md:text-2xl font-black font-heading text-forest mb-2 md:mb-4 tracking-tighter">{item.title}</h3>
                <p className="text-sm md:text-base text-forest/50 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process: The Easy Path to Adventure */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10 md:mb-20">
            <span className="text-[10px] font-black text-forest/20 uppercase tracking-[0.4em] mb-2 md:mb-4 block">Easy Planning</span>
            <h2 className="text-3xl md:text-5xl font-black font-heading text-forest tracking-tighter">HOW IT WORKS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { title: 'Choose a Trip', desc: 'Browse our collection of handpicked outdoor trips.' },
              { title: 'Chat to Book', desc: 'Send us a message to book your trip instantly.' },
              { title: 'Get Ready', desc: 'We will send you a list of items to bring and your plan.' },
              { title: 'Enjoy Nature', desc: 'Meet our team and have an amazing time in the mountains.' }
            ].map((step, i) => (
              <div key={i} className="relative group">
                <div className="text-[6rem] md:text-[8rem] font-black text-forest/[0.03] absolute -top-12 md:-top-16 -left-2 md:-left-4 z-0 pointer-events-none group-hover:text-primary/5 transition-colors">0{i + 1}</div>
                <div className="relative z-10 pl-4 md:pl-0">
                  <h3 className="text-xl md:text-2xl font-black text-forest mb-2 md:mb-4 font-heading tracking-tighter">{step.title}</h3>
                  <p className="text-sm md:text-base text-forest/50 font-medium leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Immersive CTA */}
      <section className="py-20 md:py-32 relative overflow-hidden bg-forest">
        <div className="absolute inset-0 opacity-30 scale-110">
          <Image
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600"
            fill
            className="object-cover"
            alt="Stunning mountain landscapes in Chiang Mai Northern Thailand"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center text-white max-w-4xl mx-auto">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] mb-4 md:mb-8 block text-primary shadow-glow">Start Your Journey Today</span>
            <h2 className="text-4xl md:text-8xl font-black font-heading mb-6 md:mb-10 tracking-tighter leading-[0.9]">
              READY FOR THE<br /><span className="italic">MOUNTAINS?</span>
            </h2>
            <p className="text-lg md:text-xl text-white/60 mb-8 md:mb-12 max-w-2xl mx-auto font-medium">
              Join us for a trip you will never forget. Just send us a message and we will handle the rest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
              <Link href="/trips" className="bg-primary hover:bg-white hover:text-forest text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-2xl transform hover:-translate-y-1">
                Browse All Trips
              </Link>
              <a href="https://m.me/Venturevibecnx" target="_blank" rel="noopener noreferrer" className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-forest text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl">
                Chat with our Team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Fleet: Elevate Your Journey */}
      <section className="py-12 md:py-24 bg-white relative z-30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16 gap-4 md:gap-6">
            <div className="max-w-xl">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 md:mb-3 block">Cars & Vans</span>
              <h2 className="text-3xl md:text-5xl font-black font-heading text-forest tracking-tighter uppercase">PREMIUM PRIVATE FLEET</h2>
            </div>
            <Link href="/transport" className="text-[10px] font-black uppercase tracking-[0.2em] text-forest/40 hover:text-primary transition-colors flex items-center gap-2 group">
              See All Transport <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {featuredFleet.map((car) => (
              <div key={car.id} className="group flex flex-col h-full bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden immersive-shadow border border-forest/5 hover:-translate-y-2 transition-all duration-500">
                <div className="relative h-48 md:h-64 overflow-hidden">
                  <Image
                    src={car.image}
                    alt={car.type}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="p-6 md:p-10 flex flex-col flex-grow">
                  <h3 className="text-xl md:text-2xl font-black text-forest tracking-tighter mb-4 md:mb-6">{car.type}</h3>
                  <div className="flex items-center justify-between p-4 md:p-5 bg-surface rounded-[2rem] border border-forest/5 group-hover:bg-white group-hover:shadow-soft transition-all duration-500">
                    <span className="font-bold text-forest/40 uppercase tracking-widest text-[9px]">Starting from</span>
                    <span className="text-lg md:text-xl font-black text-forest tracking-tighter">฿{(car.price1Day || 0).toLocaleString()}</span>
                  </div>
                  <Link
                    href="/transport"
                    className="mt-6 md:mt-8 block w-full bg-forest text-white py-3 md:py-4 rounded-full font-black text-[10px] tracking-[0.2em] text-center transition-all duration-300 shadow-lg hover:shadow-forest/30 uppercase group-hover:bg-primary"
                  >
                    Select This Van
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
