import type { Person } from "../data/family";

export function FamilyTree({ root }: { root: Person }) {
  return (
    <div className="family-tree">
      <ul>
        <PersonNode person={root} />
      </ul>
    </div>
  );
}

function PersonNode({
  person,
  visited = new Set<Person>(),
}: {
  person: Person;
  visited?: Set<Person>;
}) {
  if (visited.has(person))
    return <li>{person.name} (circular reference)</li>;

  const nextVisited = new Set(visited).add(person);

  return (
    <li>
      {person.name}
      {person.children.length > 0 && (
        <ul>
          {person.children.map((child, i) => (
            <PersonNode
              key={`${child.name}-${i}`}
              person={child}
              visited={nextVisited}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
