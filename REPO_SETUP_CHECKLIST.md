# Repository Test Infrastructure Checklist

This document lists what each repository needs to work with Central CI v2.

## Summary

- ✅ **Ready for CI (2/8):** sit-to-stand-planner, ia_robot_sim
- ⚠️ **Partially Ready (1/8):** Genesis_IA
- ❌ **Needs Setup (5/8):** genesis_ros, ia_robot_urdf, robot_self_filter, human-tracking, robot_planner

---

## 1. sit-to-stand-planner ✅ READY

**Type:** Python/ROS
**Status:** Ready for CI

**Has:**
- ✅ run_tests.sh
- ✅ Dockerfile
- ✅ requirements.txt
- ✅ test/ and tests/ directories

**Missing:**
- ⚪ pytest.ini (optional)
- ⚪ setup.cfg (optional)

**Action Required:** None - ready to test!

**Test Command in repositories.yml:**
```yaml
test_command: "./run_tests.sh"
```

---

## 2. ia_robot_sim ✅ READY

**Type:** Genesis + ROS2
**Status:** Ready for CI

**Has:**
- ✅ run_tests.sh
- ✅ Dockerfile
- ✅ tests/ directory
- ✅ Multiple test scripts (local-ci.sh, test-before-push.sh, test-ci-fast.sh)

**Missing:**
- ⚪ requirements.txt (dependencies likely in Dockerfile)

**Action Required:** None - ready to test!

**Test Command in repositories.yml:**
```yaml
test_command: "./run_tests.sh"
```

---

## 3. genesis_ros ❌ NEEDS SETUP

**Type:** ROS2 Bridge
**Status:** Minimal infrastructure

**Has:**
- ✅ test_import.py (basic import test)

**Missing:**
- ❌ run_tests.sh
- ❌ Dockerfile
- ❌ requirements.txt
- ❌ tests/ directory
- ❌ package.xml (should have for ROS2)
- ❌ CMakeLists.txt (should have for ROS2)

**Action Required:**
1. Create `run_tests.sh`:
   ```bash
   #!/bin/bash
   set -e
   source /opt/ros/humble/setup.bash
   colcon build --packages-select genesis_ros
   colcon test --packages-select genesis_ros
   colcon test-result --verbose
   ```
2. Add `Dockerfile` with ROS2 Humble base
3. Create `package.xml` for ROS2 package
4. Add proper test directory structure
5. Create `requirements.txt` for Python dependencies

**Recommended Test Command:**
```yaml
test_command: "./run_tests.sh"  # After creating the script
```

---

## 4. ia_robot_urdf ❌ NEEDS SETUP

**Type:** ROS2 URDF
**Status:** Build infrastructure only

**Has:**
- ✅ package.xml
- ✅ CMakeLists.txt

**Missing:**
- ❌ run_tests.sh
- ❌ Dockerfile
- ❌ tests/ directory
- ❌ URDF validation tests

**Action Required:**
1. Create `run_tests.sh`:
   ```bash
   #!/bin/bash
   set -e
   source /opt/ros/humble/setup.bash

   # Build the package
   colcon build --packages-select ia_robot_urdf

   # Validate URDF files
   check_urdf urdf/ia_robot.urdf

   # Run any additional tests
   colcon test --packages-select ia_robot_urdf
   ```
2. Add `Dockerfile` with ROS2 Humble
3. Create tests for URDF validation
4. Add xacro validation if using xacro files

**Recommended Test Command:**
```yaml
test_command: "./run_tests.sh"
```

---

## 5. robot_self_filter ❌ NEEDS SETUP

**Type:** ROS2 C++
**Status:** Build infrastructure only

**Has:**
- ✅ package.xml
- ✅ CMakeLists.txt

**Missing:**
- ❌ run_tests.sh
- ❌ Dockerfile
- ❌ tests/ directory
- ❌ C++ unit tests

**Action Required:**
1. Create `run_tests.sh`:
   ```bash
   #!/bin/bash
   set -e
   source /opt/ros/humble/setup.bash

   # Build with tests
   colcon build --packages-select robot_self_filter --cmake-args -DBUILD_TESTING=ON

   # Run tests
   colcon test --packages-select robot_self_filter
   colcon test-result --verbose
   ```
2. Add `Dockerfile` with ROS2 Humble + PCL dependencies
3. Create C++ unit tests in test/ directory
4. Update CMakeLists.txt to include test targets

**Recommended Test Command:**
```yaml
test_command: "./run_tests.sh"
```

---

## 6. Genesis_IA ⚠️ PARTIALLY READY

**Type:** Genesis Python
**Status:** Has tests but needs CI wrapper

**Has:**
- ✅ tests/ directory
- ✅ pyproject.toml (modern Python packaging)

