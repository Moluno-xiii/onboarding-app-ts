import {
    MdAnalytics,
    MdAutoFixHigh,
    MdIntegrationInstructions,
    MdRocketLaunch,
    MdSupportAgent,
    MdTune,
} from "react-icons/md";

export const features = [
    {
        icon: MdAutoFixHigh,
        title: "No-Code Builder",
        desc: "Create beautiful, interactive tours without writing a single line of code.",
    },
    {
        icon: MdIntegrationInstructions,
        title: "Seamless Integration",
        desc: "Embed our tool in your application with a simple copy-paste snippet.",
    },
    {
        icon: MdAnalytics,
        title: "Powerful Analytics",
        desc: "Understand user behavior and improve your tours with insightful data.",
    },
];

export const steps = [
    { step: "1", title: "Design Your Tour", desc: "Use our intuitive editor..." },
    { step: "2", title: "Embed a Snippet", desc: "Copy/paste one line of code." },
    { step: "3", title: "Launch & Analyze", desc: "Gather insights instantly." },
];


export const benefits = [
    { icon: MdRocketLaunch, text: "Increase User Adoption" },
    { icon: MdSupportAgent, text: "Reduce Support Tickets" },
    { icon: MdTune, text: "Fully Customizable" },
];
