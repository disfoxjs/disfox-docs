Disfox is a framework built to enhance the **Discord.js** experience by providing automation, structure, and practical tools for Discord application development.

## Why use Disfox?

### 1. Better Organization

As Discord applications grow, keeping commands, events, services, and business logic organized becomes increasingly important.

Disfox encourages a structured architecture where each part of the application has a clear responsibility. Instead of relying on large files, deeply nested callbacks, and repetitive patterns, developers can separate functionality into reusable modules and services.

This approach makes projects easier to maintain, understand, and scale over time.

---

### 2. Less Boilerplate

A significant amount of Discord.js development involves writing setup code before building actual features.

Disfox reduces that overhead through tools like **SlashService**, which handles many repetitive tasks automatically.

Some of its features include:

- Automatic command discovery from directories.
- Conversion of Disfox command definitions into Discord.js-compatible data.
- Structure validation before commands are registered.
- Flexible extraction and registration options.

This allows developers to spend less time configuring commands and more time building them.

Disfox also includes **EventService**, which brings a similar workflow to Discord event management.

---

### 3. BehaviorTables

Disfox includes a feature called **BehaviorTables**, designed to simplify permissions, restrictions, and execution rules.

Instead of scattering validation logic across multiple command files, developers can define behavior in a centralized and declarative way.

For example, a command can be restricted to specific roles, users, channels, or execution contexts without requiring large conditional blocks inside the command itself.

The result is cleaner code and more consistent behavior across the application.

---

### 4. JavaScript and TypeScript Support

Disfox works with both JavaScript and TypeScript.

Developers who use TypeScript benefit from strong typing, autocompletion, and improved tooling, while JavaScript users can use the framework without changing their existing workflow.

---

### 5. Designed for Real Projects

Disfox was created to solve problems commonly found in medium and large Discord.js applications.

As projects grow, file management, command registration, validation, and permissions often become repetitive and difficult to maintain.

Disfox helps reduce that complexity by providing a consistent development experience and a collection of tools that work together naturally.

---

### 6. Performance Matters

Automation should improve productivity without sacrificing performance.

Disfox is designed to minimize unnecessary overhead while still providing the convenience of higher-level abstractions and development tools.

The goal is to help developers move faster without getting in the way of the application itself.

---

### 7. Open Source

Disfox is completely open source and welcomes contributions, feedback, bug reports, and feature suggestions.

The project continues to evolve through community feedback and real-world usage, helping shape future improvements and new features.

The source code is publicly available on GitHub, and most discussions take place in the community Discord server.