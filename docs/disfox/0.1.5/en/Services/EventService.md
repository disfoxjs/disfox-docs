!warn"Notice: This documentation is currently being rewritten. It is based on an older version of the previous GitHub documentation, so it may be confusing or unclear."

In this example, we will cover everything about the **`EventService`**.

If you haven't seen the documentation and examples for **Application**, they are available at:

```
examples/Application/
```

---

## 1. Initialization

### index.js

```js
import { Client, GatewayIntentBits } from "discord.js";
import { Application, EventService } from "disfox";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

const myBot = new Application({
    client: client,
    token: "MyApplication_TOKEN"
});

await myBot.connect();
```

---

## 2. Service functions

### Extract a single module

```js
EventService.extractFile('./filePath.js')
```

Extracts **a single module** that has a structure like:

```js
export default {
    data: Events.MessageCreate, // or any other event
    async execute(message) {
        // Execute code
    }
}
```

or

```js
export default {
    name: Events.MessageCreate, // or any other event
    async execute(message) {
        // Execute code
    }
}
```

If the structure is **exactly like this**, the extractor will place the module into:

```
{
    valids: [],   // valid modules
    invalids: []  // invalid modules
}
```

Otherwise, the module will be added to the **`invalids`** array.

---

### Extract all modules from a directory

```js
EventService.extractDir('./eventsPath')
```

Extracts **all `.js` modules from a directory**.

Just like `extractFile()`, the extractor will organize modules into valid and invalid:

```
{
    valids: [],   // valid modules
    invalids: []  // invalid modules
}
```

The **expected structure** for an event module is:

```js
export default {
    data: Events.MessageCreate,
    async execute(message) {
        // Execute code
    }
}
```

---

## 3. Example: Extracting **1 module** with ready-to-use event structure

### File `./channelCreate.js`

```js
import { Events } from "discord.js";

export default {
    data: Events.ChannelCreate,
    async execute(channel) {
        console.log("New channel created!");
    }
}
```

### index.js

```js
import { Client, GatewayIntentBits } from "discord.js";
import { Application, EventService } from "disfox";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

const myBot = new Application({
    client: client,
    token: "MyApplication_TOKEN"
});

await myBot.connect();

const event = await EventService.extractFile('./channelCreate.js');

await myBot.events.listenEvents(event.valids);
```

---

## 4. Example: Extracting **multiple modules** with ready-to-use event structure

### File `events/ping.js`

```js
import { Events } from "discord.js";

export default {
    data: Events.MessageCreate,
    async execute(message) {
        if (message.content === "ping") {
            await message.reply("Pong!");
        }
    }
}
```

Assume there are also `events/ready.js` and `events/channelCreate.js` as valid modules.

### index.js

```js
import { Client, GatewayIntentBits } from "discord.js";
import { Application, EventService } from "disfox";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

const myBot = new Application({
    client: client,
    token: "MyApplication_TOKEN"
});

await myBot.connect();

const events = await EventService.extractDir('./events');

await myBot.events.listenEvents(events.valid);
```

---

## Notes

If an **absolute directory path** or a file with an extension other than `.js` is passed to `EventService.extractFile()`, the method will throw a **`DisfoxError`**.

This document covers the usage of **`EventService`**, which is **similar to `SlashService`**, but focused on **Discord events**.

