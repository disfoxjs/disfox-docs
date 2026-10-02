# SlashService

`SlashService` provides utilities for creating, extracting, registering, and handling Discord Slash Commands (`/`).

It supports both the standard Discord.js command structure and the Disfox Command Model (DFX).

![BehaviorTable Result](/img/doc-banner-ss.png)

---

## Import

```js
import { SlashService } from "disfox";
```

---

## Basic Command Structure

Standard Discord.js command modules are supported.

```js
import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong"),

    async execute(interaction) {
        await interaction.reply("Pong!");
    }
};
```

A valid command must contain:

- `data`
- `execute`

---

## Command Extraction

Commands can be extracted from a single file or from a directory.

### Extracting a Single File

```js
import { SlashService } from "disfox";

const command = SlashService.extractFile("./command.js");
```

Returns:

```js
[
    {
        data: SlashCommandBuilder {
            options: [],
            name: "ping",
            name_localizations: undefined,
            description: "Replies with Pong",
            description_localizations: undefined,
            contexts: undefined,
            default_permission: undefined,
            default_member_permissions: undefined,
            dm_permission: undefined,
            integration_types: undefined,
            nsfw: undefined
        },

        execute: [AsyncFunction: execute]
    }
]
```

> `extractFile()` supports both Discord.js and Disfox command models.

---

### Extracting a Directory

```js
import { SlashService } from "disfox";

const commands = await SlashService.extractDir("./commands");
```

Returns:

```js
{
    valid: [
        {
            data: SlashCommandBuilder {
                options: [],
                name: "ping",
                name_localizations: undefined,
                description: "Replies with Pong",
                description_localizations: undefined,
                contexts: undefined,
                default_permission: undefined,
                default_member_permissions: undefined,
                dm_permission: undefined,
                integration_types: undefined,
                nsfw: undefined
            },

            execute: [AsyncFunction: execute]
        }
    ],

    invalid: []
}
```

Valid commands are stored in `valid`. Invalid command structures are stored in `invalid`.

---

### Validation Rules

A command must contain both `data` and `execute`.

```js
import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),

    async execute(interaction) {
        await interaction.reply("Pong!");
    }
};
```

---

## Disfox Command Model (DFX)

Since **v0.0.7**, Disfox includes its own model for creating Slash Commands.

### Creating a Command with DFX

```js
import { SlashService } from "disfox";

const command = new SlashService.Command("ping")
    .description("Replies with Pong!")
    .action(interaction => {
        interaction.reply("Pong!");
    });

export default command;
```

> Command names cannot contain spaces, uppercase letters, or special characters except `-` and `_`.

---

### Using Tags

Tags can change the visibility or behavior of a command.

```js
import { SlashService, SlashTag } from "disfox";

const command = new SlashService.Command("ping")
    .description("Replies with Pong!")
    .mark(SlashTag.AdminOnly)
    .action(interaction => {
        interaction.reply("Pong!");
    });

export default command;
```

| Tag | Description | Enum |
| --- | --- | --- |
| AdminOnly | Makes the command available only to users with administrator permissions. | `SlashTag.AdminOnly` |
| NSFW | Marks the command as age-restricted and available only in NSFW contexts. | `SlashTag.NSFW` |

---

### Adding Options

Options are created with `SlashService.Option` and attached to commands using `.option()`.

```js
import { SlashOptions, SlashService } from "disfox";

const option = new SlashService.Option("choice")
    .type(SlashOptions.String)
    .required(true)
    .description("Select the weapon.");

const command = new SlashService.Command("rps")
    .description("Play Rock, Paper, Scissors against the bot!")
    .option(option)
    .action(async interaction => {
        // ...
    });

export default command;
```

#### Methods

| Method | Parameter | Returns | Description |
| --- | --- | --- | --- |
| `.type()` | `SlashOptions` | `this` | Sets the option type. |
| `.description()` | `string` | `this` | Sets the option description. |
| `.required()` | `boolean` | `this` | Defines whether the option is required. |
| `.choices()` | `Record<any, any>` | `this` | Defines predefined choices. |
| `.minNumber()` | `number` | `this` | Sets the minimum numeric value. |
| `.maxNumber()` | `number` | `this` | Sets the maximum numeric value. |
| `.channelTypes()` | `...ChannelType[]` | `this` | Restricts the allowed channel types. |

#### Option Types

| SlashOption | Discord.js class | Description |
| --- | --- | --- |
| `SlashOptions.String` | `SlashCommandStringOption` | Text input. |
| `SlashOptions.Number` | `SlashCommandNumberOption` | Numeric input, including decimal values. |
| `SlashOptions.Channel` | `SlashCommandChannelOption` | Channel selection. |
| `SlashOptions.Boolean` | `SlashCommandBooleanOption` | Boolean value (`true` or `false`). |
| `SlashOptions.Role` | `SlashCommandRoleOption` | Role selection. |
| `SlashOptions.Attachment` | `SlashCommandAttachmentOption` | File or attachment input. |
| `SlashOptions.Mentionable` | `SlashCommandMentionableOption` | Mentionable user or role. |

---

#### Multiple Options

Call `.option()` multiple times to add more than one option.

```js
import { SlashOptions, SlashService } from "disfox";

const option1 = new SlashService.Option("choice")
    .type(SlashOptions.String)
    .required(true)
    .description("Select the weapon.");

const option2 = new SlashService.Option("target")
    .type(SlashOptions.Mentionable)
    .required(true)
    .description("Select a target.");

const command = new SlashService.Command("rps")
    .description("Play Rock, Paper, Scissors against the bot!")
    .option(option1)
    .option(option2)
    .action(async interaction => {
        // ...
    });

export default command;
```

