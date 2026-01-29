import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  paymentLink: string;
  price: number;
  views: string;
  duration: string;
  addedAt: string;
  isVip: boolean;
  isActive: boolean;
  stripeEnabled: boolean;
  paypalEnabled: boolean;
  createdAt: string;
}

export interface Settings {
  telegramLink: string;
  telegramUsername: string;
  stripeLink: string;
  paypalEmail: string;
  offerPrice: string;
}

interface ContentStore {
  videos: Video[];
  settings: Settings;
  addVideo: (video: Omit<Video, "id" | "createdAt">) => void;
  updateVideo: (id: string, updates: Partial<Video>) => void;
  deleteVideo: (id: string) => void;
  updateSettings: (settings: Partial<Settings>) => void;
}

const defaultVideos: Video[] = [
  {
    id: "1",
    title: "Premium Collection Vol. 1",
    description: "Exclusive Content - Limited Edition",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    videoUrl: "",
    paymentLink: "",
    price: 30,
    views: "2.5K",
    duration: "1min 30s",
    addedAt: "2 weeks ago",
    isVip: false,
    isActive: true,
    stripeEnabled: true,
    paypalEnabled: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "VIP Special",
    description: "Behind The Scenes - Exclusive Access",
    thumbnail: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&q=80",
    videoUrl: "",
    paymentLink: "",
    price: 60,
    views: "4.3K",
    duration: "2min 15s",
    addedAt: "1 week ago",
    isVip: true,
    isActive: true,
    stripeEnabled: true,
    paypalEnabled: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Exclusive Release",
    description: "Limited Edition - Premium Quality",
    thumbnail: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
    videoUrl: "",
    paymentLink: "",
    price: 45,
    views: "1.8K",
    duration: "3min 45s",
    addedAt: "3 weeks ago",
    isVip: false,
    isActive: true,
    stripeEnabled: true,
    paypalEnabled: false,
    createdAt: new Date().toISOString(),
  },
];

export const useContentStore = create<ContentStore>()(
  persist(
    (set) => ({
      videos: defaultVideos,
      settings: {
        telegramLink: "https://t.me/videosplus",
        telegramUsername: "videosplus",
        stripeLink: "",
        paypalEmail: "",
        offerPrice: "$100",
      },
      addVideo: (video) =>
        set((state) => ({
          videos: [
            ...state.videos,
            {
              ...video,
              id: Date.now().toString(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      updateVideo: (id, updates) =>
        set((state) => ({
          videos: state.videos.map((v) =>
            v.id === id ? { ...v, ...updates } : v
          ),
        })),
      deleteVideo: (id) =>
        set((state) => ({
          videos: state.videos.filter((v) => v.id !== id),
        })),
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: "videosplus-content",
    }
  )
);
