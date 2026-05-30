import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";

const BREATHING_PATTERNS = [
  {
    name: "4-7-8 Breathing",
    pattern: { inhale: 4, hold: 7, exhale: 8 },
    description:
      "Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. This pattern helps reduce anxiety and promote better sleep.",
  },
  {
    name: "Box Breathing",
    pattern: { inhale: 4, hold: 4, exhale: 4 },
    description:
      "Equal duration for inhale, hold, and exhale. This technique helps improve focus and reduce stress.",
  },
];

export function BreathingExercise() {
  const [selectedPattern, setSelectedPattern] = useState(BREATHING_PATTERNS[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState(180); // 3 minutes
  const [remainingTime, setRemainingTime] = useState(duration);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [phaseTime, setPhaseTime] = useState(0);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/breathing", {
        duration,
        pattern: selectedPattern.pattern,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/breathing"] });
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
        setPhaseTime((prev) => prev + 1);

        if (phase === "inhale" && phaseTime >= selectedPattern.pattern.inhale) {
          setPhase("hold");
          setPhaseTime(0);
        } else if (
          phase === "hold" &&
          phaseTime >= selectedPattern.pattern.hold
        ) {
          setPhase("exhale");
          setPhaseTime(0);
        } else if (
          phase === "exhale" &&
          phaseTime >= selectedPattern.pattern.exhale
        ) {
          setPhase("inhale");
          setPhaseTime(0);
        }
      }, 1000);
    } else if (remainingTime === 0) {
      setIsRunning(false);
      saveMutation.mutate();
    }

    return () => clearInterval(timer);
  }, [isRunning, remainingTime, phase, phaseTime, selectedPattern]);

  const reset = () => {
    setIsRunning(false);
    setRemainingTime(duration);
    setPhase("inhale");
    setPhaseTime(0);
  };

  const getPhaseSize = () => {
    switch (phase) {
      case "inhale":
        return "scale(1.2)";
      case "hold":
        return "scale(1.2)";
      case "exhale":
        return "scale(1.0)";
      default:
        return "scale(1.0)";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {BREATHING_PATTERNS.map((bp) => (
          <Card
            key={bp.name}
            className={`cursor-pointer transition-colors ${
              selectedPattern.name === bp.name
                ? "border-primary"
                : "hover:border-primary/50"
            }`}
            onClick={() => !isRunning && setSelectedPattern(bp)}
          >
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">{bp.name}</h3>
              <p className="text-muted-foreground text-sm">{bp.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="font-medium">Duration</h3>
              <p className="text-sm text-muted-foreground">
                {Math.floor(duration / 60)} minutes
              </p>
            </div>
            <Slider
              disabled={isRunning}
              min={60}
              max={600}
              step={60}
              value={[duration]}
              onValueChange={([value]) => {
                setDuration(value);
                setRemainingTime(value);
              }}
              className="w-[60%]"
            />
          </div>

          <div className="flex flex-col items-center justify-center py-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ scale: 1 }}
                animate={{ scale: phase === "inhale" ? 1.2 : 1 }}
                transition={{ duration: 2 }}
                className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center mb-4"
              >
                <motion.div
                  className="w-24 h-24 rounded-full bg-primary/40 flex items-center justify-center"
                  style={{ transform: getPhaseSize() }}
                  transition={{ duration: 2 }}
                >
                  <span className="text-lg font-medium capitalize">{phase}</span>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <div className="text-2xl font-bold mb-6">
              {Math.floor(remainingTime / 60)}:
              {(remainingTime % 60).toString().padStart(2, "0")}
            </div>

            <div className="flex gap-4">
              <Button
                size="lg"
                onClick={() => setIsRunning(!isRunning)}
                disabled={remainingTime === 0}
              >
                {isRunning ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" /> Start
                  </>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={reset}
                disabled={isRunning}
              >
                <RotateCcw className="mr-2 h-4 w-4" /> Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
