// Repository configuration for dashboard
// This file contains the repository definitions used by the dashboard

export const repositoryConfig = {
    // Currently active repositories
    active: [
        {
            name: 'sit-to-stand-planner',
            displayName: 'Sit-to-Stand Planner',
            description: 'Motion planning for sit-to-stand transitions',
            techStack: ['ROS Humble', 'Docker', 'Python'],
            type: 'ros',
            emoji: '🚶',
            workflowName: 'Self-Hosted%20CI',
            isPrivate: true,
            enabled: true
        },
        {
            name: 'ia_robot_sim',
            displayName: 'IA Robot Sim',
            description: 'Robot simulation using Genesis',
            techStack: ['Genesis', 'ROS2', 'Python'],
            type: 'genesis',
            emoji: '🤖',
            workflowName: 'CI',
            isPrivate: true,
            enabled: true
        }
    ],

    // Additional repositories (can be enabled)
    additional: [
        {
            name: 'genesis_ros',
            displayName: 'Genesis ROS',
            description: 'ROS2 bridge for the Genesis simulator',
            techStack: ['ROS2', 'Genesis', 'C++'],
            type: 'ros',
            emoji: '🌍',
            workflowName: 'CI',
            isPrivate: true,
            enabled: false
        },
        {
            name: 'ia_robot_urdf',
            displayName: 'IA Robot URDF',
            description: 'Robot description files for IA robot',
            techStack: ['ROS2', 'URDF', 'YAML'],
            type: 'ros',
            emoji: '🤖',
            workflowName: 'CI',
            isPrivate: true,
            enabled: false
        },
        {
            name: 'robot_self_filter',
            displayName: 'Robot Self Filter',
            description: 'ROS2 version of the robot_self_filter package',
            techStack: ['ROS2', 'C++', 'PCL'],
            type: 'ros',
            emoji: '🔧',
            workflowName: 'CI',
            isPrivate: true,
            enabled: false
        },
        {
            name: 'pose-estimation',
            displayName: 'Pose Estimation',
            description: '3D human pose estimation with monocular RGB camera',
            techStack: ['Python', 'OpenCV', 'PyTorch'],
            type: 'python',
            emoji: '👤',
            workflowName: 'CI',
            isPrivate: false,
            enabled: false
        }
    ],

    // Central repository
    central: {
        name: 'team-nightly-tests',
        displayName: 'Central CI',
        description: 'Centralized testing for all repositories',
        techStack: ['GitHub Actions', 'Docker', 'YAML'],
        type: 'ci',
        emoji: '🎯',
        workflowName: 'Central%20CI%20-%20All%20Repositories',
        isPrivate: false,
        enabled: true
    }
};

// Helper functions
export function getAllRepositories() {
    return [repositoryConfig.central, ...repositoryConfig.active, ...repositoryConfig.additional];
}

export function getEnabledRepositories() {
    return [repositoryConfig.central, ...repositoryConfig.active.filter(repo => repo.enabled)];
}

export function getRepositoryByName(name) {
    return getAllRepositories().find(repo => repo.name === name);
}

export function getActiveRepositories() {
    return repositoryConfig.active.filter(repo => repo.enabled);
}

export function getRepositoriesByType(type) {
    return getAllRepositories().filter(repo => repo.type === type);
}

// Quick actions configuration
export const quickActions = [
    {
        title: '🚀 Run Central CI v2',
        url: 'https://github.com/Intuitive-Autonomy/team-nightly-tests/actions/workflows/central-ci-v2.yml',
        description: 'Run the new scalable CI system'
    },
    {
        title: '🔄 Run Legacy Central CI',
        url: 'https://github.com/Intuitive-Autonomy/team-nightly-tests/actions/workflows/central-ci.yml',
        description: 'Run the original central CI'
    },
    {
        title: '📊 View All Runs',
        url: 'https://github.com/Intuitive-Autonomy/team-nightly-tests/actions',
        description: 'See all workflow executions'
    },
    {
        title: '🚶 Sit-to-Stand Repo',
        url: 'https://github.com/Intuitive-Autonomy/sit-to-stand-planner',
        description: 'Motion planning repository'
    },
    {
        title: '🤖 Robot Sim Repo',
        url: 'https://github.com/Intuitive-Autonomy/ia_robot_sim',
        description: 'Genesis simulation repository'
    },
    {
        title: '📖 Documentation',
        url: 'https://github.com/Intuitive-Autonomy/team-nightly-tests/blob/master/README.md',
        description: 'Central CI documentation'
    },
    {
        title: '⚙️ Configuration',
        url: 'https://github.com/Intuitive-Autonomy/team-nightly-tests/blob/master/repositories.yml',
        description: 'Repository configuration file'
    },
    {
        title: '🏢 Organization',
        url: 'https://github.com/Intuitive-Autonomy',
        description: 'Intuitive Autonomy GitHub org'
    }
];

// Dashboard statistics
export function getDashboardStats() {
    const allRepos = getAllRepositories();
    const enabledRepos = getEnabledRepositories();

    return {
        totalRepositories: allRepos.length,
        enabledRepositories: enabledRepos.length,
        repositoryTypes: {
            ros: getRepositoriesByType('ros').length,
            python: getRepositoriesByType('python').length,
            genesis: getRepositoriesByType('genesis').length,
            ci: getRepositoriesByType('ci').length
        },
        techStacks: {
            'ROS/ROS2': allRepos.filter(repo =>
                repo.techStack.some(tech => tech.includes('ROS'))
            ).length,
            'Python': allRepos.filter(repo =>
                repo.techStack.includes('Python')
            ).length,
            'Docker': allRepos.filter(repo =>
                repo.techStack.includes('Docker')
            ).length,
            'Genesis': allRepos.filter(repo =>
                repo.techStack.includes('Genesis')
            ).length
        }
    };
}