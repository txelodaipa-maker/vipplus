import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  paymentLink: string;
  isVip: boolean;
  isActive: boolean;
  stripeEnabled: boolean;
  paypalEnabled: boolean;
  createdAt: string;
}

export interface Settings {
  telegramLink: string;
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
    title: "Premium Collection Vol. 1 - Exclusive Content",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    videoUrl: "",
    paymentLink: "",
    isVip: false,
    isActive: true,
    stripeEnabled: true,
    paypalEnabled: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "VIP Special - Behind The Scenes",
    thumbnail: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&q=80",
    videoUrl: "",
    paymentLink: "",
    isVip: true,
    isActive: true,
    stripeEnabled: true,
    paypalEnabled: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Exclusive Release - Limited Edition",
    thumbnail: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
    videoUrl: "",
    paymentLink: "",
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
