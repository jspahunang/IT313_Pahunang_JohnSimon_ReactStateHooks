# IT 313 Laboratory 5 — React State & Hooks in Action

**Project:** Lab Timer & Practice Tracker  
**Developer:** John Simon Pahunang  
**Framework:** React Native with Expo  
**Language:** TypeScript

## Step 1 — Create the Expo Project

I created a React Native project using Expo and TypeScript for the IT 313 Laboratory 5 activity.

The goal of the activity was to practice React state, functional components, props, event handlers, conditional rendering, and custom hooks.

## Step 2 — Organize the Project Files

I separated the application into components and hooks so the code would be easier to understand and maintain.

```text
IT313_Pahunang_JohnSimon_ReactStateHooks/
├── AGENTS.md
├── app.json
├── App.tsx
├── index.ts
├── LICENSE
├── package.json
├── tsconfig.json
├── components/
│   ├── LabScreen.tsx
│   ├── PracticeTracker.tsx
│   └── Stopwatch.tsx
└── hooks/
    └── useStopwatch.ts
```

- `App.tsx` — Renders the main LabScreen component.
- `components/LabScreen.tsx` — Manages the application state and connects the other components.
- `components/PracticeTracker.tsx` — Displays the solved counter and practice buttons.
- `components/Stopwatch.tsx` — Displays the elapsed time and stopwatch status.
- `hooks/useStopwatch.ts` — Contains the custom hook that manages the stopwatch timer.
- `app.json` — Contains the Expo application configuration.
- `package.json` — Contains the project dependencies and available scripts.
- `index.ts` — Registers the main application component with Expo.

## Step 3 — Set Up App.tsx

I imported the `LabScreen` component into `App.tsx` and rendered it as the main application screen.

```tsx
import LabScreen from './components/LabScreen';

export default function App() {
  return (
    <LabScreen />
  );
}
```

This keeps `App.tsx` simple because the main application logic is handled by the components.

## Step 4 — Create the PracticeTracker Component

I created `components/PracticeTracker.tsx` as a functional component that receives props from its parent component.

The component receives three props:

- `solved` — The current number of solved exercises.
- `onSolve` — A callback function that increases the solved counter.
- `onReset` — A callback function that resets the solved counter to zero.

I used a TypeScript `Props` type to define the expected values and functions.

I also added conditional rendering using the condition `solved >= 5`.

```tsx
{solved >= 5 ? (
  <Text style={{ marginTop: 30 }}>Great job!</Text>
) : (
  <Text style={{ marginTop: 30 }}></Text>
)}
```

When the solved count reaches five or more, the application displays the message **Great job!** Otherwise, the message is not displayed.

The Solve +1 and Reset buttons use the callback functions passed through props.

## Step 5 — Manage State in LabScreen

I created `components/LabScreen.tsx` to manage the shared state of the application.

I imported `useState` from React and initialized two state variables:

```tsx
const [solved, setSolved] = useState(0);
const [isRunning, setIsRunning] = useState(false);
```

- `solved` starts at `0` and tracks the number of solved exercises.
- `isRunning` starts at `false` and determines whether the stopwatch is running.

I implemented the Solve +1 callback using a functional state update:

```tsx
onSolve={() => setSolved(s => s + 1)}
```

This increases the previous state value by one.

For the Reset button, I used:

```tsx
onReset={() => setSolved(0)}
```

This resets the solved count to zero.

I also implemented the Start and Stop buttons using arrow functions:

```tsx
<Button title="Start" onPress={() => setIsRunning(true)} />
<Button title="Stop" onPress={() => setIsRunning(false)} />
```

These functions execute when their respective buttons are pressed instead of being called directly during rendering.

## Step 6 — Create the Custom useStopwatch Hook

I created `hooks/useStopwatch.ts` to separate the stopwatch logic from the user interface.

I imported `useState` and `useEffect` from React.

