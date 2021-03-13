import React,{useState, useRef} from 'react'
function Pomodoro() {
    const [isShortBreak, togglePomoBreakType] = useState(true);
    const [isPomoStarted,togglePomoAction] = useState(false);
    const [isBreakStarted, togglePomoBreakAction] = useState(false);
    const [pomoMinutes, setPomoMinutes] = useState(25);
    const[pomoSeconds,setPomoSeconds] = useState(0);
    const pomoMinutesRef = useRef(25);
    pomoMinutesRef.current = pomoMinutes;
    const pomoSecondsRef = useRef(0);
    pomoSecondsRef.current = pomoSeconds;
    const interValIdRef = useRef(-1);
    const pomoStartedFlagRef = useRef();
    pomoStartedFlagRef.current = isPomoStarted;
    const breakStartedFlagRef = useRef();
    breakStartedFlagRef.current = isBreakStarted;
    const startTimer = () =>{
        const interval = setInterval(() => {
                if(pomoSecondsRef.current === 0){
                    if(pomoMinutesRef.current - 1 !== -1){
                        setPomoSeconds(59);
                        setPomoMinutes(pomoMinutesRef.current - 1);
                    }else{
                        if(pomoStartedFlagRef.current){
                            togglePomoAction(false);
                        }else if(breakStartedFlagRef.current){
                            togglePomoBreakAction(false);
                        }
                        stopTimer();
                    }
                }else{
                    setPomoSeconds(pomoSecondsRef.current - 1);
                }
                interValIdRef.current = interval;
            }, 1000);
    }
    const stopTimer = () =>{
        if(interValIdRef.current !== -1){
            clearInterval(interValIdRef.current);
            setPomoMinutes(25);
            setPomoSeconds(0);
            interValIdRef.current = -1;
        }else{
            setTimeout(stopTimer,1000);
        }
       
    }
    const startBreak = () =>{
        if(!isBreakStarted){
            if(isShortBreak){
                setPomoMinutes(5);
                setPomoSeconds(0);
                startTimer();
            }else{
                setPomoMinutes(15);
                setPomoSeconds(0);
                startTimer();
            }
        }else{
            alert("Can't start break");
        }
    }
    const handleBreakBtn = (event) =>{
        const targetId = event.target.id;
        if(targetId  === 'short-break_btn' && !isShortBreak){
            togglePomoBreakType(true);
        }else if(targetId === 'long-break_btn' && isShortBreak){
            togglePomoBreakType(false);
        }
    }
    const handlePomoAction = (event) =>{
        const target = event.target.id;
        if(target === 'start-btn' && !isPomoStarted){
            if(!isBreakStarted){
                togglePomoAction(true);
                startTimer();
            }else{
                alert((isShortBreak ? "Short break ": "Long break") + "is taken, so stop break to start pomo timer");
            }
        }else if(target === 'stop-btn' && isPomoStarted){
            togglePomoAction(false);
            stopTimer();
        }else if(target === 'take-break_btn' && !isBreakStarted){
            if(!isPomoStarted){
                startBreak();
                togglePomoBreakAction(true);
            }else{
                alert("Pomdora Timer is running, please stop it to take break");
            }
        }else if(target === 'stop-break_btn' && isBreakStarted){
            togglePomoBreakAction(false);
            stopTimer();
        }else{
            alert("Invalid operation");
        }
    }
    
    return (
        <div className="pomo-wrapper">
            <div className="pomo-break_btn_wrapper">
                <div className={"pomo-break_btn_highlights btn-active " + (isShortBreak ? "left-begin" : "left-end")}></div>
                <button className="pomo-short_break_btn"  id="short-break_btn" onClick={handleBreakBtn}>Short break</button>
                <button className="pomo-long_break_btn" id="long-break_btn" onClick={handleBreakBtn}>Long break</button>
            </div>
            <div className="pomo-timer_circle">
                <span className="pomo-time_span" id="pomo-time">{(pomoMinutes <= 9 ? "0"+pomoMinutes : pomoMinutes) +":"+ (pomoSeconds <= 9 ?  "0"+pomoSeconds : pomoSeconds)}</span>
            </div>
            <div className="pomo-timer_action_btn-wrapper">
                {
                    isPomoStarted ? 
                        <button className="pomo-timer_stop_btn" id="stop-btn" onClick={handlePomoAction}>Stop</button> :
                        <button className="pomo-timer_start_btn" id="start-btn" onClick={handlePomoAction}>Start</button>

                }    
                {
                    isBreakStarted ? 
                        <button className="pomo-timer_stpbreak_btn" id="stop-break_btn" onClick={handlePomoAction}>Stop break</button> :
                        <button className="pomo-timer_tkbreak_btn" id="take-break_btn" onClick={handlePomoAction}>Take break</button>
                
                }
            </div>
        </div>
    )
}

export default Pomodoro
