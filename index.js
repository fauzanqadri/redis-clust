const Redis = require('ioredis');

const Cluster = new Redis.Cluster([
  {
    host: "127.0.0.1",
    port: "6377"
  },
  {
    host: "127.0.0.1",
    port: "6378"
  },
  {
    host: "127.0.0.1",
    port: "6379"
  }
],{
  redisOptions: {
    keyPrefix: "production"
  }
});

Cluster.on("ready", () => {
  console.log("Redis Connection is ready to accept connection");
})

Cluster.on("error", (err) => {
  console.error("Error: ", err);
})

Cluster.on("reconnecting", () => {
  console.log("reconnecting redis into server");
})

Cluster.set("HelloKey", "Hello Redis Cluster", (err, res) => {
  console.log(err);
  console.log(res);
  Cluster.expire("HelloKey", 10000)
  Cluster.get("HelloKey", (err, res) => {
    console.log(err)
    console.log(res)
  });
});