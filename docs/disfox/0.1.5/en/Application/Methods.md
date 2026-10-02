!warn"Notice: This documentation is currently being rewritten. It is based on an older version of the previous GitHub documentation, so it may be confusing or unclear."

# Application Methods — disfox

In this example, we will cover the methods of the `Application` instance.

---

## 1. Required Imports (discord.js)

```js
import { Client, GatewayIntentBits } from "discord.js"; // Events is optional
```

---

## 2. Required Imports (disfox)

```js
import { Application } from "disfox";
```

---

## 3. Creating the client with discord.js

```js
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});
```

---

## 4. Creating the Application instance

```js
const myBot = new Application({
    client: client,
    token: "MyApplication_TOKEN"
});
```

---

## 5. Logging in the application

> Always log in **before accessing methods or events**.

```js
await myBot.connect();
```

---

## 6. Accessing the client

```js
myBot.client // Returns the client passed to the instance constructor
```

---

## 7. Accessing the user

```js
myBot.user // Returns the user of the client
```

---

## Notes

Deprecated methods are **not included** but can be found at: