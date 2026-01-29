import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
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
import { Plus, Trash2, Edit, Settings, Video, Save } from "lucide-react";
import { useContentStore, Video as VideoType } from "@/stores/contentStore";
import { toast } from "sonner";

const Admin = () => {
  const { videos, settings, addVideo, updateVideo, deleteVideo, updateSettings } =
    useContentStore();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoType | null>(null);
  const [newVideo, setNewVideo] = useState({
    title: "",
    thumbnail: "",
    videoUrl: "",
    isVip: false,
    isActive: true,
    stripeEnabled: true,
    paypalEnabled: true,
  });

  const [localSettings, setLocalSettings] = useState(settings);

  const handleAddVideo = () => {
    if (!newVideo.title || !newVideo.thumbnail) {
      toast.error("Please fill in title and thumbnail URL");
      return;
    }
    addVideo(newVideo);
    setNewVideo({
      title: "",
      thumbnail: "",
      videoUrl: "",
      isVip: false,
      isActive: true,
      stripeEnabled: true,
      paypalEnabled: true,
    });
    setIsAddOpen(false);
    toast.success("Video added successfully");
  };

  const handleUpdateVideo = () => {
    if (!editingVideo) return;
    updateVideo(editingVideo.id, editingVideo);
    setEditingVideo(null);
    toast.success("Video updated successfully");
  };

  const handleDeleteVideo = (id: string) => {
    deleteVideo(id);
    toast.success("Video deleted successfully");
  };

  const handleSaveSettings = () => {
    updateSettings(localSettings);
    toast.success("Settings saved successfully");
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your content and settings</p>
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary text-primary-foreground gap-2">
                <Plus className="w-4 h-4" />
                Add Video
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card">
              <DialogHeader>
                <DialogTitle>Add New Video</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={newVideo.title}
                    onChange={(e) =>
                      setNewVideo({ ...newVideo, title: e.target.value })
                    }
                    placeholder="Video title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Thumbnail URL</Label>
                  <Input
                    value={newVideo.thumbnail}
                    onChange={(e) =>
                      setNewVideo({ ...newVideo, thumbnail: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Video URL (optional)</Label>
                  <Input
                    value={newVideo.videoUrl}
                    onChange={(e) =>
                      setNewVideo({ ...newVideo, videoUrl: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>VIP Only</Label>
                  <Switch
                    checked={newVideo.isVip}
                    onCheckedChange={(checked) =>
                      setNewVideo({ ...newVideo, isVip: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Stripe Enabled</Label>
                  <Switch
                    checked={newVideo.stripeEnabled}
                    onCheckedChange={(checked) =>
                      setNewVideo({ ...newVideo, stripeEnabled: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>PayPal Enabled</Label>
                  <Switch
                    checked={newVideo.paypalEnabled}
                    onCheckedChange={(checked) =>
                      setNewVideo({ ...newVideo, paypalEnabled: checked })
                    }
                  />
                </div>
                <Button onClick={handleAddVideo} className="w-full gradient-primary text-primary-foreground">
                  Add Video
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Videos Table */}
        <div className="glass-card p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Video className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Videos</h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payments</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {videos.map((video) => (
                  <TableRow key={video.id}>
                    <TableCell className="font-medium max-w-xs truncate">
                      {video.title}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          video.isVip
                            ? "bg-warning/20 text-warning"
                            : "bg-primary/20 text-primary"
                        }`}
                      >
                        {video.isVip ? "VIP" : "Preview"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          video.isActive
                            ? "bg-success/20 text-success"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {video.isActive ? "Active" : "Hidden"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {video.stripeEnabled && (
                          <span className="text-xs px-2 py-1 rounded bg-secondary">
                            Stripe
                          </span>
                        )}
                        {video.paypalEnabled && (
                          <span className="text-xs px-2 py-1 rounded bg-secondary">
                            PayPal
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setEditingVideo(video)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="glass-card">
                            <DialogHeader>
                              <DialogTitle>Edit Video</DialogTitle>
                            </DialogHeader>
                            {editingVideo && (
                              <div className="space-y-4 pt-4">
                                <div className="space-y-2">
                                  <Label>Title</Label>
                                  <Input
                                    value={editingVideo.title}
                                    onChange={(e) =>
                                      setEditingVideo({
                                        ...editingVideo,
                                        title: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Thumbnail URL</Label>
                                  <Input
                                    value={editingVideo.thumbnail}
                                    onChange={(e) =>
                                      setEditingVideo({
                                        ...editingVideo,
                                        thumbnail: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Video URL</Label>
                                  <Input
                                    value={editingVideo.videoUrl}
                                    onChange={(e) =>
                                      setEditingVideo({
                                        ...editingVideo,
                                        videoUrl: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="flex items-center justify-between">
                                  <Label>Active</Label>
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
                                <div className="flex items-center justify-between">
                                  <Label>VIP Only</Label>
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
                                <div className="flex items-center justify-between">
                                  <Label>Stripe Enabled</Label>
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
                                <div className="flex items-center justify-between">
                                  <Label>PayPal Enabled</Label>
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
                                <Button
                                  onClick={handleUpdateVideo}
                                  className="w-full gradient-primary text-primary-foreground"
                                >
                                  Save Changes
                                </Button>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteVideo(video.id)}
                          className="text-destructive hover:text-destructive"
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
        </div>

        {/* Settings */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-6">
            <Settings className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Settings</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Telegram Link</Label>
              <Input
                value={localSettings.telegramLink}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, telegramLink: e.target.value })
                }
                placeholder="https://t.me/..."
              />
            </div>
            <div className="space-y-2">
              <Label>Offer Price</Label>
              <Input
                value={localSettings.offerPrice}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, offerPrice: e.target.value })
                }
                placeholder="$100"
              />
            </div>
            <div className="space-y-2">
              <Label>Stripe Payment Link</Label>
              <Input
                value={localSettings.stripeLink}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, stripeLink: e.target.value })
                }
                placeholder="https://buy.stripe.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label>PayPal Email</Label>
              <Input
                value={localSettings.paypalEmail}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, paypalEmail: e.target.value })
                }
                placeholder="payments@example.com"
              />
            </div>
          </div>
          <div className="mt-6">
            <Button onClick={handleSaveSettings} className="gradient-primary text-primary-foreground gap-2">
              <Save className="w-4 h-4" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
