import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Gem, UserCheck, ChevronRight, MapPin, Users, Calendar, ArrowRight, Compass, Heart, Award } from 'lucide-react';
import { getTrips, getTransport } from '@/lib/firestore-db';

export default async function Home() {
  const trips = await getTrips();
  const featuredTrips = trips.slice(0, 6);
  const transports = await getTransport();
  const featuredFleet = transports.slice(0, 3);

  return (
    <div className="fade-in bg-[#fdfdfb]">
      {/* Immersive Hero Section */}
      <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 z-10"></div>
        <Image
          src="https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&q=80&w=1600"
          fill
          className="absolute inset-0 w-full h-full object-cover z-0"
          alt="Hero"
          priority
        />
        <div className="relative z-20 text-center text-white px-6 max-w-5xl">
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] mb-6 block drop-shadow-lg">Discover the Untamed North</span>
          <h1 className="text-5xl md:text-8xl font-black mb-8 font-heading leading-[0.9] tracking-tighter drop-shadow-2xl">
            EXPLORE THE<br /><span className="text-primary italic">ADVENTURE</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto font-medium drop-shadow-md">
            Premium travel & adventure experiences curated for those who seek the extraordinary in Northern Thailand.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/trips" className="bg-primary hover:bg-forest text-white px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl hover:shadow-primary/20 transform hover:-translate-y-1">
              Start Journey
            </Link>
            <Link href="/transport" className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-forest text-white px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl">
              Private Transit
            </Link>
          </div>
        </div>
      </div>

      {/* Atmospheric Statistics */}
      <section className="relative z-30 -mt-16 pb-20">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 md:p-14 border border-forest/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              <div className="space-y-2">
                <div className="text-4xl md:text-6xl font-black font-heading text-forest tracking-tighter">{trips.length}</div>
                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-forest/30">Adventures</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-6xl font-black font-heading text-forest tracking-tighter">500+</div>
                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-forest/30">Explorers</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-6xl font-black font-heading text-forest tracking-tighter">24/7</div>
                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-forest/30">Concierge</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-6xl font-black font-heading text-primary tracking-tighter">100%</div>
                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/40 text-primary">Safety Record</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Adventures */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-3 block">Handpicked for You</span>
              <h2 className="text-4xl md:text-5xl font-black font-heading text-forest tracking-tighter">FEATURED TRIPS</h2>
            </div>
            <Link href="/trips" className="text-[10px] font-black uppercase tracking-[0.2em] text-forest/40 hover:text-primary transition-colors flex items-center gap-2 group">
              View Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredTrips.map(trip => (
              <Link key={trip.id} href={`/trips/${trip.id}`} className="group block h-full">
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden immersive-shadow border border-forest/5 mb-6">
                  <Image
                    src={trip.image}
                    alt={trip.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-5 left-5">
                    <span className="bg-white/95 backdrop-blur-md text-forest font-black px-3 py-1.5 rounded-xl text-[10px] uppercase tracking-widest shadow-sm">
                      {trip.duration}
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
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
      <section className="py-24 bg-surface/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[10px] font-black text-forest/20 uppercase tracking-[0.4em] mb-4 block">Our Commitment</span>
            <h2 className="text-4xl md:text-5xl font-black font-heading text-forest tracking-tighter">WHY NONGTUENG?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Compass, title: 'Safe Exploration', desc: 'Expertly trained guides and 100% safety record on every trail.' },
              { icon: Heart, title: 'Bespoke Experience', desc: 'Curated premium equipment and VIP transport for ultimate comfort.' },
              { icon: Award, title: 'Local Expertise', desc: 'Deep-rooted connections with northern communities and hidden gems.' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-12 rounded-[3rem] immersive-shadow border border-forest/5 hover:-translate-y-2 transition-all duration-500 group">
                <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all shadow-soft overflow-hidden">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black font-heading text-forest mb-4 tracking-tighter">{item.title}</h3>
                <p className="text-forest/50 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process: The Easy Path to Adventure */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[10px] font-black text-forest/20 uppercase tracking-[0.4em] mb-4 block">Seamless Planning</span>
            <h2 className="text-4xl md:text-5xl font-black font-heading text-forest tracking-tighter">HOW IT WORKS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { title: 'Curate Adventure', desc: 'Browse our collection of handpicked northern experiences.' },
              { title: 'Messenger Concierge', desc: 'Secure your booking instantly via our dedicated chat service.' },
              { title: 'Expert Prep', desc: 'Receive tailored equipment lists and itineraries for your trip.' },
              { title: 'Immersive Journey', desc: 'Step out and lose yourself in the magic of the mountains.' }
            ].map((step, i) => (
              <div key={i} className="relative group">
                <div className="text-[8rem] font-black text-forest/[0.03] absolute -top-16 -left-4 z-0 pointer-events-none group-hover:text-primary/5 transition-colors">0{i + 1}</div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-forest mb-4 font-heading tracking-tighter">{step.title}</h3>
                  <p className="text-forest/50 font-medium leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Immersive CTA */}
      <section className="py-32 relative overflow-hidden bg-forest">
        <div className="absolute inset-0 opacity-30 scale-110">
          <Image
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600"
            fill
            className="object-cover"
            alt="Mountain background"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center text-white max-w-4xl mx-auto">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] mb-8 block text-primary shadow-glow">Final Call to Adventure</span>
            <h2 className="text-5xl md:text-8xl font-black font-heading mb-10 tracking-tighter leading-[0.9]">
              READY TO<br /><span className="italic">DISAPPEAR?</span>
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto font-medium">
              Join us for a journey that transcends ordinary travel. Your northern story begins with a single conversation.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/trips" className="bg-primary hover:bg-white hover:text-forest text-white px-12 py-5 rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-2xl transform hover:-translate-y-1">
                Explore All Trips
              </Link>
              <a href="https://m.me/Venturevibecnx" target="_blank" rel="noopener noreferrer" className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-forest text-white px-12 py-5 rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl">
                Chat with Concierge
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Fleet: Elevate Your Journey */}
      <section className="py-24 bg-white relative z-30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-3 block">Premium Rental Fleet</span>
              <h2 className="text-4xl md:text-5xl font-black font-heading text-forest tracking-tighter uppercase">CHAUFFEUR DESIGNED</h2>
            </div>
            <Link href="/transport" className="text-[10px] font-black uppercase tracking-[0.2em] text-forest/40 hover:text-primary transition-colors flex items-center gap-2 group">
              View All Transport <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredFleet.map((car) => (
              <div key={car.id} className="group flex flex-col h-full bg-white rounded-[3rem] overflow-hidden immersive-shadow border border-forest/5 hover:-translate-y-2 transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={car.image}
                    alt={car.type}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <h3 className="text-2xl font-black text-forest tracking-tighter mb-6">{car.type}</h3>
                  <div className="flex items-center justify-between p-5 bg-surface rounded-[2rem] border border-forest/5 group-hover:bg-white group-hover:shadow-soft transition-all duration-500">
                    <span className="font-bold text-forest/40 uppercase tracking-widest text-[9px]">Starting from</span>
                    <span className="text-xl font-black text-forest tracking-tighter">฿{(car.price1Day || 0).toLocaleString()}</span>
                  </div>
                  <Link
                    href="/transport"
                    className="mt-8 block w-full bg-forest text-white py-4 rounded-full font-black text-[10px] tracking-[0.2em] text-center transition-all duration-300 shadow-lg hover:shadow-forest/30 uppercase group-hover:bg-primary"
                  >
                    Check Availability
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
