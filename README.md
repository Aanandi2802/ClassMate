<!--- The following README.md sample file was adapted from https://gist.github.com/PurpleBooth/109311bb0361f32d87a2#file-readme-template-md by Gabriella Mosquera for academic use ---> 
<!--- You may delete any comments in this sample README.md file. If needing to use as a .txt file then simply delete all comments, edit as needed, and save as a README.txt file --->

# ClassMate

The background of the Classmate Application stems from the challenges and complexities faced in traditional educational settings. In many educational institutions, administrative tasks are often time-consuming and manual, leading to inefficiencies and delays. Communication between students and professors can be fragmented, with information scattered across multiple platforms or channels. Additionally, the lack of a centralized platform for collaboration and knowledge sharing can hinder the development of a vibrant learning community.

To address these issues, the Classmate Application was developed as a digital platform specifically designed for students, professors, and campus administrators. Its primary goal is to simplify administrative processes, improve communication channels, and foster a collaborative learning environment. By leveraging technology, the application aims to streamline various aspects of educational management and create a more efficient and effective system

* *Date Created*: 22 May 2023
* *Last Modification Date*: August 11, 2023
* *Netlify URL*: [Frontend](https://classmate-g7.netlify.app/) https://classmate-g7.netlify.app/
* *Render URL*: [Backend](https://classmate-backend.onrender.com) https://classmate-backend.onrender.com
* *Git URL*: [ClassMate Git](https://git.cs.dal.ca/harshils/classmate.git) https://git.cs.dal.ca/harshils/classmate.git

## Authors

* [Harshil Shah](hs@dal.ca) - *(Full Stack Developer)*
* [Raj Soni](raj.soni@dal.ca) - *(Full Stack Developer)*
* [Viral Siddhapura](vs@dal.ca) - *(Full Stack Developer)*
* [Yatrik Pravinbhai Amrutiya](yt707481@dal.ca) - *(Full Stack Developer)*
* [Aanandi Pankhania](an936894@dal.ca) - *(Full Stack Developer)*

## Deployment

### Frontend
- Through CI/CD pipeline
- Commit on Main Branch in Frontend folder
- Frontend automatically get tested and deployed on netlify

### Backend
- When committed on gitlab, through mirroring auto  

## Built With

<!--- Provide a list of the frameworks used to build this application, your list should include the name of the framework used, the url where the framework is available for download and what the framework was used for, see the example below --->

* [React](https://react.dev/) - For frontend
* [Type Script](https://www.typescriptlang.org/) - For frontend - strictly typed language
* [Chakra UI](https://chakra-ui.com/getting-started) - Chakra UI - Front End framework (Responsive)

## Sources Used

<!-- If in completing your lab / assignment / project you used any interpretation of someone else's code, then provide a list of where the code was implement, how it was implemented, why it was implemented, and how it was modified. See the sections below for more details. -->

### sucessMailSentModal.tsx

*Lines 11 - 23

```tsx
  <Modal isOpen={isOpen} onClose={onClose} size="sm">
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Your Message has been Mailed to us Successfully!</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <p>Thank you for contacting us. We will get back to you as soon as we can.</p>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Close</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>

```

The code above was created by adapting the code in [Chakra UI Modal](https://chakra-ui.com/docs/components/modal/usage) as shown below: 

```tsx
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Modal Title</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Lorem count={2} />
      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onClose}>
          Close
        </Button>
        <Button variant='ghost'>Secondary Action</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>

```

- <!---How---> The code in [Chakra UI Modal](https://chakra-ui.com/docs/components/modal/usage) was present in official documentation of Chakra UI.
- <!---Why---> [Chakra UI Modal](https://chakra-ui.com/docs/components/modal/usage)'s Code was used because once user has clicked on button - a small dialog box will be shown to the user stating success message of contancting us.
- <!---How---> [Chakra UI Modal](https://chakra-ui.com/docs/components/modal/usage)'s Code was modified by maitaining isOpen and inClose conditions and setting up different message to the user.

### createQuiz.tsx

*Lines 11 - 23

```tsx
    <Modal isOpen={isOpenQuizModel} onClose={handleCancel} size="xl" scrollBehavior="inside">
      {isLoading && <Loader />}
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Quiz</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            ...
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" onClick={handleCancel}>
            Cancel
          </Button>
          <Button colorScheme="teal" onClick={handleSave} ml={2}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>

```

The code above was created by adapting the code in Chakra UI Modal as shown below:

```tsx
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Modal Title</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Lorem count={2} />
      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onClose}>
          Close
        </Button>
        <Button variant='ghost'>Secondary Action</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>

```

- <!---How---> The code in [Chakra UI Modal](https://chakra-ui.com/docs/components/modal/usage) was present in official documentation of Chakra UI.
- <!---Why---> [Chakra UI Modal](https://chakra-ui.com/docs/components/modal/usage)'s Code was used because once user has clicked on button - a small dialog box will be shown to the user stating success message of contancting us
- <!---How---> [Chakra UI Modal](https://chakra-ui.com/docs/components/modal/usage)'s Code was modified by maitaining isOpen and inClose conditions and setting up different message to the user.

### quiz.service.ts

*Lines 11 - 23

```tsx
    const projection = {
        "_id": 1,
        "startDate": 1,
        "dueDate": 1,
        "title": 1,
        "description": 1,
      };
      const returned_quizzes = await db.collection(quizCollectionName).find().project(projection).toArray();
      client.close();

```

The code above was created by adapting the code in Chakra UI Modal as shown below:

```tsx
    const options = {
      // sort returned documents in ascending order by title (A->Z)
      sort: { title: 1 },
      // Include only the `title` and `imdb` fields in each returned document
      projection: { _id: 0, title: 1, imdb: 1 },
    };
    const cursor = movies.find(query, options);

```

- he code in [MongoDB](https://www.mongodb.com/docs/drivers/node/current/usage-examples/find/) was implemented by authors in MongoDB official documents.
- [MongoDB](https://www.mongodb.com/docs/drivers/node/current/usage-examples/find/)'s Code was used because I wanted specific result from the document.

### CreateAssignmentModal.tsx

*Lines 11 - 23

```tsx
    function callCreateAssignmentAPI(assignment : Assignment): Promise<{ assignment: Assignment }> {
    const backendURL = envVariables.backendURL;

    return fetch(backendURL + '/createAssignment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(assignment),
    })
        .then((response) => response.json())
        .then((data) => {
            // Handle the response data
            console.log(data);
            return data;
        })
        .catch((error) => {
            // Handle any errors
            console.error(error);
            return {};
        });
    }

```

The code above was created by adapting the code in Chakra UI Modal as shown below:

```tsx
      const fetchUserData = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUsers(data)
      })
  }

```
- <!---How---> The code in [CreateAssignmentModal Page](https://www.codingthesmartway.com/how-to-fetch-api-data-with-react/) was present in the mentioned link author's documentation.
- <!---Why---> [CreateAssignmentModal Page](https://www.codingthesmartway.com/how-to-fetch-api-data-with-react/)'s Code was used because once user has clicked on create assignment button - an assignment details should be added to the database.
- <!---How---> [CreateAssignmentModal Page](https://www.codingthesmartway.com/how-to-fetch-api-data-with-react/)'s Code was modified by maitaining try and catch block as well as handling JSON data output properly.

### ProfAssignmentService.tsx

*Lines 88 - 110

```tsx
      async createAssignment(assignment: assignment) {
        try {
            // Connect to MongoDB
            const client = await MongoClient.connect(mongoURI, {
                connectTimeoutMS: 5000,
                socketTimeoutMS: 30000
            });

            const db: Db = client.db(dbName);

            // Check user credentials in the MongoDB collection
            console.log(assignment);

            const new_assignment = await db.collection(profAssignmentsCollectionName).insertOne(assignment);

            console.log(assignment);
            await client.close();
            return new_assignment;
        } catch (error) {
            console.log(error);
        }
    }

```

The code above was created by adapting the code in [Professor Assignment Page](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertOne/) Page as shown below:

```tsx
      try {
        db.products.insertOne(
          { "item": "envelopes", "qty": 100, type: "Self-Sealing" },
          { writeConcern: { w : "majority", wtimeout : 100 } }
      );
    } catch (e) {
        print (e);
    }

```

- <!---How---> The code in [ProfAssignmentService Page](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertOne/) was implemented by authors in MongoDB Documentation.
- <!---Why---> [ProfAssignmentService Page](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertOne/)'s Code was used because we want to show that how in the backend assignment is added.
- <!---How---> [ProfAssignmentService Page](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertOne/)'s Code was modified by inserting data into MongoDB - by running a async call with respect to MongoDB Client opening and closing a call.

## Acknowledgments

* [1] “Regex to not match leading and trailing white spaces for email address in javascript,” Stack Overflow. [Online]. Available: https://stackoverflow.com/questions/65631340/regex-to-not-match-leading-and-trailing-white-spaces-for-email-address-in-javasc. [Accessed: 20-Jun-2023].

* [2] “Accordion,” Chakra UI: Simple, Modular and Accessible UI Components for your React Applications. [Online]. Available: https://chakra-ui.com/docs/components/accordion/usage. [Accessed: 20-Jun-2023].

* [3] Harshil Shah - “Assignment - 1” GitLab. [Online]. Available: https://git.cs.dal.ca/harshils/5709-assignments-b00919966-harshil/-/tree/main/Assignment%201. [Accessed: 20-Jun-2023].

* [4] “Card,” Chakra UI: Simple, Modular and Accessible UI Components for your React Applications. [Online]. Available: https://chakra-ui.com/docs/components/card/usage. [Accessed: 20-Jun-2023].

* [5] “Modal,” Chakra UI: Simple, Modular and Accessible UI Components for your React Applications. [Online]. Available: https://chakra-ui.com/docs/components/modal/usage. [Accessed: 20-Jun-2023].

* [6] E. E. Elrom, “Integrate Routing in Typescript project with React-Router v5.2.0. Including Redux toolkit integration. 2020 ReactJS example tutorial,” Master React, 11-Aug-2020. [Online]. Available: https://medium.com/react-courses/how-to-integrate-routing-in-typescript-project-with-react-router-v5-2-0-a6b0ab160a1b. [Accessed: 20-Jun-2023].
