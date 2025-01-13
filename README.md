This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

## Run the development

To instal local dependencies run

===> npm install

once this is done please run the project using
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
## local port 
Open [http://localhost:3000] with your browser to see the result.

## hosted server link 
[https://task-managemant-system.vercel.app/]

## Project Architecture

The frameworks and technologies I used here are Next.js, Next.js API, and MongoDB to fetch, store, and update task details. During the initial page load, I fetched all the task details using an API call. After fetching the details, I segregated them based on their status. The status can be of three types:

1. "todo": Tasks that are yet to be started.
2. "inprogress": Tasks that are currently in development.
3. "done": Tasks that have been completed.
Based on these statuses, the tasks are separated and displayed on the UI.

If the user needs to change a task's status, they can drag the task from one status column and drop it into another. To create a new task, we provide a CTA button. Clicking this button opens a popup with fields for the task's details: title, description, status, startDate, and endDate. Here, only title and description are mandatory, while the other fields are optional. This schema is implemented in the utils/modals after connecting to MongoDB. Once the user fills in the details and submits the form, a new task is created. For this, a Next.js API is called with the appropriate payload, which connects to MongoDB to add an entry to the database. The UI automatically updates the new task according to its respective status.

If the user wants to view task details, they can click on a task to open a popup showing the details in read-only mode. If the user wishes to edit the task details, an edit icon is displayed in the view mode of the popup. Clicking the edit icon switches the form to editable mode, allowing the user to modify all fields. Upon submission, a Next.js API call is made to locate the entry by its unique ID and update the modified values.

Additionally, I implemented a search feature using a basic JavaScript filter. When a user searches for a word in the task titles, only the tasks matching the search term are displayed in their respective status columns. If no tasks match the search, the column appears empty.
