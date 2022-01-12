# **Inventory Management**

## **Overview**
This is a simple inventory tracking web application for a logistics company where users can create, read, update, delete and export all the items in the inventory to a CSV file. Given that the main focus of this challenge is on backend code, I put the most level of effort into the server and made a quick effort to create an interactive UI to interact with the backend server. 

You can also view the web application live by following this  [link](https://ac-inventory-management.herokuapp.com/).

## **Initial Set Up**
For the purposes of this demo I have included the .env file in the repository that includes the authentication token for the mongodb database. You can use the authentication token provided or replace the token with your own when running the web application locally.

#### **To Run Locally**
From the **root directory** of the repository enter into the command line...\
To Install Client and Server : `yarn run first-install`\
To Install Server Only: `yarn install`\
To Run Server Locally: `yarn start`\
To Run Client Locally: `cd client && yarn run`\
To Run Tests: `yarn test`\
To Generate Data into Mongo: `node server\scripts\generateItems.js`

## **Features**
| Operation | Endpoint| 
|--|--|
| Create Item | POST /api/item/add |
| Retireve Items| GET /api/item/ |
| Update Item | PUT /api/item/update |
| Delete Item | DELETE /api/item/delete/{id} |
| Export Items to CSV | GET /api/item/csv | 

## **Approach**
I was constrained on time and chose to work with technologies that I had familiarity with in order to get a simple web application up and running. I created basic CRUD functionality and tried to design it so that it would be flexible for new features.

## **Testing Strategies**
- Testing data is generated into mongodb using a script before the tests begin.
- Testing data is removed from mongodb using a script after the tests finish. 
- Most endpoints were tested with both valid and invalid parameters.
- Tests are run sequentially and share the same database.

Run `yarn tests` in the command line from the root directory to run tests.

## **Backend Technology Choices**
| Name | Purpose | Reason |
|--|--|--|
| Javascript | Language | I had some previous experience working with Javascript.|
| Node.js | Runtime Environment | Performance, asynchronous request handling and the Javascript ecosystem has extensive tools, libraries and frameworks I could leverage. |
| MongoDB Atlas| Database | Stores data into an object like format making the data easier to use. No ETL process neccessary. |

### **NPM Packages**
| Name | Purpose | Reason |
|--|--|--|
| cors | Middleware | Configure and enable cross origin resource settings |
| express | Server | Well documented and its easy to have something quickly running |
| json2csv | CSV Generation | Provides simple sync and async methods of generating CSV files. |
| mongoose | Object Data Modeling | Model abstraction and schema validation  |
| pino | Logger | Format and create logs during development and deployment |
| chai | Testing | Verbose testing framework |
| mocha | Testing  | Assertion library |
| nodemon | Development | Automatic restarting of the node application after changes |

