# AI Data Agent User Manual

Welcome to **AI Data Agent** – your interactive tool to analyze business data with ease. This guide explains how to get started and use the application effectively.

## Overview

The AI Data Agent provides a chat-based interface to ask complex analytical questions about your business data. It returns insights and visualizations to help you understand trends and patterns. Key features include:

- **Interactive Chat Interface:** Ask questions and receive data-driven responses. See the chat interface in [ChatInterface.tsx](src/components/ChatInterface.tsx).
- **Data Visualization:** Visualize responses through charts and tables on the dashboard ([DataVisualizer.tsx](src/components/DataVisualizer.tsx)).
- **Instructions & Examples:** Find detailed usage instructions and example queries in the accordion section ([InstructionsAccordion.tsx](src/components/InstructionsAccordion.tsx)).
- **Responsive Design:** Seamless experience on both desktop and mobile devices.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your system.
- Package manager like npm or Bun.

### Installation

1. Clone the repository.
2. Navigate to the project folder.
3. Install the dependencies:

   ```sh
   npm install
   ```

### Running the Project

To start the development server, run:

   ```sh
   npm run dev
   ```

This will launch the application using Vite on `localhost:5173`.

## How to Use

1. **Ask a Business Question:**
   - Enter your question in the chat input field (see ChatInterface.tsx).
   - For example: "Show me revenue by region" or "How has our revenue trended over time?"

2. **View Responses and Visualizations:**
   - The application processes your query, and you'll see a response along with a chart in the Data Visualization section.
   - In a desktop view, the visualization is side-by-side with the chat. On mobile, it's displayed below the chat (Index.tsx).

3. **Additional Instructions:**
   - Further usage instructions and example queries are available in the accordion section located in the dashboard.

## Advanced Features

- **Real-Time Feedback:** The chat interface shows a loader while processing queries.
- **Notifications:** Get toasts and alerts for errors or process updates (see use-toast.ts and toast.tsx).
- **Customization:** Modify the theme and styles using Tailwind CSS defined in [tailwind.config.ts](http://_vscodecontentref_/0) and [index.css](http://_vscodecontentref_/1).

## Support & Documentation

- For customization or troubleshooting, refer to the source files in the src directory.
- Check out the components in the ui folder for detailed implementations of UI elements.

## License

This project is generated and maintained as per the project guidelines. Please refer to the LICENSE file for details.

Enjoy using AI Data Agent!

