import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2, Edit, Settings, Video, Save, Shield, Link, CreditCard, MessageCircle, Loader2 } from "lucide-react";
import { VideoForm } from "@/components/admin/VideoForm";
import { useVideos, useAddVideo, useUpdateVideo, useDeleteVideo, Video as VideoType } from "@/hooks/useVideos";
import { useSettings, useUpdateSettings, Settings as SettingsType } from "@/hooks/useSettings";
import { AdminPasswordGate } from "@/components/admin/AdminPasswordGate";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Admin = () => {
  const { data: videos = [], isLoading: videosLoading } = useVideos();
  const { data: settings, isLoading: settingsLoading } = useSettings();
  const addVideoMutation = useAddVideo();
  const updateVideoMutation = useUpdateVideo();
  const deleteVideoMutation = useDeleteVideo();
  const updateSettingsMutation = useUpdateSettings();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoType | null>(null);
  
  const getDefaultVideo = (): Partial<VideoType> => ({
    title: "",
    description: "",
    thumbnail: "",
    videoUrl: "",
    paymentLink: "",
    price: 30,
    views: "0",
    duration: "0:00",
    addedAt: "Just now",
    isVip: false,
    isExclusive: false,
    isOpen: false,
    isActive: true,
    stripeEnabled: true,
    paypalEnabled: true,
  });
  
  const [newVideo, setNewVideo] = useState<Partial<VideoType>>(getDefaultVideo());

  const [localSettings, setLocalSettings] = useState<SettingsType>({
    telegramLink: "https://t.me/vip_adminx2",
    telegramUsername: "vip_adminx2",
    stripeLink: "",
    paypalEmail: "",
    offerPrice: "$100",
  });

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);

  const handleAddVideo = () => {
    // Open videos only need title and videoUrl, others need thumbnail
    if (!newVideo.title) return;
    if (newVideo.isOpen && !newVideo.videoUrl) return;
    if (!newVideo.isOpen && !newVideo.thumbnail) return;
    
    addVideoMutation.mutate({
      title: newVideo.title || "",
      description: newVideo.description || "",
      thumbnail: newVideo.isOpen ? (newVideo.videoUrl || "open-video") : (newVideo.thumbnail || ""),
      videoUrl: newVideo.videoUrl || "",
      paymentLink: newVideo.paymentLink || "",
      price: newVideo.price || 30,
      views: newVideo.views || "0",
      duration: newVideo.duration || "0:00",
      addedAt: newVideo.addedAt || "Just now",
      isVip: newVideo.isVip ?? false,
      isExclusive: newVideo.isExclusive ?? false,
      isOpen: newVideo.isOpen ?? false,
      isActive: newVideo.isActive ?? true,
      stripeEnabled: newVideo.stripeEnabled ?? true,
      paypalEnabled: newVideo.paypalEnabled ?? true,
    }, {
      onSuccess: () => {
        setNewVideo(getDefaultVideo());
        setIsAddOpen(false);
      }
    });
  };

  const handleUpdateVideo = () => {
    if (!editingVideo) return;
    updateVideoMutation.mutate({ id: editingVideo.id, updates: editingVideo }, {
      onSuccess: () => {
        setEditingVideo(null);
      }
    });
  };

  const handleDeleteVideo = (id: string) => {
    deleteVideoMutation.mutate(id);
  };

  const handleSaveSettings = () => {
    updateSettingsMutation.mutate(localSettings);
  };

  if (videosLoading || settingsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AdminPasswordGate>
      <motion.div 
        className="min-h-screen py-8 bg-gradient-to-b from-background to-background/95"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Painel Admin</h1>
                <p className="text-muted-foreground text-sm">Gerencie vídeos, pagamentos e configurações</p>
              </div>
            </div>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  <Plus className="w-4 h-4" />
                  Novo Vídeo
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border max-w-lg max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-base">
                    <Video className="w-4 h-4 text-primary" />
                    Adicionar Vídeo
                  </DialogTitle>
                </DialogHeader>
                <VideoForm 
                  video={newVideo}
                  onChange={(updates) => setNewVideo({ ...newVideo, ...updates })}
                  onSave={handleAddVideo}
                  saveLabel="Salvar Vídeo"
                  isLoading={addVideoMutation.isPending}
                />
              </DialogContent>
            </Dialog>
          </motion.div>

          {/* Videos Table */}
          <motion.div variants={itemVariants} className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Video className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Vídeos ({videos.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead className="text-muted-foreground">Título</TableHead>
                    <TableHead className="text-muted-foreground">Preço</TableHead>
                    <TableHead className="text-muted-foreground">Views</TableHead>
                    <TableHead className="text-muted-foreground">Tipo</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                    <TableHead className="text-right text-muted-foreground">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {videos.map((video) => (
                    <TableRow key={video.id} className="border-border/30 hover:bg-muted/20 transition-colors">
                      <TableCell className="font-medium max-w-xs truncate">
                        {video.title}
                      </TableCell>
                      <TableCell>
                        <span className="text-success font-medium">${video.price?.toFixed(2) || "0.00"}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-muted-foreground">{video.views || "0"}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {video.isVip && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-amber-500/20 text-amber-400">
                              VIP
                            </span>
                          )}
                          {video.isExclusive && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-primary/20 text-primary">
                              Exclusive
                            </span>
                          )}
                          {video.isOpen && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-success/20 text-success">
                              Open
                            </span>
                          )}
                          {!video.isVip && !video.isExclusive && !video.isOpen && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-muted text-muted-foreground">
                              Preview
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                            video.isActive
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {video.isActive ? "Ativo" : "Oculto"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-primary/20"
                                onClick={() => setEditingVideo(video)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-card border-border max-w-lg max-h-[85vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2 text-base">
                                  <Edit className="w-4 h-4 text-primary" />
                                  Editar Vídeo
                                </DialogTitle>
                              </DialogHeader>
                              {editingVideo && (
                                <VideoForm 
                                  video={editingVideo}
                                  onChange={(updates) => setEditingVideo({ ...editingVideo, ...updates })}
                                  onSave={handleUpdateVideo}
                                  saveLabel="Salvar Alterações"
                                  isLoading={updateVideoMutation.isPending}
                                />
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-destructive/20 text-destructive"
                            onClick={() => handleDeleteVideo(video.id)}
                            disabled={deleteVideoMutation.isPending}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>

          {/* Settings */}
          <motion.div variants={itemVariants} className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Settings className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Configurações</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Telegram */}
              <div className="space-y-3 p-4 rounded-lg bg-background/30 border border-border/50">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <MessageCircle className="w-4 h-4 text-blue-400" />
                  Telegram
                </div>
                <Input
                  value={localSettings.telegramLink}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, telegramLink: e.target.value })
                  }
                  placeholder="https://t.me/seuchannel"
                  className="bg-background/50"
                />
              </div>

              {/* Price */}
              <div className="space-y-3 p-4 rounded-lg bg-background/30 border border-border/50">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  Preço da Oferta
                </div>
                <Input
                  value={localSettings.offerPrice}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, offerPrice: e.target.value })
                  }
                  placeholder="$100"
                  className="bg-background/50"
                />
              </div>

              {/* Stripe */}
              <div className="space-y-3 p-4 rounded-lg bg-background/30 border border-border/50">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Link className="w-4 h-4 text-violet-400" />
                  Link de Pagamento Stripe
                </div>
                <Input
                  value={localSettings.stripeLink}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, stripeLink: e.target.value })
                  }
                  placeholder="https://buy.stripe.com/..."
                  className="bg-background/50"
                />
              </div>

              {/* PayPal */}
              <div className="space-y-3 p-4 rounded-lg bg-background/30 border border-border/50">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <CreditCard className="w-4 h-4 text-blue-500" />
                  Email PayPal
                </div>
                <Input
                  value={localSettings.paypalEmail}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, paypalEmail: e.target.value })
                  }
                  placeholder="pagamentos@email.com"
                  className="bg-background/50"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button 
                onClick={handleSaveSettings} 
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                disabled={updateSettingsMutation.isPending}
              >
                {updateSettingsMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Salvar Configurações
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AdminPasswordGate>
  );
};

export default Admin;
