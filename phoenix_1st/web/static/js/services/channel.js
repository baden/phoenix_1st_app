import { Socket }       from 'phoenix';

function ChannelService()
{
  // console.log("ChannelService:create");
  this.socket = new Socket("/socket", {params: {userToken: "123"}});

  // console.log(["socket = ", this.socket]);

  this.socket.connect();

  // this.channel = this.socket.channel("room:lobby", {token: "foo_bar"});
  // // this.channel.on("new_msg", msg => console.log("Got message", msg) );
  // /*
  //   // Sending
  //
  // */
  // this.channel.join()
  //   .receive("ok", ({messages}) => console.log("catching up", messages) )
  //   .receive("error", ({reason}) => console.log("failed join", reason) )
  //   .receive("timeout", () => console.log("Networking issue. Still waiting...") )

  console.log(["channel = ", this.channel]);
}

ChannelService.prototype.send = function(name, msg) {
  this.channel.push("new_msg", {name: name, body: msg}, 10000)
   .receive("ok", (msg) => console.log("created message", msg) )
   .receive("error", (reasons) => console.log("create failed", reasons) )
   .receive("timeout", () => console.log("Networking issue...") );
}

const channel = new ChannelService();

export default channel
