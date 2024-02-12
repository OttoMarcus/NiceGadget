import './App.css';
import Header from "./components/HeaderComp/Header";
import Main from "./components/MainComp/Main";
import Footer from "./components/FooterComp/Footer";


function App() {
  return (
    <div className="container">
      <Header/>
        <Main/>
        <Footer/>
    </div>
  );
}

export default App;
