# L2 IT Solutions Website

Professional website for an IT solutions company based in the Philippines, built with Next.js 14, Tailwind CSS (v4), Framer Motion, and Anthropic Claude AI.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **AI**: Anthropic Claude SDK (@anthropic-ai/sdk)
- **Components**: shadcn/ui + Lucide Icons

## Setup Instructions

1. **Clone the repository** (if applicable) or enter the project directory.

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory and add your Anthropic API Key:
   ```env
   # Never expose this key on the frontend
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open the browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to see the result.

## Project Structure
- `/src/app`: Application routes and layout.
- `/src/components`: UI components (Navbar, Sections, AI Widget).
- `/src/lib`: Utility functions.
- `/public`: Static assets (Logos, SVGs).

## Key Features
- **Sticky Glassmorphism Header**: Modern blurred navigation.
- **Capabilities & Products**: Interactive grids for service and brand showcases.
- **Why Us Stats**: Dynamic count-up animations on scroll.
- **AI Assistant**: Streaming chatbot powered by Claude 3.5 Sonner.
- **Responsive**: Fully optimized for Mobile, Tablet, and Desktop.
