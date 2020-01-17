function fetchData() {
  fetch('https://rvcv9mh5l1.execute-api.us-east-1.amazonaws.com/test/metrics').then(response => {
    response.json().then(json => {
      let body = document.getElementById("metrics-table").getElementsByTagName('tbody')[0]
      json.Items.forEach(item => {
        let row = body.insertRow()
        if (item.timestamp) {
          let date = new Date(parseInt(item.timestamp.N))
          row.insertCell(0).innerText = date.toString()
        }
        if (item.serverId) row.insertCell(1).innerText = item.serverId.S
        if (item.activePlayers) row.insertCell(2).innerText = item.activePlayers.S
        if (item.status) row.insertCell(3).innerText = item.status.S
        if (item.playerIp) {
          let playerIp = item.playerIp.S.replace("::ffff:", "")
          row.insertCell(4).innerText = playerIp
          // fetchLocation(playerIp, row)
        }
        if (item.country) row.insertCell(5).innerText = item.country.S
        if (item.latitude && item.longitude) {
          let cell = row.insertCell(6)
          let latLon = item.latitude.S + "," + item.longitude.S
          let gMapsUrl = "https://www.google.com/maps/search/?api=1&query=" + latLon
          let link = latLon.link(gMapsUrl);
          cell.innerHTML = link;
          console.log()
        }
      })
    })
  })
}


let locations = {}
function fetchLocation(ip, row) {
  if (ip.split('.').length >= 4 && !locations[ip]) {
    fetch('https://api.ipgeolocationapi.com/geolocate/' + ip, {mode: 'no-cors'}).then(response => {
      response.json().then(json => {
        // add location to map
        row.insertCell(5).innerText = "location"
      })
    }) 
  }
}