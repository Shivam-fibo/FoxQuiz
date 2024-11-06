import React from 'react';

const features = [
  {
    title: "Simple",
    description: ["No account required", "Easy to get started", "No sign-up hassle"],
    icon: "✨", // Placeholder for icon, replace with an actual icon if desired
  },
  {
    title: "High Quality",
    description: ["Accurate and detailed questions", "Smooth and responsive interface"],
    icon: "📝",
  },
  {
    title: "Fast",
    description: ["Instant quiz results", "Quick navigation"],
    icon: "⚡",
  },
  {
    title: "Secure",
    description: ["Your results are private", "Secure quiz submission"],
    linkText: "Review your quiz history",
    icon: "🛡️",
  },
  {
    title: "Interactive",
    description: ["Engaging quizzes with multiple question types", "Instant feedback on answers"],
    linkText: "Take a quiz now",
    icon: "🎮",
  },
  {
    title: "Track Progress",
    description: ["See your quiz scores", "Track your improvement over time"],
    icon: "📈",
  },
];

const FeaturesSection = () => {
  return (
    <div className="mt-48 ">
      <h2 className="text-3xl font-bold text-pink-500 text-center mb-2">Features</h2>
      <p className="text-gray-600 text-center mb-10 mt-4 ">
        A simple, interactive, and engaging way to test and improve your knowledge
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  ">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6  hover:border-t-4 hover: border-blue-500 hover: animate-border"
          >
            <div className="text-purple-600 text-3xl flex mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 flex  mb-2">{feature.title}</h3>
            <ul className="text-gray-600 mb-4 space-y-1">
              {feature.description.map((desc, idx) => (
                <li key={idx} className="flex items-center space-x-2 ">
                  <span className="text-blue-500">•</span> <span>{desc}</span>
                </li>
              ))}
            </ul>
            {feature.linkText && (
              <a
                href="#"
                className="text-blue-500 text-sm hover:underline"
              >
                {feature.linkText} →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