---

### Adding Options with Choices

`.choices()` defines a fixed set of values for an option.

```js
import { SlashOptions, SlashService } from "disfox";

const option = new SlashService.Option("choice")
    .type(SlashOptions.String)
    .required(true)
    .description("Select the weapon.")
    .choices({
        rock: "rock",
        paper: "paper",
        scissors: "scissors"
    });
```

The key is used as the choice name, while the value is passed to the interaction.

```js
const choice = interaction.options.getString("choice", true);
```

---

### Numeric Limits

Numeric options can use `minNumber()` and `maxNumber()`.

```js
import { SlashOptions, SlashService } from "disfox";

const option = new SlashService.Option("amount")
    .type(SlashOptions.Number)
    .description("Select an amount.")
    .required(true)
    .minNumber(1)
    .maxNumber(100);
```

---

### Channel Types

Channel options can be restricted using `channelTypes()`.

```js
import { ChannelType } from "discord.js";
import { SlashOptions, SlashService } from "disfox";

const option = new SlashService.Option("channel")
    .type(SlashOptions.Channel)
    .description("Select a channel.")
    .required(true)
    .channelTypes(
        ChannelType.GuildText,
        ChannelType.GuildVoice,
        ChannelType.GuildForum
    );
```

---

## Registering and Listening for Commands

Both command models use the same registration process.

Disfox command models are converted internally before registration.

---

### Global Registration

```js
import { SlashService } from "disfox";
import { Events } from "discord.js";

app.client.on(Events.ClientReady, async () => {
    const commands = (
        await SlashService.extractDir("./commands")
    ).valid;

    await app.slash.deployGlobal(commands);
});
```

`deployGlobal()` registers the commands globally.

---

### Guild Registration

```js
import { SlashService } from "disfox";
import { Events } from "discord.js";

app.client.on(Events.ClientReady, async () => {
    const commands = (
        await SlashService.extractDir("./commands")
    ).valid;

    await app.slash.deployGuilds(
        commands,
        ["1234", "12345"]
    );
});
```

The second parameter contains the guild IDs where the commands will be registered.

---

### Extraction Settings

`SlashService.extractDir()` accepts optional extraction settings.

```js
const commands = await SlashService.extractDir("./commands", {
    autoConverts: true,
    ignoreInvalidStructures: false
});
```

#### Options

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `autoConverts` | `boolean` | `true` | Automatically converts Disfox command models during extraction. |
| `ignoreInvalidStructures` | `boolean` | `false` | Returns only valid commands instead of `{ valid, invalid }`. |

---

#### `autoConverts`

Controls automatic conversion of Disfox command models.

```js
const commands = await SlashService.extractDir("./commands", {
    autoConverts: false
});
```

Automatic conversion is enabled by default.

```js
const commands = await SlashService.extractDir("./commands");
```

---

#### `ignoreInvalidStructures`

By default, `extractDir()` returns both valid and invalid structures.

```js
const commands = await SlashService.extractDir("./commands");

console.log(commands.valid);
console.log(commands.invalid);
```

Return structure:

```ts
interface extractionValidates {
    valid: SlashCommand[];
    invalid: any[];
}
```

With `ignoreInvalidStructures` enabled:

```js
const commands = await SlashService.extractDir("./commands", {
    ignoreInvalidStructures: true
});
```

the method returns the valid command array directly.

```js
// SlashCommand[]
console.log(commands);
```

---

#### Return Types

| Configuration | Return type |
| --- | --- |
| Default | `Promise<extractionValidates>` |
| `ignoreInvalidStructures: false` | `Promise<extractionValidates>` |
| `ignoreInvalidStructures: true` | `Promise<SlashCommand[]>` |

```ts
static async extractDir(
    dir: string,
    options?: extractionOptions
): Promise<extractionValidates | SlashCommand[]>
```

---

#### Type Definitions

```ts
interface extractionOptions {
    autoConverts?: boolean;
    ignoreInvalidStructures?: boolean;
}

interface extractionValidates {
    valid: SlashCommand[];
    invalid: any[];
}
```

---

#### Default Settings

```js
{
    autoConverts: true,
    ignoreInvalidStructures: false
}
```

---

### Listening for Commands

Use `app.slash.listen()` to handle registered Slash Commands.

#### Basic Usage

```js
import { SlashService } from "disfox";
import { Events } from "discord.js";

app.client.on(Events.ClientReady, async () => {
    const commands = (
        await SlashService.extractDir("./commands")
    ).valid;

    await app.slash.deployGlobal(commands);

    app.slash.listen();
});
```

---

#### Custom Error Message

```js
app.slash.listen({
    onError: {
        message: "An error occurred. Please try again.",
        flags: 64
    }
});
```

---

#### Custom Error Callback

```js
app.slash.listen({
    onError: {
        callback: (interaction, error) => {
            console.error(
                "Failed to execute command:",
                error
            );

            interaction.reply(
                "An error occurred. Please try again."
            );
        }
    }
});
```

---

## Attaching BehaviorTables

A `BehaviorTable` can be attached to a command with `.dock()`.

```js
import {
    SlashService,
    BehaviorTable
} from "disfox";

const table = new BehaviorTable({});

const command = new SlashService.Command("ping")
    .description("Replies with Pong!")
    .dock(table)
    .action(interaction => {
        interaction.reply("Pong!");
    });

export default command;
```

BehaviorTables provide reusable restrictions, permissions, and actions for commands.

---

> Last updated: October 2, 2026