
const colorOptions = [
    "red",
    "orange",
    "amber",
    "emerald",
    "sky",
    "blue",
    "violet",
    "rose",
    "pink",
    "lime",
] as const;

export function getRandomColor() {
    const option = Math.floor(Math.random() * colorOptions.length);
    const colorName = colorOptions[option]
    return {
        bg: `bg-${colorName}-300`,
        text: `text-${colorName}-900`
    };
}