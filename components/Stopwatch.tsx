import {View,Text} from "react-native"

type Props = {
	seconds:number;
	isRunning:boolean;
}
export default function Stopwatch({seconds, isRunning}:Props){
	return(

		<View>
			<Text>elapsed time : {seconds}</Text>
			{!isRunning ? (<Text>Paused</Text>):(<Text>Running…</Text>)}
		</View>
	)
}
