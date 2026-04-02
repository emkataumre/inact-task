import type { Person } from "../data/family";
import { avgShoeSizeByGender } from "../utils/family";

export function ShoeSize({ root }: { root: Person }) {
  const data = avgShoeSizeByGender(root);
  return (
    <div className="shoe-size__grid">
      <div className="shoe-size__stat shoe-size__stat--male">
        <div className="shoe-size__stat-label">Male</div>
        <div className="shoe-size__stat-value">{data.M}</div>
        <div className="shoe-size__stat-unit">avg. shoe size</div>
      </div>
      <div className="shoe-size__stat shoe-size__stat--female">
        <div className="shoe-size__stat-label">Female</div>
        <div className="shoe-size__stat-value">{data.F}</div>
        <div className="shoe-size__stat-unit">avg. shoe size</div>
      </div>
    </div>
  );
}
