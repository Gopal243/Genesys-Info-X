import IndustryPage from "./IndustryPage";

export default function TechnologyPage() {
  return (
    <IndustryPage
      pageKey="technology"
      title="Technology"
      lede="AI, blockchain, cloud, and IoT solutions that accelerate digital transformation."
      bullets={[
        "AI-driven operations & automation",
        "Cloud engineering & platform modernization",
        "Enterprise product development",
        "Security-by-design delivery",
        "Data systems & analytics",
      ]}
      videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
      related={[
        {
          title: "Healthcare",
          desc:
            "End-to-end services from medical billing & coding to AI-driven diagnostics and RCM.",
          to: "/healthcare",
          icon: "heart",
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
