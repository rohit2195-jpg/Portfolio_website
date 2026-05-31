export const bioTagline = "Computer Science student · Pittsburgh, PA · Software & ML";

export const bio = `Hi, I'm a Computer Science student at Purdue University graduating in Spring 2027, based in Pittsburgh, PA. I'm interested in software development, systems programming, machine learning, and artificial intelligence with a year of experience as an undergraduate researcher for the Purdue Data Mine and Johnson & Johnson. I'm passionate about creating software that has a real-world impact.`;

// Each skill is { name, icon? (devicon slug), variant? (devicon variant, default "original"), iconUrl? (overrides icon entirely) }.
export const skills = {
  languages: [
    { name: "Python", icon: "python" },
    { name: "Java", icon: "java" },
    { name: "C", icon: "c" },
    { name: "C++", icon: "cplusplus" },
    { name: "SQL", icon: "mysql" },
    { name: "JavaScript", icon: "javascript" },
    { name: "TypeScript", icon: "typescript" },
    { name: "R", icon: "r" },
    { name: "HTML", icon: "html5" },
    { name: "CSS", icon: "css3" },
  ],
  libraries: [
    { name: "React", icon: "react" },
    { name: "Flask", icon: "flask" },
    { name: "Node.js", icon: "nodejs" },
    { name: "NumPy", icon: "numpy" },
    { name: "Pandas", icon: "pandas" },
    { name: "Scikit-Learn", icon: "scikitlearn" },
    { name: "PyTorch", icon: "pytorch" },
    {
      name: "LangChain",
      iconUrl:
        "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/langchain.svg",
    },
  ],
  tools: [
    { name: "Git", icon: "git" },
    { name: "AWS", icon: "amazonwebservices", variant: "original-wordmark" },
    { name: "Firebase", icon: "firebase" },
    { name: "LaTeX", icon: "latex" },
  ],
};

export const coursework = [
  "Data Engineering in Python",
  "Object-Oriented Programming in Java",
  "Programming in C",
  "Great Issues in Computer Science",
  "Computer Architecture",
  "Data Structures and Algorithms",
  "Systems Programming",
  "Information Systems",
];