**Missing:**
- ❌ run_tests.sh
- ❌ Dockerfile
- ⚪ requirements.txt (dependencies in pyproject.toml)

**Action Required:**
1. Create `run_tests.sh`:
   ```bash
   #!/bin/bash
   set -e

   # Install dependencies
   pip install -e .

   # Run tests
   pytest tests/ -v --tb=short
   ```
2. Add `Dockerfile`:
   ```dockerfile
   FROM python:3.10
   WORKDIR /workspace

   # Install Genesis dependencies
   RUN apt-get update && apt-get install -y \
       libgl1-mesa-glx \
       libglib2.0-0

   COPY . .
   RUN pip install -e .
   ```
3. Extract dependencies to `requirements.txt` for clarity (optional)

**Recommended Test Command:**
```yaml
test_command: "./run_tests.sh"
```

---

## 7. human-tracking ❌ NEEDS SETUP

**Type:** Python Computer Vision
**Status:** No test infrastructure

**Has:**
- ✅ run_tracker.sh (runtime script, not tests)

**Missing:**
- ❌ run_tests.sh
- ❌ Dockerfile
- ❌ requirements.txt
- ❌ tests/ directory
- ❌ pytest configuration

**Action Required:**
1. Create `tests/` directory with test files:
   ```
   tests/
   ├── __init__.py
   ├── test_tracker.py
   ├── test_preprocessing.py
   └── test_integration.py
   ```
2. Create `run_tests.sh`:
   ```bash
   #!/bin/bash
   set -e

   # Install dependencies
   pip install -r requirements.txt
   pip install pytest pytest-cov

   # Run tests
   pytest tests/ -v --cov=src
   ```
3. Add `Dockerfile`:
   ```dockerfile
   FROM python:3.8
   WORKDIR /workspace

   RUN apt-get update && apt-get install -y \
       libopencv-dev \
       python3-opencv

   COPY requirements.txt .
   RUN pip install -r requirements.txt
   ```
4. Create `requirements.txt` with all dependencies

**Recommended Test Command:**
```yaml
test_command: "pytest tests/ -v"
```

---

## 8. robot_planner ❌ NEEDS SETUP

**Type:** Python Planning
**Status:** Has test.py but no infrastructure

**Has:**
- ✅ test.py (single test file)

**Missing:**
- ❌ run_tests.sh
- ❌ Dockerfile
- ❌ requirements.txt
- ❌ tests/ directory structure
- ❌ pytest configuration

**Action Required:**
1. Reorganize tests:
   ```
   tests/
   ├── __init__.py
   ├── test_planner.py  # Move test.py here
   ├── test_path_planning.py
   └── test_constraints.py
   ```
2. Create `run_tests.sh`:
   ```bash
   #!/bin/bash
   set -e

   # Install dependencies
   pip install -r requirements.txt
   pip install pytest

   # Run tests
   pytest tests/ -v
   ```
3. Add `Dockerfile`:
   ```dockerfile
   FROM python:3.8
   WORKDIR /workspace

   COPY requirements.txt .
   RUN pip install -r requirements.txt

   COPY . .
   ```
4. Create `requirements.txt`

**Recommended Test Command:**
```yaml
test_command: "pytest tests/ -v"
```

---

## Quick Setup Priority

### High Priority (Block CI entirely)
1. **genesis_ros** - Missing all test infrastructure
2. **robot_self_filter** - C++ tests needed
3. **ia_robot_urdf** - URDF validation needed

### Medium Priority (Can use fallback commands)
4. **Genesis_IA** - Just needs run_tests.sh wrapper
5. **human-tracking** - Needs test suite creation
6. **robot_planner** - Needs test organization

### Low Priority (Already working)
7. **sit-to-stand-planner** ✅
8. **ia_robot_sim** ✅

---

## Template Files

See `templates/` directory for:
- `run_tests.sh.template` - Generic test script
- `run_tests_ros.sh.template` - ROS-specific test script
- `run_tests_python.sh.template` - Python-specific test script
- `Dockerfile.ros2.template` - ROS2 Dockerfile
- `Dockerfile.python.template` - Python Dockerfile

---

## Testing the Setup

After adding files to a repo, test locally:

```bash
# Clone the repo
git clone https://github.com/Intuitive-Autonomy/REPO_NAME
cd REPO_NAME

# Make run_tests.sh executable
chmod +x run_tests.sh

# Test with Docker (if Dockerfile exists)
docker build -t test-image .
docker run --rm test-image ./run_tests.sh

# Or test directly
./run_tests.sh
```

Then test via Central CI:

```bash
gh workflow run central-ci-v2.yml \
  -f repositories=REPO_NAME \
  -f test_type=smoke
```
