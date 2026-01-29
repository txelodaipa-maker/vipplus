import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import { Plus, Trash2, Edit, Settings, Video, Save, Shield, Link, CreditCard, MessageCircle } from "lucide-react";
import { useContentStore, Video as VideoType } from "@/stores/contentStore";
import { toast } from "sonner";
import { ThumbnailUpload } from "@/components/admin/ThumbnailUpload";
import { VideoUpload } from "@/components/admin/VideoUpload";

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
  const { videos, settings, addVideo, updateVideo, deleteVideo, updateSettings } =
    useContentStore();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoType | null>(null);
  const [newVideo, setNewVideo] = useState({
    title: "",
    description: "",
    thumbnail: "",
    videoUrl: "",
    paymentLink: "",
    isVip: false,
    isActive: true,
    stripeEnabled: true,
    paypalEnabled: true,
  });

  const [localSettings, setLocalSettings] = useState(settings);

  const handleAddVideo = () => {
    if (!newVideo.title || !newVideo.thumbnail) {
      toast.error("Preencha título e faça upload da thumbnail");
      return;
    }
    addVideo(newVideo);
    setNewVideo({
      title: "",
      description: "",
      thumbnail: "",
      videoUrl: "",
      paymentLink: "",
      isVip: false,
      isActive: true,
      stripeEnabled: true,
      paypalEnabled: true,
    });
    setIsAddOpen(false);
    toast.success("Vídeo adicionado com sucesso!");
  };

  const handleUpdateVideo = () => {
    if (!editingVideo) return;
    updateVideo(editingVideo.id, editingVideo);
    setEditingVideo(null);
    toast.success("Vídeo atualizado com sucesso!");
  };

  const handleDeleteVideo = (id: string) => {
    deleteVideo(id);
    toast.success("Vídeo removido com sucesso!");
  };

  const handleSaveSettings = () => {
    updateSettings(localSettings);
    toast.success("Configurações salvas com sucesso!");
  };

  return (
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
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-primary" />
                  Adicionar Vídeo
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label className="text-sm">Título</Label>
                  <Input
                    value={newVideo.title}
                    onChange={(e) =>
                      setNewVideo({ ...newVideo, title: e.target.value })
                    }
                    placeholder="Ex: Premium Collection Vol. 1"
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Descrição</Label>
                  <Input
                    value={newVideo.description}
                    onChange={(e) =>
                      setNewVideo({ ...newVideo, description: e.target.value })
                    }
                    placeholder="Descrição do conteúdo..."
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Thumbnail</Label>
                  <ThumbnailUpload
                    value={newVideo.thumbnail}
                    onChange={(url) => setNewVideo({ ...newVideo, thumbnail: url })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Vídeo</Label>
                  <VideoUpload
                    value={newVideo.videoUrl}
                    onChange={(url) => setNewVideo({ ...newVideo, videoUrl: url })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Link de Pagamento</Label>
                  <Input
                    value={newVideo.paymentLink}
                    onChange={(e) =>
                      setNewVideo({ ...newVideo, paymentLink: e.target.value })
                    }
                    placeholder="https://buy.stripe.com/..."
                    className="bg-background/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                    <Label className="text-sm">VIP Only</Label>
                    <Switch
                      checked={newVideo.isVip}
                      onCheckedChange={(checked) =>
                        setNewVideo({ ...newVideo, isVip: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                    <Label className="text-sm">Stripe</Label>
                    <Switch
                      checked={newVideo.stripeEnabled}
                      onCheckedChange={(checked) =>
                        setNewVideo({ ...newVideo, stripeEnabled: checked })
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                  <Label className="text-sm">PayPal</Label>
                  <Switch
                    checked={newVideo.paypalEnabled}
                    onCheckedChange={(checked) =>
                      setNewVideo({ ...newVideo, paypalEnabled: checked })
                    }
                  />
                </div>
                <Button onClick={handleAddVideo} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Vídeo
                </Button>
              </div>
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
                  <TableHead className="text-muted-foreground">Tipo</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground">Pagamentos</TableHead>
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
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          video.isVip
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-primary/20 text-primary"
                        }`}
                      >
                        {video.isVip ? "VIP" : "Preview"}
                      </span>
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
                    <TableCell>
                      <div className="flex gap-1.5">
                        {video.stripeEnabled && (
                          <span className="text-xs px-2 py-1 rounded bg-violet-500/20 text-violet-400">
                            Stripe
                          </span>
                        )}
                        {video.paypalEnabled && (
                          <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400">
                            PayPal
                          </span>
                        )}
                      </div>
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
                          <DialogContent className="bg-card border-border">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <Edit className="w-5 h-5 text-primary" />
                                Editar Vídeo
                              </DialogTitle>
                            </DialogHeader>
                            {editingVideo && (
                              <div className="space-y-4 pt-4">
                                <div className="space-y-2">
                                  <Label className="text-sm">Título</Label>
                                  <Input
                                    value={editingVideo.title}
                                    onChange={(e) =>
                                      setEditingVideo({
                                        ...editingVideo,
                                        title: e.target.value,
                                      })
                                    }
                                    className="bg-background/50"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm">Descrição</Label>
                                  <Input
                                    value={editingVideo.description}
                                    onChange={(e) =>
                                      setEditingVideo({
                                        ...editingVideo,
                                        description: e.target.value,
                                      })
                                    }
                                    className="bg-background/50"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm">Thumbnail</Label>
                                  <ThumbnailUpload
                                    value={editingVideo.thumbnail}
                                    onChange={(url) =>
                                      setEditingVideo({ ...editingVideo, thumbnail: url })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm">Vídeo</Label>
                                  <VideoUpload
                                    value={editingVideo.videoUrl}
                                    onChange={(url) =>
                                      setEditingVideo({ ...editingVideo, videoUrl: url })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm">Link de Pagamento</Label>
                                  <Input
                                    value={editingVideo.paymentLink}
                                    onChange={(e) =>
                                      setEditingVideo({
                                        ...editingVideo,
                                        paymentLink: e.target.value,
                                      })
                                    }
                                    placeholder="https://buy.stripe.com/..."
                                    className="bg-background/50"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                                    <Label className="text-sm">Ativo</Label>
                                    <Switch
                                      checked={editingVideo.isActive}
                                      onCheckedChange={(checked) =>
                                        setEditingVideo({
                                          ...editingVideo,
                                          isActive: checked,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                                    <Label className="text-sm">VIP</Label>
                                    <Switch
                                      checked={editingVideo.isVip}
                                      onCheckedChange={(checked) =>
                                        setEditingVideo({
                                          ...editingVideo,
                                          isVip: checked,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                                    <Label className="text-sm">Stripe</Label>
                                    <Switch
                                      checked={editingVideo.stripeEnabled}
                                      onCheckedChange={(checked) =>
                                        setEditingVideo({
                                          ...editingVideo,
                                          stripeEnabled: checked,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                                    <Label className="text-sm">PayPal</Label>
                                    <Switch
                                      checked={editingVideo.paypalEnabled}
                                      onCheckedChange={(checked) =>
                                        setEditingVideo({
                                          ...editingVideo,
                                          paypalEnabled: checked,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                                <Button
                                  onClick={handleUpdateVideo}
                                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                                >
                                  <Save className="w-4 h-4 mr-2" />
                                  Salvar Alterações
                                </Button>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-destructive/20 text-destructive"
                          onClick={() => handleDeleteVideo(video.id)}
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
            <Button onClick={handleSaveSettings} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Save className="w-4 h-4" />
              Salvar Configurações
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Admin;
