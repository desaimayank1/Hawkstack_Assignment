import { create } from 'zustand';

interface Course {
  id: number;
  name: string;
  description: string;
  enrolled: boolean;
}

interface User {
  name: string;
}

interface Store {
  user: User | null;
  courses: Course[];
  setUser: (name: string) => void;
  setCourses: (courses: Course[]) => void;
  enrollCourse: (courseId: number) => void;
}

export const useStore = create<Store>((set, get) => ({
  user: null,
  courses: [
    { id: 1, name: 'React Basics', description: 'Learn the fundamentals of React', enrolled: false },
    { id: 2, name: 'Node.js Essentials', description: 'Understand Node.js and Express', enrolled: false },
    { id: 3, name: 'TypeScript Intro', description: 'Get started with TypeScript', enrolled: false },
    { id: 4, name: 'Tailwind CSS', description: 'Design beautiful UIs with Tailwind', enrolled: false },
    { id: 5, name: 'Fullstack Project', description: 'Build a full-stack app from scratch', enrolled: false },
  ],
  setUser: (name: string) => set({ user: { name } }),
  setCourses: (courses) => set({ courses }),
  enrollCourse: (courseId: number) => {
    set({
      courses: get().courses.map((course) =>
        course.id === courseId ? { ...course, enrolled: true } : course
      ),
    });
  },
}));
