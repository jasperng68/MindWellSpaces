import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PhoneCall,
  Heart,
  BookOpen,
  Music,
  Coffee,
  Headphones,
} from "lucide-react";
import { motion } from "framer-motion";

const EMERGENCY_CONTACTS = [
  {
    name: "Samaritans of Singapore (SOS)",
    number: "1767",
    description: "24/7 crisis support",
  },
  {
    name: "Care Text",
    number: "9151 1767",
    description: "Text-based crisis support",
  },
];

const RESOURCES = [
  {
    title: "Meditation Basics",
    description: "Learn the fundamentals of meditation practice",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15",
    link: "https://www.mindful.org/meditation/mindfulness-getting-started/",
  },
  {
    title: "Sleep Hygiene",
    description: "Tips for better sleep quality",
    image: "https://images.unsplash.com/photo-1676049516546-f540bcc6caed",
    link: "https://www.sleepfoundation.org/sleep-hygiene",
  },
  {
    title: "Stress Management",
    description: "Effective strategies to manage stress",
    image: "https://images.unsplash.com/photo-1539815208687-a0f05e15d601",
    link: "https://www.healthline.com/health/stress-management",
  },
];

const QUICK_TOOLS = [
  {
    icon: Music,
    label: "Calming Sounds",
    description: "Listen to nature sounds and ambient music",
  },
  {
    icon: Coffee,
    label: "Self-Care Ideas",
    description: "Simple activities to take care of yourself",
  },
  {
    icon: Headphones,
    label: "Guided Relaxation",
    description: "Audio-guided relaxation exercises",
  },
];

export function Resources() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center text-destructive">
              <PhoneCall className="mr-2 h-5 w-5" />
              Emergency Support
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {EMERGENCY_CONTACTS.map((contact) => (
              <div
                key={contact.number}
                className="flex flex-col space-y-2 border rounded-lg p-4"
              >
                <div className="font-medium">{contact.name}</div>
                <div className="text-2xl font-bold">{contact.number}</div>
                <div className="text-sm text-muted-foreground">
                  {contact.description}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="mr-2 h-5 w-5 text-primary" />
              Wellness Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {RESOURCES.map((resource) => (
                <a
                  key={resource.title}
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="relative aspect-video overflow-hidden rounded-lg mb-3">
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-medium group-hover:text-primary">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {resource.description}
                  </p>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-primary" />
              Quick Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              {QUICK_TOOLS.map((tool) => (
                <Button
                  key={tool.label}
                  variant="outline"
                  className="h-auto flex flex-col items-center p-6 space-y-3 hover:border-primary"
                >
                  <tool.icon className="h-8 w-8 text-primary" />
                  <div className="text-center">
                    <div className="font-medium">{tool.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {tool.description}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}