```tsx
const [seconds, setSeconds] = useState(0);
```

The `seconds` state starts at zero and stores the elapsed time.

I used `useEffect` to start and stop the timer depending on the `isRunning` value.

```tsx
useEffect(() => {
  if (!isRunning) {
    return;
  }

  if (isRunning) {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }
}, [isRunning]);
```

The `setInterval()` function updates the seconds every 1,000 milliseconds while the stopwatch is running.

The dependency array `[isRunning]` tells React to rerun the effect when the running state changes.

I also added a cleanup function using `clearInterval(interval)`. This stops the previous interval when the effect is cleaned up, such as when the stopwatch is stopped or the component using the effect is unmounted.

Finally, I returned the elapsed time:

```tsx
return seconds;
```

This allows `LabScreen` to access the timer value by calling the custom hook.

## Step 7 — Create the Stopwatch Component

I created `components/Stopwatch.tsx` to display the stopwatch information.

The component receives two props:

- `seconds` — The elapsed time in seconds.
- `isRunning` — A boolean value indicating whether the stopwatch is running.

I displayed the elapsed time using a Text component:

```tsx
<Text>elapsed time : {seconds}</Text>
```

I also used conditional rendering to show the current status:

```tsx
{!isRunning ? (
  <Text>Paused</Text>
) : (
  <Text>Running…</Text>
)}
```

When `isRunning` is `false`, the application displays **Paused**. When it is `true`, the application displays **Running…**.

The Stopwatch component receives its data through props rather than managing a separate timer state.

## Step 8 — Connect the Components Using Props

In `LabScreen.tsx`, I called the custom hook and passed the resulting seconds to the Stopwatch component.

```tsx
const seconds = useStopwatch(isRunning);
```

I then passed the required props to both child components:

```tsx
<PracticeTracker
  solved={solved}
  onSolve={() => setSolved(s => s + 1)}
  onReset={() => setSolved(0)}
/>

<Stopwatch
  seconds={seconds}
  isRunning={isRunning}
/>
```

This demonstrates **lifting state up**. The parent component manages the shared state, while the child components receive the data and callbacks they need through props.

It also demonstrates how sibling components can share information through their common parent.

## Step 9 — Run the Application

I used Expo to start the development server and run the application.

From the project directory, I executed:

```bash
npx.cmd expo start
```

I then opened the project using Expo Go on my Android device or an available Android emulator.

If the development server is already running on port 8081, I checked the existing process before starting another server.

## Step 10 — Test the Application

I tested the main features to check whether the state and event handlers worked correctly.

- **Initial state:** The solved count is `0`, and the stopwatch is paused at `0` seconds.
- **Solve +1:** Each press increases the solved count by one.
- **Reset:** Pressing Reset returns the solved count to `0`.
- **Conditional rendering:** The Great job! message appears when the solved count reaches five.
- **Start:** The stopwatch starts counting seconds and displays Running…
- **Stop:** The stopwatch stops counting and displays Paused.
- **Resume:** Starting the stopwatch again creates a new interval so the timer can continue from its existing count.

## Step 11 — Understand the useEffect Cleanup Function

The cleanup function is an important part of the stopwatch implementation.

```tsx
return () => {
  clearInterval(interval);
};
```

The `setInterval()` function repeatedly executes the timer callback. Without cleanup, an old interval could continue running after the effect should have stopped, potentially causing multiple intervals to update the timer.

The `clearInterval()` function prevents that old interval from continuing after cleanup.

For the video demonstration, I can temporarily remove the cleanup function, test the stopwatch, and then restore the original code. This helps demonstrate why effect cleanup is important when working with timers.

## Step 12 — GitHub Repository

I organized the project files so the application could be uploaded to GitHub for submission and review.

The repository name follows the required format:

`IT313_LastName_FirstName_ReactStateHooks`

The repository contains the React Native components, custom hook, Expo configuration, and README documentation.
