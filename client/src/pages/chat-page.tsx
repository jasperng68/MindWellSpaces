import { Navigation } from "@/components/ui/navigation";
import { Chat } from "@/components/ui/chat";
import { motion } from "framer-motion";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="lg:pl-64 min-h-screen">
        <div className="container mx-auto p-6 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-2">Blossom 1.0</h1>
            <p className="text-muted-foreground">
              Chat with our AI assistant for emotional support and guidance.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <Chat />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
