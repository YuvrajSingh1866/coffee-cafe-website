export const CAFE = { name: 'NOIR', address: '14, Mall Road, Bathinda, Punjab 151001', hours: [['Mon–Fri', '8AM–10PM'], ['Sat–Sun', '8AM–11PM']], maps: 'https://maps.google.com/?q=Bathinda+Mall+Road', insta: 'https://instagram.com', email: 'mailto:hello@noir.cafe' }
const u = (id, w = 1400) => `https://images.unsplash.com/${id}?w=${w}&q=70&auto=format&fit=crop`
export const IMG = { hero: u('photo-1442512595331-e89e73853f31', 2000), cup: u('photo-1495474472287-4d71bcdd2085', 1000), a: u('photo-1511920170033-f8396924c348'), b: u('photo-1447933601403-0c6688de566e'), c: u('photo-1509042239860-f550ce710b93'), d: u('photo-1514432324607-a09d9b4aefdd'), e: u('photo-1559496417-e7f25cb247f3'), f: u('photo-1461023058943-07fcbe16d735') }
export const NAV = [['MENU', '#menu'], ['STORY', '#story'], ['EXPERIENCE', '#experience'], ['VISIT', '#visit']]
export const STEPS = [
 ['SELECT', 'Single-origin beans, chosen by hand from small farms in Chikmagalur and Coorg.', IMG.b],
 ['ROAST', 'Small batches, slow heat. We roast every morning until the crackle tells us to stop.', IMG.c],
 ['GRIND', 'Ground to order, seconds before brewing, so the aroma stays in the cup.', IMG.f],
 ['BREW', 'Dialed in daily. Nine bars, twenty-eight seconds, and a barista who is watching.', IMG.a],
 ['SERVE', 'Poured at the table, in warm ceramic, with nowhere you have to be.', IMG.d]]
export const MENU = {
 ESPRESSO: [['Espresso Martini', 320, 'Double ristretto, vanilla vodka, cane syrup. Shaken hard.', IMG.d], ['Flat White', 220, 'Velvet microfoam over a double shot.', IMG.a], ['Cortado', 200, 'Equal parts espresso and warm milk.', IMG.c]],
 FILTER: [['V60 Pour Over', 260, 'Clean, bright, and brewed for one.', IMG.f], ['Cold Brew', 240, 'Steeped eighteen hours. Served over a single large cube.', IMG.b], ['Aeropress', 250, 'Rich and round, made at the bar.', IMG.c]],
 SIGNATURE: [['Burnt Orange Latte', 290, 'Espresso, charred orange peel, jaggery.', IMG.e], ['Smoked Salt Mocha', 300, 'Dark chocolate, sea salt, a little smoke.', IMG.d], ['Filter Kaapi', 180, 'South Indian decoction, frothed the old way.', IMG.a]],
 PASTRIES: [['Butter Croissant', 190, 'Laminated for three days.', IMG.e], ['Basque Cheesecake', 280, 'Burnt on top, soft within.', IMG.c], ['Cardamom Bun', 170, 'Sticky, warm, and pulled apart by hand.', IMG.f]] }
export const BREW = {
 roast: ['Light', 'Medium', 'Dark'], style: ['Sweet', 'Bold', 'Smooth'], mood: ['Slow Morning', 'Work Mode', 'Late Night'],
 pick: (r, s, m) => {
  if (m === 'Late Night') return s === 'Sweet' ? ['Smoked Salt Mocha', 'Dark chocolate and a little smoke to keep the night going.'] : ['Espresso Martini', 'Bold and cold. Made for after eight.']
  if (m === 'Work Mode') return s === 'Smooth' ? ['Flat White', 'Steady, round, and easy to finish.'] : ['Cold Brew', 'Eighteen hours of patience, ready when you are.']
  return r === 'Light' ? ['V60 Pour Over', 'Bright and quiet. Take your time with it.'] : s === 'Sweet' ? ['Burnt Orange Latte', 'Sweet, citrus, and slow.'] : ['Cortado', 'Small, strong, and smooth.'] }}
