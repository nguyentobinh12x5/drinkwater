export interface Reward {
    id: string;
    title: string;
    description?: string;
    icon: string; // emoji icon
    requiredDays: number; // number of consecutive days to achieve goal
    isActive: boolean;
    isClaimed: boolean;
    claimedDate?: string;
    createdDate: string;
}

export type RewardPreset = {
    title: string;
    icon: string;
    description: string;
};

export const REWARD_PRESETS: RewardPreset[] = [
    {
        title: "Trip to Park",
        icon: "🏞️",
        description: "A fun day at the park"
    },
    {
        title: "Ice Cream Treat",
        icon: "🍦",
        description: "Your favorite ice cream"
    },
    {
        title: "Movie Night",
        icon: "🎬",
        description: "Family movie night with popcorn"
    },
    {
        title: "Extra Playtime",
        icon: "🎮",
        description: "30 minutes of extra play"
    },
    {
        title: "Zoo Visit",
        icon: "🦁",
        description: "A trip to the zoo"
    },
    {
        title: "Pizza Party",
        icon: "🍕",
        description: "Make your own pizza"
    },
    {
        title: "Beach Day",
        icon: "🏖️",
        description: "Day at the beach"
    },
    {
        title: "Toy Shop Visit",
        icon: "🧸",
        description: "Pick a small toy"
    },
    {
        title: "Sleepover",
        icon: "🛏️",
        description: "Friend sleepover"
    },
    {
        title: "Amusement Park",
        icon: "🎢",
        description: "Fun at the amusement park"
    },
    {
        title: "Camping Trip",
        icon: "⛺",
        description: "Backyard camping"
    },
    {
        title: "Art Supplies",
        icon: "🎨",
        description: "New art supplies"
    },
];
