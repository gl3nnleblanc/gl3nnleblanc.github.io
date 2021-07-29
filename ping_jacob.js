function callOut() {
  discordUrl = "https://discord.com/api/webhooks/869810430015574027/4SlAM2eY53ARP_vjlhHG3qRsDTbintFfXocZo17CzkJEx4DltVT4aSGF3qe0YBqTkVMR"
  message = "<@241013195014144002> you have been pinged"
  var xhr = new XMLHttpRequest();
  xhr.open("POST", discordUrl, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
      'content': message
  }));
}

document.getElementById("jacobPinger").onclick = () => { callOut(); };
