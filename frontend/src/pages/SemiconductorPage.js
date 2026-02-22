import IndustryPage from "./IndustryPage";

export default function SemiconductorPage() {
  return (
    <IndustryPage
      title="Semiconductors"
      lede="Cutting-edge solutions for automotive performance, safety, and reliability."
      bullets={[
        "High-stakes platform engineering",
        "Performance and reliability testing",
        "Safety-focused delivery practices",
        "Scalable systems and data pipelines",
        "Partner-ready execution models",
      ]}
      videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
      related={[
        {
          title: "Technology",
          desc: "AI, blockchain, cloud, and IoT solutions that accelerate digital transformation.",
          to: "/technology",
          icon: "chip",
        },
        {
          title: "Healthcare",
          desc:
            "End-to-end services from medical billing & coding to AI-driven diagnostics and RCM.",
          to: "/healthcare",
          icon: "heart",
        },
      ]}
    />
  );
}
