#### Outlook-email-app

Convers below tasks
a.	When the app starts, the app loads the contents of each folder and displays the unread counts. 
b.	User can move around within the app to Inbox, Spam and Custom Folder
c.	User can select any mail and look into the contents
d.	User can see a brief preview before clicking on it.
e.	User can delete a message. In which case it should come in deleted items
f.	User can flag a message.
g.	User can filter on inbox on whether a message is flagged or not. 
h.	State, navigation should be saved between refreshes
i.	Back button should work (Need to do)


Steps:
1. Clone the repo
2. npm install
3. npm start


1. Created multiple components based on given requirements
2. Implemented with redux.3. created multiple actions and reducers
4. For large data, reducers logic may take time to load. Here I am using given JSON which is array of objects.
5. It may take time to find required object through array. If we convert to object of objects then based on key values we can take directly.
6. In this prototype,
a. First loading basic data to redux (by a action- in HomePage)
b. By using connect, throughout project store values distributed.
c. Wrote some of the components as class components and some of the components as functional component.
TODO HERE: We can implement Memoize concept here to reduce unwanted render of functional component.
d. Just written search bar component - no functionality working for that (Present implemented only given tasks)
e. If this project in typescrupt, we can reduce unwanted page crash.
(Tried in typescript, got problem at one type definiation. Lack of time implemented in ecmascript)
(Typescript project: https://github.com/jameelakowsar/outlook-app - Project not completed)
f. TODO: thought of implementing using hooks.