import { henning, lars } from "./data/family";
import { FamilyTree } from "./components/FamilyTree";
import { AgeChart } from "./components/AgeChart";
import { ShoeSize } from "./components/ShoeSize";
import { HeightChart } from "./components/HeightChart";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header__logo">inact</div>
      </header>

      <main className="page">
        <h1 className="page__title">Family Tree Overview</h1>

        <div className="grid">
          <div className="card">
            <div className="card__label">Task 01</div>
            <div className="card__title">Family Tree</div>
            <div className="card__divider" />
            <FamilyTree root={henning} />
          </div>

          <div className="card">
            <div className="card__label">Task 03</div>
            <div className="card__title">Average Shoe Size by Gender</div>
            <div className="card__divider" />
            <ShoeSize root={henning} />
          </div>

          <div className="card grid__full">
            <div className="card__label">Task 02</div>
            <div className="card__title">Age Distribution</div>
            <div className="card__divider" />
            <AgeChart root={henning} />
          </div>

          <div className="card grid__full">
            <div className="card__label">Task 04</div>
            <div className="card__title">
              Lars — Growth & Forecast to Age 18
            </div>
            <div className="card__divider" />
            <HeightChart person={lars} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
