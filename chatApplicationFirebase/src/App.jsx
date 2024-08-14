import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Auth } from "./components/Auth";
import Cookies from 'universal-cookie';
import { Chat } from "./components/Chat";
const cookies = new Cookies()

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null)

  if (!isAuth) {
    return (
      <>
        <h1>Hello world</h1>
        <Auth setIsAuth={setIsAuth}/>
      </>
    );
  }
  return(
  <>
    {room ? (<Chat/>) : 
    (<div className="room"> 
      <label>Enter Room Name</label>
      <input ref={roomInputRef}/>
      <button onClick={()=>setRoom(roomInputRef.current.value)}>Enter Chat</button>
    </div>)
    }
  </>
  );
}

export default App;
