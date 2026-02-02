import { Button } from "@/components/ui/button";
import { Send, Sparkles, Shield, Star, Crown, CheckCircle, Zap, Lock, Gift } from "lucide-react";

const TELEGRAM_LINK = "https://t.me/vip_adminx2";

const VipAccess = () => {
  const benefits = [
    { icon: Gift, text: "Acesso a todo conteúdo premium" },
    { icon: Zap, text: "Novos lançamentos toda semana" },
    { icon: Star, text: "Conteúdos exclusivos de bastidores" },
    { icon: Send, text: "Contato direto com criadores" },
    { icon: Shield, text: "Suporte prioritário 24/7" },
    { icon: Lock, text: "Atualizações vitalícias inclusas" },
  ];

  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-warning/5 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-warning/5 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full gradient-premium text-warning-foreground mb-6 animate-float">
            <Crown className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-wide">Membro VIP</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Desbloqueie o <span className="text-gradient-premium">Acesso VIP</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Entre em contato para acesso exclusivo a vídeos premium e nossa biblioteca completa de conteúdo.
          </p>
        </div>

        {/* Main CTA Card */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="glass-card-premium p-10 md:p-16 text-center space-y-10 relative overflow-hidden">
            {/* Top Accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 gradient-premium" />
            
            {/* Floating Icon */}
            <div className="w-24 h-24 mx-auto rounded-full gradient-premium flex items-center justify-center animate-float" style={{boxShadow: '0 0 60px hsl(45 100% 50% / 0.4)'}}>
              <Star className="w-12 h-12 text-warning-foreground" fill="currentColor" />
            </div>

            <div className="space-y-5">
              <h2 className="text-3xl md:text-4xl font-bold">Quer Todo o Conteúdo Premium?</h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Entre em contato para acesso exclusivo a vídeos premium e nossa biblioteca completa. 
                <span className="text-foreground font-medium"> Sua privacidade é nossa prioridade.</span>
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-border/30">
                  <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-success" />
                  </div>
                  <span className="font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="btn-telegram gap-3 text-lg px-12 py-8 rounded-xl">
                  <Send className="w-6 h-6" />
                  Falar no Telegram
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="glass-card p-8 text-center space-y-4 hover-lift">
            <div className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center glow-primary">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="font-bold text-lg">100% Privacidade</h3>
            <p className="text-muted-foreground">
              Seus dados e identidade totalmente protegidos
            </p>
          </div>
          <div className="glass-card p-8 text-center space-y-4 hover-lift">
            <div className="w-16 h-16 mx-auto rounded-2xl gradient-premium flex items-center justify-center" style={{boxShadow: '0 0 30px hsl(45 100% 50% / 0.3)'}}>
              <Sparkles className="w-8 h-8 text-warning-foreground" />
            </div>
            <h3 className="font-bold text-lg">Qualidade Premium</h3>
            <p className="text-muted-foreground">
              Apenas o conteúdo da mais alta qualidade
            </p>
          </div>
          <div className="glass-card p-8 text-center space-y-4 hover-lift">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[hsl(var(--telegram))] flex items-center justify-center" style={{boxShadow: '0 4px 30px hsl(200 100% 50% / 0.3)'}}>
              <Send className="w-8 h-8 text-[hsl(var(--telegram-foreground))]" />
            </div>
            <h3 className="font-bold text-lg">Acesso Imediato</h3>
            <p className="text-muted-foreground">
              Liberação instantânea após confirmação
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VipAccess;
