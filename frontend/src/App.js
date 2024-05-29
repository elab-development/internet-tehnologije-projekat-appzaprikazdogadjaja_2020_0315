import logo from './logo.svg';
import './App.css';
import HomePage from './Pocetna/HomePage';
import Login from './Autorizacija/Login';
import Register from './Autorizacija/Register';

function App() {
  return (
    <div className="App">
      <Register></Register>
        <Login />
      <HomePage></HomePage>
    </div>
  );
}

export default App;
