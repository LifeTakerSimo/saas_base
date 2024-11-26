import React, { useState } from 'react';
import ProjectInputModal from '../components/ProjectInputModal';

export default function NouveauProjet() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [projectData, setProjectData] = useState<{ price: string; city: string; surface: string } | null>(null);

  const handleModalSubmit = (data: { price: string; city: string; surface: string }) => {
    setProjectData(data);
    // Logic to generate project details based on data
    console.log('Generating project with:', data);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Nouveau Projet</h1>
      {projectData ? (
        <div>
          {/* Render project details based on projectData */}
          <h2 className="text-xl font-bold">Project Details</h2>
          <p>Price: {projectData.price}</p>
          <p>City: {projectData.city}</p>
          <p>Surface: {projectData.surface}</p>
          {/* Add more detailed sections here */}
        </div>
      ) : (
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Start New Project
        </button>
      )}
      <ProjectInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
} 