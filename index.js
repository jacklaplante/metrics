function myFunction() {
  fetch('https://rvcv9mh5l1.execute-api.us-east-1.amazonaws.com/test/metrics').then(response => {
    response.json().then(json => {
      document.getElementById("demo").innerHTML = json
    })
  })
}