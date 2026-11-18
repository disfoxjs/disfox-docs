!warn"Notice: This documentation is currently being rewritten. It is based on an older version of the previous GitHub documentation, so it may be confusing or unclear."

# Application Events — disfox

In this example, we will cover everything about the **Events** field of the `Application` class.

---

## 1. Required Imports (discord.js)

```js
import { Client, GatewayIntentBits, Events } from "discord.js"; // Events is optional.
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

> Always log in **before listening to events**.

```js
await myBot.connect();
```

---

## 6. Listening to events

```js
myBot.events.listenEvents([]) // Array of event objects
```

### Example of expected events:

```js
myBot.events.listenEvents([
    {
        data: Events.MessageCreate, // Event type
        async execute(message) {
            message.reply("I am replying to your message!");
            console.log("User said:", message);
        }
    },
    {
        data: Events.ChannelCreate,
        async execute() {
            console.log("A new channel was created!");
        }
    },
    ...
]);
```

---

## Notes

This document covers the use of **`events` from the `Application` instance**.

There are services like **EventService** to enhance event creation.

Available at:

```
EventService/EventService.md
```

---

## Next Examples

Usage of **Application.actions** is available at:

```
./Actions.md
```

---

## Diving Deeper into Events

```
EventService/EventService.md
```

---

## Note

`listenEvents` will soon be replaced by `events.listen()`, providing:

- Greater precision when filtering events
- Better execution control
- Support for custom callbacks