# Comparison Result Module Specification

## ADDED Requirements

### Requirement: Comparison Execution
The system SHALL execute file name comparison between the expected file names and the scanned file index.

#### Scenario: System triggers comparison when ready
- **WHEN** both file names list and file index are ready
- **THEN** the system can execute comparison (automatically or via button click)
- **AND** the system uses `compareFileNames()` function to perform batch comparison
- **AND** the system processes all expected file names against the file index

#### Scenario: System handles comparison errors
- **WHEN** an error occurs during comparison
- **THEN** the system displays an error message
- **AND** the system does not proceed with result display

### Requirement: Comparison Status Display
The system SHALL display comparison results with appropriate status indicators and colors.

#### Scenario: System displays MATCH status
- **WHEN** a file name exactly matches (case-sensitive) with a file in the directory
- **THEN** the system displays a green status indicator (✅)
- **AND** the system shows "OK" or the actual file path

#### Scenario: System displays NAMING_ERR status
- **WHEN** a file name matches but with different case
- **THEN** the system displays an orange status indicator (⚠️)
- **AND** the system shows "[大小寫錯誤] 實檔為: [actual_filename]"

#### Scenario: System displays FORMAT_ERR status
- **WHEN** a file name matches but with different file extension
- **THEN** the system displays a purple status indicator (⚠️)
- **AND** the system shows "[格式錯誤] 實檔為: [actual_filename]"

#### Scenario: System displays MISSING status
- **WHEN** a file name is not found in the directory
- **THEN** the system displays a red status indicator (❌)
- **AND** the system shows "[漏檔] 找不到檔案"

### Requirement: Result List Display
The system SHALL provide a list or table showing all comparison results.

#### Scenario: User views comparison results
- **WHEN** comparison is completed
- **THEN** the system displays a list of all comparison results
- **AND** each result shows: status icon, expected file name, and result message/path
- **AND** results are color-coded according to their status

#### Scenario: User copies file name or path
- **WHEN** user clicks the copy button on a result item
- **THEN** the system copies the file name or path to clipboard
- **AND** the system shows a confirmation message (toast or temporary indicator)

#### Scenario: User selects a result item
- **WHEN** user clicks on a result item in the list
- **THEN** if the file exists, the system displays image preview
- **AND** if the file is missing, the system shows "無預覽圖" placeholder

### Requirement: Image Preview
The system SHALL display image previews when users select result items with existing files.

#### Scenario: User previews existing image file
- **WHEN** user clicks on a result item with status MATCH, NAMING_ERR, or FORMAT_ERR
- **AND** the file is an image (PNG, JPG)
- **THEN** the system displays the image in a preview panel
- **AND** the system shows the image at an appropriate size (thumbnail or full size)

#### Scenario: User previews missing file
- **WHEN** user clicks on a result item with status MISSING
- **THEN** the system displays "無預覽圖" placeholder
- **AND** the system does not attempt to load an image

#### Scenario: System handles image load errors
- **WHEN** user clicks on a result item with an existing file path
- **AND** the image file is corrupted or format is not supported
- **THEN** the system displays an error message or placeholder
- **AND** the system does not crash

### Requirement: Result Summary
The system SHALL provide a summary of comparison results.

#### Scenario: System displays comparison summary
- **WHEN** comparison is completed
- **THEN** the system displays a summary showing:
  - Total number of files compared
  - Number of matches (MATCH status)
  - Number of naming errors (NAMING_ERR status)
  - Number of format errors (FORMAT_ERR status)
  - Number of missing files (MISSING status)

#### Scenario: System provides visual statistics
- **WHEN** comparison summary is displayed
- **THEN** the system may show visual indicators (progress bars, pie charts, etc.)
- **AND** the statistics help users quickly understand the comparison results

### Requirement: Comparison Result Module UI Structure
The system SHALL provide a clear interface for viewing and interacting with comparison results.

#### Scenario: User workflow for comparison module
- **WHEN** user has completed input and file system scanning
- **THEN** user sees a "開始比對" button (or comparison auto-triggers)
- **AND** when user clicks the button (or auto-trigger), the system executes comparison
- **AND** when comparison completes, the system displays results list, summary, and enables preview

#### Scenario: System validates prerequisites before comparison
- **WHEN** user attempts to start comparison without file names or file index
- **THEN** the "開始比對" button is disabled
- **AND** the system displays a message prompting user to complete previous steps
