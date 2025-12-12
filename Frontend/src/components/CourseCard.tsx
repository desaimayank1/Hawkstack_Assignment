import { useState } from "react";
import { useStore } from "../store/store";

type Course = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  rating: number;
  lessons: number;
  status?: string;
  image: string;
};

export function CourseCard({ course }: { course: Course }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const username = useStore((s) => s.username);
  const updateCourseStatus = useStore((s) => s.updateCourseStatus);

  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/courses/${course.id}/enroll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      if (res.status === 201) {
        updateCourseStatus(course.id, "enrolled");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col">
      <div className="h-44 w-full relative">
        {!imageLoaded && !imageError && (
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        )}

        <img
          src={course.image}
          alt="course"
          className={`object-cover w-full h-full transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
        <div className="absolute left-4 top-4 bg-white/80 px-3 py-1 rounded-full text-xs font-medium">
          {course.category}
        </div>
        <div className="absolute right-4 top-4 bg-white/80 px-2 py-1 rounded-full text-xs flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm">{course.rating}</span>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold leading-snug">{course.title}</h3>
          <p className="mt-2 text-sm text-gray-500 line-clamp-3">{course.subtitle}</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-gray-500 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M4 19h16a1 1 0 001-1v-7H3v7a1 1 0 001 1z" />
            </svg>
            <span>{course.lessons} lessons</span>
          </div>

          {course.status === "enrolled" ? (
            <button
              disabled
              className="px-4 py-2 rounded-lg text-sm bg-gray-200 text-gray-500 cursor-not-allowed"
            >
              Enrolled
            </button>
          ) : (
            <button
              onClick={handleEnroll}
              disabled={loading}
              className={`px-4 py-2 rounded-lg text-sm text-white bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center ${loading ? "cursor-not-allowed" : ""
                }`}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              ) : (
                "Enroll"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
