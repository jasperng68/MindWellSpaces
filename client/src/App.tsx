import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import HomePage from "@/pages/home-page";
import JournalPage from "@/pages/journal-page";
import BreathingPage from "@/pages/breathing-page";
import ChatPage from "@/pages/chat-page";
import AdminPage from "@/pages/admin-page";
import { ProtectedRoute } from "./lib/protected-route";

function Router() {
  return (
    <Switch>
      <Route path="/">
        {() => <AuthPage />}
      </Route>
      <Route path="/auth">
        {() => <AuthPage />}
      </Route>
      <ProtectedRoute path="/home" component={HomePage} />
      <ProtectedRoute path="/journal" component={JournalPage} />
      <ProtectedRoute path="/breathing" component={BreathingPage} />
      <ProtectedRoute path="/chat" component={ChatPage} />
      <ProtectedRoute path="/admin" component={AdminPage} />
      <Route path="/:rest*">
        {() => <NotFound />}
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;