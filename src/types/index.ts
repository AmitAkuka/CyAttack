export type ComponentRoute = {
  path: string;
  component: React.ComponentType;
};

export type MapType = {
  geometry: {
    type: string;
    coordinates: [number[]];
  };
  id: string;
  properties: { name: string };
  rsmKey: string;
  svgPath: string;
  type: string;
};

export type GeographyType = {
  type: string;
  arcs: number[];
  id: string;
  properties: {
    name: string;
  };
  rsmKey?: string;
};

export type RawAttackResponseType = {
  attacks: RawAttackDataType[];
  lastDateMillis: number;
};

export type RawAttackDataType = {
  city: string;
  country: string;
  countryName: string;
  date: string;
  dateMillis: number;
  destinationPort: number;
  latitude: number;
  longitude: number;
  peerCity: string;
  peerCountry: string;
  peerLatitude: number;
  peerLongitude: number;
  protocol: string;
};

export type AttackDataType = {
  id: string;
  city: string;
  country: string;
  countryName: string;
  peerCountry: string;
  peerCity: string;
  date: string;
  destinationPort: number;
  protocol: string;
  initialCoords: number[];
  finalCoords: number[];
  progressTime: number;
  lineLength: number;
};
