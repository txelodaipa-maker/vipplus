import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield, Lock } from "lucide-react";

interface AdminPasswordGateProps {
  children: React.ReactNode;
}

// Senha de admin simples - em produção, use autenticação real
const ADMIN_PASSWORD = "admin123";

export const AdminPasswordGate = ({ children }: AdminPasswordGateProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("admin_authenticated") === "true";
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_authenticated", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Senha incorreta");
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/95 p-4">
      <div className="w-full max-w-sm">
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-center">Painel Admin</h1>
            <p className="text-muted-foreground text-sm text-center mt-1">
              Digite a senha para acessar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Senha de admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-background/50"
                autoFocus
              />
            </div>
            
            {error && (
              <p className="text-destructive text-sm text-center">{error}</p>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90"
            >
              Entrar
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Dica: a senha padrão é "admin123"
          </p>
        </div>
      </div>
    </div>
  );
};
