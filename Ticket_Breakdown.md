# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
### Ticket 1: Add Custom ID Field to Agents Table
As a Facility manager, I want to be able to save custom IDs for Agents I work with, so that I can use these IDs when generating Shifts reports.

#### Acceptance Criteria:
- The Agents table has a new column for custom IDs
- Facilities can add, edit and view custom IDs for each Agent
- The system validates that the custom IDs are unique within each Facility

**Estimated Time/Effort: 1-2 hours**

#### Implementation Details:
- Use a database migration script to add the new column to the Agents table
- Modify the Facility dashboard to include a form field for adding/editing custom IDs
- Update the Shifts report generation function to use the custom ID when available

### Ticket 2: Update Shifts Report to Use Custom IDs
As a Facility manager, I want to be able to use custom IDs for Agents in Shifts reports, so that I can easily identify Agents and match them with our internal records.

#### Acceptance Criteria:
- The Shifts report displays custom IDs when available
- Facilities can choose whether to use custom IDs or internal IDs in the report

**Estimated Time/Effort: 2-3 hours**

#### Implementation Details:
- Update the Shifts report generation function to use the custom ID when available
- Modify the Facility dashboard to include a configuration option for choosing which ID to use in the report
