# Dfx2Djs

**Dfx2Djs** (or **Disfox to Discord.js**) is an adapter responsible for converting components that follow the **DFX Model**, as well as other Disfox modules, into data structures that are valid and compatible with Discord.js.

It acts as a bridge between Disfox abstractions and the underlying Discord.js structures.

Dfx2Djs is primarily used when working with **slash commands**.

## SlashCommand

A slash command created using the Disfox Model is represented as an instance of:

```js
SlashService.Command
```

During conversion, Dfx2Djs transforms this instance into a Discord.js:

```js
SlashCommandBuilder
```

Additional Disfox-specific metadata may also be attached to the resulting command when required.

This allows developers to work with Disfox abstractions while still producing structures that can be consumed by Discord.js.

## BehaviorTables

`BehaviorTable` components can be attached to a `SlashService.Command`.

When the command is converted into a `SlashCommandBuilder`, the resulting builder is extended with additional Disfox metadata.

The modified structure can be represented as:

```ts
// ESM

export interface ModifiedSlashCommandBuilder
    extends SlashCommandBuilder
{
    disfoxData?: {
        behaviorTable: BehaviorTable | null;
    };
}
```

The `disfoxData` property stores information used internally by Disfox while preserving the original Discord.js `SlashCommandBuilder` structure.

In this case, the `BehaviorTable` associated with the original `SlashService.Command` is preserved inside:

```js
disfoxData.behaviorTable
```

This allows Disfox to retain framework-specific behavior information even after converting the command into a Discord.js-compatible structure.

## Conversion

Dfx2Djs conversion is performed primarily and automatically through `SlashService` extraction methods.

This means developers generally do not need to manually convert every `SlashService.Command` into a `SlashCommandBuilder`.

For example, when commands are extracted through `SlashService`, the conversion layer can transform the Disfox components into their corresponding Discord.js-compatible representations as part of the extraction process.

Dfx2Djs therefore serves as the compatibility layer between:

**DFX Model → Dfx2Djs → Discord.js**

This architecture allows Disfox to provide its own component-based abstractions without requiring Discord.js itself to understand Disfox-specific components or metadata.

---

> Last updated: August 31, 2026