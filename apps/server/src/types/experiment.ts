export type TypeOfPoint = 'government' | 'business';

export type Equipment = {
  generator: boolean;
  starlink: boolean;
  fiberInternet: boolean;
};

export type Point = {
  id: number;
  radius: number;
  typeOfPoint: TypeOfPoint;
  region: string;
  city: string;
  street: string;
  isIncluded: boolean;
  equipment: Equipment;
};

export type ExperimentInput = {
  iterationsThreshold: number,
  hasEquipment: boolean,
  initial: Array<{
    geometry: {
      latitude: number;
      longitude: number;
    },
    attributes: Omit<Point, 'equipment' | 'isIncluded'>,
  }>
};

export type ExperimentOutput = Array<Point>;
