### Features Implemented:

#### 1. **Search Functionality**:
- **Dynamic Search**: Users can search for any public GitHub organization by entering its name in the search bar. The application uses a debounced input to reduce the number of API calls, improving performance and user experience.
- **Autocomplete Suggestions**: As the user types, a dropdown menu offers autocomplete suggestions based on current input, helping to find organizations quickly.

#### 2. **Repository Listing**:
- **Display Repositories**: Once an organization is selected, the application displays a list of all repositories within that organization. This includes basic information such as the repository name, description, and the number of stars.
- **Sorting Options**: Users can sort the repositories by stars, forks, and recently updated via a dropdown menu. This allows for customized viewing based on user preferences.

#### 3. **Detailed Repository View**:
- **Comprehensive Information**: Clicking on a repository name opens a detailed page where extensive information about the repository is presented. This includes the readme file, open issues, pull requests, and clone options.
- **Navigation Links**: Direct links are provided to the GitHub page for each repository, allowing users to quickly access the repo on GitHub for cloning or further exploration.

#### 4. **Pagination**:
- **Dynamic Page Sizing**: Users can select how many items they wish to view per page. This flexibility helps in managing the display of repositories, especially when dealing with organizations having a large number of repositories.
- **Page Navigation**: Pagination controls allow users to navigate through different pages of repositories, with the current page number highlighted for clarity.

#### 5. **Error Handling**:
- **Robust Error Management**: The application handles API errors gracefully by catching them and displaying user-friendly error messages. This includes network errors, rate limiting, or issues with the GitHub API.
- **Feedback for Empty Results**: If a search yields no results or an organization has no public repositories, the application provides clear feedback to the user instead of simply showing an empty page.

#### 6. **Environment Configuration**:
- **Secure API Key Handling**: The application uses an environment variable, `VITE_GIT_TOKEN`, to securely handle the GitHub personal access token required for API requests. This approach ensures that sensitive data is not hard-coded into the application codebase.

#### 7. **Responsive Design and UI/UX**:
- **Mobile-First Design**: The application is designed with a mobile-first approach, ensuring that all features are fully functional and aesthetically pleasing on smaller screens.
- **Consistent UI Elements**: UI components are styled using Tailwind CSS, ensuring visual consistency across different parts of the application. The use of components like modals, buttons, and input fields adheres to a unified design system.

### Additional Features (Bonus Points):
- **Server-Side Pagination**: Implemented to enhance performance by reducing the amount of data transferred over the network, especially beneficial for organizations with a vast number of repositories.
- **Keyboard Shortcuts for Power Users**: Keyboard shortcuts have been integrated to allow power users to navigate and operate the application more efficiently.
- **URL Bookmarking and Sharing**: All search states and pagination settings are synced with the URL, allowing users to bookmark or share specific views of the application.
- **Infinite Scroll**: Planned for future releases to allow users to scroll through repositories seamlessly without manually navigating through pagination links.

### How to Setup and Run:
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure the environment variable in a `.env.local` file at the root of the project:
   ```
   VITE_GIT_TOKEN=your_github_pat_here
   ```
   Replace `your_github_pat_here` with your actual GitHub personal access token to authenticate API requests.
4. Run the development server using `npm run dev`.
