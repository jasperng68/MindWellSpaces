import { Navigation } from "@/components/ui/navigation";
import { MoodTracker } from "@/components/ui/mood-tracker";
import { Resources } from "@/components/ui/resources";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";

export default function HomePage() {
  const { user } = useAuth();

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
            <h1 className="text-4xl font-bold mb-2">Welcome, {user?.username}!</h1>
            <p className="text-muted-foreground">
              Track your mood, practice mindfulness, and take care of your mental well-being.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <MoodTracker />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Resources />
          </motion.div>
        </div>
      </main>
    </div>
  );
}