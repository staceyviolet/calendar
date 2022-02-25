import './App.css';
import Calendar from "./components/Calendar";

function App() {
    const now = new Date(2022, 2, 25);

    return (
        <div className="App">
            <Calendar date={now}/>
        </div>
    );
}

export default App;
