import { useEffect, useState } from "react";

const words = ["Fullstack Developer", "App Developer", "UI/UX Designer", "Coder"];

const TypingEffect = () => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80); // Control typing speed

  useEffect(() => {
    const currentWord = words[wordIndex];

    const handleTyping = () => {
      const updatedText = isDeleting
        ? currentWord.substring(0, text.length - 1)
        : currentWord.substring(0, text.length + 1);

      setText(updatedText);

      // When word is fully typed
      if (!isDeleting && updatedText === currentWord) {
        setTimeout(() => setIsDeleting(true), 1000); // pause before delete
        return;
      }

      // When word is fully deleted
      if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        return;
      }
    };

    const timeout = setTimeout(handleTyping, isDeleting ? 40 : typingSpeed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  return (
    <span className="text-[#8245ec] font-semibold">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypingEffect;
