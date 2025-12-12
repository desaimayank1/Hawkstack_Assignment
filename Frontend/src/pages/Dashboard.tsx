import { useEffect } from "react";
import { useStore } from "../store/store";
import { Header } from "../components/Header";
import { CourseCard } from "../components/CourseCard";
import type { Course } from "../store/store";

export default function DashboardPage() {
  const courses = useStore((s) => s.courses);
  const setCourses = useStore((s) => s.setCourses);
  const username = useStore((s) => s.username);

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      try {
        const userRes = await fetch(`http://localhost:3000/user/${username}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const userData = await userRes.json();
        const enrolledCourseIds = userData.courses?.map((c: Course) => c.id);

        const courseRes = await fetch(`http://localhost:3000/courses`);
        const courseData = await courseRes.json();

        const finalCourses = courseData.courses.map((course: Course) => ({
          ...course,
          status: enrolledCourseIds.includes(course.id)
            ? "enrolled"
            : "not-enrolled",
        }));
          console.log(finalCourses)
        setCourses(finalCourses);

      } catch (e) {
        console.error("Error fetching dashboard data", e);
      }
    };

    fetchData();
  }, [setCourses]);

  return (
    <div className="min-h-screen text-gray-900">
      <Header />
      <div className="bg-gray-50 pt-8 pb-10 min-h-[88vh] px-3 sm:px-6">
        <main className="max-w-7xl mx-auto">
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
