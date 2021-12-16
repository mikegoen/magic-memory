import "./SingleCard.css";

export default function SingleCard({ card, handleChoice, flipped, disabled }) {

	const handleClick = () => {
		if (!disabled) {
			handleChoice(card)
		} 
	}

	return (
		<div className="card" style={disabled ? {cursor: "default"} : {cursor: "pointer"}}>
			<div className={flipped ? "flipped" : ""}>
					<div className="front">
						<div className="img-container">
							<img 
								src={card.src} 
								alt="card front" 
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
