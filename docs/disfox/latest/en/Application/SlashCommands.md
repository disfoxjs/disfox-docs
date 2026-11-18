> Notice: This documentation is currently being rewritten. It is based on an older version of the previous GitHub documentation, so it may be confusing or unclear.

# Application SlashCommands — disfox

In this example, we will cover everything about the **SlashCommands** field of the `Application` class.

---

## 1. Required Imports (discord.js)

```js
import { Client, GatewayIntentBits } from "discord.js";
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

## 5. Registering global / guild commands

### Registering global commands

```js
myBot.slash.deployGlobal(["array_of_commands"]);
```

Here we are registering **global commands** in Discord.  
The method receives an **array containing all the commands of your application**.

---

### Registering commands in specific guilds

```js
myBot.slash.deployGuilds(
    ["array_of_commands"],
    ["array_of_guild_ids"]
);
```

In this case, the commands will be registered **only in the specified guilds**.

---

## 6. Logging in the application

> Always log in **before listening to commands**.

```js
await myBot.connect();
```

---

## 7. Listening to Slash interactions

```js
myBot.slash.listen();
```

Now the application starts **listening to slash commands** and will execute the `execute` function.

Since **no parameters are passed** to `listen()`, the default behavior of **disfox** will be used when an error occurs.

Default message:

```
An error occurred while executing this command. Please try again later.
```

## 8. Closing listening to Slash interactions

---

## Customizing error behavior

You can define:

- `message`
- `flags`
- `callback`

---

### Custom message

```js
myBot.slash.listen({
    onError: {
        message: "An error occurred here! Let's try again?",
        flags: 64
    }
});
```

#### Flags

`flags: 64` sends an **ephemeral message**.  

Flags are available from **discord.js v14.14.0** onward.

---

### Using a custom callback

```js
myBot.slash.listen({
    onError: {
        callback: (interaction, error) => {
            interaction.reply(
                "An error occurred while executing the command. Please try again later."
            );

            console.error("Error executing command:", error);
        }
    }
});
```

#### Callback parameters

| Parameter | Description |
|----------|-----------|
| `interaction` | The interaction where the error occurred |
| `error` | `Error` instance containing the occurred error |

---

## Notes

This document covers the use of **`slashCommands` from the `Application` instance**.

---