import {useState, useEffect} from "react"


export default function useStopwatch(isRunning:boolean){
	const [seconds , setSeconds] = useState(0);

	useEffect(() => {
		if(!isRunning){
			return;
		}

		if (isRunning) {
			const interval = setInterval(() => {
				setSeconds(s => s + 1)
			}, 1000)

			return () => {
				clearInterval(interval)
			}
		}
	}, [isRunning])

	return seconds;
}