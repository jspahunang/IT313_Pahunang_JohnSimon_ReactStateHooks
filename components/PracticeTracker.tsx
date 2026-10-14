import {View, Text, Button} from "react-native"


type Props = {
	solved: number ;
	onSolve: ()=> void ;
	onReset: ()=> void ;
}
export default function PracticeTracker({solved,onSolve,onReset}:Props) {
	return(
		<View>
			{solved >= 5 ? (<Text style={{marginTop:30}}>Great job!</Text>) :(<Text style={{marginTop:30}}></Text>)}
			<Text>Solved: {solved}</Text>
			<Button title="Solve +1" onPress={onSolve} />
			<Button title="Reset" onPress={onReset} />
		</View>
	)
}

