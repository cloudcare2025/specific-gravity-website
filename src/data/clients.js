export const clients = [
  { name: "Saxbys Coffee", domain: "saxbyscoffee.com", categories: ["Hospitality"] },
  { name: "Lowe's", domain: "lowes.com", categories: ["Retail"] },
  { name: "Bloomingdale's", domain: "bloomingdales.com", categories: ["Retail"] },
  { name: "NY & Company", domain: "nyandcompany.com", categories: ["Retail"] },
  { name: "Philz Coffee", domain: "philzcoffee.com", categories: ["Hospitality"] },
  { name: "Altitude Trampoline Park", domain: null, categories: ["Hospitality", "Retail"] },
  { name: "Juiceland", domain: null, categories: ["Hospitality"] },
  { name: "Pat LaFrieda", domain: null, categories: ["Hospitality"] },
  { name: "Kellogg's NYC", domain: "kelloggs.com", categories: ["Hospitality"] },
  { name: "Aurify Brands", domain: "aurifybrands.com", categories: ["Hospitality"] },
  { name: "Tim Hortons", domain: "timhortons.com", categories: ["Hospitality", "Support"] },
  { name: "Johnson & Johnson", domain: "jnj.com", categories: ["Support"] },
  { name: "Five Guys", domain: "fiveguys.com", categories: ["Hospitality", "Rollout"] },
  { name: "Burger King", domain: "burgerking.com", categories: ["Hospitality", "Rollout"] },
  { name: "Revlon", domain: "revlon.com", categories: ["Retail", "Support"] },
  { name: "Forman Mills", domain: "formanmills.com", categories: ["Retail", "Tech Dispatch"] },
  { name: "OnRye", domain: null, categories: ["Hospitality"] },
  { name: "Boston Baking", domain: "bostonbaking.com", categories: ["Hospitality"] },
  { name: "Fields Good Chicken", domain: "fieldsgoodchicken.com", categories: ["Hospitality"] },
  { name: "Roche Bobois", domain: "roche-bobois.com", categories: ["Retail"] },
  { name: "Angela's", domain: null, categories: ["Retail"] },
  { name: "Fred's", domain: null, categories: ["Retail", "Tech Dispatch"] },
  { name: "The Little Beet Table", domain: "thelittlebeet.com", categories: ["Hospitality"] },
];

export const testimonials = [
  {
    name: "Gabriel Rodriguez",
    role: "VP of Operations",
    company: "Aurify Brands",
    quote: "SpecGravity has the best tech support we've seen. They gave me my first weekend without a call from a store in a long time.",
  },
  {
    name: "Andrew Miller",
    role: "Director of IT",
    company: "Saxbys Coffee",
    quote: "Our store staff only has the best things to say about SpecGravity techs. They're always so helpful, and always ask if there's anything else they can help with before leaving.",
  },
  {
    name: "Parker Rodriguez",
    role: "Chief Operating Officer",
    company: "Altitude Trampoline Park",
    quote: "We've built out 25+ locations with the SpecGravity team, and would never build a new location without them!",
  },
];

const domainMap = Object.fromEntries(clients.map(c => [c.name, c.domain]));

export const logoRow1 = [
  { name: "Tim Hortons", domain: domainMap["Tim Hortons"] },
  { name: "Johnson & Johnson", domain: domainMap["Johnson & Johnson"] },
  { name: "Five Guys", domain: domainMap["Five Guys"] },
  { name: "Burger King", domain: domainMap["Burger King"] },
  { name: "Lowe's", domain: domainMap["Lowe's"] },
  { name: "Bloomingdale's", domain: domainMap["Bloomingdale's"] },
];

export const logoRow2 = [
  { name: "Kellogg's", domain: domainMap["Kellogg's NYC"] },
  { name: "Revlon", domain: domainMap["Revlon"] },
  { name: "Philz Coffee", domain: domainMap["Philz Coffee"] },
  { name: "Roche Bobois", domain: domainMap["Roche Bobois"] },
  { name: "Saxbys", domain: domainMap["Saxbys Coffee"] },
  { name: "NY & Company", domain: domainMap["NY & Company"] },
];
