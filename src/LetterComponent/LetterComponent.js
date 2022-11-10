import "./LetterComponent.css";
import { useState, useEffect } from "react";

function LetterComponent(props) {
	const [component, setComponent] = useState({
		comp: props.compLetter,
		dis: props.start,
	});

	// function clickHandler() {
	// 	// eslint-disable-next-line no-unused-expressions
	// 	props.compLetter === props.elem
	// 		? setComponent({ comp: props.compLetter, dis: true })
	// 		: null;
	// }

	useEffect(() => {
		if (!props.start) {
			setComponent({ comp: props.compLetter, dis: true });
			setTimeout(() => {
				setComponent({ comp: "?", dis: false });
			}, 2000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (props.reset) {
			setComponent({ comp: props.compLetter, dis: false });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.reset]);

	return (
		<div className="letter_container">
			<button
				onClick={() => {
					props.checkLetter(
						props.compLetter,
						setComponent({ comp: props.compLetter, dis: true })
					);
					// clickHandler();
				}}
				className="front"
				disabled={component.dis || props.off}
			>
				{props.start ? "?" : component.comp}
			</button>
		</div>
	);
}

export default LetterComponent;
