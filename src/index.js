function component() {
	var element = document.createElement("div")

	// Lodash, currently included via a script, is required for this line to work
	element.innerHTML = "Hello World"

	return element
}

document.body.appendChild(component())

ReactDOM.render(
  <h1>Hello, Kun!</h1>,
  document.getElementById('root')
)