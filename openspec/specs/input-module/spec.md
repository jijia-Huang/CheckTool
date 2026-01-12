# Input Module Specification

## Requirements

### Requirement: Excel File Import
The system SHALL allow users to import file name lists from Excel files (`.xlsx`, `.xls`) and CSV files.

#### Scenario: User imports Excel file via drag and drop
- **WHEN** user drags an Excel file onto the import area
- **THEN** the system reads the file and displays available column headers
- **AND** the system automatically selects a column if it matches smart mapping keywords (`Name`, `File`, `Asset`, `檔名`)

#### Scenario: User imports Excel file via file picker
- **WHEN** user clicks the "選擇檔案" button
- **THEN** a file picker dialog opens
- **AND** when user selects a valid Excel/CSV file, the system reads and parses it
- **AND** the system displays available column headers in a dropdown

#### Scenario: User selects column for file names
- **WHEN** user sees the column headers dropdown
- **THEN** user can select which column contains the file names
- **AND** the system extracts all file names from the selected column
- **AND** the system displays a preview showing the number of file names extracted

#### Scenario: System handles invalid file format
- **WHEN** user attempts to import an unsupported file format
- **THEN** the system displays an error message
- **AND** the system does not proceed with parsing

### Requirement: Text Paste Import
The system SHALL allow users to paste file name lists directly into a text area.

#### Scenario: User pastes file names with newline delimiters
- **WHEN** user pastes text with file names separated by newlines
- **THEN** the system automatically parses the text
- **AND** the system extracts individual file names
- **AND** the system displays a preview showing "已解析出 X 個檔案名稱"

#### Scenario: User pastes file names with comma delimiters
- **WHEN** user pastes text with file names separated by commas
- **THEN** the system recognizes commas as delimiters
- **AND** the system extracts file names correctly

#### Scenario: User enables space delimiter option
- **WHEN** user checks the "以空格作為分隔符號" checkbox
- **THEN** the system treats spaces as delimiters in addition to newlines, commas, semicolons, and tabs
- **AND** the system re-parses the text with the new delimiter setting

#### Scenario: System cleans parsed file names
- **WHEN** the system parses pasted text
- **THEN** it automatically trims leading and trailing whitespace from each file name
- **AND** it removes surrounding quotes (`'` or `"`) from file names
- **AND** it filters out empty strings

#### Scenario: System provides real-time preview
- **WHEN** user types or pastes text into the text area
- **THEN** the system continuously parses and updates the preview count (with 300ms debounce)
- **AND** the preview shows "已解析出 X 個檔案名稱" where X is the current count

### Requirement: Input Module UI Structure
The system SHALL provide a tabbed interface allowing users to switch between Excel import and text paste modes.

#### Scenario: User switches between input modes
- **WHEN** user is on the Excel import tab
- **THEN** user can click the "文字貼上" tab to switch to paste mode
- **AND** when user switches tabs, the previous input is preserved but not active
- **AND** only the active tab's input method is used for file name extraction

#### Scenario: System validates input before proceeding
- **WHEN** user attempts to proceed without providing any file names
- **THEN** the system displays a validation error
- **AND** the system prevents proceeding to the next step

#### Scenario: System provides file name list output
- **WHEN** user successfully imports or pastes file names
- **THEN** the system makes the file name list available to the next module
- **AND** the file name list is an array of strings, each representing one expected file name
