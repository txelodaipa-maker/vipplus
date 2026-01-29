import { PreviewCard } from "@/components/PreviewCard";
import { Button } from "@/components/ui/button";
import { Send, Sparkles, Shield, CreditCard, Zap, Lock, Clock } from "lucide-react";
import { useContentStore } from "@/stores/contentStore";

const TELEGRAM_LINK = "https://t.me/videosplus";

const Home = () => {
  const { videos, settings } = useContentStore();
  const previewVideos = videos.filter((v) => v.isActive && !v.isVip);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-warning/5 rounded-full blur-[80px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/15 border border-primary/30 text-primary animate-pulse-glow">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold tracking-wide uppercase">Oferta Exclusiva</span>
              </div>
            </div>
            
            {/* Main Headline */}
            <div className="space-y-4 animate-fade-in-delay-1">
              <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
                Acesso Total por Apenas
              </h1>
              <div className="text-6xl md:text-8xl font-black">
                <span className="text-gradient animate-float inline-block">{settings.offerPrice}</span>
              </div>
            </div>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-delay-2">
              Conteúdo premium exclusivo. Entrega instantânea. 
              <span className="text-foreground font-medium"> 100% privacidade garantida.</span>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6 animate-fade-in-delay-3">
              <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="btn-telegram gap-3 text-lg px-10 py-7 rounded-xl w-full sm:w-auto">
                  <Send className="w-5 h-5" />
                  Entrar no Telegram
                </Button>
              </a>
              <Button
                size="lg"
                className="btn-premium text-primary-foreground gap-3 text-lg px-10 py-7 rounded-xl"
              >
                <CreditCard className="w-5 h-5" />
                Pagar Agora
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-success" />
                <span>Pagamento Seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-warning" />
                <span>Acesso Imediato</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Suporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-card/50 border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 flex items-center gap-5 hover-lift">
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center flex-shrink-0 glow-primary">
                <Shield className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-lg">100% Privacidade</h3>
                <p className="text-sm text-muted-foreground">Seus dados totalmente protegidos</p>
              </div>
            </div>
            <div className="glass-card p-6 flex items-center gap-5 hover-lift">
              <div className="w-14 h-14 rounded-2xl bg-[hsl(var(--telegram))] flex items-center justify-center flex-shrink-0" style={{boxShadow: '0 4px 20px hsl(200 100% 50% / 0.3)'}}>
                <Send className="w-7 h-7 text-[hsl(var(--telegram-foreground))]" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Suporte VIP</h3>
                <p className="text-sm text-muted-foreground">Atendimento 24/7 no Telegram</p>
              </div>
            </div>
            <div className="glass-card p-6 flex items-center gap-5 hover-lift">
              <div className="w-14 h-14 rounded-2xl bg-success flex items-center justify-center flex-shrink-0" style={{boxShadow: '0 4px 20px hsl(142 76% 36% / 0.3)'}}>
                <CreditCard className="w-7 h-7 text-success-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Pagamento Seguro</h3>
                <p className="text-sm text-muted-foreground">Stripe & PayPal aceitos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Videos */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3">Prévia Exclusiva</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-5">Conteúdo Premium</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Assista aos previews do nosso conteúdo exclusivo. Pague para desbloquear os vídeos completos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {previewVideos.map((video, index) => (
              <div key={video.id} className={`animate-fade-in-delay-${Math.min(index + 1, 3)}`}>
                <PreviewCard
                  id={video.id}
                  title={video.title}
                  thumbnail={video.thumbnail}
                  videoUrl={video.videoUrl}
                />
              </div>
            ))}
          </div>

          {previewVideos.length === 0 && (
            <div className="text-center py-16">
              <div className="glass-card p-12 max-w-md mx-auto">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
                <p className="text-lg text-muted-foreground">Novos vídeos em breve.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Payment Info */}
      <section className="py-20 bg-card/40 border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-10">
            <div>
              <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3">Formas de Pagamento</span>
              <h2 className="text-3xl md:text-4xl font-bold">Pague Como Preferir</h2>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <div className="glass-card p-8 flex-1 max-w-sm hover-lift">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl gradient-primary flex items-center justify-center glow-primary">
                  <CreditCard className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-xl mb-2">Stripe</h3>
                <p className="text-muted-foreground">
                  Pagamento seguro com cartão de crédito
                </p>
              </div>
              <div className="glass-card p-8 flex-1 max-w-sm hover-lift">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-[#0070ba] flex items-center justify-center" style={{boxShadow: '0 4px 20px rgba(0, 112, 186, 0.3)'}}>
                  <span className="text-white font-bold text-xl">PP</span>
                </div>
                <h3 className="font-bold text-xl mb-2">PayPal</h3>
                <p className="text-muted-foreground">
                  Confirmação manual via Telegram
                </p>
              </div>
            </div>
            <div className="glass-card p-4 max-w-lg mx-auto">
              <p className="text-sm text-muted-foreground">
                💬 Após o pagamento, envie o comprovante no Telegram para liberar seu acesso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VIP Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-warning/5 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto glass-card-premium p-10 md:p-14 text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full gradient-premium text-warning-foreground animate-float">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-wide">Acesso VIP</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold">Quer Acesso a Todo o Conteúdo?</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Entre em contato para acesso exclusivo a vídeos premium e nossa biblioteca completa. 
              <span className="text-foreground font-medium"> Sua privacidade é nossa prioridade.</span>
            </p>
            
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="btn-telegram gap-3 text-lg px-10 py-7 rounded-xl">
                <Send className="w-5 h-5" />
                Falar no Telegram
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
