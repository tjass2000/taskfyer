import "./App.css";
import Header from "./components/Header";
import MiniSidebar from "./components/MiniSidebar";

function App() {
  return (
    <div className="h-full flex overflow-hidden">
      <MiniSidebar />
      <div className="flex-1 flex flex-col">
        <Header />
      </div>
    </div>
  );
}

export default App;
