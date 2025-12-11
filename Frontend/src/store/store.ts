import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Course = {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    rating: number;
    lessons: number;
    status?: string;
    image: string;
};

type UIStore = {
    username: string;
    isLoggedIn: boolean;

    currentPage: "login" | "dashboard";

    courses: Course[];

    setUsername: (name: string) => void;
    logout: () => void;
    setPage: (page: "login" | "dashboard") => void;

    setCourses: (data: Course[]) => void;
    updateCourseStatus: (id: string, status: Course["status"]) => void;
};

export const useStore = create(
    persist<UIStore>(
        (set) => ({
            username: "",
            isLoggedIn: false,
            currentPage: "login",

            courses: [],

            setUsername: (name) => set({ username: name }),

            logout: () =>
                set({
                    isLoggedIn: false,
                    username: "",
                    currentPage: "login",
                    courses: [],
                }),

            setPage: (page) => set({ currentPage: page }),

            setCourses: (data) => set({ courses: data }),

            updateCourseStatus: (id, status) =>
                set((state) => ({
                    courses: state.courses.map((c) =>
                        c.id === id ? { ...c, status } : c
                    ),
                })),
        }),
        {
            name: "hawkstack-storage",
        }
    )
);
