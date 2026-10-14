import {View, Text, Button} from "react-native"
import {useState} from "react"
import PracticeTracker from "./PracticeTracker"
import Stopwatch from "./Stopwatch"
import useStopwatch from "./../hooks/useStopwatch"

export default function LabScreen() {
	const [solved, setSolved] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	const seconds = useStopwatch(isRunning)

	return(
		<View>
			<PracticeTracker
				solved={solved}
				onSolve={()=> setSolved( s => s + 1)}
				onReset	={()=> setSolved(0)}
			/>

			<Stopwatch 
				seconds={seconds}
				isRunning={isRunning}
			/>

			<Button title="Start" onPress={()=> setIsRunning(true)} />
			<Button title="Stop" onPress={()=> setIsRunning(false)} />
		</View>
	)
}

