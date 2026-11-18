# Disfox Model

The **Disfox Model (DFX Model)** follows a component-based architecture.

Each element or module is designed as an independent component that can be connected to other components to build more complex application structures.

For example:

**BehaviorTable → SlashCommand**  
**EventListener → Application**

This pattern is adopted across new abstraction features and other parts of the framework. The goal is to provide a consistent architecture while improving **organization, readability, modularity, and maintainability**.

Instead of tightly coupling different parts of an application, the DFX Model encourages developers to create independent components and explicitly connect them where they are needed.

## Component-Based Design

A simple example of component composition following the DFX Model:

```js
const database = new Database()
    .host("localhost")
    .port(5432);

const application = new Application()
    .use(database)
    .start();

export default application;
```

In this example, `Database` is an independent component that can be configured separately and then attached to the `Application`.

The same principle is used throughout Disfox.

## BehaviorTable

A `BehaviorTable` can be created independently and then attached to a command using `.dock()`:

```js
import { BehaviorTable, BehaviorContext, SlashService } from "disfox";

const table = new BehaviorTable({
    // implementation
});

const command = new SlashService.Command("ping")
    .description("Replies with Pong!")
    .dock(table)
    .action(async interaction => {
        // implementation
    });

export default command;
```

Here, the `BehaviorTable` remains separate from the command itself. The command only declares that the table should be **docked** into it.

This keeps behavior rules isolated from the command's primary logic while allowing them to be reused across multiple components.

## Application + SlashService

The same component-oriented approach applies to services such as `SlashService`.

Commands can be extracted as independent components and then deployed through the application's slash service:

```js
const cmds = (await SlashService.extractDir("./commands")).valid;

myBot.slash.deployGlobal(cmds);
```

This allows commands, behaviors, listeners, services, and other modules to remain independent while still being composed into a complete Disfox application.

---

> Last updated: August 31, 2026