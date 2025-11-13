//This page display all user defined course work(could be quiz, exam, assignment and project, anything that would have a grade)
//and their grades. User should be able to add and remove course work, as well as setting their weight. A logic of weight setting
//should be made to ensure it is done logically (does not exceed 100%)
import React, {useEffect,useState} from "react";

export default function GradeView(){
  //test entries for grade//
  const grades = [
    { id: 1, cw_title: "Build Database", grade: 87 },
    { id: 2, cw_title: "Populate Database", grade: 92 },
    { id: 3, cw_title: "ER Diagram Design", grade: 75 },
  ];

  //calculate the average of the course works, to be imrpoved//
  let total = 0;
  for(let i = 0 ; i < grades.length;i++){
    total += grades[i].grade;
  }
  total = total/grades.length;
  
  //build a block for each course_work, and the display of the average(later become the accurate calculation of the course GPA)
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