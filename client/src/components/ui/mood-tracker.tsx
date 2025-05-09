import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Mood } from "@shared/schema";

const MOODS = [
  { value: 1, label: "😢 Very Bad" },
  { value: 2, label: "😕 Bad" },
  { value: 3, label: "😐 Okay" },
  { value: 4, label: "🙂 Good" },
  { value: 5, label: "😄 Very Good" },
];

export function MoodTracker() {
  const [note, setNote] = useState("");
  const { data: moods = [], isLoading } = useQuery<Mood[]>({
    queryKey: ["/api/moods"],
  });

  const createMood = useMutation({
    mutationFn: async (mood: number) => {
      const res = await apiRequest("POST", "/api/moods", { mood, note });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/moods"] });
      setNote("");
    },
  });

  const chartData = moods.map((mood) => ({
    date: format(new Date(mood.createdAt), "MMM d"),
    mood: mood.mood,
  }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mood Tracker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {MOODS.map((mood) => (
              <motion.div
                key={mood.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => createMood.mutate(mood.value)}
                  disabled={createMood.isPending}
                >
                  {mood.label}
                </Button>
              </motion.div>
            ))}
          </div>

          <Textarea
            placeholder="Add a note about how you're feeling (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="h-20"
          />
        </div>

        <AnimatePresence>
          {moods.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="date" />
                  <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="mood"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}