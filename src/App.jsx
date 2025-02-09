import "./App.css";
import Header from "./components/Header";
import { MainContent } from "./components/MainContent";
import MiniSidebar from "./components/MiniSidebar";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
    <div className="h-full flex overflow-hidden">
      <MiniSidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex pr-[20rem] pb-[1.5rem] h-full">
          <MainContent />
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default App;
