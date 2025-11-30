import { ClassRoom, ClassStats, StudentFlag, Challenge, ChallengeProgress, Student } from '../types';

// Mock classroom data
export const mockClasses: ClassRoom[] = [
    {
        id: 'class-4a',
        name: 'Class 4A',
        teacherId: 'teacher-1',
        studentCount: 28,
    },
    {
        id: 'class-4b',
        name: 'Class 4B',
        teacherId: 'teacher-1',
        studentCount: 25,
    },
    {
        id: 'class-5a',
        name: 'Class 5A',
        teacherId: 'teacher-1',
        studentCount: 30,
    },
];

// Mock students (anonymized for privacy)
export const mockStudents: Student[] = [
    // Class 4A students
    ...Array.from({ length: 28 }, (_, i) => ({
        id: `student-4a-${i + 1}`,
        name: `Student ${i + 1}`, // Anonymized
        classId: 'class-4a',
        dailyGoal: 8,
        isAnonymized: true,
    })),
    // Class 4B students
    ...Array.from({ length: 25 }, (_, i) => ({
        id: `student-4b-${i + 1}`,
        name: `Student ${i + 1}`,
        classId: 'class-4b',
        dailyGoal: 8,
        isAnonymized: true,
    })),
    // Class 5A students
    ...Array.from({ length: 30 }, (_, i) => ({
        id: `student-5a-${i + 1}`,
        name: `Student ${i + 1}`,
        classId: 'class-5a',
        dailyGoal: 10,
        isAnonymized: true,
    })),
];

// Generate class statistics
export const getClassStats = (classId: string): ClassStats => {
    const classroom = mockClasses.find(c => c.id === classId);
    if (!classroom) {
        return {
            classId,
            className: 'Unknown',
            totalStudents: 0,
            studentsMetGoal: 0,
            percentageMetGoal: 0,
            averageConsumption: 0,
            lowIntakeCount: 0,
        };
    }

    // Simulate realistic statistics
    const totalStudents = classroom.studentCount;
    const studentsMetGoal = Math.floor(totalStudents * (0.65 + Math.random() * 0.25)); // 65-90%
    const percentageMetGoal = Math.round((studentsMetGoal / totalStudents) * 100);
    const averageConsumption = 6 + Math.random() * 3; // 6-9 glasses
    const lowIntakeCount = Math.floor(totalStudents * (0.05 + Math.random() * 0.1)); // 5-15%

    return {
        classId,
        className: classroom.name,
        totalStudents,
        studentsMetGoal,
        percentageMetGoal,
        averageConsumption: Math.round(averageConsumption * 10) / 10,
        lowIntakeCount,
    };
};

// Get all class statistics
export const getAllClassStats = (): ClassStats[] => {
    return mockClasses.map(c => getClassStats(c.id));
};

// Generate student flags for health monitoring
export const getStudentFlags = (): StudentFlag[] => {
    const flags: StudentFlag[] = [];

    // Simulate some students with low intake across different classes
    const flaggedStudents = [
        { classId: 'class-4a', count: 3 },
        { classId: 'class-4b', count: 2 },
        { classId: 'class-5a', count: 4 },
    ];

    flaggedStudents.forEach(({ classId, count }) => {
        const classStudents = mockStudents.filter(s => s.classId === classId);
        const classroom = mockClasses.find(c => c.id === classId);

        for (let i = 0; i < count; i++) {
            const student = classStudents[i];
            const daysConsecutive = 3 + Math.floor(Math.random() * 5); // 3-7 days
            const averageIntake = 2 + Math.random() * 3; // 2-5 glasses (below goal)
            const severity = averageIntake < 3 ? 'high' : averageIntake < 4 ? 'medium' : 'low';

            flags.push({
                studentId: student.id,
                studentName: `${classroom?.name} - ${student.name}`,
                classId,
                reason: 'low_intake',
                severity: severity as 'low' | 'medium' | 'high',
                daysConsecutive,
                averageIntake: Math.round(averageIntake * 10) / 10,
                recommendedGoal: student.dailyGoal,
            });
        }
    });

    return flags.sort((a, b) => {
        const severityOrder = { high: 3, medium: 2, low: 1 };
        return severityOrder[b.severity] - severityOrder[a.severity];
    });
};

// Mock active challenges
export const mockChallenges: Challenge[] = [
    {
        id: 'challenge-1',
        title: 'Hydration Week Challenge',
        description: 'All classes compete to achieve the highest percentage of students meeting their daily goal',
        type: 'school',
        startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // Started 3 days ago
        endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // Ends in 4 days
        goal: 90, // 90% of students meet goal
        participants: ['class-4a', 'class-4b', 'class-5a'],
        isActive: true,
    },
    {
        id: 'challenge-2',
        title: 'Class 4 Battle',
        description: 'Class 4A vs Class 4B - Who can drink more water this week?',
        type: 'inter_class',
        startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        goal: 1000, // Total glasses
        participants: ['class-4a', 'class-4b'],
        isActive: true,
    },
];

// Get challenge progress
export const getChallengeProgress = (challengeId: string): ChallengeProgress[] => {
    const challenge = mockChallenges.find(c => c.id === challengeId);
    if (!challenge) return [];

    const progress: ChallengeProgress[] = challenge.participants.map((classId, index) => {
        const classroom = mockClasses.find(c => c.id === classId);
        const stats = getClassStats(classId);

        let currentProgress: number;
        let goalProgress: number;

        if (challenge.type === 'school' || challenge.type === 'inter_class') {
            if (challenge.goal < 100) {
                // Percentage-based goal
                currentProgress = stats.percentageMetGoal;
                goalProgress = challenge.goal;
            } else {
                // Total glasses goal
                currentProgress = Math.floor(stats.averageConsumption * stats.totalStudents * 3); // 3 days
                goalProgress = challenge.goal;
            }
        } else {
            currentProgress = stats.percentageMetGoal;
            goalProgress = 100;
        }

        return {
            challengeId,
            classId,
            className: classroom?.name || 'Unknown',
            currentProgress,
            goalProgress,
            percentageComplete: Math.round((currentProgress / goalProgress) * 100),
            rank: index + 1, // Will be sorted later
        };
    });

    // Sort by percentage and assign ranks
    progress.sort((a, b) => b.percentageComplete - a.percentageComplete);
    progress.forEach((p, index) => {
        p.rank = index + 1;
    });

    return progress;
};

// Get active challenges
export const getActiveChallenges = (): Challenge[] => {
    return mockChallenges.filter(c => c.isActive);
};
