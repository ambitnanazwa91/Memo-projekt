const gameWindow = document.querySelector('.game')
const cardsContainer = document.querySelector('.container-cards')
const cards = document.querySelectorAll('.card')
const reset = document.querySelector('button')
const gameover = document.querySelector('.gameover')
const win = document.querySelector('.win')
const life = document.querySelector('.lives')
const colors = ['red', 'green', 'blue', 'violet', 'orange', 'white']
let lives = 20
let cardFlip = 0
let points = 0
const numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]
let availableNumbers = [...numbers]

//obwraca karte i zabiera jedno odkrycie z puli

const flipCard = e => {
	if (cardFlip < 2) {
		console.log(availableNumbers)
		console.log(e)
		const clickCard = e.target
		clickCard.classList.toggle('cardflip')
		block(e)
		console.log(clickCard)
		cardFlip += 1
		console.log(`Ilośc obróconych kart na ten moment ${cardFlip}`)
		lives -= 1
		life.textContent = ': ' + lives
		console.log(`Życia ${lives}`)
		loseCheck()
		// winCheck()
		image(e)
		clickCard.classList.add('checked')
		notClearCard()
		// block(e)
	}
}

// const block = e => {
// 	if (e.classList.contains('cardflip')) {
// 		e.classList.add('block')
// 	} else if (cardFlip === 2) {
// 		gameWindow.classList.add('block')
// 	}
// }

const block = e => {
	if (e.target.classList.contains('cardflip')) {
		e.target.classList.add('block')
	} else if (cardFlip === 2) {
		// Upewnij się, że cardFlip jest zdefiniowane i ma wartość
		gameWindow.classList.add('block') // Upewnij się, że gameWindow jest zdefiniowane
	}
}

const cleanBlock = () => {
	cards.forEach(card => {
		card.classList.remove('block')
	})
}

const image = e => {
	const element = e.target
	if (!element.classList.contains('checked')) {
		const randomIndex = Math.floor(Math.random() * availableNumbers.length)
		const assignedNumber = availableNumbers[randomIndex]
		availableNumbers.splice(randomIndex, 1)
		console.log(` przypisana ${assignedNumber}`)
		console.log(` zostały ${availableNumbers}`)

		element.classList.add(`${assignedNumber}`)
		console.log(`Wylosowana ${assignedNumber}`)

		// Ustawiamy zmienną CSS do zmiany tła w ::before
		const colorIndex = (assignedNumber - 1) % colors.length
		element.style.setProperty('--before-background', colors[colorIndex])
		clearCard(assignedNumber)
	} else if (element.classList.contains('checked') && element.classList.contains('cardflip')) {
		const value = Array.from(element.classList).find(cls => /^\d+$/.test(cls))
		console.log(` clasa z e ${value}`)
		clearCard(value)
	}
}

const notClearCard = () => {
	let checkCards = 0

	for (let i = 0; i < cards.length; i++) {
		if (cards[i].classList.contains('cardflip')) {
			checkCards += 1
			console.log(`Ile odkrytych: ${checkCards}`)
		}
	}

	if (checkCards === 2) {
		setTimeout(() => {
			resetBtn()
			cleanBlock()
		}, 2500)
	} else checkCards = 0
}

const clearCard = randomNumber => {
	for (let i = 0; i < cards.length; i++) {
		for (let j = i + 1; j < cards.length; j++) {
			// Sprawdzamy, czy oba elementy zawierają tę samą klasę
			if (
				cards[i].classList.contains(`${randomNumber}`) &&
				cards[j].classList.contains(`${randomNumber}`) &&
				cards[i].classList.contains('cardflip') &&
				cards[j].classList.contains('cardflip')
			) {
				setTimeout(() => {
					cards[i].classList.add('none')
					cards[j].classList.add('none')
					cards[i].classList.forEach(cls => {
						if (/^\d+$/.test(cls)) {
							// Sprawdza, czy klasa zawiera tylko cyfry
							cards[i].classList.remove(cls) // Usuwa tę klasę
							console.log(`Usunięto klasę: ${cls}`)
						}
					})
					cards[j].classList.forEach(cls => {
						if (/^\d+$/.test(cls)) {
							// Sprawdza, czy klasa zawiera tylko cyfry
							cards[j].classList.remove(cls) // Usuwa tę klasę
							console.log(`Usunięto klasę: ${cls}`)
						}
					})
					cardFlip = 0
					lives += 1
					points += 1
					life.textContent = ': ' + lives
					console.log(`usuwam: ${randomNumber}`)
					console.log(` punkty ${points}`)
					winCheck()
					cleanBlock()
				}, 2000)
			}
		}
	}
}

//reset button, resetuje też "odkrycia"

const resetBtn = () => {
	const cardsFlips = document.querySelectorAll('.cardflip') // Pobieramy wszystkie elementy z klasą 'cardflip'
	console.log(cardsFlips) // Wyświetlamy w konsoli dla sprawdzenia

	cardsFlips.forEach(card => {
		card.classList.toggle('cardflip') // Przełączamy klasę 'cardflip' dla każdego elementu
	})

	cardFlip = 0
	cleanBlock()
}

//sprawdzanie czy koniec żyć

const loseCheck = () => {
	if (lives === 0 && cards.length > 0) {
		reset.disabled = true
		cards.disabled = true
		// Opóźniamy wykonanie o 3 sekundy (3000 ms)
		setTimeout(() => {
			gameWindow.classList.add('none-display')
			gameover.classList.remove('none')
			console.log(gameover)
		}, 3000) // 3000 ms = 3 sekundy
	}
}

const winCheck = () => {
	console.log(cards.length)
	if (points === cards.length / 2) {
		reset.disabled = true
		cards.disabled = true
		gameWindow.classList.add('none-display')
		win.classList.remove('none')
		console.log(gameover)
		console.log(`ile kart zostało: ${cards.length}`)
	}
}

cards.forEach(card => {
	card.addEventListener('click', flipCard)
})

reset.addEventListener('click', resetBtn)

// można klikać po odkrycium, trzeba jakiś disabled klikanie, do czasu aż sprawdzi win/lose - zablkowac
//można wygrać i przegrać. ostatnim ruchem czyściśz plansze - zablokować
/// dodać funkcje, która przy cardfliw 2 sprawdza czy cards.length === zero, jeśli tak to win , jeśli nie a żyć 0 to lose i to musi się dziać// jednak coś nie działa, lepiej to rozmyślec.
