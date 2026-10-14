// Homepage copy outside home.md. Facts match the guides: train times from Renfe's timetable for
// 21 October 2026 (getting-around-spain.md), temperatures AEMET 1991–2020 (best-time-to-visit-spain.md).
const en = {
  placeName: 'Spain',
  eyebrow: 'Independent city guide',
  ctaTours: 'Browse city tours & tickets',
  ctaPlaces: 'Compare the 8 cities',
  proofGuides: (p: number, g: number) => `${p} city guides, ${g} planning guides`,
  proofTours: 'Real GetYourGuide tours, checked October 2026',
  proofIndep: 'Every fact sourced and dated',
  heroSub: 'Eight cities for a first trip, from Madrid’s museums to San Sebastián’s pintxo bars. Who each suits, how many days, the trains between them and the tickets to book early.',
  introLabel: 'How to choose',
  toursH: 'Tours and tickets worth booking',
  toursAll: 'All tours, by city →',
  suitsH: 'Which city suits you?',
  suits: [
    { path: '/destinations/madrid/', name: 'Madrid', who: 'Art and easy connections.', text: 'The Prado, the Reina Sofía and the Royal Palace, and the hub for direct trains to every other city here.' },
    { path: '/destinations/seville/', name: 'Seville and Granada', who: 'Moorish Andalusia.', text: 'The Real Alcázar and the Alhambra, 2 h 37 to 2 h 45 apart by direct Avant train. Book Alhambra tickets first.' },
    { path: '/destinations/barcelona/', name: 'Barcelona', who: 'Gaudí and the sea.', text: 'The Sagrada Família, Park Güell and the Gothic Quarter, 3 h 02 to 3 h 47 from Madrid by direct train.' },
    { path: '/destinations/san-sebastian/', name: 'San Sebastián and Bilbao', who: 'Food first.', text: 'Pintxo bars a short walk from La Concha bay, and the Guggenheim in Bilbao. Cooler summers, more rain.' },
  ],
  seasonsH: 'Spain by season',
  seasonsPath: '/best-time-to-visit-spain/',
  seasonsAll: 'Month by month →',
  seasons: [
    { name: 'Spring (March–June)', text: 'Las Fallas in Valencia (15–19 March), Holy Week and Seville’s April Fair. May and June are the best months for most of Spain.' },
    { name: 'Summer (July–August)', text: 'Hot inland: average highs of 32.8°C in Madrid and 36.3°C in Seville in July. The Basque coast stays around 25°C.' },
    { name: 'Autumn (September–October)', text: 'Highs of 23–26°C in Seville, Granada and Málaga in October. San Sebastián’s film festival in September.' },
    { name: 'Winter (November–February)', text: 'Quiet. Mildest on the coast: Málaga averages 17.2°C in January. The north gets the most rain.' },
  ],
  placesH: 'The 8 cities',
  placesAll: 'All city guides →',
  guidesH: 'Plan your trip',
  bandH: 'Booking the big tickets?',
  bandText: 'Alhambra tickets are personal, need ID and fix your Nasrid Palaces entry time. Several guided tours on GetYourGuide include the ticket. Planning the whole trip? See the',
  bandPath: '/itineraries/',
  bandLink: '7, 10 and 14-day itineraries',
  bandBtn: 'See tours by city',
};

// English-only site for now (ENABLED in src/lib/i18n.ts); German copy goes here when /de/ is switched on.
const de: typeof en = en;

export default { en, de };
