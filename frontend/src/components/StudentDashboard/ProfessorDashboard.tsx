// Author: Yatrik Pravinbhai Amrutiya
import React, {useEffect, useState} from 'react'
import CourseList from './CourseList'
import Analytics from './Analytics'
import {course} from '../model/course.model';
import envVariables from '../../importenv';
import Loader from "../../loading";

function StudentDashboard() {

    const [isLoading, setLoading] = useState(false);

    const [courses, setCourses] = useState<course[]>([]);


    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = () => {
        setLoading(true);

        fetchCoursesFromBackend().then((courses) => {
            setCourses(courses);
            setLoading(false);
        }).finally(() => {
            // setLoading(false);
        });
    };


    function fetchCoursesFromBackend(): Promise<course[]> {
        const backendURL = envVariables.backendURL;

        return fetch(`${backendURL}/get-courses`) // Use your backend API endpoint for getting courses here
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data.courseList)) {
                    return data.courseList as course[];
                } else {
                    return [];
                }
            })
            .catch((error) => {
                console.error(error);
                return [];
            });
    }

    return (
        <>
            {isLoading && <Loader/>}
            <div className="d-flex mt-5 landing-container">
                <CourseList courses={courses}/>
                <Analytics/>
            </div>
        </>
    );
}

export default StudentDashboard;