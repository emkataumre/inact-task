import { type Gender, type Person } from "../data/family";

export function collectPeople(
  person: Person,
  visited = new Set<Person>(),
): Person[] {
  if (visited.has(person)) return [];

  const nextVisited = new Set(visited).add(person);
  const array: Person[] = [person];

  for (const child of person.children) {
    array.push(...collectPeople(child, nextVisited));
  }

  return array;
}

export function avgShoeSizeByGender(root: Person): Record<Gender, number> {
  const people = collectPeople(root);
  const groups: Record<Gender, Person[]> = { M: [], F: [] };

  for (const person of people) {
    if (person.gender === "M") {
      groups.M.push(person);
    } else if (person.gender === "F") {
      groups.F.push(person);
    }
  }

  const avg = (people: Person[]) => {
    if (people.length === 0) return 0;

    let total = 0;
    for (const person of people) total += person.shoeSize;
    return total / people.length;
  };

  return { M: avg(groups.M), F: avg(groups.F) };
}

export function formatHeightData(
  heightData: Partial<Record<number, number>>,
): { age: number; height: number }[] {
  const result: { age: number; height: number }[] = [];

  for (const [key, value] of Object.entries(heightData)) {
    if (value === undefined) continue;

    result.push({ age: Number(key), height: value });
  }

  return result;
}

export function quadraticRegression(
  data: { age: number; height: number }[],
): (age: number) => number {
  const n = data.length;

  // Step 1: compute sums needed for the normal equations
  let sx = 0,
    sx2 = 0,
    sx3 = 0,
    sx4 = 0;
  let sy = 0,
    sxy = 0,
    sx2y = 0;

  for (const { age: x, height: y } of data) {
    sx += x;
    sx2 += x ** 2;
    sx3 += x ** 3;
    sx4 += x ** 4;
    sy += y;
    sxy += x * y;
    sx2y += x ** 2 * y;
  }

  // Step 2: Gaussian elimination on the 3x3 augmented matrix
  // Each row is [coeff of a, coeff of b, coeff of c, rhs]
  const mat = [
    [sx4, sx3, sx2, sx2y],
    [sx3, sx2, sx, sxy],
    [sx2, sx, n, sy],
  ];

  // Forward elimination
  for (let col = 0; col < 3; col++) {
    if (Math.abs(mat[col][col]) < 1e-10) throw new Error("Singular matrix — cannot fit quadratic");
    for (let row = col + 1; row < 3; row++) {
      const factor = mat[row][col] / mat[col][col];
      for (let k = col; k <= 3; k++) {
        mat[row][k] -= factor * mat[col][k];
      }
    }
  }

  // Back substitution to get [a, b, c]
  const coeffs = [0, 0, 0];
  for (let i = 2; i >= 0; i--) {
    coeffs[i] = mat[i][3];
    for (let j = i + 1; j < 3; j++) {
      coeffs[i] -= mat[i][j] * coeffs[j];
    }
    coeffs[i] /= mat[i][i];
  }

  const [a, b, c] = coeffs;

  // Step 3: return the predict function
  return (age: number) => a * age ** 2 + b * age + c;
}
