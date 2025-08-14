# Rebate Recovery System by Quisitive - React UI

A modern, ultra-vibrant React application for managing medical supplies rebate recovery processes.

## 🚀 Features

- 🎨 **Modern UI** with vibrant gradients and glassmorphism effects
- 🔐 **Azure AD B2C** authentication integration
- 📊 **Real-time analytics** and charts with Recharts
- 📄 **Contract management** with AI processing simulation
- 💰 **Rebate calculations** and forecasting
- 🔔 **Real-time notifications** via SignalR
- 📱 **Responsive design** for desktop and tablet
- ⚡ **Ultra-fast builds** with Vite
- 🎭 **Smooth animations** with Framer Motion

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **Framer Motion** for animations
- **Tailwind CSS** for styling
- **Vite** for fast development builds
- **Azure AD B2C** for authentication
- **Recharts** for data visualization
- **SignalR** for real-time updates
- **React Hook Form** for form handling
- **React Dropzone** for file uploads

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Azure AD B2C tenant (for authentication)
- .NET API backend (for full functionality)

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone <repository-url>
cd rebate-recovery-ui
npm install
```

### 2. Environment Setup

Copy the environment template:
```bash
cp .env.example .env
```

Update `.env` with your configuration:
```env
REACT_APP_API_BASE_URL=https://localhost:7001/api
REACT_APP_AZURE_CLIENT_ID=your-azure-client-id
REACT_APP_AZURE_AUTHORITY=https://your-tenant.b2clogin.com/your-tenant.onmicrosoft.com/B2C_1_signin
REACT_APP_AZURE_KNOWN_AUTHORITY=your-tenant.b2clogin.com
REACT_APP_REDIRECT_URI=http://localhost:3000
REACT_APP_SIGNALR_HUB_URL=https://localhost:7001/hubs/notifications
```

### 3. Start Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/          # React components organized by feature
│   ├── auth/           # Authentication components
│   ├── common/         # Shared components
│   │   ├── UI/         # Reusable UI components
│   │   ├── Layout/     # Layout components
│   │   └── Charts/     # Chart components
│   └── features/       # Feature-specific components
│       ├── Dashboard/  # Dashboard components
│       ├── Contracts/  # Contract management
│       ├── Rebates/    # Rebate processing
│       ├── Analytics/  # Analytics and reporting
│       └── Settings/   # System settings
├── services/           # API and external service integrations
│   ├── api/            # REST API services
│   ├── auth/           # Authentication services
│   └── signalr/        # Real-time communication
├── store/              # Redux state management
│   └── slices/         # Redux slices for different features
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and constants
└── styles/             # Global styles and Tailwind config
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build locally

## 🎨 Key Components

### 🏠 Dashboard
- **Metrics Overview**: Key performance indicators with animated cards
- **Recent Activity**: Real-time contract processing updates
- **Quick Actions**: Fast access to common tasks
- **Trend Charts**: Visual data representation with Recharts

### 📄 Contract Management
- **Upload Interface**: Drag-and-drop file upload with progress tracking
- **Contract List**: Searchable and filterable contract grid
- **Contract Details**: Comprehensive contract information with tabs
- **AI Processing**: Simulated AI extraction with status indicators

### 💰 Rebate Processing
- **Calculations**: Automated rebate calculation workflows
- **Validation**: Data validation and reconciliation
- **Forecasting**: Predictive analytics for rebate projections

### 📊 Analytics
- **Interactive Dashboards**: Business intelligence visualizations
- **Compliance Reports**: Automated reporting for regulatory requirements

## 🔐 Authentication

The application uses Azure AD B2C for authentication:

1. **Login Flow**: Modern login page with Microsoft integration
2. **Protected Routes**: Automatic redirection for unauthenticated users
3. **Token Management**: Automatic token refresh and secure storage
4. **Role-based Access**: Support for different user roles

## 🎯 State Management

Redux Toolkit is used for state management:

- **Auth Slice**: User authentication and profile data
- **Contracts Slice**: Contract data and filters
- **Rebates Slice**: Rebate calculations and history
- **UI Slice**: Theme, sidebar, and notification state

## 🔧 Development Guidelines

### Adding New Components

1. Create component in appropriate feature folder
2. Add TypeScript interfaces in `types/`
3. Create API service methods if needed
4. Add Redux slice if complex state required
5. Export from index files

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow the established color scheme (primary blues, accent purples)
- Add hover effects and smooth transitions
- Use the provided gradient and glassmorphism classes

### API Integration

- Extend existing API services in `services/api/`
- Add TypeScript interfaces in `types/`
- Use the base API service for common functionality
- Handle errors consistently

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Azure Static Web Apps

This application is optimized for deployment to Azure Static Web Apps:

1. Connect your GitHub repository
2. Configure build settings:
   - App location: `/`
   - Build location: `dist`
   - Build command: `npm run build`

### Environment Variables

Set the following in your deployment environment:
- `REACT_APP_API_BASE_URL`
- `REACT_APP_AZURE_CLIENT_ID`
- `REACT_APP_AZURE_AUTHORITY`
- `REACT_APP_AZURE_KNOWN_AUTHORITY`
- `REACT_APP_REDIRECT_URI`
- `REACT_APP_SIGNALR_HUB_URL`

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes following the style guidelines
3. Test thoroughly
4. Create a pull request with detailed description

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the documentation in this README
- Review the TypeScript interfaces for API contracts
- Check the component examples for implementation patterns

## 🔮 Future Enhancements

- **Advanced Analytics**: Machine learning-powered insights
- **Mobile App**: React Native mobile application
- **Offline Support**: Progressive Web App capabilities
- **Advanced Workflows**: Custom approval workflows
- **Integration Hub**: Additional third-party integrations