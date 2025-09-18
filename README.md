# Team Nightly Tests - Central CI Repository

This repository provides centralized CI testing for multiple robotics projects in the team.

## Repositories Managed

- **sit-to-stand-planner**: Motion planning for sit-to-stand transitions
- **isaac_sim_nav**: Navigation simulation using Isaac Sim

## Workflows

### 1. Central CI (`central-ci.yml`)
Runs tests for all repositories in a single workflow.

**Triggers:**
- Manual dispatch with repository selection
- Nightly schedule (2 AM UTC)

**Usage:**
```bash
# Test all repositories with smoke tests
gh workflow run central-ci.yml -f repositories=all -f test_type=smoke

# Test specific repository
gh workflow run central-ci.yml -f repositories=sit-to-stand-planner -f test_type=all

# Test multiple repositories
gh workflow run central-ci.yml -f repositories="sit-to-stand-planner,isaac_sim_nav" -f test_type=smoke
```

### 2. Individual Repository Workflows

#### Sit-to-Stand Planner CI (`sit-to-stand-planner-ci.yml`)
- Dedicated workflow for sit-to-stand-planner repository
- Uses Docker-based ROS Humble environment
- Supports smoke and comprehensive test modes

#### Isaac Sim Nav CI (`isaac-sim-nav-ci.yml`)
- Dedicated workflow for isaac_sim_nav repository
- Auto-detects build system (Docker, Python, ROS, CMake)
- Adapts test strategy based on repository structure

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
gh workflow run central-ci.yml -f repositories=all -f test_type=all

# Quick smoke test validation
gh workflow run central-ci.yml -f repositories=all -f test_type=smoke
```

### Testing Specific Repositories
```bash
# Test only sit-to-stand-planner
gh workflow run sit-to-stand-planner-ci.yml -f test_type=smoke

# Test isaac_sim_nav with specific branch
gh workflow run isaac-sim-nav-ci.yml -f test_type=all -f repository_ref=feature-branch
```

### Monitoring Results
- Check GitHub Actions tab for workflow status
- Download test artifacts for detailed logs
- Review step summaries for quick status overview

## Adding New Repositories

1. **Create dedicated workflow file**:
   ```yaml
   name: New Repo CI
   # Copy from existing template and modify
   ```

2. **Update central CI workflow**:
   - Add repository to `determine-repos` job
   - Create new test job following the pattern
   - Update `report-results` job dependencies

3. **Test the integration**:
   ```bash
   gh workflow run central-ci.yml -f repositories=new-repo -f test_type=smoke
   ```

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