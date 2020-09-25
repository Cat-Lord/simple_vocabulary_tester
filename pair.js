class Pair {
	constructor(foreign, translated){
		this.foreignOrigin = foreign.trim()
		this.translatedOrigin = translated.trim()
		
		this.trennbar = false
		this.foreigns = []
		this.translated = []
		this.expectedAnswers = []

		if(foreign.includes('/')){
			var parts = foreign.split(' ')
			parts[0].split('/').forEach(member => {
				var complet = member.trim();
				for(var i = 1; i < parts.length; i++)
					complet += ' ' + parts[i].trim()

				this.foreigns.push(complet.trim())	
			})
		}
		else{
			if(foreign.includes('|')){
				this.trennbar = true
				var answer = ""
				foreign.split('|').forEach(part => {
					answer += part
				})
				this.foreigns.push(answer)
			}
			else
				this.foreigns.push(foreign.trim())	
		}

		translated.split(',').forEach(translation => { this.translated.push(translation.trim()); })
	}

	getQuestion(){
		if(revertedTest)
			return this.translatedOrigin
		return this.foreignOrigin
	}


	check(){
		var parts = document.querySelector('#userInput').value.split(' ')	
		var answer = ""
		parts.forEach(part => {
			answer += part.trim() + ' '
		})
		answer = answer.trimEnd()
		
		console.log("FINAL ANSWER: `" + answer + "`")

		this.expectedAnswers = (revertedTest == true ? this.foreigns : this.translated)
		var result = false
		this.expectedAnswers.forEach(possibleAnswer => {
			console.log("possible: `" + possibleAnswer + "`")
			if(possibleAnswer === answer){
				result = true
			}
			else
				console.log(answer + " != " + possibleAnswer)
		})

		if(this.trennbar == true  &&  document.querySelector("#trennbar").checked == false)
			document.querySelector("#isTrennbar").style.display = 'block'

		return result
	}

	getCorrectAnswer(){
		var res = ""

		for(var i = 0; i < this.expectedAnswers.length; i++){
			if(i == this.expectedAnswers.length - 1)
				res += this.expectedAnswers[i]
			else
				res += this.expectedAnswers[i] + ", "
		}
		return res
	}

	checkout(){
		console.log("foreigns: " + this.foreigns)
		console.log("translated:" + this.translated)
		console.log("trennbar: " + this.trennbar)
	}
	
}