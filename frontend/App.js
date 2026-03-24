import { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const styles = `
    @keyframes gradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;

  const askAI = async (mode) => {
    if (!question.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question, mode })
      });

      const data = await res.json();

      setMessages([
        { type: "user", text: question },
        { type: "bot", text: data }
      ]);

      setQuestion("");
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend");
    }

    setLoading(false);
  };

  return (
    <>
      <style>{styles}</style>

      <div style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Segoe UI"
      }}>

        {/* Animated Background */}
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "linear-gradient(120deg, #2563eb, #3b82f6, #60a5fa)",
          backgroundSize: "300% 300%",
          animation: "gradientMove 8s ease infinite",
          zIndex: 0
        }} />

        {/* Floating Circles */}
        <div style={circle(120, "15%", "10%")}></div>
        <div style={circle(180, "70%", "20%")}></div>
        <div style={circle(100, "50%", "70%")}></div>

        {/* MAIN UI */}
        <div style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh"
        }}>

          <div style={{
            width: "650px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            padding: "25px"
          }}>

            {/* HEADER */}
            <h1 style={{
              textAlign: "center",
              fontSize: "30px",
              color: "#1e3a5f"
            }}>
              📚 AI Study Mentor
            </h1>

            <p style={{
              textAlign: "center",
              color: "#6b7280",
              marginBottom: "20px"
            }}>
              Learn smarter with explanations, summaries & questions
            </p>

            {/* BUTTONS */}
            <div style={{
              display: "flex",
              gap: "8px",
              marginBottom: "15px"
            }}>
              <button style={btn("#2563eb")} onClick={() => askAI("explain")}>Explain</button>
              <button style={btn("#3b82f6")} onClick={() => askAI("summary")}>Summary</button>
              <button style={btn("#60a5fa")} onClick={() => askAI("points")}>Key Points</button>
              <button style={btn("#93c5fd")} onClick={() => askAI("questions")}>Questions</button>
            </div>

            {/* CHAT */}
            <div style={{
              height: "300px",
              overflowY: "auto",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              padding: "15px",
              background: "#f9fafb"
            }}>
              {messages.map((msg, i) => (
                <div key={i} style={{
                  textAlign: msg.type === "user" ? "right" : "left",
                  marginBottom: "10px"
                }}>
                  <span style={{
                    display: "inline-block",
                    padding: "10px 14px",
                    borderRadius: "15px",
                    background: msg.type === "user" ? "#2563eb" : "#e5e7eb",
                    color: msg.type === "user" ? "white" : "#111827",
                    maxWidth: "75%",
                    whiteSpace: "pre-line"
                  }}>
                    {msg.text}
                  </span>
                </div>
              ))}

              {loading && <p style={{ textAlign: "center" }}>🤔 Thinking...</p>}
            </div>

            {/* INPUT */}
            <textarea
              rows="3"
              placeholder="Type your question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              style={{
                width: "100%",
                marginTop: "15px",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db"
              }}
            />

          </div>
        </div>
      </div>
    </>
  );
}

/* Button style */
const btn = (color) => ({
  flex: 1,
  padding: "10px",
  border: "none",
  borderRadius: "6px",
  background: color,
  color: "white",
  cursor: "pointer",
  fontWeight: "500"
});

/* Floating circles */
const circle = (size, left, top) => ({
  position: "absolute",
  width: size,
  height: size,
  borderRadius: "50%",
  background: "rgba(255,255,255,0.15)",
  top: top,
  left: left,
  zIndex: 0
});

export default App;