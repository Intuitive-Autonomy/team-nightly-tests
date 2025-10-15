# Team Nightly Tests - Central CI Repository

[![Central CI v2](https://github.com/Intuitive-Autonomy/team-nightly-tests/workflows/Central%20CI%20v2/badge.svg)](https://github.com/Intuitive-Autonomy/team-nightly-tests/actions/workflows/central-ci-v2.yml)

This repository provides centralized CI testing for multiple robotics projects in the team.

## Project Status

All repositories are tested through the Central CI v2 system:

| Repository | CI Status | Description |
|------------|-----------|-------------|
| **sit-to-stand-planner** | [![CI](https://github.com/Intuitive-Autonomy/team-nightly-tests/workflows/Central%20CI%20v2/badge.svg)](https://github.com/Intuitive-Autonomy/team-nightly-tests/actions/workflows/central-ci-v2.yml) | Motion planning for sit-to-stand transitions |
| **ia_robot_sim** | [![CI](https://github.com/Intuitive-Autonomy/team-nightly-tests/workflows/Central%20CI%20v2/badge.svg)](https://github.com/Intuitive-Autonomy/team-nightly-tests/actions/workflows/central-ci-v2.yml) | Robot simulation using Genesis |
| **genesis_ros** | [![CI](https://github.com/Intuitive-Autonomy/team-nightly-tests/workflows/Central%20CI%20v2/badge.svg)](https://github.com/Intuitive-Autonomy/team-nightly-tests/actions/workflows/central-ci-v2.yml) | ROS2 bridge for Genesis simulator |
| **ia_robot_urdf** | [![CI](https://github.com/Intuitive-Autonomy/team-nightly-tests/workflows/Central%20CI%20v2/badge.svg)](https://github.com/Intuitive-Autonomy/team-nightly-tests/actions/workflows/central-ci-v2.yml) | Robot description files |
| **Genesis_IA** | [![CI](https://github.com/Intuitive-Autonomy/team-nightly-tests/workflows/Central%20CI%20v2/badge.svg)](https://github.com/Intuitive-Autonomy/team-nightly-tests/actions/workflows/central-ci-v2.yml) | Genesis Integration for IA |
| **human-tracking** | [![CI](https://github.com/Intuitive-Autonomy/team-nightly-tests/workflows/Central%20CI%20v2/badge.svg)](https://github.com/Intuitive-Autonomy/team-nightly-tests/actions/workflows/central-ci-v2.yml) | Human pixel tracking from RGB cameras |

**[View Dashboard](https://intuitive-autonomy.github.io/team-nightly-tests/dashboard-v2.html)** | **[Central CI Actions](https://github.com/Intuitive-Autonomy/team-nightly-tests/actions/workflows/central-ci-v2.yml)**

## Central CI Features

### What's New
- **Scalable Architecture**: Configuration-driven testing for unlimited repositories
- **Matrix Execution**: Test multiple repositories in parallel (up to 3 concurrent)
- **Dynamic Discovery**: Auto-detects enabled/disabled repositories from `repositories.yml`
- **Type-Aware Testing**: Different strategies for ROS, Python, Genesis, and other project types
- **Enhanced Dashboard**: Real-time GitHub API integration with filtering and statistics

### Dashboard
View the **[Central CI Dashboard](https://intuitive-autonomy.github.io/team-nightly-tests/dashboard-v2.html)** for scalable, real-time status with filtering and statistics.

## Repositories Managed

### Currently Active
- **sit-to-stand-planner**: Motion planning for sit-to-stand transitions (ROS Humble)
- **ia_robot_sim**: Robot simulation using Genesis (Genesis + ROS2)
- **genesis_ros**: ROS2 bridge for Genesis simulator (ROS2)
- **ia_robot_urdf**: Robot description files (ROS2 + URDF)
- **Genesis_IA**: Genesis Integration for IA (Genesis + Python)
- **human-tracking**: Human pixel tracking from RGB cameras (Python + OpenCV)

### Ready to Enable
- **robot_self_filter**: Robot self-filtering package (ROS2 + C++)
- **robot_planner**: Robot planning algorithms (Python)
- **pose-estimation**: 3D pose estimation (Python + PyTorch)
- **human-pose-ia**: Human pose for IA (Python + TensorFlow)

## Workflows

### Central CI v2 (`central-ci-v2.yml`)
Scalable, configuration-driven workflow that runs tests for all enabled repositories.

**Triggers:**
- Manual dispatch with repository selection
- Nightly schedule (2 AM UTC)

**Usage:**
```bash
# Test all repositories with smoke tests
gh workflow run central-ci-v2.yml -f repositories=all -f test_type=smoke

# Test specific repository
gh workflow run central-ci-v2.yml -f repositories=sit-to-stand-planner -f test_type=all

# Test multiple repositories
gh workflow run central-ci-v2.yml -f repositories="sit-to-stand-planner,Genesis_IA" -f test_type=smoke
```

## Test Types

### Smoke Tests
- Basic validation and compilation checks
- Quick feedback for development
- Resource-efficient (2G memory, 2 CPUs)

### Comprehensive Tests
- Full test suite execution
- Code quality checks (linting)
- More thorough validation (4G memory, 2 CPUs)

## Setup Requirements

### Repository Structure
Each target repository should have one or more of:
- `Dockerfile` for containerized testing
- `requirements.txt` for Python dependencies
- `package.xml` for ROS packages
- `run_tests.sh` for custom test execution

### Self-Hosted Runner
Workflows are configured for self-hosted runners with:
- Docker support
- Minimum 4GB RAM
- Ubuntu/Linux environment
- Git and basic build tools

### GitHub Repository Settings
1. Enable Actions in repository settings
2. Configure self-hosted runner
3. Set up repository secrets (if needed):
   - `DOCKER_REGISTRY_TOKEN` (if using private registries)
   - Repository-specific secrets

## Usage Examples

### Running Tests for All Repositories
```bash
# Nightly comprehensive tests
gh workflow run central-ci-v2.yml -f repositories=all -f test_type=all

# Quick smoke test validation
gh workflow run central-ci-v2.yml -f repositories=all -f test_type=smoke
```

### Testing Specific Repositories
```bash
# Test only sit-to-stand-planner
gh workflow run central-ci-v2.yml -f repositories=sit-to-stand-planner -f test_type=smoke

# Test Genesis_IA with specific branch
gh workflow run central-ci-v2.yml -f repositories=Genesis_IA -f test_type=all
```

### Monitoring Results
- Check GitHub Actions tab for workflow status
- View the dashboard for real-time status
- Download test artifacts for detailed logs
- Review step summaries for quick status overview

## Adding New Repositories

1. **Add repository to `repositories.yml`**:
   ```yaml
   - name: new-repo
     type: ros  # or python, genesis, etc.
     description: Description of the repository
     test_command: "./run_tests.sh"
     timeout_minutes: 30
     tech_stack: ["ROS2", "Python"]
     enabled: true
   ```

2. **Create `run_tests.sh` in the repository**:
   - Add test execution logic
   - Ensure it works in Docker environment
   - Make it executable: `chmod +x run_tests.sh`

3. **Test the integration**:
   ```bash
   gh workflow run central-ci-v2.yml -f repositories=new-repo -f test_type=smoke
   ```

4. **Update dashboard configuration** (optional):
   - Edit `docs/repositories.js` to add the repository to the dashboard

## Best Practices

### Repository Preparation
- Include `run_tests.sh` for standardized test execution
- Use Docker for consistent environments
- Document test requirements in repository README
- Keep test execution under 30 minutes

### Workflow Maintenance
- Monitor resource usage and adjust limits
- Update base images and dependencies regularly
- Keep workflow timeouts reasonable
- Clean up Docker resources after tests

### Security Considerations
- Use repository secrets for sensitive data
- Avoid exposing credentials in logs
- Validate inputs in workflow dispatch
- Limit workflow permissions appropriately

## Troubleshooting

### Common Issues
1. **Docker build failures**: Check Dockerfile and dependencies
2. **Test timeouts**: Increase timeout or optimize tests
3. **Resource limits**: Adjust memory/CPU allocations
4. **Missing dependencies**: Update requirements or Docker base image

### Debugging Steps
1. Check workflow logs in GitHub Actions
2. Run tests locally using same Docker setup
3. Verify self-hosted runner status
4. Check repository access permissions

## Monitoring and Maintenance

### Scheduled Tasks
- Nightly runs provide regression detection
- Weekly dependency updates (manual)
- Monthly workflow performance review

### Metrics to Track
- Test execution time trends
- Success/failure rates by repository
- Resource utilization patterns
- Test coverage improvements