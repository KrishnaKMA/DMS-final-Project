import React, {useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Dumpster from "../assets/trash_icon.png";
import AddButton from "../assets/AddButton.png";


//--------component function---------//
function Banner({course}){
    return(
        <div className="relative w-full h-[35vh] bg-gray-100 rounded-xl shadow-md pb-10">
            <div className="absolute bottom-4 left-6 text-black text-left">
            <p className="text-lg font-medium">{course.code}</p>
            <p className="text-2xl font-bold">{course.name}</p>
        </div>
    </div>
    )
}

function CustomTab() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="mt-8 -screen">
        {/* https://mui.com/material-ui/react-tabs/ */}
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Upcoming Assignment" value="1" className="w-1/4 focus:outline-none focus:ring-0"/>
                    <Tab label="Grade" value="2" className="w-1/4 focus:outline-none focus:ring-0"/>
                    <Tab label="Practice Quiz" value="3" className="w-1/4 focus:outline-none focus:ring-0"/>
                    <Tab label="Course Resource" value="4" className="w-1/4 focus:outline-none focus:ring-0"/>
                </TabList>
            </Box>
            <TabPanel value="1">
                <AssignmentView />
            </TabPanel>
            <TabPanel value="2">
                <GradeView />
            </TabPanel>
            <TabPanel value="3">
                <QuizView />
            </TabPanel>
            <TabPanel value="4">
                    <ResourceView />
            </TabPanel>
        </TabContext>
    </div>
  );
}

function AssignmentView({courseID}){
    const [assignments, setAssignments] = useState([]);

    //fetch set of assignments from database using courseID//
    /*useEffect(()=>{
        fetch(`http://localhost:3000/api/assignments?course_id=${courseID}`)
        .then((res) => res.json())
        .then((data) => setAssignments(data))
        .catch((err) => console.error(err))
    }, [courseID]);*/

    useEffect(() => {
        const mockAssignment = [
            {
                cw_id:1,
                user_id:1,
                course_id:1,
                cw_title: "Build Database",
                cw_type: "assignment",
                description: "build a database for assignment 2",
                due_date: "2025-12-01",
                grade: null,
            },
            {
                cw_id:2,
                user_id:1,
                course_id:1,
                cw_title: "populate database",
                cw_type: "assignment",
                description: "populate the database for assignmnet 2",
                due_date: "2025-12-10",
                grade: null,
            },
        ];
        setAssignments(mockAssignment);
    }, []);

    return(
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Assignments</h2>
                <div className="flex flex-col gap-4">
                {assignments.map((assignment) => (
                    <div key={assignment.cw_id} className="bg-white shadow-md rounded-xl border border-gray-300 p-4 w-full hover:shadow-lg transition">
                        <h3 className="text-lg font-semibold text-gray-800">
                            {assignment.cw_title}
                        </h3>
                        <p className="text-gray-600 mt-2">{assignment.description}</p>
                        <p className="text-sm text-gray-500 mt-3">
                            Due: {new Date(assignment.due_date).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function GradeView(){
    const grades = [
        { id: 1, cw_title: "Build Database", grade: 87 },
        { id: 2, cw_title: "Populate Database", grade: 92 },
        { id: 3, cw_title: "ER Diagram Design", grade: 75 },
    ];

    let total = 0;
    for(let i = 0 ; i < grades.length;i++){
        total += grades[i].grade;
    }
    total = total/grades.length;

  return (
    <div className="p-6">
      <h2 className="text-2xl text-black-500 font-bold mb-4">Grades</h2>
      <div className="divide-y divide-gray-300">
        {grades.map((g) => (
          <div key={g.id} className="flex justify-between items-center py-3">
            <span className="text-gray-800 font-medium">{g.cw_title}</span>
            <span className="text-gray-700 font-semibold">{g.grade}%</span>
          </div>
        ))}
        <div className="flex justify-between text-gray-800 font-semibold border-t border-gray-300 pt-2 mt-2">
            <span className="text-gray-800 font-medium">Total</span>
            <span className="text-gray-700 font-semibold">{total.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}

function QuizView(){
    const quizzes = [
    {
      quiz_id: 1,
      quiz_name: "Database Fundamentals Quiz",
      date: "2025-11-25",
      grade: 88,
    },
    {
      quiz_id: 2,
      quiz_name: "SQL Query Practice",
      date: "2025-12-02",
      grade: 94,
    },
    {
      quiz_id: 3,
      quiz_name: "Normalization and Keys",
      date: "2025-12-10",
      grade: 79,
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Quizzes</h2>
      <div className="space-y-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.quiz_id}
            className="bg-white shadow-md rounded-xl border border-gray-300 p-4 w-full mx-auto hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {quiz.quiz_name}
            </h3>
            <p className="text-gray-600 mt-2">
              Date: {new Date(quiz.date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-700 font-semibold mt-2">
              Grade: {quiz.grade}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResourceView(){
  const [testResources, setResources] = useState([
    { resource_id: 1, 
      resource_name: "Course Syllabus", 
      file_url: "/uploads/course_syallabus.pdf",
      type: "pdf",
      last_updated_time: "2025-11-11"
    },
    {
      resource_id: 2,
      resource_name: "Assignment Guidelines",
      file_url: "/uploads/assignment.pdf",
      type: "pdf",
      last_updated_time: "2025-11-10",
    }
  ]);

  //file upload form state//
  const[showForm, setShowForm]= useState(false);


  const fileDeleteHandler = (file) => {  
    const user_confirmation = window.confirm(`You are about to delete ${file.resource_name}.${file.type}`);
    if(user_confirmation){
      setResources((prev) => prev.filter((item) => item.resource_id !== file.resource_id));
    }
  };
  
  return (
    <div className="p-1">
      <div className="divide-y divide-gray-300">
        <button  className="flex items-center gap-2 px-4 pb-2 mb-4 rounded 
             bg-transparent text-blue-600 
             hover:bg-gray-200 
             focus:outline-none focus:ring-0 
             active:outline-none active:ring-0 
             border-none transition"
  style={{ outline: "none", boxShadow: "none" }}
          onClick={() => setShowForm(true)}>
          <img src={AddButton} alt="Add File" className="w-5 h-5" />
          Upload a file
        </button>
        {showForm && <UploadForm setShowFrom={setShowForm} />}
        {testResources.map((tr) => (
          <div key={tr.resource_id} className="flex justify-between items-center py-3">
            <span className="text-gray-800 font-medium">{tr.resource_name}</span>
            <span className="text-gray-700 font-semibold">uploaded on: {tr.last_updated_time}</span>
            <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded" 
                    onClick={() => fileDeleteHandler(tr)}>
              <img src={Dumpster} alt="Delete" className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function UploadForm (){
  const handleFormSubmit = () =>{

  }

  return(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Upload a new file
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              File Name
            </label>
            <input type="text"
                    value="filename"
                    onChange={(e) => setFileName(e.target.value)}
                    className="w-full text-black bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Select File
            </label>
            <input
              type="file"
              onChange={(e) => setFileUpload(e.target.files[0])}
              className="w-full text-black bg-white border border-gray-300 rounded p-2 appearance-none file:bg-blue-600 file:text-white file:border-0 file:rounded file:px-3 file:py-1 hover:file:bg-blue-700"
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
            >
            Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
            Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
 
export default function CourseLayout({course}) {
    if(!course) return <p>No course selected.</p>;

    return (
        <div>
            <Banner course={course} />
            <CustomTab />
        </div>
    )
}


