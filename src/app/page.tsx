import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Gem, UserCheck, ChevronRight, MapPin, Users, Calendar, ArrowRight } from 'lucide-react';
import { getTrips } from '@/lib/firestore-db';

export default async function Home() {
  const trips = await getTrips();
  const featuredTrips = trips.slice(0, 6);

  return (
    <div className="fade-in">
      {/* Hero */}
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-forest">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <Image
          src="https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&q=80&w=1600"
          fill
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
          alt="Hero"
          priority
        />
        <div className="relative z-20 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-heading leading-tight drop-shadow-lg">
            EXPLORE NORTHERN<br /><span className="text-primary">THAILAND</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto font-light drop-shadow-md">
            บริการท่องเที่ยวครบวงจรสำหรับคนรักการผจญภัย<br />
            <span className="font-bold text-primary">Trips • Transport • Gear Rental</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/trips" className="bg-primary hover:bg-primary-deep text-white px-8 py-3 rounded-sm font-bold uppercase tracking-wider transition-all transform hover:scale-105">
              Find Your Trip
            </Link>
            <Link href="/transport" className="bg-white/10 backdrop-blur border border-white hover:bg-white hover:text-forest text-white px-8 py-3 rounded-sm font-bold uppercase tracking-wider transition-all">
              Book Transport
            </Link>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <section className="py-12 bg-forest text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-black text-primary mb-2">{trips.length}+</div>
              <div className="text-sm uppercase tracking-wider text-gray-300">Adventure Trips</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-primary mb-2">500+</div>
              <div className="text-sm uppercase tracking-wider text-gray-300">Happy Travelers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-primary mb-2">5+</div>
              <div className="text-sm uppercase tracking-wider text-gray-300">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-primary mb-2">100%</div>
              <div className="text-sm uppercase tracking-wider text-gray-300">Safety Record</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Trips */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-forest mb-4">FEATURED TRIPS</h2>
            <p className="text-forest-light max-w-xl mx-auto">ทริปยอดนิยมที่คัดสรรมาเพื่อคุณโดยเฉพาะ เปิดประสบการณ์การผจญภัยที่ไม่เหมือนใคร</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTrips.map(trip => (
              <Link key={trip.id} href={`/trips/${trip.id}`} className="block group">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={trip.image}
                    alt={trip.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-white/90 text-forest shadow-sm">
                      {trip.duration}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-bold">
                      ฿{trip.price.toLocaleString()}
                    </span>
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-bold text-forest group-hover:text-primary transition-colors">
                  {trip.title}
                </h3>
              </Link>
            ))}
          </div>

          {trips.length > 6 && (
            <div className="text-center mt-12">
              <Link href="/trips" className="inline-flex items-center gap-2 bg-forest hover:bg-forest-light text-white px-8 py-3 rounded-sm font-bold uppercase tracking-wider transition-all transform hover:scale-105">
                View All Trips <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Value Proposition (Why Choose Us) */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-heading text-forest mb-4">WHY NONGTUENG?</h2>
            <p className="text-forest-light">มาตรฐานใหม่ของการท่องเที่ยวเชิงผจญภัยในเชียงใหม่</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-6 bg-white border border-gray-100 rounded-lg hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center text-primary mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Safety First</h3>
              <p className="text-sm text-gray-500">ทีมงานผ่านการอบรม First Aid และมีความเชี่ยวชาญในพื้นที่ ประเมินความเสี่ยงทุกทริป</p>
            </div>
            <div className="text-center p-6 bg-white border border-gray-100 rounded-lg hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center text-primary mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Gem className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-sm text-gray-500">คัดสรรอุปกรณ์แคมป์ปิ้งแบรนด์ดัง และรถตู้ VIP ที่สะอาด ใหม่ พร้อมให้บริการ</p>
            </div>
            <div className="text-center p-6 bg-white border border-gray-100 rounded-lg hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center text-primary mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <UserCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Guides</h3>
              <p className="text-sm text-gray-500">ไกด์ท้องถิ่นที่มีประสบการณ์สูง ดูแลดุจคนในครอบครัว เป็นกันเองแต่เป็นงาน</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process (How it works) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-heading text-forest mb-4">HOW IT WORKS</h2>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-bold text-gray-400 uppercase tracking-widest items-center">
              <span>Select</span> <ChevronRight className="w-4 h-4 text-primary" />
              <span>Book</span> <ChevronRight className="w-4 h-4 text-primary" />
              <span>Enjoy</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {['Choose Service', 'Contact / Book', 'Confirmation', 'Adventure Time'].map((step, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-black text-gray-200 absolute -top-4 -left-2 z-0 select-none">0{i + 1}</div>
                <div className="relative z-10 pl-6 pt-4">
                  <h3 className="text-xl font-bold text-forest mb-2">{step}</h3>
                  <p className="text-sm text-gray-500">Simple and fast process via Line MyShop or Website.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-forest relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600"
            fill
            className="object-cover"
            alt="Mountain background"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center text-white max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              พร้อมออกผจญภัยแล้วหรือยัง?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              ติดต่อเราเพื่อวางแผนทริปในฝันของคุณ หรือเลือกจากทริปยอดนิยมที่เราคัดสรรไว้
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/trips" className="bg-primary hover:bg-primary-deep text-white px-8 py-4 rounded-sm font-bold uppercase tracking-wider transition-all transform hover:scale-105">
                ดูทริปทั้งหมด
              </Link>
              <a href="https://line.me" target="_blank" rel="noopener noreferrer" className="bg-white/10 backdrop-blur border border-white hover:bg-white hover:text-forest text-white px-8 py-4 rounded-sm font-bold uppercase tracking-wider transition-all">
                ติดต่อผ่าน Line
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
