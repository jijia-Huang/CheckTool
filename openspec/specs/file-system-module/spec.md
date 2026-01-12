# File System Module Specification

## ADDED Requirements

### Requirement: Directory Selection
The system SHALL allow users to select a local directory containing art assets for comparison.

#### Scenario: User selects directory via dialog
- **WHEN** user clicks the "選擇目錄" button
- **THEN** a directory picker dialog opens
- **AND** when user selects a valid directory, the system stores the directory path
- **AND** the system displays the selected directory path in the UI

#### Scenario: User cancels directory selection
- **WHEN** user opens the directory picker dialog and clicks "取消"
- **THEN** the dialog closes without selecting a directory
- **AND** the system does not change the current directory selection (if any)

#### Scenario: System handles invalid directory
- **WHEN** user attempts to select a directory that cannot be accessed
- **THEN** the system displays an error message
- **AND** the system does not proceed with scanning

### Requirement: Recursive Directory Scanning
The system SHALL scan the selected directory and all its subdirectories to find all files.

#### Scenario: System scans directory recursively
- **WHEN** user selects a directory and clicks "開始掃描"
- **THEN** the system recursively scans the root directory and all subdirectories
- **AND** the system collects all file paths found in the directory tree
- **AND** the system ignores system hidden files (`.DS_Store`, `Thumbs.db`, `.meta`)

#### Scenario: System shows scanning progress
- **WHEN** the system is scanning a directory
- **THEN** the system displays a loading indicator or progress bar
- **AND** the system shows the current number of files found
- **AND** the UI remains responsive during scanning (non-blocking)

#### Scenario: System completes scanning
- **WHEN** the system finishes scanning the directory
- **AND** all files have been collected
- **THEN** the system displays a completion message
- **AND** the system makes the file list available for comparison

### Requirement: File Index Creation
The system SHALL create an index mapping lowercase filenames to full file paths for efficient comparison.

#### Scenario: System builds file index
- **WHEN** the system completes directory scanning
- **THEN** the system creates a hash map/index where:
  - Key: lowercase filename (e.g., `"icon_sword.png"`)
  - Value: full file path (e.g., `"C:\Assets\Icons\Icon_Sword.png"`)
- **AND** if multiple files have the same lowercase filename, the system keeps the first one found
- **AND** the index is made available to the comparison module

#### Scenario: System handles large directories
- **WHEN** the directory contains 1000+ files
- **THEN** the system processes files efficiently without blocking the UI
- **AND** the system completes scanning within a reasonable time
- **AND** the system displays progress information to the user

### Requirement: File System Module UI Structure
The system SHALL provide a clear interface for directory selection and scanning.

#### Scenario: User workflow for file system module
- **WHEN** user is on the file system module step
- **THEN** user sees a "選擇目錄" button
- **AND** after selecting a directory, user sees the directory path displayed
- **AND** a "開始掃描" button becomes enabled
- **AND** when user clicks "開始掃描", the system starts scanning and shows progress
- **AND** when scanning completes, the system shows a summary and enables the next step

#### Scenario: System validates directory before scanning
- **WHEN** user attempts to start scanning without selecting a directory
- **THEN** the "開始掃描" button is disabled
- **AND** the system displays a message prompting user to select a directory first

#### Scenario: System provides file index output
- **WHEN** scanning completes successfully
- **THEN** the system makes the file index available to the comparison module
- **AND** the file index is a Map<string, string> where keys are lowercase filenames and values are full paths
