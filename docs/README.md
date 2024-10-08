# Introduction - how to read this doc

- This exercise is designed to test basic skills in 3 core areas:

1. [SQL databases](#1-database)
2. [React SPA development](#2-react-spa)
3. [Backend API development on Node](#3-backend-api-development-on-node)

- for each section you'll find that it has **problem**, **task**, **solution** sections:

- **problem** :

  - explains the core problem we're trying to solve, and maybe some context

- **task** :

  - gives a list of tasks that MUST be accomplished by you
  - also tells you what are the must-have features in your solution
  - tasks marked with [<ins>**extra**</ins>] are not necessary, consider them as bonus problems

- **techstack instructions**:
  - subsection under task, this tells you what techstack you're expected to use

> [!IMPORTANT]
> please stick to the techstack mentioned; it's a very basic project and does not require an arsenal of libraries, so do not use any other libraries, frameworks, etc.. unless explicitly mentioned

- however you can use simple libraries that are not mentioned, granted they don't significantly alter the task or do the work for you and that you document the decision-making properly as explained below

- **solution** :

  - once you're done solving the exercise or a part of it, you **MUST** document your solution in this section under the appropriate part of the exercise you solved, so the for the database problem you should edit the solution section under [database](#1-database) only

  - the idea is to document mainly 2 things:

    - key problem solving points: that provide a high level overview of how you solved that problem
      - eg: for the DB problem, what tables you created / altered, how does that accomplish the tasks (if it's not obvious)
    - instructions: you must include all instructions (including code) that will allow us to run and review your solution

## 0. Setup

- fork this repository, you'll be committing all your changes to the forked repo
- clone the fork locally to develop

```bash
git clone https://github.com/<username>/full_stack_assessment_skeleton.git
```

> [!NOTE]
> throughout the readme, we'll be working from within the root directory (full_stack_assessment_skeleton/) of the repo, unless otherwise stated

- use docker to spin up **MySql** db container
- this db instance has some data that will be needed for the exercise, included in it

```bash
docker-compose -f docker-compose.initial.yml up --build -d
```

- the containerized db listens on `localhost:3306`
- the docker compose file has the credentials you will need

> [!WARNING]
> do not change credentials, db name and any configuration, this just adds unnecessary complexity

> [!TIP] > [mysql docker image docs](https://hub.docker.com/_/mysql)

![mysql creds](images/mysql_creds.png)

- the database is `home_db`, user `db_user` has full read-write access to it
- `home_db.user_home` table has some data populated in it

## 1. Database

<details>
<summary>preview of data in `home_db.user_home` table</summary>

| **username** | **email**          | **street_address**       | **state**     | **zip** | **sqft** | **beds** | **baths** | **list_price** |
| ------------ | ------------------ | ------------------------ | ------------- | ------- | -------- | -------- | --------- | -------------- |
| user7        | user7@example.org  | 72242 Jacobson Square    | Arizona       | 05378   | 2945.89  | 1        | 3         | 791204.0       |
| user7        | user7@example.org  | 75246 Cumberland Street  | Arizona       | 08229   | 2278.71  | 2        | 1         | 182092.0       |
| user10       | user10@example.org | 72242 Jacobson Square    | Arizona       | 05378   | 2945.89  | 1        | 3         | 791204.0       |
| user3        | user3@example.org  | 811 Walker-Bogan Terrace | Rhode Island  | 19219   | 3648.42  | 1        | 2         | 964995.0       |
| user3        | user3@example.org  | 947 Allen Motorway       | Massachusetts | 65353   | 1375.37  | 3        | 3         | 578532.0       |
| user10       | user10@example.org | 7976 W Division Street   | New Mexico    | 99460   | 2510.57  | 1        | 3         | 842529.0       |
| user6        | user6@example.org  | 4679 Horacio Plains      | Texas         | 62631   | 1679.69  | 6        | 3         | 303195.0       |
| user2        | user2@example.org  | 78089 Prospect Avenue    | Nebraska      | 95406   | 4718.9   | 1        | 2         | 358752.0       |
| user2        | user2@example.org  | 5788 Mallie Gateway      | Nebraska      | 37697   | 2236.85  | 3        | 2         | 632165.0       |
| user6        | user6@example.org  | 975 Marty Ridges         | New Jersey    | 28721   | 1310.08  | 6        | 3         | 467656.0       |

</details>

### problem

- as you can see we have data relating users and homes

  - each user is identified by its username, i.e., if two rows have the same username, they're talking about the same user
  - similarly each home is identified by its street_address

- this data relates users on our website and which homes they are interested in

- upon basic inspection you can observe the following:

  - one user may be related to multiple homes
  - also the same home may be related to multiple users

- we gave this data to an [**intern**](https://www.urbandictionary.com/define.php?term=intern), who just threw it into the database, and now it's come to you!

- the intern did not know about relational databases and data normalization, but we expect you do

### task

- refactor the data into a _reasonably_ normalized set of tables
- ensure that the relationship between tables is represented properly using foreign keys -> primary keys references (as they are usually in relational DBs)

  - you'll need to create _atleast_ 2 tables:

    - `user` : to store `user` attributes: `username`, `email`
    - `home` : to store `home` attributes: all attributes in `user_home` table except for the above `user` attributes

  - you _may_ need to create more tables, alter existing tables to solve the exercise
  - please try to use the names "user" and "home" for "user" and "home" tables, so it's easier for us to understand

- create a **SQL script** `99_final_db_dump.sql` containing all the changes made by you to the DB
- put it inside the `sql` directory under the root directory

- make sure that:

  - the SQL script you have created, takes the DB from its initial state (as it was when you started the docker container for the first time) to the "solved" state, when it's executed

- **techstack instructions**

  - you can use whatever GUI / CLI you want, to interact with database
  - but all the changes you make should be using SQL / MySQL dialect of SQL and should be in the SQL script that you provide
  - so you must **NOT** use Entity first development, where you write your ORM entities and generate SQL migration scripts
  - instead you directly write SQL script, that makes all the changes you want to the DB

### solution

- As requested, the SQL script containing all the changes is located in the `./sql` directory in the file `99_final_db_dump.sql`.

- Before we solve the problem, lets go over how to solve it. We have been provided all the data in `user_home` table. Going over it, we can see that the user data and house data is repeating. This is not optimal, so we will seperate the houses and the users into different tables, and then create a third table to keep track of the user-home relations.

- First we have to refactor and normalize the data into different resonable tables. For that, lets go ahead and create the various tables.

  - Create `user` and `home` tables to keep track of the list of users and homes.

    ```sql
    CREATE TABLE user (
        id int(11) NOT NULL AUTO_INCREMENT,
        username varchar(100) NOT NULL,
        email varchar(100) NOT NULL,
        PRIMARY KEY (id)
    )

    CREATE TABLE home (
        id int(11) NOT NULL AUTO_INCREMENT,
        street_address varchar(255) NOT NULL,
        state varchar(50) DEFAULT NULL,
        zip varchar(10) DEFAULT NULL,
        sqft float DEFAULT NULL,
        beds int DEFAULT NULL,
        baths int DEFAULT NULL,
        list_price float DEFAULT NULL,
        PRIMARY KEY (id)
    )
    ```

  - Create a table `user_home_relation` to keep track of which users are related to what houses.

    ```sql
    CREATE TABLE user_home_relation (
        id int(11) NOT NULL AUTO_INCREMENT,
        user_id int(11) NOT NULL,
        home_id int(11) NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES user (id),
        FOREIGN KEY (home_id) REFERENCES home (id)
    )
    ```

- Now that the tables have been created, let's move the data from `user_home` table to these different tables. We will use the `SELECT DISTINCT` statement in MySQL as it only returns distinct values.

  - Move the different users to the `user` table.

    ```sql
    INSERT INTO user (username, email)
    SELECT DISTINCT username, email FROM user_home;
    ```

  - Move the different homes to the `home` table.

    ```sql
    INSERT INTO home (street_address, state, zip, sqft, beds, baths, list_price)
    SELECT DISTINCT street_address, state, zip, sqft, beds, baths, list_price FROM user_home;
    ```

  - Now lets move all the unique relations to the `user_home_relation` table. For this, we will join the `user` and `home` tables to the `user_home` table to extract the unique `user_id` and `home_id` relations.

    ```sql
    INSERT INTO user_home_relation (user_id, home_id)
    SELECT user.id, home.id FROM user_home
    JOIN user ON user_home.username = user.username
    JOIN home ON user_home.street_address = home.street_address AND user_home.state = home.state AND user_home.zip = home.zip;
    ```

- (Optional, Recommended) Drop the `user_home` table.

  - Now that all the data has been normalized, we can get rid of the original table.

    ```sql
    DROP TABLE IF EXISTS user_home;
    ```

## 2. React SPA

- this is a simple SPA, the idea is to show case your state management and some frontend-dev skills

### the problem

- we want to see:
  - for each user what homes they are interested in
  - for each home we also want a way to see what different users are interested in it
- also we want to change / update the users that are associated with a given home

### task

- **homes for user page**

  - create a page to show all homes related to a particular user
  - there should be a single-select dropdown at top, to pick the user for whom we want to view the related homes
  - and below that the related homes should populate in cards

  - [watch the video demo for reference](https://drive.google.com/file/d/1D9Jzzuw38cgL-PVYF8YDE1FEBHcjBpig/view?usp=sharing)

  - make sure that:
    - page is responsive as shown
    - we don't expect any fancy UI, barebones is just fine, but it should be functional

- **edit user functionality**

  - each home card has an `Edit User` button attached, this should show a modal on click, this is the `Edit User Modal`:

  - initially all users related to the home should be checked
  - we can edit the related users by toggling the checkboxes
  - if we click `Cancel` then modal should just close without any effect
  - however if we edit the users, and then click `Save`:

    - the users related to that home must be updated in the DB
    - the modal should close and the changes should reflect on the `homes for user page`
    - so for eg: if we had picked `user1` on `homes for user page` then clicked on `Edit User` for any home there and **unchecked** `user1` in the modal and saved, then upon closing of the modal, the home we clicked on previously, should NO longer be visible for `user1`, but should be visible for any other user for whom the checkbox was checked on `Save`

  ![edit user modal](images/edit_user_modal.png)

  - make sure:

    - UI is not buggy
    - checkboxes are controlled
    - there is atleast 1 user related to a home

      - if the modal has no users selected, it should show an error and disable `Save` button

- **handle data-fetching properly**

  - to create the above components / pages, you'll fetch data from [backend APIs](#3-backend-api-development-on-node)

  - make sure you're handling data-fetching properly by _preferrably_ using a data-fetching-library:

    - show a loading spinner/skeleton while an API request is progress
    - gracefully handle errors if the API calls error out
    - [<ins>**extra**</ins>] cache API responses, to improve performance

  - as discussed below it's preferred to use a data fetching library to handle these problems properly

- **techstack instructions**

  - JS frameworks:

    - [Vite (recommended)](https://vitejs.dev/guide/) or [Create React App](https://github.com/facebook/create-react-app)
    - use no other framework, libraries

  - CSS:

    - vanilla CSS or [Tailwind CSS](https://tailwindcss.com/docs/installation)
    - use no other css frameworks, component libs, etc..

  - State Management

    - use [Redux Toolkit](https://redux-toolkit.js.org/) where appropriate for state-management

  - Data Fetching

    - **preferred approach** is to use one of the following data-fetching libraries:

      - [RTK Query](https://redux-toolkit.js.org/tutorials/rtk-query)
      - [TanStack Query](https://tanstack.com/query/latest)

    - otherwise, you can use some other data-fetching library, just make sure to document that in README
    - as a last resort, `useEffect()` maybe used, but make sure you're handling data-fetching properly (loading, errors, etc..)

    - for skeletons / spinners - you can use a simple library:
      - eg: [react-loading-skeleton](https://www.npmjs.com/package/react-loading-skeleton)
      - remember to keep it simple and readable

> [!IMPORTANT]
> even if you can do state-management without Redux, you still must use Redux for the solution, (remember the idea is to showcase the skills)

### solution

- Notes:

  - The tech stack used is Vite, TailwindCSS, Redux Toolkit and RTK Query.

- To run the solution, clone the `./frontend` directory and follow the steps:

  - Go to `homellc-frontend` directory

    ```bash
    cd homellc_frontend
    ```

  - Install dependencies

    ```bash
    npm install
    ```

  - Run the project

    ```bash
    npm run dev
    ```

- The project is mostly divided into 4 components. Additionally, components have Slices from Redux Toolkit to handle state. Basic api fetch error handling is also implemented.

- Here is the overview of the main problem solving points:

  - **Homes for User Page:**

    - The page displays homes based on what homes are stored in the state.
    - Uses a user dropdown and pages to query the api.
    - Skeletons are visisble whenever the homes are empty in the state.

  - **Edit User Modal:**
    - Each home card have an `Edit User` button which opens the modal.
    - The modal has controlled checboxes (state is stored in the `editUser` Slice). The checkboxes show what users are currently assigned to a house and you can edit and save them.
    - When none of the checkboxes are checked, an error is shown and the `Save` button is disabled.
    - `Cancel` button discards any changes.

- Instructions:

  - First, set up a Vite project and then install and configure Radix Toolkit, TailwindCSS and react-loading-skeleton.

    - Create a Vite project and install the dependencies

      ```bash
      npm create vite@latest homellc-frontend -- --template react
      cd homellc-frontend
      npm install -D @reduxjs/toolkit tailwindcss postcss autoprefixer react-loading-skeleton react-redux
      ```

    - Configure TailwindCSS

      - Initialize TailwindCss

        ```bash
        npx tailwindcss init -p
        ```

      - Add `content` to `tailwind.config.js` file as descirbed in the Tailwind docs.

        ```js
        export default {
          content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
          theme: {
            extend: {},
          },
          plugins: [],
        };
        ```

      - Add the `@tailwind` directives for each of Tailwind’s layers to the start of the `./src/index.css` file.

        ```css
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
        ```

      - I have also gone ahead and added some custom colors that I used for the project in `tailwind.config.js` under `theme.extend.colors`.

        ```js
        export default {
          content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
          theme: {
            extend: {
              colors: {
                primary: "#BA4F7D",
                primaryMuted: "#DAC8D0",
                secondary: "#55444B",
                secondaryMuted: "#E8E3E5",
              },
            },
          },
          plugins: [require("@tailwindcss/forms")],
        };
        ```

    - Create and configure a Redux Store and RTK Query

      - Create a `store.jsx` file in `./src/app` directory

        ```jsx
        export const store = configureStore({
          reducer: {},
        });
        ```

      - Create an `api` directory in `./src/features` and add `apiSlice.jsx` to it. Here we will configure the endpoints for our api and add tags to manage caching.

        ```jsx
        export const homellcApi = createApi({
          reducerPath: "homellcApi",
          baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:3000" }),
          keepUnusedDataFor: 300,
          tagTypes: ["User", "Home"],
          endpoints: (builder) => ({
            findAllUsers: builder.query({
              query: () => "/user/find-all",
              providesTags: ["User"],
            }),
            findHomesByUser: builder.query({
              query: ({ userId, page = 1, pageSize = 50 }) =>
                `/home/find-by-user/${userId}?page=${page}&pageSize=${pageSize}`,
              providesTags: ["Home"],
            }),
            findUsersByHome: builder.query({
              query: (homeId) => `/user/find-by-home/${homeId}`,
            }),
            updateHomeUsers: builder.mutation({
              query: ({ homeId, userIds }) => ({
                url: `/home/update-users`,
                method: "PUT",
                body: { homeId, userIds },
              }),
              invalidatesTags: ["Home"],
            }),
          }),
        });

        export const {
          useFindAllUsersQuery,
          useFindUsersByHomeQuery,
          useLazyFindHomesByUserQuery,
          useLazyFindUsersByHomeQuery,
          useUpdateHomeUsersMutation,
        } = homellcApi;
        ```

      - Now add the `homellcApi` reducer to the store in `./src/app/store.jsx`.
        ```jsx
        export const store = configureStore({
          reducer: {
            [homellcApi.reducerPath]: homellcApi.reducer,
          },
          middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(homellcApi.middleware),
        });
        ```

    - Now that Radix and RTK Query our set up, lets create some Slices that will provide state for our components. The reducers in the slices will give us control over how we manage the data in the state.

      - Create `editUserSlice.jsx` in `./src/features/editUserForHome` directory.

        ```jsx
        const initialState = {
          checkedUsers: [],
          selectedHomeToEdit: null,
        };

        export const editUsersSlice = createSlice({
          name: "editUsers",
          initialState,
          reducers: {
            checkUsers: (state, action) => {
              state.checkedUsers = action.payload;
            },
            checkUser: (state, action) => {
              state.checkedUsers.push(action.payload);
            },
            uncheckUser: (state, action) => {
              state.checkedUsers = state.checkedUsers.filter(
                (user) => user.id !== action.payload.id
              );
            },
            clearCheckedUsers: (state) => {
              state.checkedUsers = [];
            },
            selectHomeToEdit: (state, action) => {
              state.selectedHome = action.payload;
            },
          },
        });

        export const {
          checkUsers,
          checkUser,
          selectHomeToEdit,
          uncheckUser,
          clearCheckedUsers,
        } = editUsersSlice.actions;
        export default editUsersSlice.reducer;
        ```

      - Create `homesByUserSlice.jsx` in `./src/features/homesByUser` directory.

        ```jsx
        const initialState = {
          homesByUser: [],
          currentPage: 1,
          totalPages: 1,
          pageSize: 50,
        };

        const homesByUserSlice = createSlice({
          name: "homesByUser",
          initialState,
          reducers: {
            setHomesByUser: (state, action) => {
              state.homesByUser = action.payload;
            },
            clearHomesByUser: (state) => {
              state.homesByUser = [];
            },
            setCurrentPage: (state, action) => {
              state.currentPage = action.payload;
            },
            setTotalPages: (state, action) => {
              state.totalPages = action.payload;
            },
            setPageSize: (state, action) => {
              state.pageSize = action.payload;
            },
          },
        });

        export const {
          setHomesByUser,
          clearHomesByUser,
          setCurrentPage,
          setTotalPages,
          setPageSize,
        } = homesByUserSlice.actions;
        export default homesByUserSlice.reducer;
        ```

      - Create `selectUser.jsx` Slice in `./src/features/userDropdown` directory.

        ```jsx
        const initialState = {
          selectedUser: null,
        };

        export const userDropdownSlice = createSlice({
          name: "userDropdown",
          initialState,
          reducers: {
            selectUser: (state, action) => {
              state.selectedUser = action.payload;
            },
          },
        });

        export const { selectUser } = userDropdownSlice.actions;
        export default userDropdownSlice.reducer;
        ```

      - Now we can import and register the reducers in the store ( _/src/app/store.jsx_ ) .

        ```jsx
        import editUsers from "../features/editUserForHome/editUsersSlice";
        import userDropdown from "../features/userDropdown/selectUser";
        import homesByUser from "../features/homesByUser/homesByUserSlice";

        export const store = configureStore({
          reducer: {
            [homellcApi.reducerPath]: homellcApi.reducer,
            editUsers,
            userDropdown,
            homesByUser,
          },
          middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(homellcApi.middleware),
        });
        ```

    - Now let's go ahead and build out our components. The entire app is built upon 4 components: EditUserModal, HomeCard, UserDropdown and Paginatiton. The names of the components should explain their functionality.

      - **Edit User Modal Component:**

        - Create the `EditUserModal` function in the `edit-user-modal.jsx` file in `./src/components` directory.

        - Here first, we will create a state for checking if we are saving the users or not. This will help us control the colors and disable elements to make the app feel responsive.

          ```jsx
          const [saveLoading, setSaveLoading] = useState(false);
          ```

        - Now we will import the various functions from apiSlice to call the endpoints, functions from our `editUserSlice.jsx` file to control our checkboxes and call `useSelector` to consume the various values we will use in the component.

          ```jsx
          const [updateUsersForHome] = useUpdateHomeUsersMutation();
          const [getHomesByUser] = useLazyFindHomesByUserQuery();
          const dispatch = useDispatch();
          const editUsers = useSelector((state) => state.editUsers);
          const selectedHome = editUsers.selectedHome;
          const checkedUsers = editUsers.checkedUsers;
          const selectedUser = useSelector(
            (state) => state.userDropdown.selectedUser
          );
          const {
            data: allUsers,
            isLoading: allUsersLoading,
            error: allUsersError,
          } = useFindAllUsersQuery();
          ```

        - Create the various handlers for the buttons in the component.

          ```jsx
          const handleCheckboxChange = (userId) => {
            if (checkedUsers.map((u) => u.id).includes(userId)) {
              dispatch(uncheckUser({ id: userId }));
            } else {
              dispatch(checkUser({ id: userId }));
            }
          };

          const handleCancel = () => {
            dispatch(clearCheckedUsers());
            dispatch(selectHomeToEdit(null));
          };

          const handleSave = async () => {
            setSaveLoading(true);
            const userIds = checkedUsers.map((user) => user.id);
            const homeId = selectedHome.id;
            await updateUsersForHome({ homeId, userIds });
            dispatch(selectHomeToEdit(null));
            dispatch(clearCheckedUsers());
            const homes = await getHomesByUser({
              userId: selectedUser.id,
            }).unwrap();
            dispatch(setHomesByUser(homes));
            setSaveLoading(false);
          };
          ```

        - And return the various jsx depending on the conditions. The EditUserModal will only be visible when we have selected a home. This makes it very simple to manage the visibility of the modal.

          ```jsx
          if (allUsersLoading) {
            return (
              <div
                className={`fixed backdrop-blur-sm inset-0 flex items-center justify-center ${
                  selectedHome ? "visible" : "hidden"
                }`}
              >
                <dialog
                  open={selectedHome}
                  className="w-80 p-4 border-2 bg-white border-secondaryMuted rounded-md"
                >
                  <p className="text-secondary font-semibold text-xl pb-2">
                    Getting Users
                  </p>
                </dialog>
              </div>
            );
          } else if (allUsersError) {
            return (
              <div
                className={`fixed backdrop-blur-sm inset-0 flex items-center justify-center ${
                  selectedHome ? "visible" : "hidden"
                }`}
              >
                <dialog
                  open={selectedHome}
                  className="w-80 p-4 border-2 bg-white border-secondaryMuted rounded-md"
                >
                  <p className="text-secondary font-semibold text-xl pb-2">
                    Error
                  </p>
                  <p className="text-red-700 text-sm font-semibold pb-2">
                    An error occured while fetching users
                  </p>
                </dialog>
              </div>
            );
          } else {
            return (
              <div
                className={`fixed backdrop-blur-sm inset-0 flex items-center justify-center ${
                  selectedHome ? "visible" : "hidden"
                }`}
              >
                <dialog
                  open={selectedHome}
                  className="w-80 p-4 border-2 bg-white border-secondaryMuted rounded-md"
                >
                  <p className="text-secondary font-semibold text-xl pb-2">
                    Modify Users{" "}
                  </p>
                  {allUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center mb-1 text-secondary"
                    >
                      <input
                        disabled={saveLoading}
                        className={`w-4 h-4 rounded-sm bg-white ${
                          saveLoading
                            ? `border-secondaryMuted text-primaryMuted focus:ring-primaryMuted`
                            : `border-secondary text-primary focus:ring-primary`
                        } `}
                        type="checkbox"
                        checked={checkedUsers
                          .map((u) => u.id)
                          .includes(user.id)}
                        onChange={() => handleCheckboxChange(user.id)}
                        id={user.id}
                        name={user.username}
                      />
                      <label
                        className="ms-2 text-sm font-medium"
                        htmlFor={user.id}
                      >
                        {user.username}
                      </label>
                    </div>
                  ))}
                  <p
                    className={`text-red-700 text-sm font-semibold pb-2 ${
                      checkedUsers < 1 ? "visible" : "hidden"
                    }`}
                  >
                    At least one user must be selected
                  </p>
                  <div className="flex justify-end mt-4">
                    <button
                      disabled={saveLoading}
                      onClick={handleCancel}
                      className={`w-18 h-8 bg-white text-sm ${
                        saveLoading
                          ? `text-secondaryMuted border-secondaryMuted`
                          : `text-secondary border-secondary`
                      } px-4 py-1 rounded-md me-4`}
                    >
                      Cancel
                    </button>
                    <button
                      disabled={saveLoading}
                      onClick={handleSave}
                      className={`w-18 h-8 ${
                        saveLoading || checkedUsers < 1
                          ? `bg-primaryMuted`
                          : `bg-primary`
                      } text-sm text-white px-4 py-1 rounded-md`}
                    >
                      {saveLoading ? "Saving..." : "Save"}
                    </button>
                  </div>
                </dialog>
              </div>
            );
          }
          ```

      - **Home Card Component:**

        - Create `home-card.jsx` in `./src/components` an create the `HomeCard` function.

          ```jsx
          function HomeCard({ home }) {
            const dispatch = useDispatch();
            const [getUsersByHome, { error }] = useLazyFindUsersByHomeQuery();
            const [gettingUsers, setGettingUsers] = useState(false);
          }
          ```

        - Create a button handler for `editUsers`.

          ```jsx
          const editUsers = async () => {
            setGettingUsers(true);
            const selectedUsers = await getUsersByHome(home.id).unwrap();
            dispatch(selectHomeToEdit(home));
            dispatch(checkUsers(selectedUsers));
            setGettingUsers(false);
          };
          ```

        - Return the jsx.

          ```jsx
          return (
            <div className="p-4 border-2 border-secondaryMuted text-secondary min-w-48 rounded-md">
              <p className="font-black text-secondary text-2xl">
                $ {home.list_price}
              </p>
              <p className="font-bold">{home.street_address}</p>
              <p className="font-semibold text-secondary">
                {home.state}, {home.zip}
              </p>
              <p className="font-medium">
                {home.sqft} ft{"\u00B2"}{" "}
              </p>
              <div className="flex justify-start space-x-2 mt-1">
                <div className="flex bg-primaryMuted text-secondary px-2 py-1 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-bed"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M7 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M22 17v-3h-20" />
                    <path d="M2 8v9" />
                    <path d="M12 14h10v-2a3 3 0 0 0 -3 -3h-7v5z" />
                  </svg>
                  <p className="font-medium pl-1">{home.beds} </p>
                </div>
                <div className="flex bg-primaryMuted text-secondary px-2 py-1 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-bath"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4v-3a1 1 0 0 1 1 -1z" />
                    <path d="M6 12v-7a2 2 0 0 1 2 -2h3v2.25" />
                    <path d="M4 21l1 -1.5" />
                    <path d="M20 21l-1 -1.5" />
                  </svg>
                  <p className="font-medium pl-1">{home.baths} </p>
                </div>
              </div>
              <div>
                <button
                  disabled={gettingUsers}
                  onClick={editUsers}
                  className={`w-full ${
                    gettingUsers || error ? `bg-primaryMuted` : `bg-primary`
                  }  text-white rounded-md mt-2`}
                >
                  {error
                    ? "API Error..."
                    : gettingUsers
                    ? "Please Wait..."
                    : "Edit Users"}
                </button>
              </div>
            </div>
          );
          ```

      - **User Dropdown Component:**

        - Add the `UserDropdown` function in `/src/components`.

          ```jsx
          function UserDropdown() {
            const {
              data: allUsers,
              isLoading: allUsersLoading,
              error: allUsersError,
            } = useFindAllUsersQuery();
            const [getHomesByUser, { error: findHomesByUserError }] =
              useLazyFindHomesByUserQuery();
            const currentPage = useSelector(
              (state) => state.homesByUser.currentPage
            );
            const dispatch = useDispatch();

            const handleChange = async (e) => {
              dispatch(clearHomesByUser());
              dispatch(setCurrentPage(1));
              const selectedUser = allUsers.find(
                (user) => user.id === parseInt(e)
              );
              dispatch(selectUser(selectedUser));
              const homes = await getHomesByUser(
                { userId: selectedUser.id, page: currentPage },
                true
              ).unwrap();
              dispatch(setHomesByUser(homes));
              dispatch(setTotalPages(homes.totalPages));
            };

            return (
              <>
                <div
                  className={`fixed backdrop-blur-sm inset-0 flex items-center justify-center ${
                    findHomesByUserError ? "visible" : "hidden"
                  }`}
                >
                  <dialog
                    open={findHomesByUserError}
                    className="w-80 p-4 border-2 bg-white border-secondaryMuted rounded-md"
                  >
                    <p className="text-secondary font-semibold text-xl">
                      API Error Fetching Homes
                    </p>
                  </dialog>
                </div>
                <select
                  disabled={allUsersLoading || allUsersError}
                  defaultValue={0}
                  onChange={(e) => handleChange(e.target.value)}
                  className="h-10 w-32 rounded-md px-2 text-sm font-semibold text-secondary"
                >
                  <option value={0} disabled hidden>
                    {allUsersError
                      ? "API Error"
                      : allUsersLoading
                      ? "Loading..."
                      : "Select User"}
                  </option>
                  {allUsersLoading || allUsersError ? (
                    <></>
                  ) : (
                    allUsers.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.username}
                      </option>
                    ))
                  )}
                </select>
              </>
            );
          }

          export default UserDropdown;
          ```

      - **Pagination Component:**

        - Add `Pagination()` function in `/src/components/pagination`

          ```jsx
          function Pagination() {
            const currentPage = useSelector(
              (state) => state.homesByUser.currentPage
            );
            const totalPages = useSelector(
              (state) => state.homesByUser.totalPages
            );
            const selectedUser = useSelector(
              (state) => state.userDropdown.selectedUser
            );
            const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
            const dispatch = useDispatch();
            const [getHomesByUser] = useLazyFindHomesByUserQuery();

            const handleChange = async (page) => {
              dispatch(setCurrentPage(page));
              dispatch(clearHomesByUser());
              const homes = await getHomesByUser(
                { userId: selectedUser.id, page: page },
                true
              ).unwrap();
              dispatch(setHomesByUser(homes));
            };

            return (
              <div className="flex justify-center items-center space-x-2">
                {pages.map((page) => (
                  <button
                    onClick={() => handleChange(page)}
                    key={page}
                    className={`${
                      currentPage === page
                        ? "bg-primary text-white"
                        : "bg-white text-primary"
                    } px-4 py-2 rounded-md`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            );
          }
          export default Pagination;
          ```

    - Now that the components are done, import them into `App.jsx`

      - Call the `useSelector()` to consume the homes for a user and what the selected user is.

        ```jsx
        const homes = useSelector((state) => state.homesByUser.homesByUser);
        const selectedUser = useSelector(
          (state) => state.userDropdown.selectedUser
        );
        ```

      - Create the `HomeCards()` function in `App()` that will return jsx for Homes or return Skeletons based on if the homes are availaible or if a user is selected.

        ```jsx
        function HomeCards() {
          if (homes.results) {
            return (
              <div className="px-8 pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {homes.results.map((home) => (
                  <div
                    key={home.id}
                    className="flex-grow items-center justify-center"
                  >
                    <HomeCard home={home} />
                  </div>
                ))}
              </div>
            );
          } else {
            return (
              <div className="px-8 pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {Array.from({ length: 50 }).map((_, index) => (
                  <div
                    key={index}
                    className="p-4 border-2 border-secondaryMuted text-secondary min-w-48 rounded-md"
                  >
                    <Skeleton className="h-7 w-4/6" />
                    <Skeleton className="h-5 w-4/5" />
                    <Skeleton className="h-5 w-3/5" />
                    <Skeleton className="h-5 w-2/5" />
                    <div className="flex justify-start space-x-2 mt-1">
                      <Skeleton className="bg-primaryMuted h-7 w-12" />
                      <Skeleton className="bg-primaryMuted h-7 w-12" />
                    </div>
                    <div>
                      <button
                        disabled
                        className=" w-full bg-primaryMuted text-white rounded-md mt-2"
                      >
                        Loading...
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            );
          }
        }
        ```

      - Create a `Pages()` function to return pages if a user is selected.

        ```jsx
        function Pages() {
          if (selectedUser != null) {
            return (
              <div className="flex text-secondary justify-center pt-4">
                <Pagination
                  currentPage={homes.currentPage}
                  totalPages={homes.totalPages}
                />
              </div>
            );
          }
        }
        ```

      - Create a `Homes()` function to return `HomeCards` when there is a selected user, or else it will display a message to select a user.

        ```jsx
        function Homes() {
          if (selectedUser != null) {
            return <HomeCards />;
          } else {
            return (
              <div className="flex items-center justify-center">
                <p className="text-secondary font-bold text-2xl">
                  Select a user to view homes
                </p>
              </div>
            );
          }
        }
        ```

      - Now finally return the main app.

        ```jsx
        return (
          <div className="grid ">
            <EditUserModal />
            <div className="flex items-center justify-center h-16">
              <UserDropdown />
            </div>
            <div className="w-11/12 m-auto h-0.5 bg-secondaryMuted"></div>
            <div>
              <Pages />
              <Homes />
            </div>
          </div>
        );
        ```

  - Now that the app is done, we can run it with the following command.

    ```bash
    npm run dev
    ```

## 3. Backend API development on Node

### problem

- we want the web app to interact with the [DB](#1-database)

### task

- create **REST APIs**, we'll need the following APIs:

  - **/user/find-all**

    - should return all users from DB

  - **/home/find-by-user**

    - should return all homes related to a user
    - this is consumed in UI to show home cards

  - **/user/find-by-home**

    - should return all users related to a home
    - this is consumed in UI, in the `Edit Users` modal

  - **/home/update-users**

    - this API should take in the new bunch of users (from the modal after `Save`) and the home for which the `Edit Users` button was clicked
    - this API should mutate the DB, to reflect the new set of users related to the home

  - make sure:

    - you use suitable HTTP methods for the REST APIs
    - should only use JSON as the interface
    - if possible, sanitize the data sent in the request
    - the `/home/update-users` API is idempotent

- **[<ins>extra</ins>] add pagination**

  - for `/home/find-by-user` API add pagination support:

    - page size should be 50
    - add _very_ basic pagination UI to `homes for user page` in [frontend](#2-react-spa)

- **techstack instructions**

  - Backend node frameworks:

    - [NestJS (recommended, if you know it)](https://docs.nestjs.com/) or [Express](https://expressjs.com/en/starter/installing.html)
    - use no other frameworks

  - Interacting with DB:

    - use one of these ORMs, this the **preferred approach**:

      - [TypeORM (recommended)](https://typeorm.io/)
      - [Prisma](https://www.prisma.io/docs/getting-started)
      - [Sequelize](https://sequelize.org/docs/v6/getting-started/)

    - otherwise, you can use [Knex query builder](https://knexjs.org/guide/)

    - we do NOT want raw SQL, if none of above works, you can use any ORM you know, but please mention and link to it in the README

### solution

- Notes:

  - The `/home/find-by-user` endpoint supports pagination. The endpoint returns the results, current page, total pages and total homes. You can choose a particular page by using the url query `page`.

    ```url
    localhost:3000/home/find-by-user/10?page=11
    ```

  - The `/home/update-users` takes home id and list of user ids as input.

    ```json
    // Example
    {
      "homeId": 131,
      "userIds": [2, 10]
    }

    // Sanitization Example
    {
      "homeId": "131",
      "userIds": ["2", 10]
    }
    ```

- To run the solution directly, clone the backend folder and follow the steps

  - Install the dependencies by going to the homellc-api folder.

    ```bash
    npm install
    ```

  - And then run the below.

    ```bash
    npm run start:dev
    ```

- Instructions:

  - Install NestJS CLI

    ```bash
    npm i -g @nestjs/cli
    ```

  - Create a NestJS project

    ```bash
    nest new homellc-api
    ```

  - And now lets install the required dependencies.
    ```bash
    npm i @nestjs/config @nestjs/typeorm typeorm class-validator mysql2 dotenv
    ```

- I am gonna go ahead and delete the default service and controller from the project as we don't need it and will create our own later on.

- Now that we have the project set up, we are gonna set up TypeORM and get MySQL credentials from the `.env` file. Let's do that.

  - Create a `.env` file in the root directory with all the credentials.
    ```env
    MYSQL_HOST=127.0.0.1
    MYSQL_PORT=3306
    MYSQL_USER=db_user
    MYSQL_PASSWORD=6equj5_db_user
    MYSQL_DATABASE=home_db
    ```
  - Import and use ConfigModule to access the credentials from `.env` in `app.module.ts`

    ```ts
    @Module({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      controllers: [],
      providers: [],
    })
    export class AppModule {}
    ```

  - Now we can import ConfigService and use the credentials in TypeOrmModule.
    ```ts
    @Module({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
          useFactory: (configService: ConfigService) => ({
            type: "mysql",
            host: configService.getOrThrow("MYSQL_HOST"),
            port: configService.getOrThrow("MYSQL_PORT"),
            username: configService.getOrThrow("MYSQL_USER"),
            password: configService.getOrThrow("MYSQL_PASSWORD"),
            database: configService.getOrThrow("MYSQL_DATABASE"),
            entities: [],
            synchronize: true,
          }),
          inject: [ConfigService],
        }),
      ],
      controllers: [],
      providers: [],
    })
    export class AppModule {}
    ```

- Now that TypeORM is set up, we can go ahead and create and register the entities for our database.

  - Create a folder `typeorm/entities`.

  - Create `Home` entity in `home.ts`.

    ```ts
    @Entity({ name: "home" })
    export class Home {
      @PrimaryGeneratedColumn()
      id: number;

      @Column({ length: 255, nullable: false })
      street_address: string;

      @Column({ length: 50, nullable: true })
      state: string;

      @Column({ length: 10, nullable: true })
      zip: string;

      @Column({ type: "float", nullable: true })
      sqft: number;

      @Column({ type: "int", nullable: true })
      beds: number;

      @Column({ type: "int", nullable: true })
      baths: number;

      @Column({ type: "float", nullable: true })
      list_price: number;
    }
    ```

  - Create `User` entity in `user.ts`.

    ```ts
    @Entity({ name: "user" })
    export class User {
      @PrimaryGeneratedColumn()
      id: number;

      @Column({ length: 100, nullable: false })
      username: string;

      @Column({ length: 100, nullable: false })
      email: string;
    }
    ```

  - Import the `Home` and `User` entities and create the `HomeUserRelation` entity in `home-user-relation.ts`.

    ```ts
    @Entity({ name: "user_home_relation" })
    export class UserHomeRelation {
      @PrimaryGeneratedColumn()
      id: number;

      @ManyToOne(() => User)
      @JoinColumn({ name: "user_id" })
      user: User;

      @ManyToOne(() => Home)
      @JoinColumn({ name: "home_id" })
      home: Home;
    }
    ```

  - Now let's register the entities in `app.module.ts`. Modify the `entities: []` parameter inside `TypeOrmModule` with the above entities.
    ```ts
    @Module({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
          useFactory: (configService: ConfigService) => ({
            type: "mysql",
            host: configService.getOrThrow("MYSQL_HOST"),
            port: configService.getOrThrow("MYSQL_PORT"),
            username: configService.getOrThrow("MYSQL_USER"),
            password: configService.getOrThrow("MYSQL_PASSWORD"),
            database: configService.getOrThrow("MYSQL_DATABASE"),
            entities: [User, Home, UserHomeRelation],
            synchronize: true,
          }),
          inject: [ConfigService],
        }),
      ],
      controllers: [],
      providers: [],
    })
    export class AppModule {}
    ```

- Now that the entities are registered, we can start creating the endpoints.

  - I want to seperate the `user` and `home` endpoints into different modules. So let's create the modules using the below commands.

    ```bash
    nest g module user
    nest g module home
    ```

  - Create the Controllers and Services for the above modules.

    ```bash
    nest g controller /user/controllers/user
    nest g controller /home/controllers/home
    nest g service /user/service/user
    nest g service /home/service/home
    ```

- Let's go ahead and import the entities into the modules that they will be used in.

  - Import `User` entity in the user module by adding the `imports` parameter in `user.module.ts` inside the user module directory.

    ```ts
    @Module({
      imports: [TypeOrmModule.forFeature([User])],
      controllers: [HomeController],
      providers: [HomeService],
    })
    export class HomeModule {}
    ```

  - Import `Home` and `UserHomeRelation` entity in the home module by adding the `imports` parameter in `home.module.ts` inside the home module directory.

    ```ts
    @Module({
      imports: [
        TypeOrmModule.forFeature([Home]),
        TypeOrmModule.forFeature([UserHomeRelation]),
      ],
      controllers: [HomeController],
      providers: [HomeService],
    })
    export class HomeModule {}
    ```

- Now lets create the controllers and services for all the endpoints.

  - For the `/user` endpoints, add the `findAll()` and `findByHome()` functions in `UserService` class in the file `user.service.ts` file in the user service directory (_/user/service/user/_).

    ```ts
    @Injectable()
    export class UserService {
      constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
      ) {}

      findAll() {
        return this.userRepository.find();
      }
      findByHome(homeId: number) {
        return this.userRepository
          .createQueryBuilder("user")
          .innerJoin("user_home_relation", "uhr", "uhr.user_id = user.id")
          .where("uhr.home_id = :homeId", { homeId })
          .getMany();
      }
    }
    ```

  - And then setup the controllers for the `/user` endpoints in `UserController` class inside `user.controller.ts` located inside the user controller directory (_/user/controller/user/_).

    ```ts
    @Controller("user")
    export class UserController {
      constructor(private userService: UserService) {}

      @Get("find-all")
      findAll() {
        return this.userService.findAll();
      }

      @Get("find-by-home/:homeId")
      findByHome(@Param("homeId") homeId: number) {
        return this.userService.findByHome(homeId);
      }
    }
    ```

  - For the `/home` endpoints, add the `findByUser()` and `updateUsers()` functions in `HomeService` class in the file `home.service.ts` file in the home service directory (_/home/service/home/_).

    ```ts
    @Injectable()
    export class HomeService {
      constructor(
        @InjectRepository(Home)
        private homeRepository: Repository<Home>,
        @InjectRepository(UserHomeRelation)
        private userHomeRelationRepository: Repository<UserHomeRelation>
      ) {}

      async findByUser(userId: number, page: number, pageSize: number) {
        const [results, total] = await this.homeRepository
          .createQueryBuilder("home")
          .innerJoin("user_home_relation", "uhr", "uhr.home_id = home.id")
          .where("uhr.user_id = :userId", { userId })
          .skip((page - 1) * pageSize)
          .take(pageSize)
          .getManyAndCount();
        const totalPages = Math.ceil(total / pageSize);

        return {
          results,
          total,
          currentPage: page,
          totalPages,
        };
      }

      async updateUsers(homeId: number, userIds: number[]) {
        await this.userHomeRelationRepository.delete({ home: { id: homeId } });
        const relations = userIds.map((userId) => ({
          home: { id: homeId },
          user: { id: userId },
        }));
        await this.userHomeRelationRepository.save(relations);
        return { message: "Updated Successfully" };
      }
    }
    ```

  - Before we setup the home controllers, lets create a DTO to sanitize the `updateUsers` input. Add `update-users.dto.ts` file inside `/dto/` folder in the root directory.

    ```ts
    export class UpdateUsersDto {
      @IsInt()
      homeId: number;

      @IsArray()
      @ArrayNotEmpty()
      @ArrayUnique()
      userIds: number[];
    }
    ```

  - Then setup the controllers for the `/home` endpoints in `HomeController` class inside `home.controller.ts` located inside the home controller directory (_/home/controller/home/_).

    ```ts
    @Controller("home")
    export class HomeController {
      constructor(private homeService: HomeService) {}

      @Get("find-by-user/:userId")
      findByUser(
        @Param("userId") userId: number,
        @Query("page") page: number = 1,
        @Query("pageSize") pageSize: number = 50
      ) {
        return this.homeService.findByUser(userId, page, pageSize);
      }

      @Put("update-users")
      updateUsers(@Body() updateUsersDto: UpdateUsersDto) {
        return this.homeService.updateUsers(
          updateUsersDto.homeId,
          updateUsersDto.userIds
        );
      }
    }
    ```

- All the endpoints are ready, now we can run the API using the below command. It will run on port **3000** by default
  ```bash
  npm run start:dev
  ```

## Submission Guidelines

- once you're done with [DB](#1-database), [frontend](#2-react-spa), [backend](#3-backend-api-development-on-node) it's time to submit your solution :smiley:

### README

- this is the most important part of the submission, without a proper README no submission will be considered

- you must edit this README file in your fork of the repo, and for each problem section, document your solution properly in its **solution** section

### frontend & backend

- all frontend / backend code should go entirely in the `./frontend` / `./backend` directories
- we are fine with testing your solution in either `dev` or `production` mode, just make sure the instructions are properly documented

> [!CAUTION]
> make sure to **commit the .env files** for both backend & frontend, if they are needed to run your solutions

### database

> [!CAUTION]
> The database changes you make while developing the solution, by default will not be visible to us or committed in the repo, so make sure to read and understand this section carefully!

- the database is inside a container, and all it's data (the tables you added, altered, etc..) are only saved inside a docker volume that's on your local system, invisible to us

- to make sure we can run your solution, you have to provide your **SQL script** to us
- write all the DB changes to `99_final_db_dump.sql` in `sql` directory under root folder of repo
- this script should take the DB from its initial state to the solved state

- you can test that easily by following below steps:

- first stop the already running db container, else there will be conflicts!

```bash
docker-compose -f docker-compose.initial.yml down
```

- now fire up the new one

```bash
 docker-compose -f docker-compose.final.yml up --build -d
```

- this is the new db container with your SQL script applied, now test your app, it should work exactly the same with this new replica database, this is how we will be runnning your app

### submit the fork url

- when you've committed everything needed to your github fork, please share the url with us, so we can review your submission
