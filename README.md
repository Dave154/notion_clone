# Notion Clone

A feature-rich **Notion-like clone** with real-time collaboration, AI-powered summarization, translation, and document analysis. This project aims to bring seamless collaboration and intelligent document interaction to users.

[Live Link](https://notion-clone-iota-three.vercel.app)

---

## Features

### 1. **Real-Time Collaborative Text Editor**

- Multiple users in the same room can edit a document simultaneously.
- See updates in real time, including the cursor movements of other users.
- Built with **Liveblocks** for rich text collaboration.

### 2. **AI Summarizer and Translator**

- **Summarization:** Users can generate concise summaries of their documents.
- **Translation:** Summaries can be translated into any language of choice.
- Powered by **Cloudflare Workers** for fast and scalable AI-based processing.

### 3. **Chat-to-Document AI**

- **Interactive Document Analysis:** Users can ask the document questions, such as calculating totals, averages, or providing custom insights based on the document's content.
- Example: For a grocery list document, users can get the total cost, mean value, etc.
- Built using **OpenAI** to enable intelligent responses.

### 4. **User-Friendly Interface**

- Modern, responsive design using **Next.js**, **Tailwind CSS**, and **shadcn.**

---

## Tech Stack

### **Frontend**

- **Next.js**: Framework for server-side rendering and frontend development.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **shadcn**: Component library for building modern, accessible UIs.

### **Backend**

- **Firebase**: Used for storage, authentication, and backend services.
- **Liveblocks**: Real-time collaboration and synchronization for the rich-text editor.
- **Cloudflare Workers**: For summarization and translation processing.
- **OpenAI**: For implementing the Chat-to-Document AI feature.

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-repo-url/notion-clone.git
   cd notion-clone
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and configure the following:

   ```env
   AUTH_SECRET
   AUTH_GITHUB_ID
   AUTH_GITHUB_SECRET
   AUTH_GOOGLE_ID
   AUTH_GOOGLE_SECRET
   NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY
   LIVEBLOCKS_PRIVATE_KEY
   NEXT_PUBLIC_BASE_URL
   SERVICE_KEY
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   Access the app at `http://localhost:3000`.

---

## Usage

1. **Sign In:**

   - Use your email to sign in and access collaborative features.

2. **Create or Join a Room:**

   - Start a new room or join an existing one to collaborate in real time.

3. **Use AI Features:**

   - Summarize documents or translate summaries into any language.
   - Interact with documents using the Chat-to-Document AI feature for insights.

4. **Collaborate:**

   - Edit documents with other users in real time and view live cursor movements.

---

## Deployment

The project is deployed on **Vercel** for seamless production builds and hosting.

To deploy your own version:

1. **Push your code to a Git repository.**
2. **Link the repository to Vercel**.
3. **Add environment variables** in the Vercel project settings.
4. **Deploy the app.**

---

## Contributions

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature name'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request.

---

## License

This project is licensed under the MIT License.

---

## Acknowledgments

- **Next.js** for its amazing framework.
- **Tailwind CSS** for simplified styling.
- **Liveblocks** for enabling real-time collaboration.
- **Firebase** for backend services.
- **Cloudflare Workers** for AI summarization and translation.
- **OpenAI** for the Chat-to-Document feature.

