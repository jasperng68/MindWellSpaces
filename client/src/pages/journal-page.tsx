import { Navigation } from "@/components/ui/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertJournalSchema } from "@shared/schema";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Loader2, PenLine } from "lucide-react";

type JournalFormData = {
  content: string;
};

export default function JournalPage() {
  const { user } = useAuth();
  const form = useForm<JournalFormData>({
    resolver: zodResolver(insertJournalSchema.omit({ userId: true })),
  });

  const { data: journals, isLoading } = useQuery({
    queryKey: ["/api/journals"],
  });

  const createJournal = useMutation({
    mutationFn: async (data: JournalFormData) => {
      const res = await apiRequest("POST", "/api/journals", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journals"] });
      form.reset();
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
            <h1 className="text-4xl font-bold mb-2">Daily Journal</h1>
            <p className="text-muted-foreground">
              Write down your thoughts, feelings, and experiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent className="pt-6">
                <form
                  onSubmit={form.handleSubmit((data) => createJournal.mutate(data))}
                  className="space-y-4"
                >
                  <Textarea
                    placeholder="What's on your mind today?"
                    className="min-h-[200px]"
                    {...form.register("content")}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={createJournal.isPending}
                  >
                    {createJournal.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <PenLine className="mr-2 h-4 w-4" />
                    )}
                    Save Entry
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold">Past Entries</h2>
            {journals?.map((journal: any) => (
              <Card key={journal.id}>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-2">
                    {format(new Date(journal.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                  </p>
                  <p className="whitespace-pre-wrap">{journal.content}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
