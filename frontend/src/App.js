import logo from './logo.svg';
import './App.css';
import HomePage from './Pocetna/HomePage';
import Login from './Autorizacija/Login';

function App() {
  return (
    <div className="App">
        <Login />
      <HomePage></HomePage>
    </div>
  );
}

export default App;
