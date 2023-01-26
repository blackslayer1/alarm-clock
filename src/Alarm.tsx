import './Alarm.scss';
import { useEffect, useState } from 'react';

const Alarm = () => {
    const [hours, setHours] = useState<string>('');
    const [minutes, setMinutes] = useState<string>('');
    const [currentTime, setCurrentTime] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [currentHour, setCurrentHour] = useState<number>();
    const [currentMinute, setCurrentMinute] = useState<number>();
    const [currentHour12, setCurrentHour12] = useState<number>();
    const [currentMinute12, setCurrentMinute12] = useState<number>();

    const addAlarm = () => {
        let hour = (document.getElementById('hours')! as HTMLInputElement).value;
        let minute = (document.getElementById('minutes')! as HTMLInputElement).value;
        let timeDifference = (parseInt(minute) + parseInt(hour) * 60) - (currentMinute12!+currentHour12!*60);
        let timeDifference24 = (parseInt(minute) + parseInt(hour) * 60) - (currentMinute!+currentHour!*60);

        if (timeDifference < 0) {
            timeDifference += 1440;
       }
       if (timeDifference24 < 0) {
        timeDifference24 += 1440;
        }

        document.getElementById('alarm')!.style.visibility="visible";
        document.getElementById('removeButton')!.style.visibility="visible";
        document.getElementById('clock')!.style.visibility="hidden";

        setHours(hour);
        if(minute.length === 1){
            setMinutes(0 + minute);
        } else {
            setMinutes(minute);
        }

        if((document.getElementById('24hr')! as HTMLInputElement).checked){
            if(timeDifference24 < 60){
                setText(`Alarm is set for ${timeDifference24} minutes from now`)
            } else if(timeDifference24 % 60 === 0) {
                if(timeDifference24 === 60){
                    setText('Alarm is set for an hour from now');
                    setTimeout(()=>{
                        setText('');
                    }, 3000);
                } else {
                    setText(`Alarm is set for ${timeDifference24/60} hours from now`);
                    setTimeout(()=>{
                        setText('');
                    }, 3000);
                }
            } else {
                setText(`Alarm is set for ${Math.floor(timeDifference24/60)} hours and ${timeDifference24 % 60} minutes from now`);
                setTimeout(()=>{
                    setText('');
                }, 3000);
            }
        } else {
            if(timeDifference < 60){
                setText(`Alarm is set for ${timeDifference} minutes from now`)
                setTimeout(()=>{
                    setText('');
                }, 3000);
            } else if(timeDifference % 60 === 0) {
                if(timeDifference === 60){
                    setText('Alarm is set for an hour from now');
                    setTimeout(()=>{
                        setText('');
                    }, 3000);
                } else {
                    setText(`Alarm is set for ${timeDifference/60} hours from now`);
                    setTimeout(()=>{
                        setText('');
                    }, 3000);
                }
            } else {
                setText(`Alarm is set for ${Math.floor(timeDifference/60)} hours and ${timeDifference % 60} minutes from now`);
                setTimeout(()=>{
                    setText('');
                }, 3000);
            }
        }

        if((document.getElementById('24hr')! as HTMLInputElement).checked){
            setTimeout(function(){alert("It works")}, timeDifference24 * 60000);
        } else {
            setTimeout(function(){alert("It works")}, timeDifference * 60000);
        }
    

    }

    const removeAlarm = () => {
        document.getElementById('alarm')!.style.visibility="hidden";
        document.getElementById('removeButton')!.style.visibility="hidden";
        document.getElementById('clock')!.style.visibility="visible";
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHour(new Date().getHours());
            setCurrentMinute(new Date().getMinutes());
            let date = new Date();
            var hours = date.getHours();
            var minutes = (date.getMinutes()).toString();
            var seconds = (date.getSeconds()).toString();
            setCurrentHour12((hours % 12)?(hours % 12) : 12);
            setCurrentMinute12((new Date().getMinutes()));
            var ampm = hours >= 12 ? 'pm' : 'am';
            if((document.getElementById('24hr')! as HTMLInputElement).checked === false){
                hours = hours % 12;
                hours = hours ? hours : 12;
            }
            minutes = parseInt(minutes) < 10 ? 0+minutes.toString() : minutes.toString();
            seconds = parseInt(seconds) < 10 ? 0+seconds.toString() : seconds.toString();
            var strTime = hours + ':' + minutes + ':' + seconds + " " + ampm;
            setCurrentTime(strTime);
        }, 1000);
        return () => clearInterval(interval);
      }, []);
    
  return (
    <>

<div id="settings" className="overlay">
	<div className="popup">
		<h2>Alarm settings</h2>
		<a className="close" href="#">&times;</a>
		<div className="content">
			<label>Hours</label>
            <input id="hours" type="number" min="1" max="12"/>
            <label>Minutes</label>
            <input id="minutes" type="number" min="0" max="59"/>
            <button onClick={addAlarm}><a id="addAlarm" href="#">+</a></button>
		</div>
	</div>
</div>
    
<div className="container">
<div className="alarmContainer"><h1 id="alarm" style={{color: "slategray"}}>{hours}:{minutes}</h1></div>
<div className="clockContainer"><h1 id="clock" style={{color: "slategray"}}>{currentTime}</h1></div>
<a className="button" href="#settings"><button>Add Alarm</button></a>
<button style={{visibility: "hidden"}} onClick={removeAlarm} id="removeButton">Remove Alarm</button>
<input type="checkbox" id="24hr"/>
<label>24-hour</label>
<h3>{text}</h3>
</div>


    </>
  )
}

export default Alarm
