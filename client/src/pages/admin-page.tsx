import { Navigation } from "@/components/ui/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Loader2, Reply } from "lucide-react";
import { format } from "date-fns";
import { ChatMessage } from "@shared/schema";

export default function AdminPage() {
  const [response, setResponse] = useState("");
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null);

  const { data: allMessages = [], isLoading } = useQuery<ChatMessage[]>({
    queryKey: ["/api/admin/chat"],
  });

  const respondToMessage = useMutation({
    mutationFn: async (data: { response: string }) => {
      const res = await apiRequest("POST", "/api/chat/respond", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/chat"] });
      setResponse("");
      setSelectedMessageId(null);
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
      <Navigation isAdmin />
      <main className="lg:pl-64 min-h-screen">
        <div className="container mx-auto p-6 space-y-8">
          <h1 className="text-4xl font-bold mb-2">Admin Chat Panel</h1>
          <p className="text-muted-foreground">
            Manage and respond to user messages.
          </p>

          <Card>
            <CardHeader>
              <CardTitle>All Messages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {allMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.isUser
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm font-medium mb-1">
                          User ID: {msg.userId}
                        </p>
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {format(new Date(msg.createdAt), "MMM d, h:mm a")}
                        </p>
                        {msg.isUser && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2"
                            onClick={() => setSelectedMessageId(msg.id)}
                          >
                            <Reply className="h-4 w-4 mr-2" />
                            Respond
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {selectedMessageId && (
                <div className="space-y-4">
                  <Textarea
                    placeholder="Type your response..."
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      disabled={!response.trim() || respondToMessage.isPending}
                      onClick={() => respondToMessage.mutate({ response })}
                    >
                      {respondToMessage.isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        "Send Response"
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedMessageId(null);
                        setResponse("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
