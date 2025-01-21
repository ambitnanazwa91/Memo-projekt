const gameWindow = document.querySelector('.game')
const cardsContainer = document.querySelector('.container-cards')
const cards = document.querySelectorAll('.card')
const reset = document.querySelector('button')
const gameover = document.querySelector('.gameover')
const win = document.querySelector('.win')
const life = document.querySelector('.lives')
const colors = ['red', 'green', 'blue']
let lives = 10
let cardFlip = 0
let points = 0
const numbers = [1, 1, 2, 2, 3, 3]
let availableNumbers = [...numbers]

//obwraca karte i zabiera jedno odkrycie z puli

const flipCard = e => {
	if (cardFlip < 2) {
		console.log(availableNumbers)
		console.log(e)
		const clickCard = e.target
		clickCard.classList.toggle('cardflip')
		console.log(clickCard)
		cardFlip += 1
		console.log(`Ilośc obróconych kart na ten moment ${cardFlip}`)
		lives -= 1
		life.textContent = ': ' + lives
		console.log(`Życia ${lives}`)
		loseCheck()
		image(e)
		clickCard.classList.add('checked')
		notClearCard()
	}
}

/// muszę to lepiej podzielić.

// we flip card nadaćfunkcje, na sprwadzanie

// i w tej funkcji dopiero dać dwie funkcje które jeśli numer się zgadza to usuwam, jeśli nie, to dopiero wywołuje notCleard card
//losowanie awrtości karty i przypisywanie

// w sumie: głowna funkcja:  1.Klikam, pierwsz afunkcja obraca ofc, przypisuje NUMER i CHECKED.  2. sprawdza czy już było checked/. jeśli tak to sprawdzam czy jakikolwiek div z cardflip ma ten sam numer klasy. JEśli tak, to usuwam, jeśli nie to daje funkcje na usunięcie card flip
/// struktura 1 Główne:
/// 2. oznaczanie jako cardflip i checkd. 3.

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

// const image = e => {
// 	const element = e.target
// 	if (!element.classList.contains('checked')) {
// 		const randomNumber = Math.floor(Math.random() * 2) + 1
// 		element.classList.add(`${randomNumber}`)
// 		console.log(`Wylosowana ${randomNumber}`)

// 		// Ustawiamy zmienną CSS do zmiany tła w ::before
// 		element.style.setProperty('--before-background', randomNumber === 1 ? 'red' : 'green')
// 	} else {
// 		const value = element.classList[3]
// 		console.log(value)
// 		clearCard(value)
// 	}
// }
// jeszcze check czy cleard czy nie (wtedy odwracamy jak było)

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
					cards[i].style.display = 'none'
					cards[j].style.display = 'none'
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
					points += 1
					console.log(`usuwam: ${randomNumber}`)
					console.log(` punkty ${points}`)
					winCheck()
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
}

//sprawdzanie czy koniec żyć

const loseCheck = () => {
	if (lives === 0) {
		reset.disabled = true
		cards.disabled = true
		// Opóźniamy wykonanie o 3 sekundy (3000 ms)
		setTimeout(() => {
			gameWindow.classList.add('none')
			gameover.classList.remove('none')
			console.log(gameover)
		}, 3000) // 3000 ms = 3 sekundy
	}
}

const winCheck = () => {
	if (points === 3) {
		reset.disabled = true
		cards.disabled = true
		gameWindow.classList.add('none')
		win.classList.remove('none')
		console.log(gameover)
	}
}

cards.forEach(card => {
	card.addEventListener('click', flipCard)
})

reset.addEventListener('click', resetBtn)

// można klikać po odkrycium, trzeba jakiś disabled klikanie, do czasu aż sprawdzi win/lose - zablkowac
//można wygrać i przegrać. ostatnim ruchem czyściśz plansze - zablokować
