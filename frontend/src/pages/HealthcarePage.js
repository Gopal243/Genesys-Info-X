import IndustryPage from "./IndustryPage";

export default function HealthcarePage() {
  return (
    <IndustryPage
      title="Healthcare"
      lede="End-to-end services from medical billing & coding to AI-driven diagnostics and RCM."
      bullets={[
        "RCM workflows, billing, and coding",
        "Interoperability & system integration",
        "Analytics & compliance-ready delivery",
        "AI operations for healthcare teams",
        "Workflow automation & QA",
      ]}
      videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
      related={[
        {
          title: "Technology",
          desc: "AI, blockchain, cloud, and IoT solutions that accelerate digital transformation.",
          to: "/technology",
          icon: "chip",
        },
        {
          title: "Semiconductors",
          desc: "Cutting-edge solutions for automotive performance, safety, and reliability.",
          to: "/semiconductors",
          icon: "stack",
        },
      ]}
    />
  );
}
