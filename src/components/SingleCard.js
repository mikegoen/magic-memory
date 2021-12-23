import { useState } from "react";
import "./SingleCard.css";

export default function SingleCard({ card, handleChoice, handleImgLoaded, flipped, disabled, loading }) {
	const handleClick = () => {
		if (!disabled) {
			handleChoice(card)
		} 
	}

	let style = {
		cursor: disabled ? "default" : "pointer",
		display: loading ? "none" : "block"
	}

	return (
		<div className="card" style={style}>
			<div className={flipped ? "flipped" : ""}>
					<div className="front">
						<div className="img-container">
							<img 
								src={card.src} 
								alt="card front"
								onLoad={() => handleImgLoaded()}
							/>
						</div>
					</div>
					<div
						className="back"
						style={{ backgroundImage: "url('/img/diamond-upholstery.png')"}}
						onClick={handleClick}
						alt="card back" 
					/>
			</div>
	</div>
	)
}
