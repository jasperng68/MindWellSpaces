import { Navigation } from "@/components/ui/navigation";
import { BreathingExercise } from "@/components/ui/breathing-exercise";
import { motion } from "framer-motion";

export default function BreathingPage() {
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
            <h1 className="text-4xl font-bold mb-2">Breathing Exercises</h1>
            <p className="text-muted-foreground">
              Take a moment to breathe and find your calm.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <BreathingExercise />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
