# Creating an Application

`Application` is the main class used to initialize and manage a Disfox application.

It provides access to the Discord.js `Client`, Slash Commands, events, intents, and other application-level features.

> This page covers the basic setup of an `Application`. [See the full Application documentation here.](../Application/SlashCommands.md)

---

## Import

```js
import { Application } from "disfox";
```

> Disfox uses ESM.

---

## Creating an Application

The simplest way to create an application is by providing the bot token directly.

```js
import { Application } from "disfox";

const app = new Application("YOUR_TOKEN_HERE");
```

When no `Client` or intents are provided, Disfox creates the client automatically.

The default intents are:

```ts
[
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]
```

---

## Connecting

Use `connect()` to log in to Discord.

```js
await app.connect();
```

After the connection is established, the client becomes available through `app.client`.

---

## Refreshing

`refresh()` destroys the current client connection and logs in again.

```js
await app.refresh();
```

This is useful after changing settings that require a new Gateway connection, such as intents.

---

## Other Initialization Methods

### Using an Existing Client

You can provide an existing Discord.js `Client`.

```js
import {
    Client,
    GatewayIntentBits
} from "discord.js";

import { Application } from "disfox";

const client = new Client({
    intents: [
        GatewayIntentBits.MessageContent
    ]
});

const app = new Application({
    token: "YOUR_TOKEN_HERE",
    client
});
```

#### Parameters

| Property | Type | Description |
| --- | --- | --- |
| `token` | `string` | Discord bot token. |
| `client` | `Client` | Existing Discord.js client instance. |

When a client is provided, Disfox uses that instance instead of creating one.

---

### Letting Disfox Create the Client

You can provide the intents without creating the Discord.js client manually.

```js
import { GatewayIntentBits } from "discord.js";
import { Application } from "disfox";

const app = new Application({
    token: "YOUR_TOKEN_HERE",
    intents: [
        GatewayIntentBits.MessageContent
    ]
});
```

Disfox creates the `Client` using the provided intents.

---

### Using the Default Intents

If neither `client` nor `intents` is provided, the default Disfox intents are used.

```js
import { Application } from "disfox";

const app = new Application({
    token: "YOUR_TOKEN_HERE"
});
```

Default intents:

```ts
[
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]
```

---

## Configuring Intents

Intents can also be changed after creating the `Application`.

```js
import { GatewayIntentBits } from "discord.js";
import { Application } from "disfox";

const app = new Application("YOUR_TOKEN_HERE");

app.clearIntents();

app.addIntent(
    GatewayIntentBits.MessageContent
);

app.addIntents(
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages
);

app.removeIntent(
    GatewayIntentBits.GuildMembers
);
```

### Intent Methods

| Method | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `.clearIntents()` | — | `void` | Removes all configured intents. |
| `.addIntent()` | `GatewayIntentBits` | `void` | Adds one intent. |
| `.addIntents()` | `...GatewayIntentBits[]` | `void` | Adds multiple intents. |
| `.removeIntent()` | `GatewayIntentBits` | `void` | Removes one intent. |

If intents are changed after `connect()` has already been called, refresh the application:

```js
await app.refresh();
```

The new intents are applied on the next Gateway connection.

---

> Last updated: October 2, 2026