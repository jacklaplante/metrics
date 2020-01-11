function fetchData() {
  fetch('https://rvcv9mh5l1.execute-api.us-east-1.amazonaws.com/test/metrics').then(response => {
    response.json().then(json => {
      let body = document.getElementById("metrics-table").getElementsByTagName('tbody')[0]
      json.Items.forEach(item => {
        let row = body.insertRow()
        if (item.timestamp)     row.insertCell(0).innerText = item.timestamp.N
        if (item.serverId)      row.insertCell(1).innerText = item.serverId.S
        if (item.activePlayers) row.insertCell(2).innerText = item.activePlayers.S
        if (item.status)        row.insertCell(3).innerText = item.status.S
        if (item.playerIp)      row.insertCell(4).innerText = item.playerIp.S
      })
    })
  })
}