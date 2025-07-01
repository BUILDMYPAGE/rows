# Star Wars Universe Explorer

A modern React.js application that explores the Star Wars universe using the Star Wars API (SWAPI). Discover iconic characters, their details, and journey through a galaxy far, far away!

## ✨ Features

- **Character Browsing**: Browse through all Star Wars characters with pagination
- **Character Details**: View detailed information including homeworld, species, films, vehicles, and starships
- **Search Functionality**: Search for characters by name with real-time results
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradient backgrounds and card-based layout
- **Error Handling**: Graceful error handling with retry functionality
- **Loading States**: Smooth loading indicators for better UX

## 🚀 Technology Stack

- **React.js** - Functional components with hooks
- **React Router** - Client-side routing for navigation
- **Axios** - HTTP client for API requests
- **Vite** - Fast build tool and development server
- **CSS3** - Modern styling with gradients and animations
- **SWAPI** - The Star Wars API for data

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd star-wars-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🎯 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality

## 🌟 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   ├── CharacterCard.jsx    # Character display card
│   ├── LoadingSpinner.jsx   # Loading indicator
│   ├── ErrorMessage.jsx     # Error display component
│   ├── Pagination.jsx      # Pagination controls
│   └── SearchBar.jsx       # Search input component
├── pages/              # Page components
│   ├── CharacterList.jsx   # Main character listing page
│   ├── CharacterDetail.jsx # Individual character details
│   └── SearchPage.jsx      # Character search page
├── hooks/              # Custom React hooks
│   └── useSWAPI.js     # API data fetching hooks
├── services/           # API services
│   └── swapiService.js # SWAPI integration
├── styles/             # Styling files
│   └── global.css      # Global styles and components
├── App.jsx             # Main application component
└── main.jsx           # Application entry point
```

## 🎨 Key Features Explained

### Character Browsing
- Paginated list of all Star Wars characters
- Each character displayed in an attractive card format
- Quick access to basic information (height, mass, birth year, etc.)

### Character Details
- Comprehensive character information
- Related data including homeworld details, species information
- Featured films, vehicles, and starships
- Responsive layout for optimal viewing

### Search Functionality
- Real-time character search by name
- Clear search results with helpful messaging
- Search tips and suggestions for better results

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface on mobile devices

## 🔧 Technical Implementation

### State Management
- React hooks for component state (useState, useEffect)
- Custom hooks for API data fetching and caching
- Error boundary implementation for robust error handling

### API Integration
- RESTful API calls to SWAPI endpoints
- Async/await pattern for clean asynchronous code
- Error handling and retry mechanisms
- Loading states for better user experience

### Performance Optimizations
- Component-level loading states
- Efficient re-rendering with proper dependency arrays
- Pagination to limit data loading
- Responsive images and optimized assets

## 🌐 API Endpoints Used

- `GET /people/` - Retrieve character list with pagination
- `GET /people/{id}/` - Get specific character details
- `GET /people/?search={query}` - Search characters by name
- `GET /planets/{id}/` - Get homeworld information
- `GET /species/{id}/` - Get species details
- `GET /films/{id}/` - Get film information

## 🎭 UI/UX Design

### Visual Design
- Modern gradient backgrounds
- Card-based layout for content organization
- Consistent color scheme throughout the application
- Smooth hover effects and transitions

### User Experience
- Intuitive navigation with breadcrumbs
- Clear loading indicators
- Helpful error messages with retry options
- Responsive design for all devices

## 🚀 Deployment

### Building for Production
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory, ready for deployment to any static hosting service.

### Recommended Hosting Platforms
- **Vercel** - Optimal for React applications
- **Netlify** - Easy deployment with CI/CD
- **GitHub Pages** - Free hosting for public repositories
- **Firebase Hosting** - Google's hosting solution

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **SWAPI** - The Star Wars API for providing the data
- **Lucasfilm** - For creating the amazing Star Wars universe
- **React Team** - For the excellent React framework
- **Vite Team** - For the lightning-fast build tool

## 🐛 Known Issues

- Character images are not available through SWAPI
- Some older characters may have limited data
- Network timeouts may occur with slow connections

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Include screenshots and error messages when applicable

---

May the Force be with you! 🌟+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
