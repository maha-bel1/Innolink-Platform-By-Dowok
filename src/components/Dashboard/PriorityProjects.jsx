import React, { useEffect } from 'react';
import Card from '../common/Card';

const PriorityProjects = () => {
  const projects = [
    { name: 'Medical Nano-sensors', progress: 65, color: 'bg-[#4F6DF5]', textColor: 'text-[#4F6DF5]', bgLight: 'bg-[#4F6DF5]/10' },
    { name: 'AI for Diagnostics', progress: 30, color: 'bg-[#7E57C2]', textColor: 'text-[#7E57C2]', bgLight: 'bg-[#7E57C2]/10' },
    { name: 'Biocompatible Materials', progress: 85, color: 'bg-[#43A047]', textColor: 'text-[#43A047]', bgLight: 'bg-[#43A047]/10' },
    { name: 'Medical Robotics', progress: 45, color: 'bg-[#E53935]', textColor: 'text-[#E53935]', bgLight: 'bg-[#E53935]/10' },
  ];

  useEffect(() => {
    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width;
      }, 300);
    });
  }, []);

  return (
    <Card className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-textprimary font-semibold">Priority Projects</h3>
        <button className="text-xs text-accentblue hover:underline">View All</button>
      </div>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex-1">
              <p className="text-textprimary font-medium">{project.name}</p>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                <div
                  className={`${project.color} h-2 rounded-full progress-bar`}
                  data-width={`${project.progress}%`}
                  style={{ width: 0 }}
                ></div>
              </div>
            </div>
            <span className={`text-xs px-2 py-1 ${project.bgLight} ${project.textColor} rounded-full ml-4`}>
              {project.progress}%
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PriorityProjects;