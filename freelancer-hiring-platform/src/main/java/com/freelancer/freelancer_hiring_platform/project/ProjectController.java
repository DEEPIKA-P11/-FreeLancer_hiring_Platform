package com.freelancer.freelancer_hiring_platform.project;

import com.freelancer.freelancer_hiring_platform.entity.User;
import com.freelancer.freelancer_hiring_platform.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final UserRepository userRepository;

    public ProjectController(ProjectService projectService,
                             UserRepository userRepository) {
        this.projectService = projectService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<?> createProject(
            @RequestBody Project project,
            Authentication authentication) {

        User user = getAuthenticatedUser(authentication);

        if (!"CLIENT".equals(user.getRole())) {
            return ResponseEntity.status(403)
                    .body("Only clients can create projects");
        }

        // Always take clientId from the logged-in user
        project.setClientId(user.getId());

        return ResponseEntity.ok(projectService.createProject(project));
    }

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {

        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(
            @PathVariable Long id) {

        return projectService.getProjectById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<Project>> getProjectsByClient(
            @PathVariable Long clientId) {

        return ResponseEntity.ok(
                projectService.getProjectsByClient(clientId)
        );
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Project>> getProjectsByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                projectService.getProjectsByStatus(status)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(
            @PathVariable Long id,
            @RequestBody Project updatedProject,
            Authentication authentication) {

        User user = getAuthenticatedUser(authentication);

        if (!"CLIENT".equals(user.getRole())) {
            return ResponseEntity.status(403)
                    .body("Only clients can update projects");
        }

        Project existingProject = projectService.getProjectById(id)
                .orElse(null);

        if (existingProject == null) {
            return ResponseEntity.notFound().build();
        }

        if (!user.getId().equals(existingProject.getClientId())) {
            return ResponseEntity.status(403)
                    .body("You can update only your own projects");
        }

        updatedProject.setClientId(user.getId());

        return ResponseEntity.ok(
                projectService.updateProject(id, updatedProject)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(
            @PathVariable Long id,
            Authentication authentication) {

        User user = getAuthenticatedUser(authentication);

        if (!"CLIENT".equals(user.getRole())) {
            return ResponseEntity.status(403)
                    .body("Only clients can delete projects");
        }

        Project existingProject = projectService.getProjectById(id)
                .orElse(null);

        if (existingProject == null) {
            return ResponseEntity.notFound().build();
        }

        if (!user.getId().equals(existingProject.getClientId())) {
            return ResponseEntity.status(403)
                    .body("You can delete only your own projects");
        }

        projectService.deleteProject(id);

        return ResponseEntity.noContent().build();
    }

    private User getAuthenticatedUser(Authentication authentication) {

        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() ->
                        new RuntimeException("Authenticated user not found"));
    }
}