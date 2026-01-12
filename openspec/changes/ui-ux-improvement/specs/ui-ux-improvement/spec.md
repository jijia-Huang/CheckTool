# UI/UX Improvement Specification

## ADDED Requirements

### Requirement: Enhanced Color Scheme
The system SHALL use a consistent and high-contrast color scheme to ensure readability.

#### Scenario: Visual consistency across modules
- **WHEN** user navigates through different modules (Input, File System, Comparison)
- **THEN** backgrounds and text colors remain consistent
- **AND** interactive elements (buttons, inputs) follow a unified design language

### Requirement: Input List Preview
The system SHALL provide a way for users to see the actual file names parsed from the input.

#### Scenario: Previewing parsed file names
- **WHEN** user provides input via Excel or Paste
- **THEN** the system displays a scrollable list of all unique file names extracted
- **AND** the list can be collapsed or expanded to save space

### Requirement: Result Filtering by Status
The system SHALL allow users to filter comparison results by clicking on status categories.

#### Scenario: Filtering results by "Missing" status
- **WHEN** user clicks on the "Missing" (漏檔) stat in the summary
- **THEN** the result list updates to show ONLY missing files
- **AND** the summary highlights the active filter

#### Scenario: Resetting filters
- **WHEN** a filter is active
- **THEN** user can click a "Show All" (顯示全部) button to see all results again

#### Scenario: Quick filter for matches
- **WHEN** user wants to verify all successful matches
- **THEN** they can click a "Show All Matches" (顯示全部匹配) button

### Requirement: Improved Readability
The system SHALL ensure that all text is clearly legible against its background.

#### Scenario: High contrast for error messages
- **WHEN** an error status is displayed (Naming/Format Error)
- **THEN** the error description and actual file path have sufficient contrast against the item background
- **AND** no text overlaps with background icons or borders
