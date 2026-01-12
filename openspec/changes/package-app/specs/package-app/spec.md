# Application Packaging Specification

## ADDED Requirements

### Requirement: Standalone Executable
The application SHALL be packaged into a standalone Windows executable (`.exe`) for easy distribution.

#### Scenario: Running the app on a clean Windows machine
- **GIVEN** a Windows computer without Node.js or Git installed
- **WHEN** the user runs the `美術回檔確認工具 Setup.exe`
- **THEN** the application installs and creates a desktop shortcut
- **AND** the application can be launched and performs all verification tasks correctly

### Requirement: Application Identity
The application SHALL have a unique identity, including a product name and icon.

#### Scenario: Visual identity in Windows
- **WHEN** the application is installed or running
- **THEN** the taskbar and window title show the name "美術回檔確認工具"
- **AND** the application icon is displayed instead of the default Electron icon

### Requirement: Robust Build Pipeline
The build pipeline SHALL ensure all assets (HTML, JS, CSS, Electron scripts) are correctly compiled and bundled.

#### Scenario: Building for production
- **WHEN** the developer runs the build command
- **THEN** the system compiles the TypeScript main process
- **AND** the system builds the React frontend using Vite with relative asset paths
- **AND** `electron-builder` bundles everything into the `release` directory
