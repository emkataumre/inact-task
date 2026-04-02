export type Gender = "M" | "F";

export interface Person {
  name: string;
  age: number;
  shoeSize: number;
  gender: Gender;
  children: Person[];
  heightData?: Partial<Record<number, number>>;
}

export const lars: Person = {
  name: "Lars",
  age: 15,
  shoeSize: 46,
  gender: "M",
  children: [],
  heightData: {
    0: 50,
    1: 75,
    2: 82,
    3: 89,
    4: 95,
    5: 101,
    6: 107,
    7: 112.5,
    8: 118,
    9: 123.5,
    10: 129,
    11: 134.5,
    12: 140,
    13: 149.5,
    14: 159,
    15: 168.5,
  },
};

const iben: Person = {
  name: "Iben",
  age: 26,
  shoeSize: 38,
  gender: "F",
  children: [],
};

const bente: Person = {
  name: "Bente",
  age: 46,
  shoeSize: 37,
  gender: "F",
  children: [lars],
};

const viggo: Person = {
  name: "Viggo",
  age: 47,
  shoeSize: 42,
  gender: "M",
  children: [iben],
};

export const henning: Person = {
  name: "Henning",
  age: 65,
  shoeSize: 44,
  gender: "M",
  children: [viggo, bente],
};
