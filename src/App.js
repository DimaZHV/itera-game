import "./App.css";
import { useState, useEffect } from "react";
import LetterComponent from "./LetterComponent/LetterComponent";

function App() {
	const [options, setOptions] = useState({ start: true, mainLetter: "" });
	const [components, setComponents] = useState([]);
	const [loose, setLoose] = useState(0);
	const [win, setWin] = useState(0);
	const [reset, setReset] = useState(false);

	function doStart() {
		const letters = ["A", "B", "C"];
		const newStart = !options.start;
		setOptions({ start: newStart });
		if (newStart === false) {
			setOptions({ mainLetter: letters[Math.floor(Math.random() * 3)] });
		}
		setComponents([]);
		setReset(false);
	}

	useEffect(() => {
		const letters = ["A", "B", "C"];
		let a = [];
		for (let i = 0; i < 9; i++) {
			a.push(letters[Math.floor(Math.random() * 3)]);
		}
		setComponents(a);
	}, [options.start]);

	function checkLetter(e) {
		if (e === options.mainLetter) {
			let a = components;
			a.splice(
				a.findIndex((el) => el === options.mainLetter),
				1,
				"OK"
			);
			setComponents(a);
		}

		if (e !== options.mainLetter) {
			setReset(true);
			let newSet = components.map((el) =>
				el === "OK" ? (el = options.mainLetter) : el
			);
			setComponents(newSet);
			setOptions({ start: false });
			alert("You Loose!");
			setLoose((prev) => ++prev);
		}

		setTimeout(() => {
			if (components.find((el) => el === options.mainLetter) === undefined) {
				let newSet = components.map((el) =>
					el === "OK" ? (el = options.mainLetter) : el
				);
				setComponents(newSet);
				setOptions({ start: false });
				setWin((prev) => ++prev);
				setReset(true);
				alert("You Win!");
			}
		}, 0);
	}

	return (
		<div className="wrapper">
			<header>
				<div className="loose">Loose: {loose}</div>
				<div className="description">
					<h1>Guess All Letters: {options.start ? "?" : options.mainLetter}</h1>
					<div className="secret_letter"></div>
				</div>
				<div className="win">Win: {win}</div>
			</header>
			<main>
				<div className="main_container">
					{components.map((el, i) => (
						<LetterComponent
							key={i}
							compLetter={el}
							elem={options.mainLetter}
							start={options.start}
							checkLetter={checkLetter}
							reset={reset}
							off={
								components.find((el) => el === options.mainLetter) === undefined
									? true
									: false
							}
						/>
					))}
				</div>
			</main>
			<footer>
				<button onClick={doStart}>{options.start ? "START" : "RESTART"}</button>
			</footer>
		</div>
	);
}

export default App;
