import { ThemeProvider } from "./components/Theme/theme-provider";
import Homepage from "./pages/Homepage";

const App = () => {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Homepage />
      </ThemeProvider>
    </div>
  );
};

export default App;
