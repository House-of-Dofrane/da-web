// Service areas for the "Where we buy in Maryland" section. Data, not JSX: the map, the visible
// chip list and the schema markup all read from here. Coordinates are WGS84 decimal degrees;
// county markers sit on the county seat (the place a seller recognises), not the geographic centre.
// Cross-checked against Wikipedia infobox coordinates on 2026-09-14; corrections noted inline.

export type ServiceArea = {
  name: string;
  lng: number;
  lat: number;
  tier: "county" | "city";
};

export const serviceAreas: ServiceArea[] = [
  // Counties: larger marker, labelled as county
  { name: "Baltimore City", lng: -76.6122, lat: 39.2904, tier: "county" },
  { name: "Baltimore County", lng: -76.6019, lat: 39.4015, tier: "county" }, // seat: Towson
  { name: "Anne Arundel County", lng: -76.5011, lat: 38.9731, tier: "county" }, // seat: Annapolis; given -76.5951 was the county centre, ~8 km west of the city
  { name: "Howard County", lng: -76.7983, lat: 39.2673, tier: "county" }, // seat: Ellicott City
  { name: "Prince George's County", lng: -76.7497, lat: 38.8232, tier: "county" }, // seat: Upper Marlboro
  { name: "Montgomery County", lng: -77.1528, lat: 39.084, tier: "county" }, // seat: Rockville
  // Cities and neighbourhoods: standard marker
  { name: "Hampden", lng: -76.6389, lat: 39.3223, tier: "city" },
  { name: "Canton", lng: -76.5797, lat: 39.2823, tier: "city" },
  { name: "Towson", lng: -76.6019, lat: 39.4015, tier: "city" },
  { name: "Dundalk", lng: -76.5197, lat: 39.2504, tier: "city" },
  { name: "Catonsville", lng: -76.7319, lat: 39.2721, tier: "city" },
  { name: "Annapolis", lng: -76.5011, lat: 38.9731, tier: "city" }, // corrected from -76.5951 (Wikipedia: 38.97306, -76.50111)
  { name: "Glen Burnie", lng: -76.6247, lat: 39.1626, tier: "city" },
  { name: "Columbia", lng: -76.861, lat: 39.2037, tier: "city" },
  { name: "Ellicott City", lng: -76.7983, lat: 39.2673, tier: "city" },
  { name: "Bowie", lng: -76.7444, lat: 38.9647, tier: "city" }, // corrected from 38.9426 (Wikipedia: 38.96472, -76.74444)
  { name: "Laurel", lng: -76.8483, lat: 39.0993, tier: "city" },
  { name: "Hyattsville", lng: -76.9455, lat: 38.9557, tier: "city" },
  { name: "Silver Spring", lng: -77.0261, lat: 38.9907, tier: "city" },
  { name: "Rockville", lng: -77.1528, lat: 39.084, tier: "city" },
  { name: "Gaithersburg", lng: -77.2264, lat: 39.1319, tier: "city" }, // corrected from -77.2014 (Wikipedia: 39.13194, -77.22639)
  { name: "Germantown", lng: -77.2717, lat: 39.1732, tier: "city" },
];

export const serviceAreaCounties = serviceAreas.filter((a) => a.tier === "county");
export const serviceAreaCities = serviceAreas.filter((a) => a.tier === "city");

// Map framing: the six counties, Baltimore City to the DC line.
export const SERVICE_AREA_CENTER: [number, number] = [-76.85, 39.05];
export const SERVICE_AREA_ZOOM = 8.5;
