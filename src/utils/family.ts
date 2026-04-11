import regression from "regression";
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
  const result = regression.polynomial(
    data.map(({ age, height }) => [age, height] as [number, number]),
    { order: 2 },
  );
  const [a, b, c] = result.equation;
  return (age: number) => a * age ** 2 + b * age + c;
}
