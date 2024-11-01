# Notes app

## Intended for use with Dungeons and Dragons or other TTRPG games

This app is intended to assist TTRPG to take notes from their character's perspective. It allows users to create notes about people, places, things, events, and more. It is currently under development and has limited functionality but the active and planned functionality is detailed below.

## Getting Started

These instructions give a brief overview of the technologies used to develop this project and the skills used to produce it.

## Installing

I use Node and Node Package Manager(NPM) for all my projects so, this installation guide goes over NPM methods for installation. If you use another package managment tool, please consult their documentation.

First, create a new directory and clone the repository into it:

```bash
git clone https://github.com/TheObstinatePanda/DnDNotes.git
```

You will need to install dependancies for the front end and the back end separately. Once in the root directory for the backend and once in the views directory for the front-end components. It is recommended to install the front-end first. To do this navigate your terminal  to the views directory and run:

```bash
npm install
```
This should install: 
- `@testing-library/jest-dom`
- `@testing-library/react`
- `@testing-library/user-event`
- `react`
- `react-dom`
- `react-scripts`
- `web-vitals`

Once finished, in a separate terminal run the install command again from the root folder. This should install:
- `dotenv`
- `express`
- `morgan`
- `pg`
- `debug`
- `jest`
- `supertest`

Note - `dotenv`, `express`, `morgan`, `pg`, and `debug` are currently separated in package.json from `jest` and `supertest`. The are in `"dependencies"` and `"devDependencies"` respectively.


## Setting up the database

You will then need to set up the database of your choosing - the schema was written with `postgres` in mind as the database. If you are using any other database management make sure the queries set in the `schema.sql` file will work for that database. For the sake of creating this database, I used [Postbird](https://github.com/Paxa/postbird).

Below are the steps to create the database using Postbird. If you need to install Postbird, check out the documentation on Codecademy = [https://www.codecademy.com/article/installing-and-using-postgresql-locally](https://www.codecademy.com/article/installing-and-using-postgresql-locally)

1. Once you are signed into Postbird, you should see a screen like below. Clicking the green circle with the `+` at the bottom right will open a prompt for creating a new database:

![Postbird homescreen with no Database Selected](./readme_imgs/Capture.JPG)

2. In the prompt, enter the table name (we used the name `notes` for this table) and select the type of Tablespace, we used public:

![New Table Prompt](./readme_imgs/Capture2.JPG)

3. This will add the database as named - make a note of the name you gave the table, it will be needed in a later step. Now, it is time to load the schema. You have a few options. 
   - You can copy paste the content from `sechma.sql` into the `Query` tab (make sure your database is showing in the `'Select Database'` drop down). 
   - You can import the `schema.sql` from the File menu (or use Ctrl + O), navigate to the file path `.(your file path).\notes_app\models\db\` and select the `schema.sql` file. Make sure the Database shows correctly, then click the `Import File` button to import the schema.
4. With the schema set up, come back into your code editor and make a `.env` file in the root folder of the directory
5. Inside `.env`you are going to set up the route which will be used for the app to communicate with the database. First, declare `DATABASE_URL` set to equal the `protocol://username:password@host:port/databasename`. You will also use this `.env` to set up the ports for the front and back-ends of the app. See the example below:
```
DB_APP_PORT=8000
REACT_APP_PORT=8080

DATABASE_URL=postgres://postgres:postgres@localhost:5432/notes
```
It is important that you define the `DB_APP_PORT` and `REACT_APP_PORT` to avoid conflicts with apps using other ports.

From there, you should move on to testing the back-end.

## Back-End Testing

We are currently set up to run basic tests with jest. Take some time to familiarize yourself with the tests contained in `app.test.js` before running tests. The tests we've employed are commented out so we can focus on one table at a time.

To run any of the tests, make sure the tests you intend to run are un-commented (Ctrl + / in VS code) before runing NPM TEST in your terminal. Review the results in the terminal.

-- Known Issue with tests: the way the connection to the database is set up does not allow Jest to close automatically. In order to close it  you will need to hit Ctrl + c on the key board type 'y' and hit enter and it will close.

## Deployment

This app is still in early development. As such it should not be judged as a finished app. It is not really ready for being published but I would consider this deployment as an early alpha deployment.

If all has gone smoothly you should be able to start the back-end then front-end for testing. You will need two terminals open. In one, navigate to the `views` directory, the other should stay in the root directory of the project.

Starting with the root directory terminal, run:

```bash
npm start
```

This should give you a message like this:

```bash
> notes_app@1.0.0 start
> node server.js
Server is listening on port 8000
Database connected successfully!
```

Once the back-end is running, switch to the terminal which has been routed to the `views` directory. There you will run `npm start` once more and should recieve a message like this:

```bash
You can now view notes-app in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.168:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

## Built With

This app was built with JavaScipt and SQL. This list of libraries and tools is not yet comprehensive but includes:

- Node
- React.js
- Express.js
- dotenv
- pg
- debug
- jest
- supertest
- Postgresql
- PostBird

## Usage

Feel free to use this app in this state to keep track of any notes you may like. As it is in an early state, please report any errors or issues you may find.

## Database Triggers

These triggers are implemented into the [Schema](./models/db/schema.sql). They may not all play nice during testing - this functionality is still being developed.

### Sending Title, Tag, and Note to the notes table

Whenever a new note is entered on a table, its `name` is sent to the `notes` table as the value for the `title` column. The table's `id` is concated with the first two letters of the origin table's sequential id then sent to the `notes` table setting the `tag` column value (e.g. if the post id is 266 in the `events` table, the `tag` value in `notes` would be `ev266`.). The note entered is sent to the `notes` table setting the `note` column value. This id done where the `note_id` of the entry to the origin table matches the `id` from the `notes` table.

### Triggering entries on `people` table

When a note is entered into the `event` table, if the `persons_involved` column includes a name that is not included in the `people` table, a new entry is created in the `people` table for that person referencing the `note_id` being assigned to the new entry for the `event` table.

When a note is created in the `fam` table, if one of the people listed in `members` on that post is not anywhere in the `people` table, create a new note in the `people` table for that member of the family referencing the `note_id` being assigned to the new entry for the `fam` table.

When a note is created in the `org` table, if one of the people listed in `members` on that post is not anywhere in the `people` table, create a new note in the `people` table for that member of the family referencing the `notes_id` being assigned to the new entry for the `org` table.

### Triggering entries on `fam` table

When a note is created on the `person` table, if no values in `fam.name` match the `family` provided in the note entry, create a new entry in the `fam` table, referencing the `note_id` being assigned to the new entry for the `people` table. Also, this new entry being sent to the fam table should increment the fam_id up one to the next highest value.

### Triggering entries on `thing` table

When a note is created in the `event` table, if an item being placed in the `loot` column is not in the `thing` table, create a new note in the `thing` table for that item referencing the `note_id` being assigned to the new entry for the `event` table.

### People table reqs

The `name` column is required. `is_npc` should default to TRUE if no value is given. Family is not required and should not be entered until the `fam` table is created due to triggers. same goes for relations and orgs. 

## Contributing

## Contributing

If you would like to contribute to this project, I welcome your contributions! Please feel free to reach out to me through GitHub for any questions, suggestions, or to discuss potential contributions. You can contact me via my GitHub profile: [The Obstinate Panda](https://github.com/TheObstinatePanda).

Thank you for your interest in contributing to this project!

## Versioning

notes-app v0.0.1

## Authors

- Jason Newman - *Initial Work* - [The Obstinate Panda](http://www.opwebdev.com)

## License

`MIT License`

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.