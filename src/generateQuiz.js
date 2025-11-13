import express from "express";
import fetch from "node-fetch";

const router = express.Router();
router.post("/generateQuiz", async (resizeBy, res) => {
    const {material,numQ} = req.body;
    const prompt = `
    You are an educator. Create a quiz according to the given course material. 
    The rules are:
    - The quiz must have ${numQ} questions
    - The quiz's question must be related to the course material
    - The quiz's question must be a multiple choice with 4 options
    - The quiz's question must be in medium difficulty 
    
    The expected output for the questiones' answer should be valid JSONN using the schema"
    {
        "quiz_name": "",
        "questions": [
            {            
            "id": 1,
            "question": "",
            "options": ["","","",""],
            "correct_answer": "(a/b/c/d)"
            }
        ]
    }

    course material: ${material}`;

    try{
        const anthropic = await fetch("https://api.anthropic.com/v1/messages",{
            method: "POST",
            headers: {
                "api-key": process.env.Anthropic_API_key,
                "type": "application/json"
            },
            body: JSON.stringify({
                model: "claude-3-5-sonnet-latest",
                max_tokens: 4000,
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            })
        })

        const data = await anthropicRes.json();

        const quiz = JSON.parse(data.content[0].text);
        res.json({success: true, quiz});
    } catch (error) {
        return res.status(500).json({ error: "Failed to generate quiz" });
    }
});

export default router;