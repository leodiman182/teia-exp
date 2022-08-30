import './App.css';
import Routing from './Routing';
import './assets/css/font.css';
import TeiaProvider from './context/TeiaProvider';

function App() {
  return (
    <TeiaProvider>
      <Routing />
    </TeiaProvider>
  );
}

export default App; 
