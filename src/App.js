import { SkeletonTheme } from "react-loading-skeleton";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "./components/ScrollToTop";
import Router from "./components/Router";
function App() {
  return (
    <div className="App">
      <SkeletonTheme baseColor="#252525" highlightColor="#525252">
        <AnimatePresence mode="wait">
          <Router />
        </AnimatePresence>
      </SkeletonTheme>
      <ScrollToTop />
    </div>
  );
}

export default App;
