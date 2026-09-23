package com.freelancer.freelancer_hiring_platform.project;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Project createProject(Project project) {

        if (project.getStatus() == null || project.getStatus().isBlank()) {
            project.setStatus("POSTED");
        }

        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {

        return projectRepository.findAll();
    }

    public Optional<Project> getProjectById(Long id) {

        return projectRepository.findById(id);
    }

    public List<Project> getProjectsByClient(Long clientId) {

        return projectRepository.findByClientId(clientId);
    }

    public List<Project> getProjectsByStatus(String status) {

        return projectRepository.findByStatus(status);
    }

    public Project updateProject(Long id, Project updatedProject) {

        return projectRepository.findById(id)
                .map(existingProject -> {

                    existingProject.setTitle(updatedProject.getTitle());
                    existingProject.setDescription(updatedProject.getDescription());
                    existingProject.setBudget(updatedProject.getBudget());
                    existingProject.setDeadline(updatedProject.getDeadline());
                    existingProject.setStatus(updatedProject.getStatus());
                    existingProject.setClientId(updatedProject.getClientId());

                    return projectRepository.save(existingProject);
                })
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }

    public void deleteProject(Long id) {

        projectRepository.deleteById(id);
    }
}